// Only coarse conversion details: never send names, emails or form content.
export function trackConversion(event, programme = '') {
  if (typeof window === 'undefined') return;
  const detail = { event, programme };
  window.dispatchEvent(new CustomEvent('lumina:conversion', { detail }));
  if (typeof window.gtag === 'function') window.gtag('event', event, { programme });
}
