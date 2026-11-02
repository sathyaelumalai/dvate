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
