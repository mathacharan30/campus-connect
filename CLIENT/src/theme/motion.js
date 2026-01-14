/* Global GSAP motion system for premium dark SaaS feel
   - Parallax background layers
   - Fade + translate on entry
   - Hover glow intensification
   - Subtle floating for cards
   Respects prefers-reduced-motion
*/

// This file requires the 'gsap' package. Install with: npm install gsap

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let bgParallaxInitialized = false;

export function initGlobalMotion(pathname = '/') {
  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) return; // honor user preference

  // Avoid duplicating listeners/timelines across route changes
  ScrollTrigger.getAll().forEach((t) => t.kill());

  if (!bgParallaxInitialized) {
    setupBackgroundParallax();
    bgParallaxInitialized = true;
  }

  // Entry animations: fade + slight up-translate
  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    gsap.set(el, { autoAlpha: 0, y: 16 });
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  // Floating illusion for cards (very subtle)
  gsap.utils.toArray('[data-float]').forEach((el) => {
    gsap.to(el, {
      y: -3,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });

  // Hover glow intensification for interactive elements
  gsap.utils.toArray('[data-glow]').forEach((el) => {
    const hover = gsap.to(el, {
      boxShadow: '0 0 30px rgba(14,165,233,0.50), 0 0 60px rgba(14,165,233,0.20)',
      duration: 0.25,
      paused: true,
      ease: 'power1.out',
    });
    el.addEventListener('mouseenter', () => hover.play());
    el.addEventListener('mouseleave', () => hover.reverse());
  });

  // Gentle lift on button hover
  gsap.utils.toArray('button, .btn, [role="button"]').forEach((el) => {
    el.addEventListener('mouseenter', () => gsap.to(el, { y: -1, duration: 0.2, ease: 'power1.out' }));
    el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, duration: 0.2, ease: 'power1.out' }));
  });
}

function setupBackgroundParallax() {
  const container = document.getElementById('bg-layers');
  if (!container) return;

  const layers = gsap.utils.toArray('#bg-layers .layer');
  layers.forEach((layer, index) => {
    const depth = (index + 1) * 0.08; // slower for deeper layers
    gsap.to(layer, {
      y: () => window.innerHeight * depth,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  });
}
