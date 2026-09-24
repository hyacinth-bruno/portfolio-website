import { NextResponse } from 'next/server'
import { getResendClient, TO_EMAIL, FROM_EMAIL } from '@/lib/resend'
import { renderEmailDocument, emailSectionHeading, emailDetailRow, emailDivider, emailButton, escapeHtml } from '@/lib/email'

function buildHtml({ name, email, message }: { name: string; email: string; message: string }) {
  const bodyHtml = `
      ${emailSectionHeading('Contact Details')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${emailDetailRow('Name', name)}
        ${emailDetailRow('Email', email)}
      </table>

      ${emailDivider()}

      ${emailSectionHeading('Message')}
      <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#1a212d;white-space:pre-wrap;">${escapeHtml(message)}</p>

      ${emailButton({ href: `mailto:${encodeURIComponent(email)}`, label: 'Reply by Email' })}`

  return renderEmailDocument({
    eyebrow: 'Portfolio Contact',
    title: 'New Message',
    subtitle: 'Someone wants to connect with you.',
    bodyHtml,
  })
}

export async function POST(request: Request) {
  let body: { name?: string; email?: string; subject?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, subject, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 })
  }

  const resend = getResendClient()
  if (!resend) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 })
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: subject?.trim() || `New message from ${name} via portfolio`,
    html: buildHtml({ name, email, message }),
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
