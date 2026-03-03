import React, { useState, useEffect } from 'react';

const App = () => {
  useEffect(() => {
    document.title = 'Lumina 3Sixty — Coming Soon';
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = 'https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumina_favicon_v2.png';
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white overflow-hidden flex flex-col items-center justify-center relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        body, html, #root, #__next {
          background-color: #000000 !important;
          color: #ffffff !important;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
        }

        ::-webkit-scrollbar { width: 0; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }

        .animate-fade-in-1 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.3s forwards;
        }
        .animate-fade-in-2 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.6s forwards;
        }
        .animate-fade-in-3 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.9s forwards;
        }
        .animate-fade-in-4 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 1.2s forwards;
        }
        .animate-fade-in-5 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 1.5s forwards;
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.1) 0%,
            rgba(255,255,255,0.4) 50%,
            rgba(255,255,255,0.1) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .orb-1 {
          animation: float 8s ease-in-out infinite, pulse-glow 4s ease-in-out infinite;
        }
        .orb-2 {
          animation: float 10s ease-in-out infinite 1s, pulse-glow 5s ease-in-out infinite 0.5s;
        }
        .orb-3 {
          animation: float 12s ease-in-out infinite 2s, pulse-glow 6s ease-in-out infinite 1s;
        }

        .ring-rotate {
          animation: rotate-slow 30s linear infinite;
        }

        .construction-icon path {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: dash 2s ease-out 0.2s forwards;
        }
      `}</style>

      {/* Ambient background orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none orb-1"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[130px] pointer-events-none orb-2"></div>
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none orb-3"></div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      ></div>

      {/* Rotating ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] pointer-events-none ring-rotate opacity-[0.06]">
        <svg viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="350" cy="350" r="340" stroke="url(#ringGradient)" strokeWidth="1" strokeDasharray="20 10" />
          <circle cx="350" cy="350" r="300" stroke="url(#ringGradient2)" strokeWidth="0.5" strokeDasharray="8 16" />
          <defs>
            <linearGradient id="ringGradient" x1="0" y1="0" x2="700" y2="700">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="ringGradient2" x1="700" y1="0" x2="0" y2="700">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">

        {/* Logo */}
        <div className="animate-fade-in-1 mb-10">
          <img
            src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumina_logo-v2.png"
            alt="Lumina 3Sixty"
            className="h-16 md:h-20 w-auto object-contain mx-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback */}
          <div className="hidden text-3xl font-bold tracking-tighter items-center gap-2 justify-center" style={{ display: 'none' }}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-serif italic">L</span>
            </div>
            <span>Lumina<span className="text-slate-400 font-light"> 3Sixty</span></span>
          </div>
        </div>

        {/* Construction Icon */}
        <div className="animate-fade-in-2 mb-8">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto backdrop-blur-sm">
            <svg className="construction-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" className="text-yellow-400" stroke="currentColor" />
              <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" className="text-yellow-400" stroke="currentColor" />
              <path d="M4 15v-3a6 6 0 0 1 6-6h0" className="text-yellow-400" stroke="currentColor" />
              <path d="M14 6h0a6 6 0 0 1 6 9v3" className="text-yellow-400" stroke="currentColor" />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <div className="animate-fade-in-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-blue-300 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            Under Construction
          </div>
        </div>

        {/* Heading */}
        <h1 className="animate-fade-in-3 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
            Something Great
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 shimmer-text">
            Is Coming
          </span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-4 text-base md:text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
          We're crafting a new experience for you. Our website is currently being rebuilt to serve you better. Stay tuned.
        </p>

        {/* Contact info */}
        <div className="animate-fade-in-5 flex flex-col sm:flex-row items-center gap-6 text-sm text-slate-500">
          <a
            href="mailto:sales@lumina3sixty.com"
            className="flex items-center gap-2 hover:text-white transition-colors duration-300 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400/60 group-hover:text-blue-400 transition-colors">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            sales@lumina3sixty.com
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-700"></span>
          <a
            href="tel:+60183466889"
            className="flex items-center gap-2 hover:text-white transition-colors duration-300 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400/60 group-hover:text-blue-400 transition-colors">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Contact Us
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Lumina 3Sixty PLT. All rights reserved.
      </div>
    </div>
  );
};

export default App;
