import type { APIContext } from 'astro'
import { Resend } from 'resend'
import { z } from 'zod'
import { SITE } from '../../lib/config'

export const prerender = false

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional(),
})

type RuntimeEnv = {
  RESEND_API_KEY?: string
  CONTACT_EMAIL?: string
}

async function sendEmailSafely(
  apiKey: string,
  payload: { to: string; from: string; replyTo: string; subject: string; text: string },
): Promise<void> {
  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: payload.from,
      to: payload.to,
      replyTo: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
    })
  } catch (err) {
    console.error('[contact] resend send failed', err)
  }
}

export async function POST({ request, locals }: APIContext) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? 'Invalid input'
    return Response.json({ error }, { status: 400 })
  }

  const { name, email, message, website } = parsed.data

  if (website && website.trim().length > 0) {
    return Response.json({ ok: true }, { status: 200 })
  }

  const env = (locals as Record<string, any>).runtime?.env as RuntimeEnv | undefined
  const apiKey = env?.RESEND_API_KEY
  const to = env?.CONTACT_EMAIL

  if (apiKey && to) {
    const subject = `New contact form message from ${name}`
    const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    void sendEmailSafely(apiKey, {
      to,
      from: `${SITE.name} <onboarding@resend.dev>`,
      replyTo: email,
      subject,
      text,
    })
  } else {
    console.warn('[contact] RESEND_API_KEY or CONTACT_EMAIL not set; skipping send')
  }

  return Response.json({ ok: true }, { status: 201 })
}
