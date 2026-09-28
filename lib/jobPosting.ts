import dns from 'node:dns/promises'
import net from 'node:net'
import * as cheerio from 'cheerio'

const FETCH_TIMEOUT_MS = 8000
const MAX_RESPONSE_BYTES = 3 * 1024 * 1024 // 3MB
const EXTRACTED_TEXT_LIMIT = 12000
const URL_PATTERN = /^https?:\/\/\S+$/i

function ipv4ToInt(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0
}

function isPrivateIPv4(ip: string): boolean {
  const ranges: [string, number][] = [
    ['0.0.0.0', 8],
    ['10.0.0.0', 8],
    ['100.64.0.0', 10],
    ['127.0.0.0', 8],
    ['169.254.0.0', 16],
    ['172.16.0.0', 12],
    ['192.0.0.0', 24],
    ['192.0.2.0', 24],
    ['192.168.0.0', 16],
    ['198.18.0.0', 15],
    ['198.51.100.0', 24],
    ['203.0.113.0', 24],
    ['224.0.0.0', 4],
    ['240.0.0.0', 4],
  ]
  const ipInt = ipv4ToInt(ip)
  return ranges.some(([base, bits]) => {
    const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0
    return (ipInt & mask) === (ipv4ToInt(base) & mask)
  })
}

function isPrivateIPv6(ip: string): boolean {
  const normalized = ip.toLowerCase()
  if (normalized === '::1' || normalized === '::') return true
  if (/^fe[89ab]/.test(normalized)) return true // fe80::/10 link-local
  if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true // fc00::/7 unique local
  const mapped = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
  if (mapped) return isPrivateIPv4(mapped[1])
  return false
}

function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) return isPrivateIPv4(ip)
  if (net.isIPv6(ip)) return isPrivateIPv6(ip)
  return true
}

// Best-effort SSRF guard: blocks the obvious loopback/private/link-local/metadata targets.
// Does not defend against DNS-rebinding between this check and the fetch below.
async function assertPublicHost(hostname: string): Promise<void> {
  if (hostname.toLowerCase() === 'localhost') {
    throw new Error('Refusing to fetch localhost URLs')
  }
  const lookups = await dns.lookup(hostname, { all: true })
  if (lookups.length === 0 || lookups.some(({ address }) => isPrivateIp(address))) {
    throw new Error('That URL points to a non-public address and cannot be fetched')
  }
}

async function fetchHtml(url: URL): Promise<string> {
  await assertPublicHost(url.hostname)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(url.toString(), {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BrunoPortfolioBot/1.0)',
        Accept: 'text/html,application/xhtml+xml',
      },
    })
    if (!res.ok) {
      throw new Error(`Failed to fetch job posting (status ${res.status})`)
    }

    const finalUrl = new URL(res.url)
    if (finalUrl.hostname !== url.hostname) {
      await assertPublicHost(finalUrl.hostname)
    }

    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('html') && !contentType.includes('text')) {
      throw new Error('That URL did not return a readable page')
    }

    const reader = res.body?.getReader()
    if (!reader) {
      return await res.text()
    }
    let received = 0
    const chunks: Buffer[] = []
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) {
        received += value.byteLength
        if (received > MAX_RESPONSE_BYTES) {
          throw new Error('Job posting page is too large')
        }
        chunks.push(Buffer.from(value))
      }
    }
    return Buffer.concat(chunks).toString('utf-8')
  } finally {
    clearTimeout(timeout)
  }
}

function htmlToText(html: string): string {
  const $ = cheerio.load(html)
  $('script, style, noscript, nav, footer, header, svg, iframe').remove()
  return $('body').text().replace(/\s+/g, ' ').trim()
}

export type JobPostingResult = {
  text: string
  sourceUrl: string | null
}

/** Accepts either a job posting URL (fetched & stripped to text) or raw pasted job text. */
export async function resolveJobPosting(input: string): Promise<JobPostingResult> {
  const trimmed = input.trim()
  if (!trimmed) {
    throw new Error('Job posting input is empty')
  }

  if (URL_PATTERN.test(trimmed)) {
    let url: URL
    try {
      url = new URL(trimmed)
    } catch {
      throw new Error('Invalid job posting URL')
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error('Only http/https URLs are supported')
    }
    const html = await fetchHtml(url)
    const text = htmlToText(html).slice(0, EXTRACTED_TEXT_LIMIT)
    if (!text) {
      throw new Error('Could not extract readable text from that URL — try pasting the job description instead')
    }
    return { text, sourceUrl: url.toString() }
  }

  return { text: trimmed.slice(0, EXTRACTED_TEXT_LIMIT), sourceUrl: null }
}
