import React, { useEffect, useRef, useState } from 'react';

export default function SectionScrollCue() {
  const targets = useRef([]);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const main = document.querySelector('.home-sections');
    const footer = document.querySelector('.lumina-site > footer');
    let frame = 0;
    const update = () => {
      frame = 0;
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setAtEnd(window.scrollY >= maximum - 4);
    };
    const measure = () => {
      // Use flow heights because pinned sections keep their visual top position.
      let top = main.getBoundingClientRect().top + window.scrollY;
      const sections = [...main.querySelectorAll(':scope > section')].map(section => {
        const start = top;
        top += section.getBoundingClientRect().height;
        return start;
      });
      const closing = [...footer.children].filter(element => !element.classList.contains('footer-bottom'))
        .map(element => element.getBoundingClientRect().top + window.scrollY);
      targets.current = [...sections, ...closing];
      update();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(measure);
    resize.observe(main);
    resize.observe(footer);
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const advance = () => {
    const maximum = document.documentElement.scrollHeight - window.innerHeight;
    const next = window.scrollY >= maximum - 4 ? 0 : targets.current.find(top => top > window.scrollY + 6) ?? 0;
    window.scrollTo({ top: next, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return <button type="button" className="scroll-cue" onClick={advance} aria-label={atEnd ? 'Back to top' : 'Scroll to next section'} title={atEnd ? 'Back to top' : 'Next section'}><span aria-hidden="true">{atEnd ? '↑' : '↓'}</span></button>;
}
