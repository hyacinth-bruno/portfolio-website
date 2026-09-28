import Anthropic from '@anthropic-ai/sdk'
import { name, bio, whatIDo, skills } from './profile'
import type { GithubProjectContext } from './github'

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5'

let client: Anthropic | null | undefined

export function getAnthropicClient(): Anthropic | null {
  if (client !== undefined) return client
  client = process.env.ANTHROPIC_API_KEY ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) : null
  return client
}

function buildSystemPrompt(githubContext: GithubProjectContext[]): string {
  const readmeSections = githubContext
    .filter((repo) => repo.readme)
    .map((repo) => `### ${repo.name}${repo.description ? ` — ${repo.description}` : ''}\n${repo.readme}`)
    .join('\n\n')

  return `You are an assistant embedded in ${name}'s portfolio website, answering visitor questions about him.

BIO:
${bio.join('\n')}

AREAS OF FOCUS:
${whatIDo.map((item) => `- ${item.title}: ${item.description}`).join('\n')}

SKILLS:
${skills.join(', ')}

GITHUB PROJECTS (live from GitHub, source of truth for what he's built):
${readmeSections || 'No public repository content available.'}

Rules:
- Only make claims supported by the context above.
- Speak about ${name} in the third person, as his assistant.
- Keep answers concise and specific; cite project names when relevant.
- If asked something not covered by this context, say you don't have that information instead of guessing.`
}

export async function askAboutBruno(question: string, githubContext: GithubProjectContext[]): Promise<string> {
  const anthropic = getAnthropicClient()
  if (!anthropic) throw new Error('Anthropic API key not configured')

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: buildSystemPrompt(githubContext),
    messages: [{ role: 'user', content: question }],
  })

  const textBlock = response.content.find((block) => block.type === 'text')
  return textBlock && textBlock.type === 'text' ? textBlock.text : "I couldn't generate a response."
}

export type RequirementMatch = {
  requirement: string
  match: 'strong' | 'partial' | 'weak' | 'none'
  evidence: string
}

export type JobFitResult = {
  requirements: RequirementMatch[]
  overallFit: 'strong' | 'good' | 'moderate' | 'weak'
  summary: string
}

const REPORT_JOB_FIT_TOOL: Anthropic.Tool = {
  name: 'report_job_fit',
  description:
    'Report the key requirements extracted from a job posting, each ranked against the candidate skillset, plus an overall fit summary.',
  input_schema: {
    type: 'object',
    properties: {
      requirements: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            requirement: {
              type: 'string',
              description: 'The requirement or qualification as stated or paraphrased from the posting.',
            },
            match: {
              type: 'string',
              enum: ['strong', 'partial', 'weak', 'none'],
              description: 'How well the candidate context supports this requirement.',
            },
            evidence: {
              type: 'string',
              description: 'One sentence citing the specific skill/project backing this rating, or why it is missing.',
            },
          },
          required: ['requirement', 'match', 'evidence'],
        },
      },
      overallFit: {
        type: 'string',
        enum: ['strong', 'good', 'moderate', 'weak'],
      },
      summary: {
        type: 'string',
        description: 'A 2-3 sentence overall summary of fit for this role.',
      },
    },
    required: ['requirements', 'overallFit', 'summary'],
  },
}

export async function rankJobFit(jobText: string, sourceUrl: string | null, githubContext: GithubProjectContext[]): Promise<JobFitResult> {
  const anthropic = getAnthropicClient()
  if (!anthropic) throw new Error('Anthropic API key not configured')

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: buildSystemPrompt(githubContext),
    tools: [REPORT_JOB_FIT_TOOL],
    tool_choice: { type: 'tool', name: 'report_job_fit' },
    messages: [
      {
        role: 'user',
        content: `Here is a job posting${sourceUrl ? ` (source: ${sourceUrl})` : ''}. Extract its key requirements/qualifications and call report_job_fit to rank each one against the candidate context.\n\n${jobText}`,
      },
    ],
  })

  const toolUse = response.content.find((block) => block.type === 'tool_use')
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('Model did not return a structured ranking')
  }
  return toolUse.input as JobFitResult
}
