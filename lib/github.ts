export type GithubProjectContext = {
  name: string
  description: string | null
  url: string
  language: string | null
  readme: string
}

export type PublicRepo = {
  name: string
  description: string | null
  url: string
  homepage: string | null
  language: string | null
  stars: number
  topics: string[]
}

const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour
const README_CHAR_LIMIT = 4000
const MAX_REPOS = 20

// Only repos tagged with this GitHub topic are treated as portfolio projects — add it
// via each repo's "Manage topics" on GitHub. Keeps practice/tutorial repos out of both
// the Projects section and the AI assistant's context without a hardcoded allowlist.
const FEATURED_TOPIC = process.env.GITHUB_FEATURED_TOPIC || 'portfolio'

type CacheEntry<T> = {
  data: T
  fetchedAt: number
}

function githubHeaders(withAuth: boolean): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'bruno-mbachu-portfolio-ask-ai',
  }
  if (withAuth && process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

// Uses GITHUB_TOKEN when present, but transparently retries unauthenticated on a 401
// (invalid/expired token) instead of failing outright — degrades to GitHub's lower
// unauthenticated rate limit rather than breaking the feature.
async function githubFetch(url: string): Promise<Response> {
  if (!process.env.GITHUB_TOKEN) {
    return fetch(url, { headers: githubHeaders(false), cache: 'no-store' })
  }
  const res = await fetch(url, { headers: githubHeaders(true), cache: 'no-store' })
  if (res.status === 401) {
    console.error('GITHUB_TOKEN was rejected by GitHub (401) — falling back to unauthenticated access')
    return fetch(url, { headers: githubHeaders(false), cache: 'no-store' })
  }
  return res
}

type GithubRepo = {
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  topics: string[]
  fork: boolean
  archived: boolean
}

async function fetchRepoList(username: string): Promise<GithubRepo[]> {
  const res = await githubFetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner&sort=updated`
  )
  if (!res.ok) {
    throw new Error(`GitHub repo list request failed: ${res.status}`)
  }
  const repos = (await res.json()) as GithubRepo[]
  return repos
    .filter((r) => !r.fork && !r.archived && r.topics?.includes(FEATURED_TOPIC))
    .slice(0, MAX_REPOS)
}

async function fetchReadme(fullName: string): Promise<string> {
  try {
    const res = await githubFetch(`https://api.github.com/repos/${fullName}/readme`)
    if (!res.ok) return ''
    const json = (await res.json()) as { content?: string }
    if (!json.content) return ''
    return Buffer.from(json.content, 'base64').toString('utf-8').slice(0, README_CHAR_LIMIT)
  } catch {
    return ''
  }
}

// Generic in-memory TTL cache with request de-duplication, shared by the repo-list
// (used for the public Projects section) and the README-augmented context (used by
// the AI assistant) so both draw from the same underlying GitHub API call.
function createCachedLoader<T>(load: () => Promise<T>, fallback: T) {
  let cache: CacheEntry<T> | null = null
  let inFlight: Promise<T> | null = null

  return async function getCached(): Promise<T> {
    const now = Date.now()
    if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
      return cache.data
    }
    if (inFlight) {
      return inFlight
    }
    inFlight = load()
      .then((data) => {
        cache = { data, fetchedAt: Date.now() }
        return data
      })
      .catch((err) => {
        console.error('Failed to refresh GitHub data:', err)
        return cache?.data ?? fallback
      })
      .finally(() => {
        inFlight = null
      })
    return inFlight
  }
}

const getCachedRepoList = createCachedLoader<GithubRepo[]>(() => {
  const username = process.env.GITHUB_USERNAME || 'hyacinth-bruno'
  return fetchRepoList(username)
}, [])

const getCachedGithubContext = createCachedLoader<GithubProjectContext[]>(async () => {
  const repos = await getCachedRepoList()
  return Promise.all(
    repos.map(async (repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      readme: await fetchReadme(repo.full_name),
    }))
  )
}, [])

/** Public repo metadata + READMEs for the portfolio owner, used to ground the AI assistant. */
export async function getGithubContext(): Promise<GithubProjectContext[]> {
  return getCachedGithubContext()
}

/** Lightweight public repo metadata (no READMEs) for rendering the Projects section. */
export async function getPublicRepos(): Promise<PublicRepo[]> {
  const repos = await getCachedRepoList()
  return repos
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      homepage: repo.homepage || null,
      language: repo.language,
      stars: repo.stargazers_count ?? 0,
      topics: repo.topics ?? [],
    }))
    .sort((a, b) => b.stars - a.stars)
}
