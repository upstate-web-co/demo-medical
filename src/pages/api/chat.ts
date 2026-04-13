import type { APIContext } from 'astro'
import { SITE, SERVICES, PROVIDERS, INSURANCE_NOTE, HOURS } from '../../lib/config'

const SYSTEM_PROMPT = `You are the AI assistant for ${SITE.name}, a family dental practice in Greenville, SC.

IMPORTANT: This is a fictional demo business created by Upstate Web Co to showcase what a modern dental practice website can do. If asked, clarify this is a portfolio demonstration — not a real dental practice. All provider names, credentials, and details are fictional.

=== SERVICES ===
${SERVICES.map(s => `- ${s.name}: ${s.description}`).join('\n')}

=== PROVIDERS ===
${PROVIDERS.map(p => `- ${p.name} (${p.role}): ${p.bio}`).join('\n')}

=== OFFICE HOURS ===
${Object.entries(HOURS).map(([day, time]) => `- ${day}: ${time}`).join('\n')}

=== INSURANCE & PAYMENT ===
- ${INSURANCE_NOTE}
- Also offer an in-house dental savings plan for uninsured patients — covers 2 cleanings, exams, X-rays, and 15% off all other services.
- Payment plans available for major procedures.
- We do not name specific insurance companies — if patients ask about a specific plan, we direct them to call us to verify.

=== NEW PATIENT INFORMATION ===
- Accepting new patients — both adults and children.
- Online booking available 24/7 at ${SITE.bookingUrl}.
- Digital intake forms can be completed online before your visit — saves about 15 minutes.
- First visit includes: comprehensive exam, X-rays, cleaning, and a personalized treatment plan.
- Our office is modern, comfortable, and designed to put nervous patients at ease.

=== EMERGENCY DENTAL CARE ===
- Same-day emergency appointments available for: toothaches, broken/chipped teeth, lost fillings or crowns, infections/abscesses, and knocked-out teeth.
- Call us at ${SITE.phone} — we'll get you in the same day whenever possible.
- After-hours emergencies: call our main number for the on-call provider.

=== COSMETIC & SPECIALTY SERVICES ===
- Teeth whitening: in-office and take-home options available.
- Veneers: custom porcelain veneers for a complete smile makeover.
- Clear aligners: free consultation with Dr. Rivera. Treatment for teens and adults. No metal braces needed.
- Crowns & bridges: natural-looking restorations for damaged or missing teeth. Same-day crowns available with digital scanning.

=== PEDIATRIC DENTISTRY ===
- Kid-friendly environment with exams, cleanings, sealants, and fluoride treatments.
- Dr. Patel specializes in working with nervous young patients.
- We recommend first dental visit by age 1 or when the first tooth appears.
- Sealants recommended for children ages 6-12 to prevent cavities.

=== LOCATION & CONTACT ===
- Address: ${SITE.address}
- Phone: ${SITE.phone}
- Email: ${SITE.email}
- Online booking: ${SITE.bookingUrl}

=== WHAT YOU CAN DO ===
- Answer questions about services, hours, providers, insurance, new patient process, and emergency care.
- Help visitors understand what to expect at their first visit.
- Describe cosmetic and specialty service options.
- Provide general information about dental health topics.

=== WHAT YOU CANNOT DO ===
- Give medical advice, diagnoses, or treatment recommendations.
- Confirm whether a specific insurance plan is accepted — direct to call ${SITE.phone}.
- Book or cancel appointments directly.
- Prescribe medications or provide clinical guidance.
- Process payments or provide exact procedure costs (varies by patient).

TONE: Be professional, warm, and reassuring — especially for patients who are nervous about dental visits. Keep answers to 2-3 sentences. For specific clinical questions, direct to booking a visit. Never name specific insurance companies.`

export async function POST({ request, locals }: APIContext) {
  try {
    const { message } = await request.json()
    if (!message) return Response.json({ reply: 'How can we help? Ask about services, insurance, hours, new patient info, or booking an appointment!' })
    const env = (locals as Record<string, any>).runtime?.env
    const apiKey = env?.ANTHROPIC_API_KEY
    if (!apiKey) {
      const lower = message.toLowerCase()
      if (lower.includes('insurance') || lower.includes('accept') || lower.includes('coverage') || lower.includes('pay'))
        return Response.json({ reply: `We accept most major dental insurance plans. We also offer an in-house savings plan for uninsured patients — it covers 2 cleanings, exams, X-rays, and 15% off all other services. Call us at ${SITE.phone} to verify your specific coverage.` })
      if (lower.includes('emergency') || lower.includes('pain') || lower.includes('broken') || lower.includes('infection') || lower.includes('abscess') || lower.includes('knocked'))
        return Response.json({ reply: `We offer same-day emergency appointments for toothaches, broken teeth, infections, lost fillings, and knocked-out teeth. Call us right away at ${SITE.phone} and we'll get you in today. After hours, call the same number for our on-call provider.` })
      if (lower.includes('kid') || lower.includes('child') || lower.includes('pediatric') || lower.includes('baby') || lower.includes('son') || lower.includes('daughter'))
        return Response.json({ reply: `We see kids of all ages! Dr. Patel is great with nervous young patients, and we make dental visits fun with kid-friendly exams, sealants, and fluoride treatments. We recommend the first visit by age 1 or when the first tooth appears.` })
      if (lower.includes('hour') || lower.includes('open') || lower.includes('when') || lower.includes('close') || lower.includes('saturday') || lower.includes('sunday') || lower.includes('weekend'))
        return Response.json({ reply: `We're open Mon-Thu 8am-5pm, Fri 8am-2pm, and Saturday by appointment. Closed Sunday. You can book online anytime at ${SITE.bookingUrl}!` })
      if (lower.includes('aligner') || lower.includes('brace') || lower.includes('straight') || lower.includes('invisalign') || lower.includes('orthodon'))
        return Response.json({ reply: `Dr. Rivera specializes in clear aligners and orthodontics for both teens and adults — no metal braces needed. We offer free consultations for clear aligner treatment. Book online or call us to get started!` })
      if (lower.includes('new patient') || lower.includes('first visit') || lower.includes('first time') || lower.includes('form') || lower.includes('intake') || lower.includes('never been'))
        return Response.json({ reply: `Welcome! We're accepting new patients. You can fill out digital intake forms online before your visit — saves about 15 minutes. Your first visit includes a comprehensive exam, X-rays, cleaning, and a personalized treatment plan. Book online at ${SITE.bookingUrl}!` })
      if (lower.includes('whiten') || lower.includes('cosmetic') || lower.includes('veneer') || lower.includes('smile') || lower.includes('bonding'))
        return Response.json({ reply: `We offer a full range of cosmetic services — teeth whitening (in-office and take-home), porcelain veneers, and bonding. Dr. Patel specializes in cosmetic dentistry and can help you achieve the smile you want. Book a consultation to discuss your options!` })
      if (lower.includes('crown') || lower.includes('bridge') || lower.includes('filling') || lower.includes('restor'))
        return Response.json({ reply: `We offer natural-looking crowns, bridges, and fillings to restore damaged or missing teeth. Same-day crowns are available with our digital scanning technology. Dr. Patel has 12 years of experience in restorative dentistry.` })
      if (lower.includes('clean') || lower.includes('exam') || lower.includes('checkup') || lower.includes('x-ray') || lower.includes('routine'))
        return Response.json({ reply: `Routine cleanings and exams are the foundation of good dental health. Sarah Kim, our hygienist with 10 years of experience, is known for thorough, comfortable cleanings. We recommend visits every 6 months. Book online anytime!` })
      if (lower.includes('nervous') || lower.includes('afraid') || lower.includes('anxious') || lower.includes('scar') || lower.includes('fear'))
        return Response.json({ reply: `We completely understand dental anxiety — you're not alone! Dr. Patel is known for her gentle approach and is great with nervous patients. Our office is designed to be comfortable and calming. We'll go at your pace and explain everything before we do it.` })
      if (lower.includes('dr') || lower.includes('doctor') || lower.includes('dentist') || lower.includes('provider') || lower.includes('who'))
        return Response.json({ reply: `Our team includes Dr. Priya Patel (general & cosmetic, 12 years experience), Dr. James Rivera (orthodontics & clear aligners, 8 years), and Sarah Kim (dental hygienist, 10 years). They're all passionate about patient care and making dental visits comfortable.` })
      if (lower.includes('where') || lower.includes('address') || lower.includes('location') || lower.includes('direction') || lower.includes('find'))
        return Response.json({ reply: `We're located at ${SITE.address}. Easy parking available. You can also reach us at ${SITE.phone} or ${SITE.email}. Book your visit online anytime!` })
      if (lower.includes('demo') || lower.includes('real') || lower.includes('fake') || lower.includes('portfolio') || lower.includes('upstate'))
        return Response.json({ reply: `Great question! This is a fictional demo dental practice created by Upstate Web Co to showcase what a modern dental website can do. All provider names and credentials are fictional — but the website technology is very real!` })
      if (lower.includes('saving') || lower.includes('no insurance') || lower.includes('uninsured') || lower.includes('plan'))
        return Response.json({ reply: `No insurance? Our in-house dental savings plan covers 2 cleanings per year, exams, X-rays, and gives you 15% off all other services. Payment plans are also available for major procedures. Call us at ${SITE.phone} for details!` })
      return Response.json({ reply: `I can help with insurance questions, services, hours, new patient info, our providers, or emergency care. What would you like to know?` })
    }
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 256, system: SYSTEM_PROMPT, messages: [{ role: 'user', content: message }] }),
    })
    const data = await response.json() as { content?: { text: string }[] }
    return Response.json({ reply: data.content?.[0]?.text || 'Not sure about that one — call us at ' + SITE.phone + ' and we\'ll help!' })
  } catch { return Response.json({ reply: 'Something went wrong. Call us at ' + SITE.phone }) }
}
