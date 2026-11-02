/**
 * Service request form, ported from legacy-v1/assets/js/main.js.
 * - Pre-selects a service from ?service= in the URL.
 * - Posts to data-endpoint (Formspree) when set; otherwise opens a mailto: link with the
 *   request filled in, addressed to data-mailto.
 * - A9: on success the submit button turns into a drop that fills red and a confirmation
 *   line appears. On error the button shakes once and the error text appears.
 */
import { loadGsap, prefersReducedMotion } from '../lib/motion';

const form = document.querySelector<HTMLFormElement>('[data-request-form]');

if (form) {
  const status = form.querySelector<HTMLElement>('[data-form-status]')!;
  const button = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const row = button.closest<HTMLElement>('.submit-row')!;
  const drop = form.querySelector<SVGSVGElement>('[data-submit-drop]')!;
  const fillRect = drop.querySelector('.submit-fill-rect')!;
  const phone = form.dataset.phone ?? '';
  const mailto = form.dataset.mailto ?? '';
  const animate = !prefersReducedMotion();

  /* ---------- Pre-select from ?service= ---------- */
  const preset = new URLSearchParams(window.location.search).get('service');
  if (preset) {
    form.querySelectorAll<HTMLInputElement>('input[name="services"]').forEach((box) => {
      if (box.value === preset) box.checked = true;
    });
  }

  const setStatus = (message: string, ok: boolean) => {
    status.textContent = message;
    status.className = `form-status ${ok ? 'ok' : 'err'}`;
  };

  /* ---------- Validation ---------- */
  const validate = () => {
    const required = [...form.querySelectorAll<HTMLInputElement>('[required]')];
    let firstBad: HTMLInputElement | undefined;
    for (const el of required) {
      const value = el.value.trim();
      const bad = !value || (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
      el.setAttribute('aria-invalid', String(bad));
      if (bad && !firstBad) firstBad = el;
    }
    if (!firstBad) return true;
    const label = form.querySelector(`label[for="${firstBad.id}"]`);
    const name = label?.childNodes[0]?.textContent?.trim().toLowerCase() ?? 'this field';
    const message =
      firstBad.type === 'email' && firstBad.value.trim()
        ? 'Check the email address to send your request.'
        : `Add ${name} to send your request.`;
    showError(message);
    firstBad.focus();
    return false;
  };

  /* ---------- Request text for the mailto fallback ---------- */
  const collect = () => {
    const data = new FormData(form);
    const services = data.getAll('services');
    const role = data.get('role');
    const lines = [
      `Facility: ${data.get('facility') ?? ''}`,
      `Facility type: ${data.get('facility_type') || 'Not specified'}`,
      `City and state: ${data.get('location') ?? ''}`,
      `Contact: ${data.get('name') ?? ''}${role ? ` (${role})` : ''}`,
      `Email: ${data.get('email') ?? ''}`,
      `Phone: ${data.get('phone') ?? ''}`,
      `Services of interest: ${services.length ? services.join(', ') : 'Not specified'}`,
      `Expected monthly volume: ${data.get('volume') || 'Not specified'}`,
      `Best way to reach me: ${data.get('contact_pref') ?? ''}`,
      '',
      'Notes:',
      String(data.get('message') ?? ''),
    ];
    return { data, text: lines.join('\n') };
  };

  /* ---------- A9 ---------- */
  async function showSuccess(message: string) {
    setStatus(message, true);
    if (!animate) {
      row.classList.add('is-sent');
      return;
    }
    const { gsap } = await loadGsap();
    row.classList.add('is-sent');
    gsap
      .timeline()
      .set(button, { visibility: 'visible' })
      .to(button, { scale: 0.3, opacity: 0, duration: 0.3, ease: 'power2.in', transformOrigin: '24px 50%' })
      .set(button, { visibility: 'hidden' })
      .fromTo(drop, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)', transformOrigin: '50% 60%' }, '-=0.1')
      .fromTo(fillRect, { y: 32 }, { y: 0, duration: 0.6, ease: 'power1.inOut' })
      .fromTo(status, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.2');
  }

  async function showError(message: string) {
    setStatus(message, false);
    if (!animate) return;
    const { gsap } = await loadGsap();
    gsap.fromTo(button, { x: 0 }, { x: 4, duration: 0.06, repeat: 5, yoyo: true, ease: 'sine.inOut', clearProps: 'x' });
  }

  /* ---------- Submit ---------- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const trap = form.querySelector<HTMLInputElement>('input[name="_gotcha"]');
    if (trap?.value) return;
    if (!validate()) return;

    const { data, text } = collect();
    const endpoint = form.dataset.endpoint;

    if (endpoint) {
      button.disabled = true;
      button.textContent = 'Sending request';
      try {
        const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Status ${response.status}`);
        form.reset();
        button.textContent = 'Request sent';
        await showSuccess('Request sent. A DVATE team member will contact you to confirm the details.');
      } catch {
        button.disabled = false;
        button.textContent = 'Send request';
        await showError(`The request did not go through. Call ${phone} or email ${mailto} and we will take it from there.`);
      }
      return;
    }

    const subject = `Service request: ${data.get('facility') || 'New facility'}`;
    window.location.href = `mailto:${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    await showSuccess('Your email app should open with the request filled in. Press send there to reach our team.');
  });
}
