/**
 * 24 x 24 line icons (inner SVG markup). Render inside an <svg viewBox="0 0 24 24">
 * with fill="none" stroke="currentColor" stroke-width="1.6" and round caps and joins.
 */

export const serviceIcons: Record<'vascular' | 'transfusion' | 'infusion', string> = {
  // Catheter line with hub
  vascular:
    '<path d="M4 20c3.5 0 5.5-2.2 6.6-5.4S13.8 8 18 7"/><path d="m17.3 5 2.2-2.2 2.4 2.4-2.2 2.2z"/><circle cx="4" cy="20" r="1.3"/>',
  // Blood drop
  transfusion: '<path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/><path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.4"/>',
  // IV bag
  infusion: '<path d="M8 3h8v9.5a4 4 0 0 1-8 0z"/><path d="M12 16.5V21"/><path d="M8 7.5h8"/><path d="M10.5 21h3"/>',
};

/** One per facility type, in the order of facilityTypes in details.ts. */
export const facilityIcons: string[] = [
  // Skilled nursing and long-term care: building with a cross
  '<path d="M4 21V7l8-4 8 4v14"/><path d="M2.5 21h19"/><path d="M12 8.5v5M9.5 11h5"/><path d="M10 21v-4h4v4"/>',
  // Assisted living and memory care: house with a heart
  '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M12 17.2s-3-1.8-3-4a1.7 1.7 0 0 1 3-1.1 1.7 1.7 0 0 1 3 1.1c0 2.2-3 4-3 4z"/>',
  // Long-term acute care and inpatient rehab: bed
  '<path d="M3 19V6"/><path d="M3 15h18v4"/><path d="M21 15v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11.5" r="2"/>',
  // Home health and hospice: bag with a cross
  '<rect x="3.5" y="7.5" width="17" height="12.5" rx="2.5"/><path d="M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7"/><path d="M12 11v5M9.5 13.5h5"/>',
  // Physician groups and clinics: stethoscope
  '<path d="M6 3.5v5a4 4 0 0 0 8 0v-5"/><path d="M10 12.5v2a5 5 0 0 0 10 0V13"/><circle cx="20" cy="11" r="2"/>',
];

/** Vascular access services, in the order of vascularDetails in details.ts. */
export const vascularIcons: string[] = [
  // PICC lines
  '<path d="M4 20c3.5 0 5.5-2.2 6.6-5.4S13.8 8 18 7"/><path d="m17.3 5 2.2-2.2 2.4 2.4-2.2 2.2z"/><circle cx="4" cy="20" r="1.3"/>',
  // Midline catheters
  '<path d="M5 19 15 9"/><path d="m13.5 6.5 4 4"/><path d="m16.3 3.7 4 4"/><circle cx="5" cy="19" r="1.3"/>',
  // Ultrasound-guided peripheral IVs: probe with waves
  '<path d="M8 3h8v6a4 4 0 0 1-8 0z"/><path d="M12 13v2"/><path d="M7 18.5a7 7 0 0 0 10 0"/><path d="M4.5 21a10.5 10.5 0 0 0 15 0"/>',
  // Mediport access: port
  '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.6"/><path d="M19 12h3"/>',
  // De-clotting: flow restored
  '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.6"/><path d="M20 3.8v4.8h-4.8"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.4"/><path d="M4 20.2v-4.8h4.8"/>',
  // Dressing changes: bandage
  '<rect x="2.6" y="8.5" width="18.8" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M10.6 10.6h.01M13.4 13.4h.01M13.4 10.6h.01M10.6 13.4h.01"/>',
  // Removal
  '<path d="M4.5 19.5 13 11"/><path d="M14 4h6v6"/><path d="m20 4-6.5 6.5"/>',
  // Blood draws: sample tube
  '<path d="M8.5 3h7"/><path d="M10 3v14.5a2 2 0 0 0 4 0V3"/><path d="M10 12h4"/>',
  // Consultations
  '<path d="M4 5h16v11H9.5L4 20z"/><path d="M8.5 9.5h7M8.5 12.5h4.5"/>',
];

/** Infusion therapies, in the order of infusionDetails in details.ts. */
export const infusionIcons: string[] = [
  // IV antibiotics and antivirals: capsule
  '<rect x="2.6" y="8.5" width="18.8" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="m9.5 9.5 5 5"/>',
  // Iron infusions: drop with a plus
  '<path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/><path d="M12 11.5v5M9.5 14h5"/>',
  // IVIG/SCIG: shield with a check
  '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  // Hydration and electrolytes: waves
  '<path d="M3 8.5c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0"/><path d="M3 13c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0"/><path d="M3 17.5c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0"/>',
  // Anti-inflammatory and steroid infusions: syringe
  '<path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 9 19l-4-4L15 5z"/><path d="m5 19-3 3"/><path d="m11 11 2 2"/>',
  // Wellness IV therapy: leaf
  '<path d="M5 19c0-8.5 6-14 15-14 0 9-6 15-14.5 15"/><path d="M5 19 13 11"/>',
];

/** Transfusion sequence steps. */
export const transfusionStepIcons: string[] = [
  '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4"/>',
  '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4"/><path d="M14.5 10h4M14.5 13h3"/>',
  '<path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/><path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.4"/>',
  '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="m9 14 2 2 4-4"/>',
];

/** Education program steps, in the order of educationSteps in content.ts. */
export const educationStepIcons: string[] = [
  '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M10 10a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2v.5"/><path d="M12 17h.01"/>',
  '<rect x="3" y="4.5" width="18" height="12.5" rx="2.5"/><path d="m10.5 8.5 4 2.3-4 2.3z"/><path d="M8 20.5h8"/>',
  '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m8.5 10 1.3 1.3 2.2-2.3"/><path d="M13.5 10.2h2"/><path d="m8.5 15 1.3 1.3 2.2-2.3"/><path d="M13.5 15.2h2"/>',
  '<circle cx="12" cy="9" r="5.5"/><path d="m9 13.8-1.5 7.2 4.5-2.4 4.5 2.4-1.5-7.2"/>',
];

/** Online and on-site, keyed like learningModes in content.ts. */
export const learningModeIcons: Record<string, string> = {
  online:
    '<rect x="3" y="4" width="18" height="12.5" rx="2.5"/><circle cx="12" cy="9" r="2.2"/><path d="M8.5 14c.7-1.4 2-2.1 3.5-2.1s2.8.7 3.5 2.1"/><path d="M8 20.5h8M12 16.5v4"/>',
  onsite: '<path d="M4 21V7l8-4 8 4v14"/><path d="M2.5 21h19"/><path d="M12 8.5v5M9.5 11h5"/>',
};

/** Course formats, in the order of courseFormats in content.ts. */
export const courseFormatIcons: string[] = [
  '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.9-3.6 3.6-5.6 7-5.6s6.1 2 7 5.6"/>',
  '<circle cx="9" cy="8.5" r="3"/><path d="M3 19.5c.7-3 3-4.8 6-4.8s5.3 1.8 6 4.8"/><circle cx="16.5" cy="7.5" r="2.5"/><path d="M16 12.6c2.6 0 4.5 1.6 5 4.2"/>',
  '<path d="M4 21V7l8-4 8 4v14"/><path d="M2.5 21h19"/><path d="M12 8.5v5M9.5 11h5"/>',
  '<rect x="4" y="3" width="10" height="18" rx="1"/><path d="M14 9h5v12h-5"/><path d="M7 7h4M7 10.5h4M7 14h4"/><path d="M8 21v-3h2v3"/>',
];

/** Education topics, in the order of educationTopics in content.ts. */
export const topicIcons: string[] = [
  '<circle cx="12" cy="9" r="5.5"/><path d="m9.8 9 1.6 1.6 3-3"/><path d="m9 13.8-1.5 7.2 4.5-2.4 4.5 2.4-1.5-7.2"/>',
  '<path d="M8 3h8v9.5a4 4 0 0 1-8 0z"/><path d="M12 16.5V21"/><path d="M8 7.5h8"/>',
  '<path d="M4 20c3.5 0 5.5-2.2 6.6-5.4S13.8 8 18 7"/><path d="m17.3 5 2.2-2.2 2.4 2.4-2.2 2.2z"/>',
  '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 11.5h6M9 14.5h6M9 17.5h4"/>',
  '<path d="M7 3h10v9a5 5 0 0 1-10 0z"/><path d="M12 17v4"/><path d="M12 6.5s-2 2.3-2 3.6a2 2 0 0 0 4 0c0-1.3-2-3.6-2-3.6z"/>',
  '<rect x="2.6" y="8.5" width="18.8" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M10.6 10.6h.01M13.4 13.4h.01M13.4 10.6h.01M10.6 13.4h.01"/>',
  '<path d="M12 3 5 6v5.5c0 4.4 3 7.9 7 9.5 4-1.6 7-5.1 7-9.5V6z"/><path d="M12 9v6M9 12h6"/>',
  '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="m9 14 2 2 4-4"/>',
  '<path d="M16.5 8.5 8.5 16.5 5.5 13.5 13.5 5.5z"/><path d="m12.5 4.5 5 5"/><path d="M15 7l3.5-3.5"/><path d="m17 2 3 3"/><path d="m7 15-4 4"/><path d="m11 8 1.5 1.5M9 10l1.5 1.5"/>',
  '<path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7.4 4.5 4.5 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/><path d="M7.5 12.5h2.5l1.2-2 1.6 4 1.2-2h2.5"/>',
  '<path d="M9 3h6"/><path d="M10 3v14a2 2 0 0 0 4 0V3"/><path d="M10 11h4"/>',
  '<path d="M12 3s-4 4.7-4 7.4a4 4 0 0 0 8 0C16 7.7 12 3 12 3z"/><path d="M3 17c3 0 3-1.5 6-1.5s3 1.5 6 1.5 3-1.5 6-1.5"/><path d="M3 20.5h18"/>',
];
