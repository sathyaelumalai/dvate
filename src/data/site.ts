/**
 * DVATE site settings: contact details, content flags and proof content.
 * Change a phone number, email or flag here and it updates on every page.
 * Contact details confirmed by DVATE in November 2026.
 */

export interface Director {
  /** Short name used in the header, footer and contact lists. */
  name: string;
  /** Name as shown on the About page leadership card. */
  fullName: string;
  title: string;
  /** Short line shown on the Contact page under the title. */
  focus: string;
  email: string;
  /** Display format, for example (512) 791-1388. */
  phone: string;
  /** Path to a headshot under public/, for example 'img/team/amisha.jpg'. Empty shows initials. */
  headshot: string;
  /** About page biography, one string per paragraph. */
  bio: string[];
}

export const directors = {
  amisha: {
    name: 'Amisha Baker',
    fullName: 'Amisha Baker',
    title: 'Founder, CEO, Director of Business Development',
    focus: 'For new facilities, pricing and education',
    email: 'amisha@dvate.org',
    phone: '(512) 791-1388',
    headshot: 'img/team/amisha.jpg',
    bio: [
      'Amisha is a Physician Assistant with over 25 years of experience in Emergency Medicine and Urgent Care. She also has experience in Occupational Medicine, Healthy Weight Management and Substance Abuse Management, using detoxification and tapering protocols.',
      'She is also an RRT and has worked with patients on life support, weaning them off the machine. She is empathetic and compassionate in patient care and loves to see her patients succeed.',
    ],
  },
  mike: {
    name: 'Mike Baker',
    fullName: 'Michael (Mike) Baker',
    title: 'Founder, COO, Director of Clinical Services',
    focus: 'For orders, procedures and clinical questions',
    email: 'mike@dvate.org',
    phone: '(512) 791-1802',
    headshot: 'img/team/mike.jpg',
    bio: [
      'Mike is an RN with over 50 years of experience in Vascular Access. He has been the manager, director and COO of many different hospitals and facilities. His expertise includes emergency medicine, surgery, critical care and organ transplant.',
      'He is a compassionate nurse, nurse educator and leader, and always goes the extra mile to make sure his patients and employees are well taken care of. Mike has many distinguished accomplishments that he is too humble to mention. He is easy going, and you will just have to meet him to learn more.',
    ],
  },
} satisfies Record<string, Director>;

/** The director who receives service requests and is the main call to action. */
export const primaryContact = directors.amisha;

/** Turns a display phone number into a tel: link, for example tel:+15127911388. */
export function telHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, '')}`;
}

export const site = {
  name: 'DVATE',
  fullName: 'Distinguished Vascular Access, Transfusion and Education',
  tagline: 'From the Ordinary.',
  description:
    'DVATE nurses place ultrasound-guided PICC lines, midlines and PIVs, run non-emergent transfusions and deliver infusion therapy at the bedside in your facility.',

  /** Coverage line from the pamphlet. Change here to narrow it later. */
  coverageLine: 'We Service Nationwide!',

  /** Education program facts (from DVATE_Education.docx). */
  educatorExperience: 'over 40 years',

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
