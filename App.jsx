import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { programmes, trainers, enquiryKey } from './src/siteData';
import { programmeIntros } from './src/programmeIntros';
import registeredHRDC from './src/images/tp_hrdc.png';
import claimableHRDC from './src/images/claimable_hrdc.png';
import useScrollMotion from './src/useScrollMotion';
import CountUp from './src/CountUp';
import SectionScrollCue from './src/SectionScrollCue';
import Arrow from './src/Arrow';

const routeLink = (page = '') => `#/${page}`;
const programmeSlug = title => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const programmeEntries = programmes.flatMap(category => category.items.map(title => ({ title, category, slug: programmeSlug(title) })));
const programmeDestination = title => programmeIntros[title]
  ? routeLink(`programme/${programmeSlug(title)}`)
  : routeLink(`contact?programme=${encodeURIComponent(title)}`);
const catalogueReturnKey = 'lumina-course-return';
const readCatalogueReturn = () => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(catalogueReturnKey));
    const validRoute = saved?.route === 'programmes' || programmes.some(p => saved?.route === `programmes/${p.id}`);
    return validRoute && Number.isFinite(saved.scrollY) && saved.scrollY >= 0
      && typeof saved.query === 'string' && typeof saved.programme === 'string' ? saved : null;
  } catch { return null; }
};
const rememberCatalogue = (title, query) => {
  try {
    sessionStorage.setItem(catalogueReturnKey, JSON.stringify({
      route: window.location.hash.replace(/^#\/?/, ''),
      scrollY: window.scrollY, query, programme: programmeSlug(title),
    }));
  } catch { /* The popup works even when session storage is unavailable. */ }
};
const readCatalogueQuery = () => {
  const saved = readCatalogueReturn();
  return saved?.route === window.location.hash.replace(/^#\/?/, '') ? saved.query : '';
};
const Label = ({ number, children, light = false }) => <div className={`section-label ${light ? 'label-dark' : ''}`}><span><i />{number}</span><span><i />{children}</span></div>;
const TextLink = ({ href, children }) => <AnimatedNavItem className="text-link" href={href} label={React.Children.toArray(children).join('')}><Arrow diagonal /></AnimatedNavItem>;
const Logo = () => <img className="brand-image" src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumina_logo_v3.2.png" alt="Lumina 3Sixty" />;

function useRoute() {
  const getRoute = () => window.location.hash.replace(/^#\/?/, '') || 'home';
  const [route, setRoute] = useState(getRoute);
  const previousRoute = useRef(route);
  const pendingScroll = useRef(null);
  useEffect(() => {
    const change = () => {
      const nextRoute = getRoute();
      const previousProgramme = previousRoute.current.startsWith('programme/')
        ? previousRoute.current.split('/')[1] : null;
      const saved = readCatalogueReturn();
      const returningToCatalogue = previousProgramme && nextRoute.split('/')[0] === 'programmes';
      if (returningToCatalogue && !(saved?.programme === previousProgramme && saved.route === nextRoute)) {
        try { sessionStorage.removeItem(catalogueReturnKey); } catch { /* Use the course row as the return target. */ }
      }
      const switchingCategory = previousRoute.current.split('/')[0] === 'programmes'
        && nextRoute.split('/')[0] === 'programmes';
      const catalogueTools = switchingCategory && document.querySelector('.catalogue-tools');
      pendingScroll.current = returningToCatalogue
        ? { restore: saved?.programme === previousProgramme && saved.route === nextRoute ? saved : { programme: previousProgramme } }
        : catalogueTools
        ? { anchorTop: catalogueTools.getBoundingClientRect().top }
        : { top: 0 };
      previousRoute.current = nextRoute;
      setRoute(nextRoute);
    };
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  useLayoutEffect(() => {
    const adjustment = pendingScroll.current;
    if (!adjustment) return;
    pendingScroll.current = null;
    if (adjustment.restore) {
      const restore = () => {
        const saved = adjustment.restore;
        const row = document.querySelector(`[data-programme="${saved.programme}"]`);
        if (Number.isFinite(saved.scrollY)) window.scrollTo({ top: saved.scrollY, behavior: 'instant' });
        else row?.scrollIntoView({ block: 'center', behavior: 'instant' });
        row?.focus({ preventScroll: true });
      };
      restore();
      const frame = requestAnimationFrame(restore);
      return () => cancelAnimationFrame(frame);
    } else if ('anchorTop' in adjustment) {
      // Keep the category controls in place even when the new heading wraps differently.
      const catalogueTools = document.querySelector('.catalogue-tools');
      if (catalogueTools) {
        const delta = catalogueTools.getBoundingClientRect().top - adjustment.anchorTop;
        if (Math.abs(delta) > 0.5) window.scrollBy({ top: delta, behavior: 'instant' });
      }
    } else {
      window.scrollTo({ top: adjustment.top, behavior: 'instant' });
    }
  }, [route]);
  return route;
}

function AnimatedNavItem({ label, as: Tag = 'a', children, leadingIcon, controlRef, uppercase = true, ...props }) {
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
  useEffect(() => { cancelAnimationFrame(frameRef.current); setDisplay(text); }, [text, props.disabled]);
  const reset = useCallback(() => { cancelAnimationFrame(frameRef.current); setDisplay(text); }, [text]);
  const animate = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    if (props.disabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
  }, [text, props.disabled]);
  useEffect(() => {
    // Touch screens have no hover: reveal each control once as it comes into view.
    const mobile = window.matchMedia('(max-width: 900px), (hover: none)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const watch = () => {
      observer?.disconnect();
      if (reducedMotion.matches) reset();
      if (!mobile.matches || reducedMotion.matches || props.disabled || !('IntersectionObserver' in window)) return;
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
  }, [animate, reset, props.disabled]);
  return <Tag {...props} ref={setElement} aria-label={props['aria-label'] || label}
    onPointerEnter={event => { if (event.pointerType === 'mouse') animate(); }}
    onPointerDown={event => { pointerRef.current = event.pointerType; if (event.pointerType !== 'mouse') animate(); }}
    onPointerLeave={event => { if (event.pointerType === 'mouse') reset(); }}
    onPointerCancel={reset} onFocus={animate} onBlur={() => { if (pointerRef.current === 'mouse') reset(); }}>
    {leadingIcon}<span className="nav-letters" aria-hidden="true"><span className="nav-letters-measure">{text}</span><span className={`nav-letters-display${display !== text ? ' scrambling' : ''}`}>{display}</span></span>{children}
  </Tag>;
}

function Navigation({ route }) {
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const coursesRef = useRef(null);
  const coursesToggleRef = useRef(null);
  const page = route.split('/')[0];
  useEffect(() => { setOpen(false); setCoursesOpen(false); }, [route]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeMenus = () => { setOpen(false); setCoursesOpen(false); };
    desktop.addEventListener('change', closeMenus);
    return () => desktop.removeEventListener('change', closeMenus);
  }, []);
  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const links = menuRef.current.querySelectorAll('a');
    links[0]?.focus();
    const keydown = (e) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
      if (e.key === 'Tab') {
        const controls = [toggleRef.current, ...links];
        const at = controls.indexOf(document.activeElement);
        const next = (at + (e.shiftKey ? -1 : 1) + controls.length) % controls.length;
        e.preventDefault(); controls[next]?.focus();
      }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', keydown); };
  }, [open]);
  return <>
    <header className={`site-nav ${open ? 'nav-open' : ''}`}>
      <div className="nav-brand"><button ref={toggleRef} className={`menu-toggle ${open ? 'active' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen(!open)}><span /><span /></button><a href={routeLink()} aria-label="Lumina 3Sixty home" onClick={() => { setOpen(false); window.scrollTo({top:0,behavior:'smooth'}); }}><Logo /></a></div>
      <nav className="desktop-nav" aria-label="Main navigation">
        <AnimatedNavItem label="Home" href={routeLink()} aria-current={page === 'home' ? 'page' : undefined} />
        <div className="nav-courses" onPointerEnter={() => setCoursesOpen(true)} onPointerLeave={() => setCoursesOpen(false)} onFocusCapture={() => setCoursesOpen(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setCoursesOpen(false); }} onKeyDown={event => {
          if (event.key === 'Escape') { event.preventDefault(); coursesToggleRef.current?.focus(); setCoursesOpen(false); }
          if (event.key === 'ArrowDown' && event.target === coursesToggleRef.current) { event.preventDefault(); setCoursesOpen(true); requestAnimationFrame(() => coursesRef.current?.querySelector('a')?.focus()); }
        }}>
          <AnimatedNavItem as="button" type="button" label="Courses" controlRef={coursesToggleRef} aria-expanded={coursesOpen} aria-controls="desktop-course-areas" aria-current={page === 'programmes' || page === 'programme' ? 'page' : undefined} onClick={() => setCoursesOpen(true)}><svg className="nav-chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" /></svg></AnimatedNavItem>
          <div id="desktop-course-areas" ref={coursesRef} className="nav-course-menu" hidden={!coursesOpen}>
            <a className="nav-all-courses" href={routeLink('programmes')}>All courses <Arrow diagonal /></a>
            {programmes.map((category, index) => <a href={routeLink(`programmes/${category.id}`)} key={category.id}><span className="mono muted">0{index + 1}</span><span>{category.title}</span><Arrow diagonal /></a>)}
          </div>
        </div>
        <AnimatedNavItem label="Approach" href={routeLink('approach')} aria-current={page === 'approach' ? 'page' : undefined} />
        <AnimatedNavItem label="Trainers" href={routeLink('about')} aria-current={page === 'about' ? 'page' : undefined} />
      </nav>
      <AnimatedNavItem label="Get in touch" className="nav-contact" href={routeLink('contact')} onClick={() => setOpen(false)}><Arrow diagonal /></AnimatedNavItem>
    </header>
    {open && <nav id="main-menu" className="menu-panel" ref={menuRef} aria-label="Main navigation">
      <div className="menu-kicker mono">Your next move starts here</div>
      {[{ title: 'Home', page: '' }, { title: 'Courses', page: 'programmes' }, { title: 'Approach', page: 'approach' }, { title: 'Trainers', page: 'about' }, { title: 'Contact', page: 'contact' }].map(({ title, page }, i) => <AnimatedNavItem key={page} label={title} uppercase={false} href={routeLink(page)} onClick={() => setOpen(false)} leadingIcon={<span className="menu-index mono">0{i + 1}</span>}><Arrow diagonal /></AnimatedNavItem>)}
      <div className="menu-bottom mono"><span>Kuala Lumpur, Malaysia</span><a href="mailto:sales@lumina3sixty.com">sales@lumina3sixty.com</a></div>
    </nav>}
  </>;
}

function OrbitalScene({ compact = false }) {
  return <div className={`orbital-scene ${compact ? 'compact' : ''}`} aria-hidden="true">
    <img className="orbital-image" src="/images/orbital-horizon.jpg" alt="" fetchpriority="high" />
    <div className="orbital-shade" />
    <svg className="flight-path" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><path d="M-200 1080 Q650 425 1780 128" /><g><circle className="orbit-halo" r="15" /><circle className="orbit-point" r="5.5" /><animateMotion dur="24s" begin="-8s" repeatCount="indefinite" path="M-200 1080 Q650 425 1780 128" /></g></svg>
    <span className="orbital-caption mono">A wider perspective / 360°</span>
  </div>;
}

function Hero() {
  return <section className="hero">
    <OrbitalScene />
    <div className="hero-copy"><p className="hero-pretitle">Define Drive Deliver</p><h1>Accelerating your<br />people’s potential.</h1><AnimatedNavItem href={routeLink('programmes')} className="hero-link" label="Explore courses"><Arrow diagonal /></AnimatedNavItem></div>
    <dl className="hero-foot" aria-label="Why Lumina 3Sixty">{[
      ['HRD Corp', 'Registered Training Provider'],
      ['100% HRD Corp', 'Claimable'],
      ['Multi-Industry', 'Focus'],
      ['Data-Driven', 'Approach'],
    ].map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}</dl>
  </section>;
}

function CapabilityMap() {
  return <div className="capability-map" aria-hidden="true"><div className="map-orbit orbit-a" /><div className="map-orbit orbit-b" /><div className="map-orbit orbit-c" /><div className="map-core"><img src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumina_logo_small.png" alt="" loading="lazy" /></div>{['LEADERSHIP', 'CUSTOMER EXPERIENCE', 'AUTOMOTIVE EXCELLENCE', 'IT & MARKETING', 'WORKPLACE SAFETY'].map((text, i) => <span className={`map-node node-${i}`} key={text}><i />{text}</span>)}</div>;
}

function ProgrammeSpotlight() {
  const [active, setActive] = useState(0);
  const category = programmes[active];
  return <section className="programmes-section page-pad" id="mission-areas">
    <Label number="003">Our focus areas</Label>
    <div className="section-heading"><h2>Built for today.<br /><span>Ready for tomorrow.</span></h2><p>Five areas of expertise. One connected approach to stronger people and better business performance.</p></div>
    <div className="programme-tabs" role="tablist" aria-label="Programme focus areas">{programmes.map((p, i) => <button key={p.id} id={`tab-${p.id}`} role="tab" aria-selected={i === active} aria-controls="programme-panel" tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => { const keys = ['ArrowRight','ArrowLeft','Home','End']; if (!keys.includes(e.key)) return; e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 4 : (active + (e.key === 'ArrowRight' ? 1 : -1) + 5) % 5; setActive(next); document.getElementById(`tab-${programmes[next].id}`)?.focus(); }}><span className="mono">0{i + 1}</span>{p.title}</button>)}</div>
    <div id="programme-panel" role="tabpanel" aria-labelledby={`tab-${category.id}`} className="programme-spotlight" key={category.id}>
      <div className={`programme-art art-${category.id}`} aria-hidden="true"><div className="art-grid" /><div className="art-ring" /><div className="art-ring ring-two" /><span className="art-index">0{active + 1}</span><span className="art-coordinate mono">LUMINA / CAPABILITY SYSTEMS</span></div>
      <div className="spotlight-copy"><span className="mono muted">[ 0{active + 1} / 05 ]</span><h3>{category.title}</h3><p>{category.description}</p><ul className="programme-preview">{category.items.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul><TextLink href={routeLink(`programmes/${category.id}`)}>Explore {category.items.length} programmes</TextLink></div>
    </div>
  </section>;
}

function ApproachSummary() {
  return <section className="approach-section page-pad">
    <Label number="005">From insight to impact</Label>
    <div className="section-heading"><h2>Beyond the session.<br /><span>Into the real world.</span></h2><p>Training is the starting point. Lasting change happens when people put what they learn into practice.</p></div>
    <div className="process-grid">{[
      ['Define', 'Understand what matters.', 'We diagnose your team’s challenges through consultation, data and observation before designing the right intervention.'],
      ['Drive', 'Build the capability.', 'Industry-specific cases, practical exercises and expert facilitation connect learning with the reality of your workplace.'],
      ['Deliver', 'Make the learning count.', 'We focus on implementation and the measures that matter, from customer relationships to safer working practices.']
    ].map(([title, subtitle, text], i) => <article key={title}><span className="mono muted">0{i + 1} /</span><h3>{title}<Arrow diagonal /></h3><h4>{subtitle}</h4><p>{text}</p></article>)}</div>
    <TextLink href={routeLink('approach')}>Discover approach</TextLink>
  </section>;
}

function FeaturedTrainers() {
  return <div className="featured-people">
    {trainers.map(trainer => <a className="featured-trainer" href={routeLink('about')} key={trainer.name}>
      <div className="portrait"><img src={trainer.image} alt="" loading="lazy" /></div>
      <div className="person-name"><h3>{trainer.name}</h3><Arrow diagonal /></div>
      <p className="mono muted">{trainer.role}</p>
    </a>)}
  </div>;
}

function Home() {
  return <>
    <Hero />
    <section className="intro-section page-pad" id="home-intro"><Label number="002">A people transformation company</Label><div className="intro-layout"><div><h2>Your people.<br />Your potential.<br /><span>Your next chapter.</span></h2><p>Progress begins with a different perspective. Lumina 3Sixty brings industry experience and practical learning together to help organisations turn ambition into capability.</p></div><CapabilityMap /></div></section>
    <ProgrammeSpotlight />
    <section className="proof-section page-pad"><Label number="004">Experience that moves you</Label><div className="proof-heading"><p className="mono">Real people. Real industry experience.</p><h2>Grounded in experience.<br />Focused on your future.</h2></div><div className="proof-grid">{[['15','Experienced trainers'],['3','PhD holders'],['5','Automotive experts']].map(([n,label]) => <div key={n}><CountUp value={Number(n)} /><span className="mono">{label}</span></div>)}<div className="proof-link"><p>Meet the people who have lived, built and led the change.</p><TextLink href={routeLink('about')}>Our consultants & trainers</TextLink></div></div></section>
    <ApproachSummary />
    <section className="people-section page-pad"><Label number="006">The people behind the perspective</Label><div className="section-heading"><h2>Experience, shared.<br /><span>Potential, unlocked.</span></h2><TextLink href={routeLink('about')}>Meet the team</TextLink></div><FeaturedTrainers /></section>
  </>;
}

function PageIntro({ number = '001', label, title, description, as: Tag = 'div' }) {
  return <Tag className="page-intro page-pad"><Label number={number}>{label}</Label><h1>{title}</h1>{description && <p>{description}</p>}</Tag>;
}

function ProgrammeIntroDialog({ programme, onClose, triggerRef }) {
  const dialogRef = useRef(null);
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const scrollY = window.scrollY;
    const route = window.location.hash;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (window.location.hash === route) {
        window.scrollTo({ top: scrollY, behavior: 'instant' });
        if (triggerRef.current?.isConnected) triggerRef.current.focus({ preventScroll: true });
      }
    };
  }, [triggerRef]);

  return <dialog ref={dialogRef} className="programme-dialog" aria-labelledby="programme-dialog-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  }}>
    <div className="programme-dialog-shell">
      <header className="programme-dialog-header"><p className="mono">{programme.category.title}</p><h2 id="programme-dialog-title">{programme.title}</h2><button type="button" className="programme-dialog-close" aria-label="Close programme introduction" onClick={onClose} autoFocus><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button></header>
      <div className="programme-dialog-copy">{programmeIntros[programme.title].split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      <footer className="programme-dialog-actions"><AnimatedNavItem as="button" type="button" label="Back to courses" className="solid-button programme-dialog-back" onClick={onClose} leadingIcon={<Arrow className="programme-back-arrow" />} /><AnimatedNavItem label="Enquire about this programme" className="solid-button" href={routeLink(`contact?programme=${encodeURIComponent(programme.title)}`)}><Arrow diagonal /></AnimatedNavItem></footer>
    </div>
  </dialog>;
}

function Programmes({ categoryId }) {
  const selected = programmes.find(p => p.id === categoryId);
  const [query, setQuery] = useState(readCatalogueQuery);
  const [introProgramme, setIntroProgramme] = useState(null);
  const introTriggerRef = useRef(null);
  const visible = (selected ? [selected] : programmes).map(p => ({...p, items:p.items.filter(item => item.toLowerCase().includes(query.toLowerCase()))})).filter(p => p.items.length);
  useEffect(() => { setQuery(readCatalogueQuery()); setIntroProgramme(null); }, [categoryId]);
  return <>
    <PageIntro label="Courses" title={selected ? selected.title : <>Capability for<br />what comes next.</>} description={selected ? selected.description : 'Practical programmes across five disciplines, designed around the people and challenges in your organisation.'} />
    <section className="catalogue page-pad"><div className="catalogue-tools"><nav className="category-nav" aria-label="Programme categories"><a className={!selected ? 'selected' : ''} href={routeLink('programmes')}>All areas</a>{programmes.map(p => <a className={selected?.id === p.id ? 'selected' : ''} key={p.id} href={routeLink(`programmes/${p.id}`)}>{p.title}</a>)}</nav><label className="search-label"><span className="mono">Find a programme</span><input type="search" placeholder="Search by topic…" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
      <div className="catalogue-results" data-pin-stack={!selected && !query.trim() ? '' : undefined} aria-live="polite">{visible.length ? visible.map(p => <div className="catalogue-group" key={p.id}><div className="catalogue-heading"><span className="mono muted">0{programmes.findIndex(x => x.id === p.id) + 1} /</span><h2>{p.title}</h2><p>{p.description}</p></div><div>{p.items.map((item, i) => <a className="course-row" href={programmeDestination(item)} data-programme={programmeSlug(item)} key={item} aria-haspopup={programmeIntros[item] ? 'dialog' : undefined} onClick={event => {
        if (!programmeIntros[item]) return;
        rememberCatalogue(item, query);
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        introTriggerRef.current = event.currentTarget;
        setIntroProgramme({ title: item, category: p });
      }}><span className="mono muted">{String(i + 1).padStart(2,'0')}</span><h3>{item}</h3><span className="course-enquire mono">{programmeIntros[item] ? 'Read intro' : 'Enquire'} <Arrow diagonal /></span></a>)}</div></div>) : <p className="empty-state">No programmes match “{query}”. Try a different topic.</p>}</div>
    </section>
    {introProgramme && <ProgrammeIntroDialog programme={introProgramme} triggerRef={introTriggerRef} onClose={() => setIntroProgramme(null)} />}
  </>;
}

function ProgrammeDetail({ programmeId }) {
  const programme = programmeEntries.find(entry => entry.slug === programmeId);
  const intro = programme && programmeIntros[programme.title];
  const savedReturn = readCatalogueReturn();
  const backRoute = savedReturn?.programme === programmeId ? savedReturn.route : `programmes/${programme?.category.id}`;
  if (!intro) return <>
    <PageIntro label="Courses" title="Explore our programmes." />
    <div className="page-pad not-found"><TextLink href={routeLink('programmes')}>Back to all programmes</TextLink></div>
  </>;
  return <>
    <PageIntro label={programme.category.title} title={programme.title} />
    <section className="programme-introduction page-pad">
      <TextLink href={routeLink(backRoute)}>Back to {programme.category.title}</TextLink>
      <div className="programme-introduction-body">
        <span className="mono muted">Programme introduction /</span>
        <div className="programme-introduction-copy">{intro.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        <AnimatedNavItem label="Enquire about this programme" className="solid-button" href={routeLink(`contact?programme=${encodeURIComponent(programme.title)}`)}><Arrow diagonal /></AnimatedNavItem>
      </div>
    </section>
  </>;
}

function TrainerCard({ trainer, index, expanded, onToggle }) {
  const profileId = `trainer-profile-${index}`;
  const highlightsId = `trainer-highlights-${index}`;
  return <article className="team-card">
    <div className="portrait"><img src={trainer.image} alt={trainer.name} loading="lazy" /><span className="portrait-index mono">{String(index + 1).padStart(2, '0')}</span></div>
    <h2>{trainer.name}</h2>
    <p className="mono muted team-role">{trainer.role}</p>
    <p className="team-summary">{trainer.paragraphs[0]}</p>
    <AnimatedNavItem as="button" type="button" className="solid-button team-profile-toggle" label="Full profile" aria-expanded={expanded} aria-controls={`${profileId} ${highlightsId}`} aria-label={`Full profile: ${trainer.name}`} onClick={onToggle}> <span className="team-profile-toggle-icon" aria-hidden="true">+</span></AnimatedNavItem>
    <div id={profileId} className="profile-details" hidden={!expanded}>{trainer.paragraphs.slice(1).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
    <ul id={highlightsId} className="profile-highlights" hidden={!expanded}>{trainer.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
  </article>;
}

function About() {
  const [expandedTrainers, setExpandedTrainers] = useState({});
  const toggleTrainer = name => setExpandedTrainers(current => ({ ...current, [name]: !current[name] }));
  return <>
    <PageIntro label="Trainers" title={<>A wider perspective.<br />A lasting impact.</>} description="We are a team of industry experts, consultants and facilitators who turn real-world experience into practical capability." />
    <section className="about-statement page-pad"><span className="mono muted">Our purpose /</span><h2>Hunt for blind spots.<br />Break down challenges.<br /><span>Build lasting capabilities.</span></h2><p>Our team brings a diverse range of expertise across leadership, customer experience, automotive operations, digital skills and workplace safety. We connect the bigger picture with the everyday decisions that move your organisation forward.</p></section>
    <section className="team-section page-pad"><Label number="002">Our consultants & trainers</Label><div className="team-grid">{trainers.map((trainer, index) => <TrainerCard key={trainer.name} trainer={trainer} index={index} expanded={Boolean(expandedTrainers[trainer.name])} onToggle={() => toggleTrainer(trainer.name)} />)}</div></section>
  </>;
}

function ApproachBenefits() {
  return <section className="approach-benefits page-pad" aria-labelledby="approach-benefits-title">
    <div className="benefits-heading">
      <div><span className="mono muted">Why Choose Lumina 3Sixty /</span><h2 id="approach-benefits-title">Beyond Theory.<br /><span>Measurable Impact.</span></h2></div>
      <p>Most consultancy or training providers focus on “participation.” We focus on “implementation.” Our methodologies are designed to stick long after the session ends.</p>
    </div>
    <div className="benefits-grid">{[
      ['Define', 'Pre-Training Consultation', 'We diagnose your team’s specific weaknesses using data & observation before we prescribe the training.'],
      ['Drive', 'Customised Programme', 'We don’t use generic modules. We adapt every case study and role-play to your specific industry reality.'],
      ['Deliver', 'ROI Focused', 'Whether it’s reducing accidents (OSHA) or increasing closing rates, we track the metrics that matter.'],
    ].map(([stage, title, description]) => <article className="benefit-card" key={stage}>
      <span className="benefit-stage mono">{stage} /</span>
      <h3>{title}</h3><p>{description}</p>
    </article>)}</div>
  </section>;
}

function Approach() {
  return <>
    <PageIntro as="section" label="Approach" title={<>Designed around you.<br /><span>Built to make a difference.</span></>} description="Your organisation has its own context, people and priorities. Your training should reflect them." />
    <ApproachBenefits />
    {[
      ['01', 'Define the challenge.', 'Pre-training consultation', 'We begin by understanding your team’s needs. Consultation, observation and relevant data help identify the capability gaps that stand between your people and your goals.', ['Understand business priorities','Identify team capability gaps','Agree the learning objectives']],
      ['02', 'Drive the change.', 'Customised programmes', 'We adapt case studies, exercises and role-play to your industry. Our consultants connect their experience with the situations your team faces every day.', ['Industry-specific examples','Practical learning and discussion','Facilitation by experienced practitioners']],
      ['03', 'Deliver the impact.', 'Implementation and outcomes', 'Learning should continue beyond the training room. We focus on practical application and the measures that matter to your organisation.', ['Apply learning in the workplace','Connect actions with business goals','Review progress against agreed objectives']]
    ].map(([n,title,sub,body,bullets]) => <section className="approach-detail page-pad" key={n}><article className="approach-step"><span className="step-number">{n}</span><div><span className="mono muted">{sub}</span><h2>{title}</h2><p>{body}</p><ul>{bullets.map(b => <li key={b}>{b}</li>)}</ul></div></article></section>)}
  </>;
}

function Contact({ selectedProgramme = '' }) {
  const [status, setStatus] = useState('idle');
  const [programme, setProgramme] = useState(selectedProgramme);
  const formRef = useRef(null);
  useEffect(() => setProgramme(selectedProgramme), [selectedProgramme]);
  async function submit(e) {
    e.preventDefault(); if (status === 'sending') return;
    const form = e.currentTarget;
    setStatus('sending');
    const data = new FormData(form);
    data.append('access_key', enquiryKey);
    data.append('subject', `Lumina 3Sixty Inquiry: ${data.get('firstName')} ${data.get('lastName')}`);
    data.append('from_name', 'Lumina 3Sixty Website');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {method:'POST',body:data});
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Submission failed');
      setStatus('success'); form.reset(); setProgramme('');
    } catch { setStatus('error'); }
  }
  return <>
    <PageIntro as="section" label="Get in touch" title={<>Your next chapter<br />starts with a conversation.</>} description="Tell us what you want to achieve. Together, we’ll explore the right path for your people and your business." />
    <section className="contact-layout page-pad"><div className="contact-info"><Label number="002">Let’s connect</Label><a className="contact-email" href="mailto:sales@lumina3sixty.com">sales@lumina3sixty.com <Arrow diagonal /></a><div className="contact-block"><span className="mono muted">Call / WhatsApp</span><a href="tel:+60194419999">+60 19-441 9999</a><a href="tel:+60183466889">+60 18-346 6889</a></div><div className="contact-block"><span className="mono muted">Find us</span><p>Windsor Tower, 2, Jalan Sri Hartamas 17,<br />Taman Sri Hartamas, 50480 Kuala Lumpur,<br />Malaysia</p></div></div>
      <div className="contact-form-wrap">{status === 'success' ? <div className="form-success" role="status"><span className="mono">Message received /</span><h2>Thank you for<br />reaching out.</h2><p>Our team will be in touch to discuss your enquiry.</p><AnimatedNavItem as="button" type="button" label="Send another message" className="solid-button" onClick={() => setStatus('idle')}><Arrow /></AnimatedNavItem></div> : <form ref={formRef} onSubmit={submit} className="contact-form"><div className="form-heading mono">Tell us about your goals <span>* Required</span></div><input name="botcheck" type="checkbox" className="honeypot" tabIndex="-1" aria-hidden="true" /><div className="form-pair"><label>First name *<input name="firstName" autoComplete="given-name" required /></label><label>Last name *<input name="lastName" autoComplete="family-name" required /></label></div><label>Email address *<input name="email" type="email" autoComplete="email" required /></label><label>Company<input name="company" autoComplete="organization" /></label><label>Programme of interest<input name="programme" value={programme} onChange={e => setProgramme(e.target.value)} placeholder="Optional" /></label><label>Your message *<textarea name="message" rows="4" required placeholder="What would you like to achieve?" /></label><p className="form-privacy">Your information will be used to respond to your enquiry. Read our <a href={routeLink('privacy')}>privacy policy</a>.</p>{status === 'error' && <p role="alert" className="form-error">We couldn’t send your message. Please try again or email us directly.</p>}<AnimatedNavItem as="button" label={status === 'sending' ? 'Sending…' : 'Send enquiry'} className="solid-button" type="submit" disabled={status === 'sending'}><Arrow diagonal /></AnimatedNavItem></form>}</div>
    </section>
  </>;
}

function Privacy() {
  return <><PageIntro label="Legal" title="Privacy policy" /><article className="legal-content page-pad"><p>At Lumina 3Sixty PLT, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or engage with our services.</p><h2>01 / Information we collect</h2><p>We may collect personal information such as your name, email address, phone number, and company details when you fill out our contact forms or request information about our training programmes.</p><h2>02 / How we use your information</h2><ul><li>Respond to your enquiries and provide customer support.</li><li>Send you information about our training courses and services.</li><li>Improve our website and service offerings based on your feedback.</li></ul><h2>03 / Data protection</h2><p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. We do not sell or share your personal information with third parties for marketing purposes.</p><h2>04 / Contact us</h2><p>For questions about this policy or our data practices, contact <a href="mailto:sales@lumina3sixty.com">sales@lumina3sixty.com</a>.</p></article></>;
}

function Footer({ contactPage }) {
  return <footer>
    {!contactPage && <section className="footer-cta page-pad"><div><p className="mono">Talk to us /</p><h2>Ready for your<br />next chapter?</h2></div><AnimatedNavItem label="Let’s talk" href={routeLink('contact')} className="solid-button"><Arrow diagonal /></AnimatedNavItem></section>}
    <section className="newsletter page-pad" aria-labelledby="newsletter-title">
      <div><span className="newsletter-kicker mono muted">Weekly Learning Bites /</span><h3 id="newsletter-title">Get Actionable Workplace Insights Every Week</h3><p>Subscribe to Learning Bites by Lumina 3Sixty. Every issue breaks down daily work challenges into practical takeaways: complete with a visual framework infographic, a real-world case study, and a micro-action you can apply immediately on the job.</p></div>
      <form action="https://app.kit.com/forms/9459607/subscriptions" method="post">
        <label htmlFor="newsletter-email" className="mono">Your Email</label>
        <div className="newsletter-signup"><input id="newsletter-email" name="email_address" type="email" autoComplete="email" required placeholder="Enter your email..." /><AnimatedNavItem as="button" label="Subscribe" className="solid-button" type="submit"><Arrow diagonal /></AnimatedNavItem></div>
        <p className="newsletter-note">One infographic, one case study, and one micro-action every week. Unsubscribe anytime.</p>
        <a className="newsletter-privacy mono muted" href={routeLink('privacy')}>Privacy policy <Arrow diagonal /></a>
      </form>
    </section>
    <div className="footer-links page-pad"><div><Logo /><p>Define. Drive. Deliver.</p></div><div><span className="mono muted">Explore</span><a href={routeLink('programmes')}>Courses</a><a href={routeLink('approach')}>Approach</a></div><div><span className="mono muted">Company</span><a href={routeLink('about')}>Trainers</a><a href={routeLink('contact')}>Contact</a></div><div><span className="mono muted">Connect</span><a href="https://www.linkedin.com/company/lumina3sixty/" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a><a href="https://www.instagram.com/lumina3sixty" target="_blank" rel="noreferrer">Instagram <Arrow diagonal /></a><a href="https://www.tiktok.com/@lumina3sixty" target="_blank" rel="noreferrer">TikTok <Arrow diagonal /></a></div></div>
    <section className="footer-accreditation page-pad" aria-label="HRD Corp accreditation">
      <div className="footer-accreditation-copy">
        <p className="mono">HRD Corp Registered Training Provider</p>
        <div className="accreditation-statement"><strong>100<span>%</span></strong><div><h3>HRD Corp Claimable</h3><p className="muted">SBL-Khas Approved Programmes</p></div></div>
      </div>
      <div className="hrdc-badges">
        <div className="hrdc-badge"><img src={registeredHRDC} alt="HRD Corp Registered Training Provider" loading="lazy" /></div>
        <div className="hrdc-badge"><img src={claimableHRDC} alt="HRD Corp Claimable" loading="lazy" /></div>
      </div>
    </section>
    <div className="footer-bottom page-pad mono"><span>© {new Date().getFullYear()} Lumina 3Sixty PLT</span><span>Kuala Lumpur, Malaysia</span><a href={routeLink('privacy')}>Privacy policy</a><a href="#" onClick={e => {e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}}>Back to top <Arrow direction="up" /></a></div>
  </footer>;
}

export default function App() {
  const route = useRoute();
  useScrollMotion(route);
  const [path, query = ''] = route.split('?');
  const [page, categoryId] = path.split('/');
  useEffect(() => {
    const names = {home:'Training & Consultancy',programmes:'Courses',programme:'Programme Introduction',about:'Trainers',approach:'Approach',contact:'Contact',privacy:'Privacy Policy'};
    const programme = page === 'programme' && programmeEntries.find(entry => entry.slug === categoryId);
    document.title = `${programme?.title || names[page] || 'Training & Consultancy'} — Lumina 3Sixty`;
  }, [page, categoryId]);
  return <div className="lumina-site"><a href="#main-content" onClick={e => {e.preventDefault(); document.getElementById('main-content')?.focus();}} className="skip-link">Skip to content</a><Navigation route={route} /><main id="main-content" className={page === 'home' ? 'home-sections' : page === 'approach' ? 'approach-sections' : page === 'contact' ? 'contact-sections' : undefined} tabIndex="-1">{page === 'home' ? <Home /> : page === 'programmes' ? <Programmes categoryId={categoryId} /> : page === 'programme' ? <ProgrammeDetail programmeId={categoryId} /> : page === 'about' ? <About /> : page === 'approach' ? <Approach /> : page === 'contact' ? <Contact selectedProgramme={new URLSearchParams(query).get('programme') || ''} /> : page === 'privacy' ? <Privacy /> : <><PageIntro label="404" title="A different direction." description="This page doesn’t exist. Let’s get you back on track." /><div className="page-pad not-found"><TextLink href={routeLink()}>Back to home</TextLink></div></>}</main><Footer contactPage={page === 'contact'} />{page === 'home' && <SectionScrollCue />}</div>;
}
