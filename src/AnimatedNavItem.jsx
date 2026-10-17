import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function AnimatedNavItem({ label, as: Tag = 'a', children, leadingIcon, controlRef, uppercase = true, scramble = true, parentTrigger = false, ...props }) {
  const text = uppercase ? label.toUpperCase() : label;
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const elementRef = useRef(null);
  const pointerRef = useRef('mouse');
  const setElement = useCallback(element => {
    elementRef.current = element;
    if (typeof controlRef === 'function') controlRef(element);
    else if (controlRef) controlRef.current = element;
  }, [controlRef]);
  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);
  useEffect(() => { cancelAnimationFrame(frameRef.current); setDisplay(text); }, [text, props.disabled, scramble]);
  const reset = useCallback(() => { cancelAnimationFrame(frameRef.current); setDisplay(text); }, [text]);
  const animate = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    if (!scramble || props.disabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let started;
    let lastUpdate = -50;
    const duration = 450 + text.length * 12;
    const tick = now => {
      started ??= now;
      const elapsed = now - started;
      if (elapsed >= duration) { setDisplay(text); frameRef.current = 0; return; }
      if (elapsed - lastUpdate >= 45) {
        const resolved = Math.floor(elapsed / duration * text.length);
        setDisplay([...text].map((character, index) => character === ' ' || index < resolved
          ? character : glyphs[Math.floor(Math.random() * glyphs.length)]).join(''));
        lastUpdate = elapsed;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [text, props.disabled, scramble]);
  useEffect(() => {
    // Touch screens have no hover: reveal each control once as it comes into view.
    const mobile = window.matchMedia('(max-width: 900px), (hover: none)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const watch = () => {
      observer?.disconnect();
      if (reducedMotion.matches) reset();
      if (!scramble || !mobile.matches || reducedMotion.matches || props.disabled || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          animate();
          observer.unobserve(entry.target);
        }
      }, { threshold: .5 });
      if (elementRef.current) observer.observe(elementRef.current);
    };
    watch();
    mobile.addEventListener('change', watch);
    reducedMotion.addEventListener('change', watch);
    return () => {
      observer?.disconnect();
      mobile.removeEventListener('change', watch);
      reducedMotion.removeEventListener('change', watch);
    };
  }, [animate, reset, props.disabled, scramble]);
  useEffect(() => {
    if (!parentTrigger || !scramble) return;
    const parent = elementRef.current?.parentElement?.closest('a, button, summary');
    if (!parent) return;
    parent.addEventListener('pointerenter', animate);
    parent.addEventListener('focusin', animate);
    parent.addEventListener('pointerleave', reset);
    parent.addEventListener('focusout', reset);
    return () => {
      parent.removeEventListener('pointerenter', animate);
      parent.removeEventListener('focusin', animate);
      parent.removeEventListener('pointerleave', reset);
      parent.removeEventListener('focusout', reset);
    };
  }, [parentTrigger, scramble, animate, reset]);
  return <Tag {...props} ref={setElement} aria-label={props['aria-label'] || label}
    onPointerEnter={event => { if (event.pointerType === 'mouse') animate(); }}
    onPointerDown={event => { pointerRef.current = event.pointerType; if (event.pointerType !== 'mouse') animate(); }}
    onPointerLeave={event => { if (event.pointerType === 'mouse') reset(); }}
    onPointerCancel={reset} onFocus={animate} onBlur={() => { if (pointerRef.current === 'mouse') reset(); }}>
    {leadingIcon}<span className="nav-letters" aria-hidden="true"><span className="nav-letters-measure">{text}</span><span className={`nav-letters-display${display !== text ? ' scrambling' : ''}`}>{display}</span></span>{children}
  </Tag>;
}
