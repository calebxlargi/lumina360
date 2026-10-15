import React, { useEffect, useRef, useState } from 'react';

export default function CountUp({ value }) {
  const ref = useRef(null);
  const [count, setCount] = useState(value);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    let observer;
    let finished = false;
    const finish = () => {
      finished = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      setCount(value);
    };
    if (preference.matches || !('IntersectionObserver' in window)) return;
    setCount(0);
    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || finished) return;
      observer.disconnect();
      let started;
      const tick = time => {
        started ??= time;
        const progress = Math.min((time - started) / 1450, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finish();
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .5, rootMargin: '0px 0px -8% 0px' });
    observer.observe(ref.current);
    preference.addEventListener('change', finish);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      preference.removeEventListener('change', finish);
    };
  }, [value]);

  return <strong ref={ref} className="count-up"><span className="visually-hidden">{value}</span><span aria-hidden="true">{count}</span></strong>;
}
