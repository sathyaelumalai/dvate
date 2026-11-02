/**
 * Motion helpers. GSAP is loaded only on pages that use it, and only when the visitor
 * has not asked for reduced motion. With reduced motion, nothing here runs and the
 * markup shows every final state.
 */
import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let cached: Promise<{ gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType }> | null = null;

export function loadGsap() {
  cached ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    },
  );
  return cached;
}

/**
 * Tells the head script that motion code arrived. Without this signal the head script
 * removes .motion-ok after a few seconds so nothing stays stuck in its start state.
 */
export function markMotionReady(): void {
  document.documentElement.dataset.motion = 'ready';
}

/** Runs a motion module unless reduced motion is on. */
export function runMotion(init: () => void | Promise<void>): void {
  if (prefersReducedMotion()) return;
  Promise.resolve(init())
    .then(markMotionReady)
    .catch(() => document.documentElement.classList.remove('motion-ok'));
}
