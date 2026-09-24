import { Resend } from 'resend'

export const TO_EMAIL = 'mbachubruno.chidozie@gmail.com'
export const FROM_EMAIL = 'Portfolio <onboarding@resend.dev>'

export function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null
  }
  return new Resend(process.env.RESEND_API_KEY)
}
