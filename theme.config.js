/* teambeam.in — site & brand config (content/meta).
 * Design tokens (fonts, colours) live in assets/styles.css :root — one place to re-tune the look.
 * To enable click-to-call, set `phone` to your real number (leave '' to hide it). */
module.exports = {
  name: 'TeamBeam Outings',
  origin: 'https://teambeam.in',
  market: 'India & worldwide',
  tagline: 'We build teams. And we prove it.',
  email: 'start@teambeam.in',
  phone: '+91 75175 00777', // rendered as a tel: link
  address: 'Futura, Magarpatta Rd, Kirtane Baugh, Magarpatta, Hadapsar, Pune 411013',
  mapsUrl: 'https://maps.app.goo.gl/iPyeNsoan3SgJ3H87',
  geo: { lat: 18.5201, lng: 73.9320, region: 'IN-MH', place: 'Pune, Maharashtra' },
  twitter: '@teambeamoutings',
  homes: { in: 'https://teambeam.in', us: 'https://teambeam.us', blog: 'https://teambeam.blog' },
  social: {
    LinkedIn: 'https://www.linkedin.com/company/teambeam',
    Instagram: 'https://www.instagram.com/teambeamoutings',
    X: 'https://x.com/teambeamoutings',
    YouTube: 'https://www.youtube.com/@teambeamoutings',
    Facebook: 'https://www.facebook.com/teambeamoutings'
  },
  // India destinations shown in footer + home teaser (expanded in later batches)
  destinations: ['Lonavala','Goa','Coorg','Udaipur','Rishikesh','Kabini','Jaipur','Munnar','Alibaug','Shimla & Manali','Mahabaleshwar','Jim Corbett']
};
