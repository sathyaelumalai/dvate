/**
 * Smooth wheel scrolling with Lenis, synced to GSAP's ticker so scrubbed ScrollTrigger
 * animations move in step with the page. Native scroll stays underneath, so sticky
 * elements, find-in-page and assistive technology keep working. Touch scrolling stays
 * native. Not used with reduced motion or on the Facility Briefing.
 */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { loadGsap } from '../../lib/motion';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export async function initSmooth() {
  if (document.querySelector('[data-deck]')) return;
  const { gsap, ScrollTrigger } = await loadGsap();
  const lenis = new Lenis({ duration: 1.15, anchors: { offset: -96 }, autoRaf: false });
  window.__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
