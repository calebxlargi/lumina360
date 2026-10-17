import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Keep existing bookmarked hash URLs pointing at the new crawlable pages.
if (window.location.hash.startsWith('#/')) {
  const [path, query] = window.location.hash.slice(2).split('?');
  window.location.replace(`/${path ? `${path.replace(/\/$/, '')}/` : ''}${query ? `?${query}` : ''}`);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
