export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function renderEmailDocument({
  eyebrow,
  title,
  subtitle,
  bodyHtml,
}: {
  eyebrow: string
  title: string
  subtitle: string
  bodyHtml: string
}) {
  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <style>
      /* Force the banner's dark text to stay dark even when email clients (Gmail/Samsung/Outlook.com)
         auto-recolor text for dark mode — they leave the yellow background alone but lighten the text,
         which tanks contrast. [data-ogsc]/[data-ogsb] are the attributes those clients inject. */
      .banner-eyebrow, .banner-title, .banner-subtitle { color: #1a212d !important; }
      .banner-subtitle { color: #33280c !important; }
      [data-ogsc] .banner-eyebrow, [data-ogsc] .banner-title, [data-ogsc] .banner-subtitle,
      [data-ogsb] .banner-eyebrow, [data-ogsb] .banner-title, [data-ogsb] .banner-subtitle,
      u + .body .banner-eyebrow, u + .body .banner-title, u + .body .banner-subtitle {
        color: #1a212d !important;
      }
      [data-ogsc] .banner-subtitle, [data-ogsb] .banner-subtitle, u + .body .banner-subtitle {
        color: #33280c !important;
      }
    </style>
  </head>
  <body class="body" style="margin:0;background:#f5f5f4;">
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;background:#f5f5f4;">
    <div style="background-color:#FFDE66;background-image:linear-gradient(90deg,#FFD84D 0%,#FFDE66 55%,#FFE9A3 100%);padding:28px 28px 24px;border-radius:16px 16px 0 0;">
      <p class="banner-eyebrow" style="margin:0;font-size:12px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#1a212d;">${escapeHtml(eyebrow)}</p>
      <h1 class="banner-title" style="margin:6px 0 0;font-size:24px;line-height:1.2;font-weight:800;color:#1a212d;">${escapeHtml(title)}</h1>
      <p class="banner-subtitle" style="margin:6px 0 0;font-size:14px;font-weight:600;color:#33280c;">${escapeHtml(subtitle)}</p>
    </div>

    <div style="background:#ffffff;border:1px solid #e7e5e4;border-top:none;border-radius:0 0 16px 16px;padding:28px;">
      ${bodyHtml}
    </div>
  </div>
  </body>
  </html>`
}

export function emailSectionHeading(label: string) {
  return `<h2 style="margin:0 0 16px;font-size:13px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#b8860b;">${escapeHtml(label)}</h2>`
}

export function emailDetailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:0 0 14px; font-size:13px; color:#8a93a3;">${escapeHtml(label)}</td>
    </tr>
    <tr>
      <td style="padding:0 0 20px; font-size:15px; font-weight:600; color:#1a212d;">${escapeHtml(value)}</td>
    </tr>`
}

export function emailDivider() {
  return `<hr style="border:none;border-top:1px solid #e7e5e4;margin:4px 0 24px;" />`
}

export function emailButton({ href, label, color = '#FFDE66', textColor = '#1a212d' }: { href: string; label: string; color?: string; textColor?: string }) {
  return `<a href="${href}" style="display:inline-block;background:${color};color:${textColor};padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:700;font-size:14px;">${escapeHtml(label)}</a>`
}
