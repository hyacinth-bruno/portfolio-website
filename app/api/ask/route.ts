import { NextRequest, NextResponse } from 'next/server'
import { getGithubContext } from '@/lib/github'
import { askAboutBruno, rankJobFit } from '@/lib/anthropic'
import { resolveJobPosting } from '@/lib/jobPosting'

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 15
const MAX_QUESTION_LENGTH = 1000
const MAX_JOB_INPUT_LENGTH = 20000

// Per-instance in-memory limiter — resets on redeploy/cold start and isn't shared
// across serverless instances, but is enough to blunt casual abuse of a paid API.
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const bucket = rateLimitBuckets.get(ip)
  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return false
  }
  bucket.count += 1
  return true
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

type AskPayload = {
  question?: string
  jobInput?: string
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a while.' }, { status: 429 })
  }

  let body: AskPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const question = body.question?.trim()
  const jobInput = body.jobInput?.trim()

  if (!question && !jobInput) {
    return NextResponse.json({ error: 'Please ask a question or provide a job posting' }, { status: 400 })
  }
  if (question && question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json({ error: 'Question is too long' }, { status: 400 })
  }
  if (jobInput && jobInput.length > MAX_JOB_INPUT_LENGTH) {
    return NextResponse.json({ error: 'Job posting input is too long' }, { status: 400 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set')
    return NextResponse.json({ error: 'AI assistant is not configured' }, { status: 500 })
  }

  const githubContext = await getGithubContext()

  if (jobInput) {
    let jobPosting
    try {
      jobPosting = await resolveJobPosting(jobInput)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not process that job posting'
      return NextResponse.json({ error: message }, { status: 400 })
    }

    try {
      const ranking = await rankJobFit(jobPosting.text, jobPosting.sourceUrl, githubContext)
      return NextResponse.json({ type: 'job-fit', ranking, sourceUrl: jobPosting.sourceUrl })
    } catch (error) {
      console.error('Job fit ranking error:', error)
      return NextResponse.json({ error: 'Something went wrong ranking that job posting. Please try again.' }, { status: 502 })
    }
  }

  try {
    const answer = await askAboutBruno(question as string, githubContext)
    return NextResponse.json({ type: 'answer', answer })
  } catch (error) {
    console.error('Ask AI error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 502 })
  }
}
