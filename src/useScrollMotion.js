import { useEffect } from 'react';

const revealSelector = [
  '.section-label', '.section-heading > *', '.intro-layout > div:first-child > *',
  '.proof-heading > *', '.proof-grid > div', '.process-grid > article',
  '.featured-trainer', '.page-intro > h1', '.page-intro > p',
  '.catalogue-heading', '.course-row', '.about-statement > *', '.team-card',
  '.approach-step > div', '.benefits-heading > *', '.benefit-card', '.programme-introduction-copy > p',
  '.contact-info > *', '.contact-form > *:not(.honeypot)', '.form-success > *', '.legal-content > *',
  '.footer-cta > *', '.newsletter > div', '.newsletter > form',
  '.footer-links > div', '.footer-accreditation > div',
].join(',');
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function useScrollMotion(route) {
  useEffect(() => {
    const root = document.querySelector('.lumina-site');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stop = () => {};

    const start = () => {
      stop();
      if (preference.matches || !('IntersectionObserver' in window)) return;

      const revealed = new Set();
      let artwork = [];
      let hero;
      let frame = 0;
      let needsMeasure = true;
      let previousTime;
      let heroProgress = 0;
      let heroTarget = 0;
      let panels = [];
      const clearPanel = element => {
        element.style.removeProperty('--pin-top');
        element.style.removeProperty('--panel-layer');
      };
      const measurePanels = () => {
        const heights = panels.map(element => element.offsetHeight);
        panels.forEach((element, index) => {
          // Tall screens scroll fully before their bottom edge pins in place.
          element.style.setProperty('--pin-top', `${Math.min(0, window.innerHeight - heights[index])}px`);
          element.style.setProperty('--panel-layer', index + 1);
        });
      };
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

      const update = time => {
        frame = 0;
        const blend = 1 - Math.exp(-Math.min(time - (previousTime ?? time - 16), 64) / 85);
        previousTime = time;
        if (needsMeasure) {
          // Read layout together before writing the visual offsets.
          heroTarget = hero ? clamp(window.scrollY / hero.offsetHeight, 0, 1) : 0;
          const viewport = window.innerHeight;
          artwork.forEach(item => {
            const rect = item.element.getBoundingClientRect();
            item.target = clamp((viewport / 2 - (rect.top + rect.height / 2)) / viewport, -1, 1);
          });
          needsMeasure = false;
        }
        heroProgress += (heroTarget - heroProgress) * blend;
        let moving = Math.abs(heroTarget - heroProgress) > .001;
        const mobile = window.innerWidth <= 700;
        if (hero) {
          hero.style.setProperty('--hero-shift', `${heroProgress * (mobile ? 65 : 170)}px`);
          hero.style.setProperty('--hero-scale', `${1.02 + heroProgress * .07}`);
          hero.style.setProperty('--hero-copy-shift', `${heroProgress * (mobile ? 20 : 65)}px`);
          hero.style.setProperty('--hero-copy-opacity', `${1 - heroProgress * .55}`);
        }
        artwork.forEach(item => {
          item.current += (item.target - item.current) * blend;
          item.element.style.setProperty('--art-shift', `${item.current * (mobile ? 14 : 42)}px`);
          item.element.style.setProperty('--orbit-turn', `${item.current * 24}deg`);
          moving ||= Math.abs(item.target - item.current) > .001;
        });
        if (moving) frame = requestAnimationFrame(update);
        else previousTime = undefined;
      };
      const schedule = () => {
        needsMeasure = true;
        if (!frame) frame = requestAnimationFrame(update);
      };
      const panelResize = new ResizeObserver(() => { measurePanels(); schedule(); });
      const syncPanels = () => {
        const nextPanels = [...root.querySelectorAll('.home-sections > section, .catalogue-results[data-pin-stack] > .catalogue-group, .approach-sections > section, .contact-sections > section')];
        panels.forEach(element => {
          if (nextPanels.includes(element)) return;
          panelResize.unobserve(element);
          clearPanel(element);
        });
        nextPanels.forEach(element => {
          if (!panels.includes(element)) panelResize.observe(element);
        });
        panels = nextPanels;
        measurePanels();
      };
      const collect = () => {
        syncPanels();
        root.querySelectorAll(revealSelector).forEach(element => {
          if (revealed.has(element)) return;
          revealed.add(element);
          const rect = element.getBoundingClientRect();
          element.classList.add('motion-reveal');
          const siblings = [...element.parentElement.children];
          element.style.setProperty('--reveal-delay', `${(siblings.indexOf(element) % 4) * 65}ms`);
          if (rect.top < window.innerHeight * .94) element.classList.add('is-revealed');
          else observer.observe(element);
        });
        for (const element of revealed) if (!element.isConnected) {
          observer.unobserve(element);
          revealed.delete(element);
        }
        const existing = new Map(artwork.map(item => [item.element, item]));
        artwork = [...root.querySelectorAll('.capability-map, .programme-art')].map(element =>
          existing.get(element) || { element, current: 0, target: 0 });
        hero = root.querySelector('.hero');
        schedule();
      };
      const onFocus = event => {
        const element = event.target.closest('.motion-reveal');
        if (element) {
          element.classList.add('is-revealed');
          observer.unobserve(element);
        }
      };

      root.classList.add('scroll-motion');
      collect();
      const onResize = () => { measurePanels(); schedule(); };
      const mutations = new MutationObserver(records => {
        // Scrambled letters keep their label's size; they do not need a layout scan.
        if (records.some(record => !record.target.closest?.('.nav-letters'))) collect();
      });
      mutations.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-pin-stack'] });
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', onResize);
      root.addEventListener('focusin', onFocus);
      stop = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        panelResize.disconnect();
        mutations.disconnect();
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', onResize);
        root.removeEventListener('focusin', onFocus);
        root.classList.remove('scroll-motion');
        panels.forEach(clearPanel);
        revealed.forEach(element => {
          element.classList.remove('motion-reveal', 'is-revealed');
          element.style.removeProperty('--reveal-delay');
        });
        artwork.forEach(({ element }) => {
          element.style.removeProperty('--art-shift');
          element.style.removeProperty('--orbit-turn');
        });
        if (hero) ['--hero-shift', '--hero-scale', '--hero-copy-shift', '--hero-copy-opacity']
          .forEach(property => hero.style.removeProperty(property));
      };
    };

    start();
    preference.addEventListener('change', start);
    return () => {
      stop();
      preference.removeEventListener('change', start);
    };
  }, [route]);
}
