export const SITE = {
  name: 'Greenville Family Dental',
  tagline: 'Modern dentistry for every smile',
  url: 'https://greenvillefamilydental.com',
  email: 'hello@greenvillefamilydental.com',
  phone: '(864) 555-9120',
  address: '205 E Washington St, Suite 300, Greenville, SC 29601',
  bookingUrl: 'https://greenvillefamilydental.com/book',
} as const

export const PROVIDERS = [
  { name: 'Dr. Priya Patel, DDS', role: 'General & Cosmetic Dentistry', bio: '12 years experience. MUSC graduate. Specializes in restorative and cosmetic dentistry. Gentle approach, great with nervous patients.', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80' },
  { name: 'Dr. James Rivera, DMD', role: 'Orthodontics & Invisalign', bio: '8 years experience. Clemson + MUSC. Invisalign Diamond Provider. Focuses on adult orthodontics and teen braces.', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80' },
  { name: 'Sarah Kim, RDH', role: 'Dental Hygienist', bio: '10 years experience. Known for thorough, comfortable cleanings. Passionate about patient education and preventive care.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
]

export const SERVICES = [
  { name: 'Cleanings & Exams', description: 'Routine cleanings, X-rays, and comprehensive exams. The foundation of good dental health.', icon: '🦷' },
  { name: 'Cosmetic Dentistry', description: 'Whitening, veneers, bonding. Transform your smile with modern cosmetic techniques.', icon: '✨' },
  { name: 'Invisalign', description: 'Clear aligners for straighter teeth. No metal braces. Free consultation available.', icon: '😁' },
  { name: 'Crowns & Bridges', description: 'Restore damaged or missing teeth with natural-looking crowns and bridges.', icon: '🔧' },
  { name: 'Emergency Care', description: 'Same-day appointments for dental emergencies. Toothaches, broken teeth, infections.', icon: '🚨' },
  { name: 'Pediatric Dentistry', description: 'Kid-friendly exams, cleanings, sealants, and fluoride. We make dental visits fun.', icon: '👶' },
]

export const INSURANCE = ['Delta Dental', 'Cigna', 'MetLife', 'Aetna', 'BlueCross BlueShield', 'United Healthcare', 'Humana', 'Guardian']

export const WHAT_TO_EXPECT = [
  { step: '1', title: 'Book Online', description: 'Pick a time that works. Confirmation is instant. Evening and Saturday slots available.' },
  { step: '2', title: 'Complete Paperwork', description: 'Fill out forms online before your visit. Save 15 minutes in the waiting room.' },
  { step: '3', title: 'Your Visit', description: 'Meet your provider, get a thorough exam, and leave with a clear plan for your smile.' },
]

export const HOURS = {
  'Mon–Thu': '8am – 5pm',
  'Fri': '8am – 2pm',
  'Sat': 'By appointment',
  'Sun': 'Closed',
}
