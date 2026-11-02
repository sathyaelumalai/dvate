/**
 * Detail copy for the service pages, carried over from legacy-v1 and checked against
 * Section 3 of the spec. Outcome claims that Section 3 does not support were removed.
 */

export interface Detail {
  title: string;
  /** Typical use, one line. */
  use: string;
  text: string;
  /** Marks the item that is shown last and quieter (Wellness IV therapy). */
  quiet?: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

/* ---------- Vascular access ---------- */

export const vascularDetails: Detail[] = [
  {
    title: 'Ultrasound-guided PICC lines',
    use: 'For IV therapy that will run for weeks or longer',
    text: 'A peripherally inserted central catheter (PICC) is placed in an upper-arm vein and threaded so its tip sits near the heart. It carries therapies that run too long, or are too harsh, for a standard IV.',
  },
  {
    title: 'Midline catheters',
    use: 'For therapy expected to last days to a few weeks',
    text: 'A midline is a longer peripheral catheter placed in the upper arm, with its tip below the armpit. It lasts longer than a standard IV and spares residents repeat sticks.',
  },
  {
    title: 'Ultrasound-guided peripheral IVs',
    use: 'For residents with difficult venous access',
    text: 'When a vein is hard to find, ultrasound shows the nurse the vein the eye cannot see. The IV is placed in the resident’s room.',
  },
  {
    title: 'Mediport access, de-access and maintenance',
    use: 'For residents with implanted ports',
    text: 'We access implanted ports with a non-coring needle, de-access them when therapy ends and keep them maintained between uses.',
  },
  {
    title: 'De-clotting of vascular access devices',
    use: 'When a line stops flushing or drawing',
    text: 'An occluded catheter does not always need to be replaced. Per physician order, we work to restore patency so the resident can keep the line they already have.',
  },
  {
    title: 'Dressing changes',
    use: 'On schedule, and when a dressing is loose or soiled',
    text: 'Clean, intact dressings protect central and midline catheters. DVATE nurses change dressings and check the site.',
  },
  {
    title: 'Removal of vascular access devices',
    use: 'When therapy is complete',
    text: 'We remove PICC lines, midlines and other devices when the order ends and document the removal for your chart.',
  },
  {
    title: 'Blood draws',
    use: 'For labs that are hard to collect',
    text: 'We draw blood from existing devices or by venipuncture, which helps when residents have difficult veins.',
  },
  {
    title: 'Vascular access consultations',
    use: 'Before you place, and when something is not working',
    text: 'Choosing the right device the first time spares residents repeat procedures. Our nurses look at the therapy, its length and the resident’s veins and recommend the device that fits.',
  },
];

export const vascularFaqs: Faq[] = [
  {
    q: 'Do you need a physician order?',
    a: 'Yes. Send the physician order with your request. Our clinical team reviews every order and confirms the right device before the visit.',
  },
  {
    q: 'Who maintains the line after you leave?',
    a: 'Your nursing staff handle routine care, and we walk them through it at hand-off. DVATE also provides dressing changes, de-clotting and removal.',
  },
  {
    q: 'Do you work with residents who have very difficult veins?',
    a: 'Yes. Ultrasound-guided placement is how we approach difficult access.',
  },
];

/* ---------- Device Map (A8) ---------- */

export interface Device {
  key: 'piv' | 'midline' | 'picc' | 'port';
  name: string;
  what: string;
  use: string;
  services: string[];
}

export const devices: Device[] = [
  {
    key: 'piv',
    name: 'Peripheral IV',
    what: 'A short catheter placed in a vein in the forearm.',
    use: 'For short-term therapy, and for residents with difficult venous access when placed under ultrasound.',
    services: ['Ultrasound-guided PIV placement', 'Blood draws', 'Removal of vascular access devices'],
  },
  {
    key: 'midline',
    name: 'Midline',
    what: 'A longer peripheral catheter placed in the upper arm, with its tip below the armpit.',
    use: 'For therapy expected to last days to a few weeks.',
    services: ['Ultrasound-guided midline placement', 'Dressing changes', 'Removal of vascular access devices'],
  },
  {
    key: 'picc',
    name: 'PICC',
    what: 'A peripherally inserted central catheter, placed in an upper-arm vein and threaded so its tip sits near the heart.',
    use: 'For IV therapy that will run for weeks or longer.',
    services: [
      'Ultrasound-guided PICC placement',
      'Dressing changes',
      'De-clotting of vascular access devices',
      'Removal of vascular access devices',
    ],
  },
  {
    key: 'port',
    name: 'Port',
    what: 'An implanted port sits under the skin of the upper chest, with a catheter that runs to a large vein near the heart.',
    use: 'For residents who already have an implanted port.',
    services: [
      'Mediport access, de-access and maintenance',
      'De-clotting of vascular access devices',
      'Blood draws',
    ],
  },
];

/* ---------- Transfusion ---------- */

export const transfusionFit = [
  'Residents whose physician has ordered a non-emergent transfusion',
  'Residents with chronic anemia who need scheduled transfusions',
  'Facilities that want fewer hospital transfers',
];

export const transfusionFaqs: Faq[] = [
  {
    q: 'Who performs the transfusion?',
    a: 'Trained DVATE infusion nurses perform every transfusion at the bedside.',
  },
  {
    q: 'Do we need IV access first?',
    a: 'The resident needs suitable vascular access. If they do not have it, DVATE can place an ultrasound-guided IV or other device.',
  },
  {
    q: 'Which blood products do you transfuse?',
    a: 'We perform non-emergent transfusions of blood and blood components as ordered by the resident’s physician. Contact our clinical team to talk through a specific order.',
  },
];

/* ---------- Infusion therapies ---------- */

export const infusionDetails: Detail[] = [
  {
    title: 'IV antibiotics and antivirals',
    use: 'For infections that need IV treatment',
    text: 'Many residents finishing a course of IV antibiotics can complete it where they live. We start and manage the infusion and the access device that carries it.',
  },
  {
    title: 'Iron infusions',
    use: 'For iron-deficiency anemia',
    text: 'Iron infusions restore iron for residents who cannot absorb or tolerate oral iron. Our nurses give the infusion at the bedside.',
  },
  {
    title: 'IVIG/SCIG therapy',
    use: 'For immune deficiencies and certain neurologic and autoimmune conditions',
    text: 'Immune globulin can be given intravenously (IVIG) or under the skin (SCIG). Our infusion nurses give it in the resident’s room.',
  },
  {
    title: 'Hydration and electrolyte support',
    use: 'For dehydration and electrolyte imbalance',
    text: 'We place access and run fluids and electrolyte replacement as ordered.',
  },
  {
    title: 'Anti-inflammatory and steroid infusions',
    use: 'For inflammatory conditions and flares',
    text: 'Some conditions call for IV steroids or other anti-inflammatory medications. We give them in the resident’s room under the physician’s order.',
  },
  {
    title: 'Wellness IV therapy',
    use: 'Hydration and vitamin infusions',
    text: 'Hydration and vitamin infusions given by DVATE nurses, where appropriate and ordered.',
    quiet: true,
  },
];

export const infusionCoordination = [
  'The order, the medication and the schedule',
  'The right access device for the length of therapy',
  'Documentation and hand-off to your nursing staff',
];

/* ---------- Who we serve ---------- */

export interface FacilityType {
  title: string;
  line: string;
  text: string;
  services: string[];
}

export const facilityTypes: FacilityType[] = [
  {
    title: 'Skilled nursing and long-term care',
    line: 'Keep residents in-house for lines, blood and IV therapy',
    text: 'Each transfer out for a PICC, a transfusion or an IV start costs money and exposes residents to the hospital. DVATE brings those procedures to the resident’s room.',
    services: [
      'PICC, midline and ultrasound-guided IV placement',
      'Non-emergent bedside transfusions',
      'IV antibiotics, hydration and iron infusions',
      'Staff education through IV Mastery and on-site training',
    ],
  },
  {
    title: 'Assisted living and memory care',
    line: 'In-room care for residents who struggle with change',
    text: 'For residents with dementia, a trip to the hospital can be frightening. A DVATE nurse can place an IV, run hydration or draw labs in the resident’s own room.',
    services: [
      'Ultrasound-guided IVs and blood draws',
      'Hydration and electrolyte support',
      'Consultations on the right device for each resident',
    ],
  },
  {
    title: 'Long-term acute care and inpatient rehab',
    line: 'Backup for difficult access and device problems',
    text: 'Your patients often arrive with central lines and complex IV regimens. DVATE supports your team with difficult placements, de-clotting, dressing changes and removals.',
    services: [
      'Ultrasound-guided placement for difficult access',
      'De-clotting, dressing changes and removals',
      'Mediport access, de-access and maintenance',
    ],
  },
  {
    title: 'Home health and hospice agencies',
    line: 'A bedside partner for your patients’ orders',
    text: 'When a patient needs a line, a transfusion or an infusion that your field staff do not provide, DVATE can be your bedside partner.',
    services: ['PICC and midline placement', 'Infusion therapy and blood draws', 'Coordination with the ordering provider'],
  },
  {
    title: 'Physician groups and clinics',
    line: 'Get your patients’ orders carried out at the bedside',
    text: 'Physicians and nurse practitioners who round in long-term care can send orders straight to DVATE, so a needed transfusion or infusion happens at the bedside.',
    services: ['Transfusion and infusion therapy', 'Vascular access consultations', 'Documentation back to the ordering provider'],
  },
];
