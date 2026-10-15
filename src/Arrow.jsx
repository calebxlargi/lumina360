import React from 'react';

const paths = {
  right: 'M4 12h16m-6-6 6 6-6 6',
  left: 'M20 12H4m6-6-6 6 6 6',
  up: 'M12 21V3m-7 7 7-7 7 7',
  down: 'M12 3v18m-7-7 7 7 7-7',
};

export default function Arrow({ diagonal = false, direction = 'right', ...props }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false" {...props}>
    <path d={diagonal ? 'M5 19 19 5M5 5h14v14' : paths[direction]} />
  </svg>;
}
