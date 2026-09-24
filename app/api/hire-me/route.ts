import { NextResponse } from 'next/server'
import { getResendClient, TO_EMAIL, FROM_EMAIL } from '@/lib/resend'
import { renderEmailDocument, emailSectionHeading, emailDetailRow, emailDivider, emailButton, escapeHtml } from '@/lib/email'

type HireMePayload = {
  name?: string
  email?: string
  phone?: string
  sameNumberWhatsApp?: boolean
  projectType?: string
  description?: string
  preferredMethods?: string[]
}

function buildHtml({ name, email, phone, sameNumberWhatsApp, projectType, description, preferredMethods }: Required<HireMePayload>) {
  const whatsappDigits = phone.replace(/[^\d]/g, '')
  const showWhatsAppButton = sameNumberWhatsApp && whatsappDigits.length > 0

  const bodyHtml = `
      ${emailSectionHeading('Contact Details')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${emailDetailRow('Name', name)}
        ${emailDetailRow('Email', email)}
        ${emailDetailRow('Phone', phone + (sameNumberWhatsApp ? ' (same on WhatsApp)' : ''))}
      </table>

      ${emailDivider()}

      ${emailSectionHeading('Project')}
      <p style="margin:0 0 12px;display:inline-block;background:#FFF4CC;color:#7a5c12;font-weight:700;font-size:13px;padding:6px 14px;border-radius:999px;">${escapeHtml(projectType)}</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#1a212d;white-space:pre-wrap;">${escapeHtml(description)}</p>

      ${emailDivider()}

      ${emailSectionHeading('Preferred Contact')}
      <p style="margin:0 0 28px;font-size:15px;font-weight:600;color:#1a212d;">${escapeHtml(preferredMethods.join(', ') || 'Not specified')}</p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-right:12px;">
            ${emailButton({ href: `mailto:${encodeURIComponent(email)}`, label: 'Reply by Email' })}
          </td>
          ${
            showWhatsAppButton
              ? `<td>
            ${emailButton({ href: `https://wa.me/${whatsappDigits}`, label: 'Open WhatsApp', color: '#25D366', textColor: '#ffffff' })}
          </td>`
              : ''
          }
        </tr>
      </table>`

  return renderEmailDocument({
    eyebrow: 'Portfolio Inquiry',
    title: 'New Project Request',
    subtitle: 'Someone wants to work with you.',
    bodyHtml,
  })
}

function buildText({ name, email, phone, sameNumberWhatsApp, projectType, description, preferredMethods }: Required<HireMePayload>) {
  return `NEW PROJECT REQUEST

CONTACT DETAILS
Name: ${name}
Email: ${email}
Phone: ${phone}${sameNumberWhatsApp ? ' (same on WhatsApp)' : ''}

PROJECT
${projectType}

${description}

PREFERRED CONTACT
${preferredMethods.join(', ') || 'Not specified'}`
}

export async function POST(request: Request) {
  let body: HireMePayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, phone, sameNumberWhatsApp, projectType, description, preferredMethods } = body

  if (!name || !email || !description) {
    return NextResponse.json({ error: 'Name, email, and project details are required' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 })
  }

  const resend = getResendClient()
  if (!resend) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 })
  }

  const payload: Required<HireMePayload> = {
    name,
    email,
    phone: phone || 'Not provided',
    sameNumberWhatsApp: Boolean(sameNumberWhatsApp),
    projectType: projectType || 'Not specified',
    description,
    preferredMethods: preferredMethods || [],
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `New project request from ${name}`,
    html: buildHtml(payload),
    text: buildText(payload),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send request' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
