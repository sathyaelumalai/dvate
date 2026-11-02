/**
 * DVATE services, from Section 3 of the spec (the pamphlet).
 * Home panels, service pages, the header dropdown, the footer and the Briefing all read from here.
 */
import { routes } from '../lib/url';

export interface ServiceItem {
  label: string;
  /** Wellness IV therapy is shown only as the last item on the Infusion page. */
  infusionPageOnly?: boolean;
}

export interface Service {
  key: 'vascular' | 'transfusion' | 'infusion';
  name: string;
  route: string;
  /** One line for the header dropdown. */
  menuLine: string;
  /** One sentence for panels and cards. */
  summary: string;
  items: ServiceItem[];
  cta: string;
  /** Value passed to ?service= on the contact form. Must match a checkbox value there. */
  requestValue: string;
}

export const vascular: Service = {
  key: 'vascular',
  name: 'Vascular access',
  route: routes.vascular,
  menuLine: 'PICC lines, midlines, ultrasound-guided IVs and ports',
  summary: 'Placement, care and removal of the devices your residents depend on.',
  items: [
    { label: 'Ultrasound-guided PICC line, midline and PIV placement' },
    { label: 'Removal of vascular access devices' },
    { label: 'Vascular access consultations' },
    { label: 'Mediport access, de-access and maintenance' },
    { label: 'De-clotting of vascular access devices' },
    { label: 'Dressing changes' },
    { label: 'Blood draws' },
  ],
  cta: 'Request a placement',
  requestValue: 'PICC line',
};

export const transfusion: Service = {
  key: 'transfusion',
  name: 'Transfusion',
  route: routes.transfusion,
  menuLine: 'Non-emergent blood and blood component transfusions',
  summary:
    'Non-emergent blood and blood component transfusions, performed at the bedside by trained infusion nurses.',
  items: [
    { label: 'Non-emergent blood transfusions' },
    { label: 'Non-emergent blood component transfusions' },
    { label: 'Performed at the bedside by trained infusion nurses' },
  ],
  cta: 'Request transfusion service',
  requestValue: 'Transfusion',
};

export const infusion: Service = {
  key: 'infusion',
  name: 'Advanced infusion therapies',
  route: routes.infusion,
  menuLine: 'IV antibiotics, iron, IVIG and SCIG, hydration and more',
  summary:
    'Delivered in coordination with your care team to support recovery and chronic management.',
  items: [
    { label: 'IV antibiotics and antivirals' },
    { label: 'Iron infusions' },
    { label: 'IVIG/SCIG therapy' },
    { label: 'Hydration and electrolyte support' },
    { label: 'Anti-inflammatory and steroid infusions' },
    { label: 'Wellness IV therapy', infusionPageOnly: true },
  ],
  cta: 'Request infusion service',
  requestValue: 'Infusion therapy',
};

export const services: Service[] = [vascular, transfusion, infusion];

/** Items safe to show outside the Infusion page (drops Wellness IV therapy). */
export function publicItems(service: Service): ServiceItem[] {
  return service.items.filter((item) => !item.infusionPageOnly);
}
