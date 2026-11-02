/**
 * DVATE site settings: contact details, content flags and proof content.
 * Change a phone number, email or flag here and it updates on every page.
 * Contact details are under review, so expect to edit this file.
 */

export interface Director {
  name: string;
  title: string;
  /** Short line shown on the Contact page under the title. */
  focus: string;
  email: string;
  /** Display format, for example (772) 867-4818. */
  phone: string;
  /** Path to a headshot under public/, for example 'img/team/amisha.jpg'. Empty shows initials. */
  headshot: string;
}

export const directors = {
  amisha: {
    name: 'Amisha Baker',
    title: 'Director of Business Development',
    focus: 'For new facilities, pricing and education',
    email: 'amisha.b@mschealthcare.org',
    phone: '(772) 867-4818',
    headshot: '',
  },
  mike: {
    name: 'Mike Baker',
    title: 'Director of Clinical Operations',
    focus: 'For orders, procedures and clinical questions',
    email: 'mike.b@mschealthcare.org',
    phone: '(772) 867-4737',
    headshot: '',
  },
} satisfies Record<string, Director>;

/** The director who receives service requests and is the main call to action. */
export const primaryContact = directors.amisha;

/** Turns a display phone number into a tel: link, for example tel:+17728674818. */
export function telHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, '')}`;
}

export const site = {
  name: 'DVATE',
  fullName: 'Distinguished Vascular Access, Transfusion and Education',
  tagline: 'From the Ordinary.',
  description:
    'DVATE nurses place PICC lines, midlines and ultrasound-guided IVs, run non-emergent transfusions and deliver infusion therapy at the bedside in your facility.',

  /** Coverage line from the pamphlet. Change here to narrow it later. */
  coverageLine: 'We Service Nationwide!',

  /** Shows "43 free CEUs" on the Education page and the home education section. */
  showCeuCount: true,
  ceuCount: 43,
  moduleCount: 17,

  /**
   * Formspree endpoint for the service request form, for example
   * 'https://formspree.io/f/abcdwxyz'. Empty falls back to a mailto: link to primaryContact.
   */
  formEndpoint: '',

  emergencyLine: 'For a medical emergency, call 911.',
  nonEmergentLine: 'DVATE provides scheduled, non-emergent care.',
};

/* ---------------------------------------------------------------
 * Proof content (Section 9 of the spec).
 * Each component renders nothing while its data is empty.
 * Do not add sample content. Add only real, verified items.
 * ------------------------------------------------------------- */

/**
 * Real photo of DVATE nurses, shown in the hero and on the About page.
 * Expected shape: { src: 'img/team/dvate-team.jpg', alt: 'Describe who is in the photo', width: 1600, height: 1067 }
 * Put the file in public/img/team/. Leave src empty to hide the slot.
 */
export const teamPhoto = {
  src: '',
  alt: '',
  width: 0,
  height: 0,
};

/**
 * Certifications and licenses.
 * Expected shape: { label: 'VA-BC', detail: 'Vascular Access Board Certified' }
 */
export const credentials: { label: string; detail?: string }[] = [];

/**
 * Up to four real figures.
 * Expected shape: { value: '1,200', label: 'Lines placed in 2026' }
 */
export const proofNumbers: { value: string; label: string }[] = [];

/**
 * Testimonials from real facility staff, used with permission.
 * Expected shape: { quote: '...', name: 'Jane Doe', title: 'Director of Nursing', facilityType: 'Skilled nursing facility' }
 */
export const testimonials: {
  quote: string;
  name: string;
  title: string;
  facilityType: string;
}[] = [];
