import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const FOLDER_ID = '1uli9TMLLeEtjHbWR7sHN4MSbk5cGom9O'
const FOLDER_URL = `https://drive.google.com/drive/folders/${FOLDER_ID}`

export async function GET() {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY

  if (!apiKey) {
    console.error('GOOGLE_DRIVE_API_KEY is not set')
    return NextResponse.redirect(FOLDER_URL)
  }

  try {
    const query = encodeURIComponent(`'${FOLDER_ID}' in parents and trashed = false`)
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=modifiedTime desc&pageSize=1&fields=files(id,name)&key=${apiKey}`

    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()

    if (!res.ok || !data.files || data.files.length === 0) {
      console.error('Google Drive API error:', data)
      return NextResponse.redirect(FOLDER_URL)
    }

    const fileId = data.files[0].id
    return NextResponse.redirect(`https://drive.google.com/uc?export=download&id=${fileId}`)
  } catch (err) {
    console.error('Failed to fetch latest resume:', err)
    return NextResponse.redirect(FOLDER_URL)
  }
}
