import { NextResponse } from 'next/server'
import { getPublicRepos } from '@/lib/github'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const repos = await getPublicRepos()
    return NextResponse.json({ repos })
  } catch (error) {
    console.error('Failed to load GitHub projects:', error)
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 502 })
  }
}
