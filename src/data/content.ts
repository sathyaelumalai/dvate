/**
 * Shared copy that appears on more than one page. Every claim here traces to
 * Section 3 of the spec. If a sentence needs a fact that is not there, cut it.
 */

export const promise = ['No transport.', 'No disruption.', 'No exposure.'];

export const mission =
  'To DVATE from the ordinary and be the leading force in setting new standards in vascular access, transfusion and education: ensuring every patient receives the right access, the right way, the first time.';

export const missionLine = 'Every patient receives the right access, the right way, the first time.';

export const vision =
  'To revolutionize vascular access, expand the boundaries of transfusion care and empower nurses through advanced education, so that DVATE-ing from the ordinary becomes the new standard in patient care.';

export const culture = [
  'We innovate with precision, where every action is intentional and clinically excellent. Our culture is built on mastery, accuracy and a relentless commitment to continuous improvement.',
  'Because excellence is our standard.',
];

export const values = [
  {
    title: 'Excellence',
    text: 'Every action is deliberate and rooted in a commitment to doing things right the first time.',
  },
  { title: 'Mastery', text: 'We pursue deep expertise. Growth is our default setting.' },
  {
    title: 'Improvement',
    text: 'We embrace feedback, challenge assumptions and evolve constantly, because progress is a habit.',
  },
  {
    title: 'Integrity',
    text: 'We show up with honesty, accountability and respect for our patients, our peers and ourselves.',
  },
  {
    title: 'Collaboration',
    text: 'The best outcomes come from diverse minds working together with shared goals and mutual trust.',
  },
  {
    title: 'Transparency',
    text: 'We communicate openly, share information freely and make decisions with clarity.',
  },
];

/** "What DVATE removes" (home 6.4). */
export const removes = [
  {
    title: 'Transport costs',
    text: 'Procedures are done at your facility, so there is no ambulance or wheelchair van to book.',
  },
  {
    title: 'Hospital infections',
    text: 'Residents who stay in the building are not exposed to emergency rooms and hospital floors.',
  },
  {
    title: 'Patient anxiety',
    text: "Care happens in the comfort of the resident's own bed.",
  },
  {
    title: 'Vascular complications',
    text: 'We use only the highest quality catheters and place lines under ultrasound guidance.',
  },
  {
    title: 'The high cost of transfusions',
    text: 'Transfusions happen at your facility, where they cost less than in a hospital.',
  },
  {
    title: 'CMS penalties',
    text: 'Fewer hospital admissions help protect your facility from CMS penalties.',
  },
];

export interface Step {
  title: string;
  text: string;
}

/** How a DVATE visit works (home 6.5, Briefing screen 8). */
export const visitSteps: Step[] = [
  {
    title: 'Send the order.',
    text: 'Call, email or use the request form. Share the physician order and what the resident needs.',
  },
  {
    title: 'We confirm and schedule.',
    text: 'Our clinical team reviews the order, confirms the right device or therapy and sets a visit time with your staff.',
  },
  {
    title: 'A DVATE nurse comes to the bedside.',
    text: "The nurse arrives with ultrasound and supplies and performs the procedure in the resident's room.",
  },
  {
    title: 'Hand-off to your team.',
    text: 'We document the procedure for your chart and walk your nurses through care and maintenance.',
  },
];

/** Transfusion page sequence (from v1). */
export const transfusionSteps: Step[] = [
  {
    title: 'Order and preparation.',
    text: "We confirm the physician order, the blood product and the resident's pre-transfusion labs with your team.",
  },
  {
    title: 'Checks at the bedside.',
    text: "The nurse verifies the resident's identity and the blood product at the bedside before starting.",
  },
  {
    title: 'The transfusion.',
    text: "A trained infusion nurse performs the transfusion in the resident's own bed.",
  },
  {
    title: 'Records and hand-off.',
    text: 'We document the transfusion for your chart and brief your nurses on what to watch for.',
  },
];

/* Education program (from DVATE_Education.docx, November 2026). */

/** The two ways to learn. */
export const learningModes = [
  {
    key: 'online',
    title: 'Online',
    points: ['Learn with a live instructor through video instruction.', 'Questions answered on the spot.'],
  },
  {
    key: 'onsite',
    title: 'On-site',
    points: [
      'We bring our expertise directly to your facility, offering your team a comprehensive learning experience.',
      'Our program combines engaging classroom instruction with practical, hands-on training tailored to your operations.',
    ],
  },
];

/** Course topics. */
export const educationTopics = [
  'IV Certification',
  'Infusion Therapy',
  'PIV Insertion',
  'Vascular Access Documentation',
  'IV Nutrition: TPN',
  'Care and Maintenance of Vascular Access Devices',
  'CVC/Port Sterile Dressing Change',
  'CVC Removal Certification',
  'Medication Administration via Vascular Access',
  'Medication Infusion for CHF, Fluid Overload and Hydration',
  'CVC Blood Collection',
  'Hypodermoclysis Therapy',
];

/** Who the course structure is set up for. */
export const courseFormats = ['Individual', 'Group', 'Facility', 'Corporation'];

/** From the first assessment to the certificate. */
export const educationSteps: Step[] = [
  { title: 'Pre-test.', text: 'We start with a pre-test, as required.' },
  {
    title: 'Learn online or on-site.',
    text: 'A live instructor teaches by video, or we come to your facility for classroom and hands-on training.',
  },
  { title: 'Post-test and competency checklists.', text: 'Post-tests and competency checklists, as required.' },
  { title: 'Competency certificate.', text: 'Earn a competency certificate upon successful completion.' },
];

/** The old way vs the DVATE way (home 6.3, Briefing screen 3). */
export const oldWay = [
  'Book an ambulance.',
  'Wait for transport.',
  'Wait in the emergency department or infusion center.',
  'The transfusion.',
  'Ride back to the facility.',
  'Watch for a readmission.',
];
export const dvateWay = 'A DVATE nurse comes to the bedside.';

/** Home page "Who we serve" rows (copy from legacy-v1/index.html). */
export const homeFacilityRows = [
  {
    title: 'Skilled nursing and long-term care',
    text: 'PICC and midline placement, transfusions and IV therapy without sending residents out.',
  },
  {
    title: 'Assisted living and memory care',
    text: 'Ultrasound-guided IVs, hydration and blood draws in a calm, familiar room.',
  },
  {
    title: 'Long-term acute care and rehab',
    text: 'Backup for difficult access and device problems when your team needs it.',
  },
  {
    title: 'Home health, hospice and physician groups',
    text: 'A bedside partner for the orders your patients need between office and hospital.',
  },
];
