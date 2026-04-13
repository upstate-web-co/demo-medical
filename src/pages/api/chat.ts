import type { APIContext } from 'astro'
import { SITE, SERVICES, INSURANCE_NOTE, HOURS } from '../../lib/config'

const SYSTEM_PROMPT = `You are the AI assistant for ${SITE.name}, a family dental practice in Greenville, SC.

SERVICES: ${SERVICES.map(s => s.name).join(', ')}

INSURANCE: ${INSURANCE_NOTE} Also offer a dental savings plan for uninsured patients.

HOURS: Mon-Thu 8am-5pm, Fri 8am-2pm, Sat by appointment, Sun closed.

PROVIDERS: Dr. Priya Patel (General & Cosmetic, 12yr), Dr. James Rivera (Orthodontics & Clear Aligners, 8yr), Sarah Kim RDH (Hygienist, 10yr).

DETAILS:
- Accepting new patients. Online booking available.
- Same-day emergency appointments for toothaches, broken teeth, infections.
- Digital intake forms can be completed online before visit.
- Pediatric dentistry available — kids welcome.
- Address: ${SITE.address}
- Phone: ${SITE.phone}

IMPORTANT: This is a fictional demo dental practice. All names, credentials, and details are fictional.

RULES: Be professional, warm, reassuring. 2-3 sentences. Never give medical advice or diagnoses. For specific clinical questions, direct to booking a visit. Never name specific insurance companies — say we accept most major plans.`

export async function POST({ request, locals }: APIContext) {
  try {
    const { message } = await request.json()
    if (!message) return Response.json({ reply: 'How can we help? Ask about services, insurance, hours, or booking!' })
    const env = (locals as Record<string, any>).runtime?.env
    const apiKey = env?.ANTHROPIC_API_KEY
    if (!apiKey) {
      const lower = message.toLowerCase()
      if (lower.includes('insurance') || lower.includes('accept') || lower.includes('coverage')) return Response.json({ reply: `We accept most major dental insurance plans. Contact us at ${SITE.phone} to verify your specific coverage. No insurance? Ask about our dental savings plan.` })
      if (lower.includes('emergency') || lower.includes('tooth') || lower.includes('pain') || lower.includes('broken')) return Response.json({ reply: `We offer same-day emergency appointments for toothaches, broken teeth, and infections. Call us at ${SITE.phone} and we'll get you in today.` })
      if (lower.includes('kid') || lower.includes('child') || lower.includes('pediatric')) return Response.json({ reply: `Yes! We see kids of all ages. Dr. Patel is great with nervous young patients, and we make dental visits fun with kid-friendly exams, sealants, and fluoride treatments.` })
      if (lower.includes('hour') || lower.includes('open') || lower.includes('when')) return Response.json({ reply: `We're open Mon-Thu 8am-5pm, Fri 8am-2pm, Sat by appointment. Closed Sunday. Book online anytime!` })
      if (lower.includes('aligner') || lower.includes('brace') || lower.includes('straight') || lower.includes('invisalign')) return Response.json({ reply: `Dr. Rivera specializes in clear aligners and orthodontics. We offer free consultations for clear aligner treatment. No metal braces needed — great results for teens and adults.` })
      if (lower.includes('new patient') || lower.includes('first visit') || lower.includes('form')) return Response.json({ reply: `Welcome! You can fill out intake forms online before your visit — saves about 15 minutes. Book your first appointment online and we'll take great care of you.` })
      return Response.json({ reply: `I can help with insurance questions, services, hours, new patient info, or emergencies. What would you like to know?` })
    }
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 256, system: SYSTEM_PROMPT, messages: [{ role: 'user', content: message }] }),
    })
    const data = await response.json() as { content?: { text: string }[] }
    return Response.json({ reply: data.content?.[0]?.text || 'Not sure — call us at ' + SITE.phone })
  } catch { return Response.json({ reply: 'Something went wrong. Call us at ' + SITE.phone }) }
}
