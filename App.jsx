import React, { useState, useEffect } from 'react';

// --- Icon Components ---
const Icon = ({ children, size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

const Menu = (props) => <Icon {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></Icon>;
const X = (props) => <Icon {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>;
const ChevronRight = (props) => <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>;
const BarChart3 = (props) => <Icon {...props}><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></Icon>;
const Users = (props) => <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon>;
const Zap = (props) => <Icon {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Icon>;
const CheckCircle2 = (props) => <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></Icon>;
const ArrowRight = (props) => <Icon {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Icon>;
const Mail = (props) => <Icon {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Icon>;
const Phone = (props) => <Icon {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Icon>;
const MapPin = (props) => <Icon {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Icon>;
const GraduationCap = (props) => <Icon {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 0 6-1 6-1v-7" /></Icon>;
const Briefcase = (props) => <Icon {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></Icon>;
const Brain = (props) => <Icon {...props}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></Icon>;
const Globe = (props) => <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></Icon>;
const TrendingUp = (props) => <Icon {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></Icon>;
const Search = (props) => <Icon {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Icon>;
const Target = (props) => <Icon {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Icon>;
const MessageSquare = (props) => <Icon {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Icon>;
const Car = (props) => <Icon {...props}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></Icon>;
const Shield = (props) => <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></Icon>;
const HardHat = (props) => <Icon {...props}><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" /><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" /><path d="M4 15v-3a6 6 0 0 1 6-6h0" /><path d="M14 6h0a6 6 0 0 1 6 9v3" /></Icon>;
const FileCheck = (props) => <Icon {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="m9 15 2 2 4-4" /></Icon>;
const Lock = (props) => <Icon {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Icon>;
const Monitor = (props) => <Icon {...props}><rect width="20" height="14" x="2" y="3" rx="2" ry="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></Icon>;


// --- Styles ---
const CustomStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translate3d(0, 20px, 0); }
      to { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translate3d(-20px, 0, 0); }
      to { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    .animate-fade-in-right {
      animation: fadeInRight 0.8s ease-out forwards;
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    
    body, html, #root, #__next {
      background-color: #000000 !important;
      color: #ffffff !important;
      min-height: 100vh;
      margin: 0;
      padding: 0;
      scroll-behavior: smooth;
    }
    
    /* Custom Scrollbar for modern look */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #000; 
    }
    ::-webkit-scrollbar-thumb {
      background: #333; 
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }
    .reveal-hidden {
      opacity: 0;
      transform: translateY(30px);
      transition: all 1s cubic-bezier(0.5, 0, 0, 1);
    }
    .reveal-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .reveal-delay-100 { transition-delay: 100ms; }
    .reveal-delay-200 { transition-delay: 200ms; }
    .reveal-delay-300 { transition-delay: 300ms; }
    .reveal-delay-400 { transition-delay: 400ms; }
    .reveal-delay-500 { transition-delay: 500ms; }

    @keyframes zoomIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-zoom-in {
      animation: zoomIn 1s ease-out forwards;
    }

    /* Hero Porthole Entrance Animation */
    @keyframes portholeEntrance {
      0% { opacity: 0; transform: translateY(80px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    /* Hero Circular Reveal Animation */
    @keyframes circleReveal {
      0% { clip-path: circle(13% at 50% 50%); }
      100% { clip-path: circle(150% at 50% 50%); }
    }
    .hero-reveal {
      clip-path: circle(13% at 50% 50%);
      opacity: 0;
      animation: 
        portholeEntrance 0.6s ease-out forwards,
        circleReveal 1.8s cubic-bezier(0.65, 0, 0.35, 1) 1.4s forwards;
    }

    /* Hero content entrance - delayed until reveal completes */
    @keyframes heroContentIn {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .hero-content-animate {
      opacity: 0;
      animation: heroContentIn 0.4s ease-out forwards;
    }
    .hero-delay-1 { animation-delay: 3.2s; }
    .hero-delay-2 { animation-delay: 3.28s; }
    .hero-delay-3 { animation-delay: 3.36s; }
    .hero-delay-4 { animation-delay: 3.44s; }

    /* Film grain overlay */
    .film-grain::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
      z-index: 1;
    }

    /* Subtle vignette effect */
    .hero-vignette::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%);
      pointer-events: none;
      z-index: 2;
    }
  `}</style>
);

// --- Sub-Components ---

const TrainingList = ({ title, icon: IconComp, color, items, delay }) => (
  <div className={`bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-${color}-500/50 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col`}>
    <div className={`w-14 h-14 bg-${color}-900/30 rounded-2xl flex items-center justify-center text-${color}-400 mb-6 group-hover:scale-110 transition-transform`}>
      <IconComp size={32} />
    </div>
    <h3 className="text-xl font-bold mb-6">{title}</h3>
    <ul className="space-y-3 flex-grow">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-slate-400 group">
          <CheckCircle2 className={`text-${color}-500 mt-0.5 flex-shrink-0 group-hover:text-${color}-400 transition-colors`} size={16} />
          <span className="group-hover:text-slate-200 transition-colors">{item}</span>
        </li>
      ))}
    </ul>
    <div className={`mt-8 pt-6 border-t border-white/10`}>
      {/* Buttons removed as requested */}
    </div>
  </div>
);

const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} ${isVisible ? 'reveal-visible' : 'reveal-hidden'} ${delay ? `reveal-delay-${delay}` : ''}`}
    >
      {children}
    </div>
  );
};

const HomePage = ({ navigateTo }) => {
  const autoTraining = [
    "Transformational Leadership: Showroom to Boardroom",
    "Modern Consultative Sales Mastery",
    "Sales Management 1: Protect your Margin & Increase your Market Share",
    "Sales Management 2: Financials, Manage your P&L",
    "After Sales: Creating Customers for Life"
  ];

  const leadershipSkills = [
    "Executive Coaching 1 on 1",
    "Change Management and Its Impact on Leadership",
    "Persuasive Communication: Influence Without Authority",
    "Collaborative Intelligence in Diverse Teams",
    "Team Building",
    "Emotional Intelligence: Building Resilient Teams",
    "Leading a Diverse Work Force"
  ];

  const cxSkills = [
    "Owning and Championing the Customer Experience",
    "Managing Customer Expectations and Service Recovery",
    "The Art of Active Listening",
    "Critical Thinking and Problem Solving",
    "Time Management: Prioritization and Focus",
    "Conflict Management"
  ];

  const itSkills = [
    "Generative AI for Business Productivity",
    "AI Data Privacy & Security Awareness",
    "Data Literacy for Non-Technical Professionals",
    "Prompt Engineering for Corporate Workflows",
    "Office Automation with No-Code Tools & AI"
  ];

  const oshSkills = [
    "HIRARC Made Easy: Identifying Hazards & Controlling Risks",
    "Safety Leadership: Empowering Supervisors & Managers",
    "Office Ergonomics & Sedentary Risk Management (Work Smart, Work Safe)",
    "Workplace Mental Health"
  ];

  const safetyTraining = [
    "Hazard Identification and Risk Assessment (HIRA)",
    "Ergonomics Essentials: Preventing Disorders",
    "Fire Safety and Emergency Evacuation Protocols",
    "Slips, Trips, and Falls Prevention",
    "PPE Compliance & Maintenance",
    "Chemical Safety: SDS and GHS Labels",
    "Electrical Safety Basics (LOTO)",
    "Safe Manual Handling Techniques",
    "Workshop Safety: Machine Guarding",
    "Workplace Violence and Harassment Prevention",
    "First Aid and CPR: Basic Life Support",
    "Noise Conservation & Hearing Protection",
    "Defensive Driving for Company Vehicles",
    "Confined Space Awareness",
    "Building a Safety Culture: Leadership’s Role"
  ];

  return (
    <>
      {/* Hero Section with Circular Reveal */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 hero-reveal film-grain hero-vignette">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://raw.githubusercontent.com/calebxlargi/lumina360/main/src/images/lumina_background.jpg)' }}
        ></div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Background gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-300 mb-8 hero-content-animate hero-delay-1 mt-8 md:mt-0">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            HRD Corp Registered Training Provider
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400 max-w-6xl mx-auto pb-4 hero-content-animate hero-delay-2">
            Empowering Workforces. <br className="hidden md:block" />
            <span className="text-white">Elevating Standards.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed hero-content-animate hero-delay-3">
            From Automotive Excellence to transformative Soft Skills and essential IT Skills.<br />
            We provide comprehensive, data-driven training solutions that drive measurable business results.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 hero-content-animate hero-delay-4">
            <button onClick={() => navigateTo('contact')} className="group px-8 py-4 bg-white text-black rounded-full font-semibold transition-all hover:bg-blue-50 flex items-center gap-2 transform hover:scale-105">
              Start Transformation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#services" className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-all">
              Explore Courses
            </a>
          </div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Training Provider", value: "Class A" },
              { label: "Claimable", value: "100% HRD Corp" },
              { label: "Focus", value: "Multi-Industry" },
              { label: "Approach", value: "Data-Driven" }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center group cursor-default">
                <span className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{stat.value}</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Training Solutions Section */}
      <section id="services" className="py-24 relative bg-gradient-to-b from-black to-zinc-950">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Training Ecosystem</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-8"></div>
            <p className="text-slate-400 text-lg">
              We don't just train; we transform. Our curriculum spans five critical pillars of organizational success, ensuring your team is skilled, safe, motivated, and future-ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Automotive Column */}
            <RevealOnScroll delay={100}>
              <TrainingList
                title="Automotive Excellence"
                icon={Car}
                color="blue"
                items={autoTraining}
              />
            </RevealOnScroll>

            {/* Leadership Column */}
            <RevealOnScroll delay={200}>
              <TrainingList
                title="Leadership & Team Dynamics"
                icon={Users}
                color="purple"
                items={leadershipSkills}
              />
            </RevealOnScroll>

            {/* CX Column */}
            <RevealOnScroll delay={300}>
              <TrainingList
                title="Customer Experience & Personal Mastery"
                icon={Target}
                color="orange"
                items={cxSkills}
              />
            </RevealOnScroll>

            {/* IT Skills Column */}
            <RevealOnScroll delay={400}>
              <TrainingList
                title="IT Skills"
                icon={Monitor}
                color="emerald"
                items={itSkills}
              />
            </RevealOnScroll>

            {/* OSH Skills Column */}
            <RevealOnScroll delay={500}>
              <TrainingList
                title="OSH Compliance"
                icon={HardHat}
                color="red"
                items={oshSkills}
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Feature Split Section - Rebranded for General HR */}
      <section id="approach" className="py-24 bg-gradient-to-r from-zinc-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400 mb-6">
              Why Choose Lumina
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Beyond Theory.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> measurable Impact.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Most training providers focus on "participation." We focus on "implementation." Our methodologies are designed to stick long after the session ends.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <RevealOnScroll className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-900/20 flex items-center justify-center mb-6 border border-blue-500/10">
                <Target className="text-blue-400" size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">Customized Context</h4>
              <p className="text-slate-400 text-sm">We don't use generic modules. We adapt every case study and role-play to your specific industry reality.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={100} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-purple-900/20 flex items-center justify-center mb-6 border border-purple-500/10">
                <Search className="text-purple-400" size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">Pre-Training Audit</h4>
              <p className="text-slate-400 text-sm">We diagnose your team's specific weaknesses using data & observation before we prescribe the training.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={200} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-900/20 flex items-center justify-center mb-6 border border-emerald-500/10">
                <TrendingUp className="text-emerald-400" size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">ROI Focused</h4>
              <p className="text-slate-400 text-sm">Whether it's reducing accidents (OSHA) or increasing closing rates, we track the metrics that matter.</p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Elevate Your Workforce?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Schedule your complimentary needs analysis audit and let us build a custom training roadmap for your organization.
          </p>
          <button onClick={() => navigateTo('contact')} className="px-10 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transform hover:scale-105">
            Get Your Proposal
          </button>
        </div>
      </section>
    </>
  );
};

const HRDCorpPage = () => (
  <div className="pt-32 pb-24 container mx-auto px-6 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-medium text-blue-400 mb-6">
          <FileCheck size={16} /> Accredited Training Provider
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">HRD Corp Status</h1>
        <p className="text-lg text-slate-400">
          Lumina 3Sixty PLT is a registered training provider with the Human Resource Development Corporation (HRD Corp) Malaysia.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">What This Means For You</h2>
        <div className="space-y-6 text-slate-300">
          <p>
            As an HRD Corp registered provider, all training programs offered by Lumina 3Sixty are 100% claimable under the SBL-Khas scheme. This allows employers to utilize their HRD levy to upskill their workforce without upfront payment, as the cost is deducted directly from the levy fund.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">SBL-Khas Scheme</h3>
              <p className="text-sm">
                Under this scheme, employers do not need to pay the training fees upfront. HRD Corp pays the training provider directly, easing cash flow for your organization.
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">Quality Assurance</h3>
              <p className="text-sm">
                Our accreditation ensures that all our trainers and modules meet the rigorous quality standards set by HRD Corp, guaranteeing valuable and effective learning outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PrivacyPolicyPage = () => (
  <div className="pt-32 pb-24 container mx-auto px-6 min-h-screen">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-slate-300">
        <p>
          At Lumina 3Sixty PLT, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or engage with our services.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address, phone number, and company details when you fill out our contact forms or request information about our training programs.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
        <p>
          The information we collect is used to:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Send you information about our training courses and services.</li>
            <li>Improve our website and service offerings based on your feedback.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Data Protection</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We do not sell or share your personal information with third parties for marketing purposes.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our data practices, please contact us at training@lumina3sixty.com.
        </p>
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="pt-32 pb-24 container mx-auto px-6 min-h-screen">
    {/* Header */}
    <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400 mb-6">
        HRD Corp Accredited Training
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Our Trainers</span>
      </h1>
      <p className="text-xl text-slate-400">
        A diverse team of industry veterans bridging the gap between traditional professional standards and the requirements of the Fourth Industrial Revolution.
      </p>
    </div>

    {/* Thiru's Profile */}
    <RevealOnScroll className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
        <div className="w-full lg:w-1/3 max-w-sm mx-auto lg:max-w-none">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-slate-800 to-black rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Thiru's Image */}
            <img
              src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/thiruhs_profile_pic.png"
              alt="Thiruh Shan - Lead Trainer"
              className="w-full h-full object-cover rounded-2xl absolute inset-0 z-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback Placeholder */}
            <div className="text-center p-8 hidden relative z-10">
              <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={48} className="text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Thiruh Shan</h3>
              <p className="text-slate-400 text-sm uppercase tracking-widest">Lead Trainer</p>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[1]"></div>
            <div className="absolute bottom-6 left-6 z-[2]">
              <h3 className="text-2xl font-bold mb-1">Thiruh Shan</h3>
              <p className="text-purple-400 text-sm uppercase tracking-widest font-bold">Lead Trainer</p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 space-y-6">
          <h2 className="text-3xl font-bold mb-2">Thiruh Shan</h2>
          <p className="text-slate-300 leading-relaxed">
            From Showroom Floor to RM1 Billion Portfolio. With 30 years of deep-domain expertise in the automotive industry, Thiruh specializes in turning operational complexity into sustainable profit. His journey from Sales Consultant to Group COO has given him a 360-degree view of the business, having led teams across iconic brands like Rolls-Royce, BMW, Audi, VW, JEEP, and Mitsubishi.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Thiruh is a transformational leader who bridges the gap between boardroom strategy and front-line execution. He focuses on the core drivers of business success: Profitability, Operational Excellence, and Shareholder Value. Beyond offering theory, he delivers battle-tested blueprints with his philosophy:
          </p>

          <p className="text-slate-300 leading-relaxed italic font-bold">
            “I don’t teach what I’ve read; I teach what I have lived, built, and scaled.”
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <TrendingUp size={20} className="text-blue-400 mb-2" />
              <div className="font-bold text-sm">Strategic Leadership</div>
              <div className="text-xs text-slate-500">COO EON, GM Rolls-Royce Motor Cars</div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Zap size={20} className="text-purple-400 mb-2" />
              <div className="font-bold text-sm">Ops Excellence</div>
              <div className="text-xs text-slate-500">Profitability & Process</div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Globe size={20} className="text-emerald-400 mb-2" />
              <div className="font-bold text-sm">ASEAN Consultant</div>
              <div className="text-xs text-slate-500">Network Development</div>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>

    {/* Caleb's Profile - REARRANGED SECOND */}
    <RevealOnScroll className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row-reverse gap-12 items-center relative z-10">
        <div className="w-full lg:w-1/3 max-w-sm mx-auto lg:max-w-none">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-slate-800 to-black rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Caleb's Image */}
            <img
              src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/caleby_profile_pic%20.png"
              alt="Caleb Yong - Lead Trainer"
              className="w-full h-full object-cover rounded-2xl absolute inset-0 z-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback Placeholder */}
            <div className="text-center p-8 hidden relative z-10">
              <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={48} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Caleb Yong</h3>
              <p className="text-slate-400 text-sm uppercase tracking-widest">Lead Trainer</p>
            </div>
            {/* Overlay for text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[1]"></div>
            <div className="absolute bottom-6 left-6 z-[2]">
              <h3 className="text-2xl font-bold mb-1">Caleb Yong</h3>
              <p className="text-blue-400 text-sm uppercase tracking-widest font-bold">Lead Trainer</p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 space-y-6">
          <h2 className="text-3xl font-bold mb-2">Caleb Yong</h2>
          <p className="text-slate-300 leading-relaxed">
            Caleb is a strategic consultant and technologist who bridges the critical gap between Artificial Intelligence and Emotional Intelligence. Utilizing a multidisciplinary approach, he combines advanced technical implementation specifically in Large Language Models and Computer Vision with soft skills coaching.
          </p>
          <p className="text-slate-300 leading-relaxed">
            His professional impact spans from global tech giants to key local conglomerates. He has successfully delivered high level consultancy and training for major organizations including Saudi Aramco, Apple, KPJ, Weststar, and TNB, proving that the future of work requires a seamless integration of technical expertise and human leadership.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Globe size={20} className="text-blue-400 mb-2" />
              <div className="font-bold text-sm">Global Experience</div>
              <div className="text-xs text-slate-500">Saudi Aramco, Apple</div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Briefcase size={20} className="text-purple-400 mb-2" />
              <div className="font-bold text-sm">Local Impact</div>
              <div className="text-xs text-slate-500">KPJ, Weststar, TNB</div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Brain size={20} className="text-emerald-400 mb-2" />
              <div className="font-bold text-sm">AI Expert</div>
              <div className="text-xs text-slate-500">LLMs & Comp. Vision</div>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>

    {/* Sofia Catha's Profile - REARRANGED THIRD */}
    <RevealOnScroll className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
        <div className="w-full lg:w-1/3 max-w-sm mx-auto lg:max-w-none">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-slate-800 to-black rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Sofia's Image */}
            <img
              src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/sofia_catha_profile_pic.png"
              alt="Sophia Catha - Associate Trainer"
              className="w-full h-full object-cover rounded-2xl absolute inset-0 z-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback Placeholder */}
            <div className="text-center p-8 hidden relative z-10">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={48} className="text-red-400" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Sophia Catha</h3>
              <p className="text-slate-400 text-sm uppercase tracking-widest">Associate Trainer</p>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[1]"></div>
            <div className="absolute bottom-6 left-6 z-[2]">
              <h3 className="text-2xl font-bold mb-1">Sophia Catha</h3>
              <p className="text-red-400 text-sm uppercase tracking-widest font-bold">Associate Trainer</p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 space-y-6">
          <h2 className="text-3xl font-bold mb-2">Sophia Catha</h2>
          <p className="text-slate-300 leading-relaxed">
            Sophia Catha is a business owner and a corporate seer whose business speciality is anticipating future trends while working with people in Senior and Middle Management to bring their people up to speed with current changes in the global business ecosystem. With international exposure spanning a 33-year career, Sophia’s approach has been transparent and straightforward towards maximizing people potential.
          </p>
          <p className="text-slate-300 leading-relaxed">
            An in-demand Speaker, Senior Facilitator and Business Coach in local and multinational organizations that expect excellence in people, performance and profits, Sophia’s passion for people development has led her to work in 20 countries going past 140,000 people as of 2024.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Her incisive and dynamic training presentations have captivated audiences in various business forums. She continues to speak, steer, lead, train, coach and mentor organizations to actualize their corporate vision, guided by her mission to serve and inspire teams to their highest potential.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Users size={20} className="text-red-400 mb-2" />
              <div className="font-bold text-sm">Global Impact</div>
              <div className="text-xs text-slate-500">140,000+ Trainees</div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Globe size={20} className="text-white mb-2" />
              <div className="font-bold text-sm">International</div>
              <div className="text-xs text-slate-500">20+ Countries</div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Briefcase size={20} className="text-purple-400 mb-2" />
              <div className="font-bold text-sm">MNC Clients</div>
              <div className="text-xs text-slate-500">JP Morgan, Petronas</div>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>

    {/* Jack Zaal's Profile - REARRANGED FOURTH */}
    <RevealOnScroll className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row-reverse gap-12 items-center relative z-10">
        <div className="w-full lg:w-1/3 max-w-sm mx-auto lg:max-w-none">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-slate-800 to-black rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Jack's Image */}
            <img
              src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/jack_profile_pic.png"
              alt="Jack Zaal - Associate Trainer"
              className="w-full h-full object-cover rounded-2xl absolute inset-0 z-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback Placeholder */}
            <div className="text-center p-8 hidden relative z-10">
              <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={48} className="text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Jack Zaal</h3>
              <p className="text-slate-400 text-sm uppercase tracking-widest">Associate Trainer</p>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[1]"></div>
            <div className="absolute bottom-6 left-6 z-[2]">
              <h3 className="text-2xl font-bold mb-1">Jack Zaal</h3>
              <p className="text-orange-400 text-sm uppercase tracking-widest font-bold">Associate Trainer</p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 space-y-6">
          <h2 className="text-3xl font-bold mb-2">Jack Zaal</h2>
          <p className="text-slate-300 leading-relaxed">
            A strategic retail automotive executive with a strong focus on growing Sales and securing profitability through efficient After-Sales operations. Jack has led retail automotive companies in Malaysia for the past 15 years, overseeing Sales, After Sales, Marketing, HR, Facilities, and Finance.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Jack's extensive career includes 19 years at Volvo Car Corporation, with key roles in Product Planning and Area Management across the Netherlands, Sweden, Belgium, and Italy. He has successfully acquired new franchises, built new facilities, and driven business strategy for premium brands including Volvo, Volkswagen, Audi, BMW, Rolls-Royce, and Lotus.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <TrendingUp size={20} className="text-orange-400 mb-2" />
              <div className="font-bold text-sm">Profitability Focus</div>
              <div className="text-xs text-slate-500">Sales & After-Sales</div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Briefcase size={20} className="text-blue-400 mb-2" />
              <div className="font-bold text-sm">Brand Portfolio</div>
              <div className="text-xs text-slate-500">Volvo, BMW, Rolls-Royce</div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Globe size={20} className="text-white mb-2" />
              <div className="font-bold text-sm">International</div>
              <div className="text-xs text-slate-500">Fluent in 4 Languages</div>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>

    {/* Hal Serudin's Profile - REARRANGED FIFTH */}
    <RevealOnScroll className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
        <div className="w-full lg:w-1/3 max-w-sm mx-auto lg:max-w-none">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-slate-800 to-black rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Hal's Image */}
            <img
              src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/hal_profile_pic.png"
              alt="Hal Serudin - Associate Trainer"
              className="w-full h-full object-cover rounded-2xl absolute inset-0 z-0 transform hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback Placeholder */}
            <div className="text-center p-8 hidden relative z-10">
              <div className="w-24 h-24 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={48} className="text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Hal Serudin</h3>
              <p className="text-slate-400 text-sm uppercase tracking-widest">Associate Trainer</p>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[1]"></div>
            <div className="absolute bottom-6 left-6 z-[2]">
              <h3 className="text-2xl font-bold mb-1">Hal Serudin</h3>
              <p className="text-pink-400 text-sm uppercase tracking-widest font-bold">Associate Trainer</p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 space-y-6">
          <h2 className="text-3xl font-bold mb-2">Hal Serudin</h2>
          <p className="text-slate-300 leading-relaxed">
            Hal brings over 35 years of experience in communications across the automotive, luxury, airline, tourism, and defense sectors. A former consultant for Inchcape, he has worked closely with automotive dealerships across the Asia Pacific region, consulting for BMW, MINI, and Motorrad.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Most notably, Hal served as a highly experienced member of Rolls-Royce Motor Cars’ global PR team for nearly two decades. He is a specialist in crisis communications and a dedicated mentor, training numerous professionals throughout the region in strategic communications.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <MessageSquare size={20} className="text-pink-400 mb-2" />
              <div className="font-bold text-sm">Crisis Comms</div>
              <div className="text-xs text-slate-500">Expert Management</div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Briefcase size={20} className="text-purple-400 mb-2" />
              <div className="font-bold text-sm">Luxury Auto</div>
              <div className="text-xs text-slate-500">Rolls-Royce Global PR</div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <Users size={20} className="text-blue-400 mb-2" />
              <div className="font-bold text-sm">Mentorship</div>
              <div className="text-xs text-slate-500">Regional Trainer</div>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  </div >
);

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.target);
    formData.append('access_key', 'd9e9b36a-e67c-4029-a0e5-5791a7f12bcd');
    formData.append('subject', `Lumina 3Sixty Inquiry: ${formData.get('firstName')} ${formData.get('lastName')}`);
    formData.append('from_name', 'Lumina 3Sixty Website');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        e.target.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 mb-6">
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Build Your <br />Training Roadmap.</h1>
          <p className="text-lg text-slate-400 mb-12">
            Ready to transform your sales floor? Fill out the form or reach out directly. We usually reply within 2 hours.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">Email Us</h3>
                <p className="text-slate-400">sales@lumina3sixty.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">Call / WhatsApp</h3>
                <p className="text-slate-400">019-441 9999 / 018-346 6889</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">HQ Location</h3>
                <p className="text-slate-400">Windsor Tower, 2, Jalan Sri Hartamas 17,<br />Taman Sri Hartamas, 50480 Kuala Lumpur,<br />Malaysia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          {submitStatus === 'success' ? (
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-8 rounded-3xl text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-emerald-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">Message Sent!</h3>
              <p className="text-slate-400 mb-6">Thank you for reaching out. We'll get back to you within 2 hours.</p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
              {/* Honeypot spam protection */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              {submitStatus === 'error' && (
                <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg text-red-400 text-sm">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">First Name</label>
                  <input name="firstName" type="text" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Last Name</label>
                  <input name="lastName" type="text" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <input name="email" type="email" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@dealership.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Dealership / Company</label>
                <input name="company" type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Honda PJ..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Message</label>
                <textarea name="message" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white h-32 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Tell us about your team's challenges..." />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState('home'); // 'home', 'contact', 'about', 'hrd', 'privacy'

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set website favicon & title
  useEffect(() => {
    document.title = 'Lumina 3Sixty';
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = 'https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumina_favicon_v2.png';
  }, []);

  const navigateTo = (target) => {
    setIsMenuOpen(false);

    if (target === 'contact') {
      setView('contact');
      window.scrollTo(0, 0);
    } else if (target === 'about') {
      setView('about');
      window.scrollTo(0, 0);
    } else if (target === 'hrd') {
      setView('hrd');
      window.scrollTo(0, 0);
    } else if (target === 'privacy') {
      setView('privacy');
      window.scrollTo(0, 0);
    } else {
      setView('home');
      // Small delay to ensure the Home view renders before scrolling
      setTimeout(() => {
        if (target === 'services') {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        } else if (target === 'approach') {
          document.getElementById('approach')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 50);
    }
  };

  return (
    <div
      style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}
      className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden"
    >
      <CustomStyles />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => navigateTo('home')}>
            {/* Logo Image */}
            <img
              src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumina_logo-v2.png"
              alt="Lumina 3Sixty"
              className="h-14 w-auto object-contain"
              onError={(e) => {
                // Fallback if image is missing
                console.warn("Logo not found. Switching to text fallback.");
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }
              }}
            />
            {/* Fallback Text Logo */}
            <div className="hidden text-2xl font-bold tracking-tighter items-center gap-2" style={{ display: 'none' }}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif italic">L</span>
              </div>
              <span>Lumina<span className="text-slate-400 font-light"> 3Sixty</span></span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigateTo('services')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Services</button>
            <button onClick={() => navigateTo('approach')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Approach</button>
            <button onClick={() => navigateTo('about')} className={`text-sm font-medium transition-colors ${view === 'about' ? 'text-white' : 'text-slate-300 hover:text-white'}`}>Trainers</button>
            <button onClick={() => navigateTo('contact')} className={`px-5 py-2 text-sm font-medium rounded-full transition-all transform hover:scale-105 ${view === 'contact' ? 'bg-blue-50 text-black' : 'bg-white text-black hover:bg-blue-50'}`}>
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900 border-b border-white/10 p-6 flex flex-col space-y-4 shadow-2xl">
            <button onClick={() => navigateTo('services')} className="text-left text-lg text-slate-300 hover:text-white">Services</button>
            <button onClick={() => navigateTo('approach')} className="text-left text-lg text-slate-300 hover:text-white">Approach</button>
            <button onClick={() => navigateTo('about')} className="text-left text-lg text-slate-300 hover:text-white">Trainers</button>
            <button onClick={() => navigateTo('contact')} className="w-full py-3 bg-white text-black font-medium rounded-lg">Contact Us</button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      {view === 'home' && <HomePage navigateTo={navigateTo} />}
      {view === 'about' && <AboutPage />}
      {view === 'contact' && <ContactPage />}
      {view === 'hrd' && <HRDCorpPage />}
      {view === 'privacy' && <PrivacyPolicyPage />}

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6 cursor-pointer" onClick={() => navigateTo('home')}>
                {/* Footer Logo */}
                <img
                  src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumina_logo-v2.png"
                  alt="Lumina 3Sixty"
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
                {/* Fallback Text Logo */}
                <div className="hidden text-2xl font-bold tracking-tighter items-center gap-2" style={{ display: 'none' }}>
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                    <span className="text-white font-serif italic text-xs">L</span>
                  </div>
                  <span>Lumina<span className="text-slate-400 font-light"> 3Sixty</span></span>
                </div>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                Lumina 3Sixty PLT.<br />
                Your premier partner for HRD Corp accredited training. We empower organizations through comprehensive solutions in Automotive Excellence, Soft Skills, and IT Skills.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li onClick={() => navigateTo('about')} className="hover:text-white cursor-pointer">Trainers</li>
                <li onClick={() => navigateTo('hrd')} className="hover:text-white cursor-pointer">HRD Corp Status</li>
                <li onClick={() => navigateTo('contact')} className="hover:text-white cursor-pointer">Contact</li>
                <li onClick={() => navigateTo('privacy')} className="hover:text-white cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Lumina 3Sixty PLT. All rights reserved.</p>
            <p className="text-slate-600 text-xs">Empowering Workforces. Elevating Standards.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
