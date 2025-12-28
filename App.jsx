import React, { useState, useEffect } from 'react';

// --- Icon Components ---
const Icon = ({ children, size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

const Menu = (props) => <Icon {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></Icon>;
const X = (props) => <Icon {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Icon>;
const ChevronRight = (props) => <Icon {...props}><path d="m9 18 6-6-6-6"/></Icon>;
const BarChart3 = (props) => <Icon {...props}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></Icon>;
const Users = (props) => <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>;
const Zap = (props) => <Icon {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>;
const CheckCircle2 = (props) => <Icon {...props}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></Icon>;
const ArrowRight = (props) => <Icon {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></Icon>;
const Mail = (props) => <Icon {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></Icon>;
const Phone = (props) => <Icon {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>;
const MapPin = (props) => <Icon {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></Icon>;
const GraduationCap = (props) => <Icon {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 0 6-1 6-1v-7"/></Icon>;
const Briefcase = (props) => <Icon {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></Icon>;
const Brain = (props) => <Icon {...props}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></Icon>;
const Globe = (props) => <Icon {...props}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></Icon>;
const TrendingUp = (props) => <Icon {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></Icon>;
const Search = (props) => <Icon {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></Icon>;
const Target = (props) => <Icon {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Icon>;
const MessageSquare = (props) => <Icon {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>;

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
    body, html, #root, #__next {
      background-color: #000000 !important;
      color: #ffffff !important;
      min-height: 100vh;
      margin: 0;
      padding: 0;
      scroll-behavior: smooth;
    }
  `}</style>
);

// --- Sub-Components ---

const HomePage = ({ navigateTo }) => (
  <>
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-300 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          HRD Corp Registered Training Provider
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 max-w-5xl mx-auto pb-2">
          A New Class of <br /> Automotive Ownership.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          We move sales teams from "Order Takers" to "Mobility Consultants." 
          Specialized psychology-based training for the modern automotive market.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button onClick={() => navigateTo('contact')} className="group px-8 py-4 bg-white text-black rounded-full font-semibold transition-all hover:bg-blue-50 flex items-center gap-2">
            Start Transformation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="#services" className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-all">
            View Curriculum
          </a>
        </div>
      </div>
    </section>

    {/* Stats/Trust Bar */}
    <section className="border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Training Provider", value: "Class A" },
            { label: "Claimable", value: "100% HRD Corp" },
            { label: "Focus", value: "Automotive" },
            { label: "Approach", value: "Data-Driven" }
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Signature Training Programs</h2>
          <div className="h-1 w-20 bg-blue-500 rounded-full mb-6"></div>
          <p className="text-slate-400 max-w-2xl">
            Our curriculum is SBL-Khas Claimable and designed for high-impact results. 
            Each module is a 2-day intensive workshop tailored to specific seniority levels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Module 1 */}
          <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-400">
                  <Users size={24} />
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                  Foundation
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-1">The Modern Mobility Consultant</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-semibold">Target: Junior - Mid Level</p>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                Rewire your team's mindset from "Order Taker" to trusted Advisor. Master the SPIN Selling framework adapted for automotive to uncover hidden buyer needs.
              </p>
              
              <div className="border-t border-white/10 pt-6 mt-auto">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle2 size={14} className="text-blue-500 mr-2 flex-shrink-0"/> SPIN Selling Framework</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle2 size={14} className="text-blue-500 mr-2 flex-shrink-0"/> Psychology Profiling (4 Types)</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle2 size={14} className="text-blue-500 mr-2 flex-shrink-0"/> The 5-Minute Trust Builder</li>
                </ul>
                <button onClick={() => navigateTo('contact')} className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 group/link">
                  View Agenda <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform"/>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Module 2 */}
          <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
            <div className="relative z-10 flex flex-col h-full">
               <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-400">
                  <Zap size={24} />
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                  Lead Gen
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1">Digital Dominance: Click to Cockpit</h3>
               <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-semibold">Target: Digital / BDC Teams</p>

              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                Stop the scroll. Learn to convert cold Facebook/TikTok leads into hot showroom appointments using video and speed-to-lead psychology.
              </p>

              <div className="border-t border-white/10 pt-6 mt-auto">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle2 size={14} className="text-purple-500 mr-2 flex-shrink-0"/> 60-Second Video Walkarounds</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle2 size={14} className="text-purple-500 mr-2 flex-shrink-0"/> High-Response WhatsApp Scripts</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle2 size={14} className="text-purple-500 mr-2 flex-shrink-0"/> The "Appointment Sell" Method</li>
                </ul>
                <button onClick={() => navigateTo('contact')} className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 group/link">
                  View Agenda <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform"/>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Module 3 */}
          <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
             <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-400">
                  <BarChart3 size={24} />
                </div>
                 <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Advanced
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1">The Profit-Preserving Close</h3>
               <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-semibold">Target: Senior Advisors</p>

              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                Defend your Gross Profit. Advanced negotiation tactics to handle the "Discount Warrior" and close without giving away the margin.
              </p>

              <div className="border-t border-white/10 pt-6 mt-auto">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle2 size={14} className="text-emerald-500 mr-2 flex-shrink-0"/> "Value Stack" Defense Strategy</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle2 size={14} className="text-emerald-500 mr-2 flex-shrink-0"/> Isolating False Objections</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle2 size={14} className="text-emerald-500 mr-2 flex-shrink-0"/> 3 Low-Pressure Closing Loops</li>
                </ul>
                <button onClick={() => navigateTo('contact')} className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 group/link">
                  View Agenda <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Feature Split Section */}
    <section id="approach" className="py-24 bg-gradient-to-r from-black via-slate-900 to-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400 mb-6">
              Why Choose Lumina
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Not Just Training.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Business Transformation.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Most training providers focus on "soft skills." We focus on the metric that matters: <strong>Conversion Rate.</strong>
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-lg">01</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Automotive Specialists</h4>
                  <p className="text-slate-400 text-sm">We don't do generic corporate training. We live and breathe the showroom floor.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-lg">02</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Mystery Audit Included</h4>
                  <p className="text-slate-400 text-sm">We diagnose your team's specific weaknesses before we prescribe the training.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-lg">03</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Immediate ROI</h4>
                  <p className="text-slate-400 text-sm">Selling just 3 extra units covers our entire premium fee.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
               <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                      <div>
                          <p className="text-sm text-slate-500 uppercase">Average Closing Rate</p>
                          <p className="text-3xl font-bold">28%</p>
                      </div>
                       <div className="text-green-400 text-sm font-bold flex items-center">
                          +12% vs Industry
                       </div>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                      <div>
                          <p className="text-sm text-slate-500 uppercase">CSI Score Impact</p>
                          <p className="text-3xl font-bold">96.5</p>
                      </div>
                       <div className="text-green-400 text-sm font-bold flex items-center">
                          +4.5 Points
                       </div>
                  </div>
                   <div className="flex justify-between items-end">
                      <div>
                          <p className="text-sm text-slate-500 uppercase">Gross Profit Retention</p>
                          <p className="text-3xl font-bold">RM 4.2k</p>
                      </div>
                       <div className="text-green-400 text-sm font-bold flex items-center">
                          +RM 800 / Unit
                       </div>
                  </div>
               </div>
               <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs text-slate-500 italic">
                      *Projected results based on Module 3 implementation.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
         <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Elevate?</h2>
         <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
           Schedule your complimentary "Mystery Shopper" audit and let us build a custom roadmap for your dealership.
         </p>
         <button onClick={() => navigateTo('contact')} className="px-10 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
           Get Your Proposal
         </button>
      </div>
    </section>
  </>
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
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
        <div className="lg:w-1/3">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-slate-800 to-black rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden">
             {/* Thiru's Image */}
             <img 
               src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/thiruh_profile_pic.png" 
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
                    <Briefcase size={48} className="text-purple-400"/>
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
            With 28 years of comprehensive experience in the Automotive Industry, Thiruh is a veteran in Sales, After Sales, and Network Development. As a former Chief Operating Officer (COO) for EON Berhad, General Manager of Rolls-Royce Motor Cars Kuala Lumpur, and Manager at Auto Bavaria, he brings a proven track record in turning around dealership profitability and operational efficiency.
          </p>
          <p className="text-slate-300 leading-relaxed">
            His primary focus is on Profitability, Operational Improvement, and Business Intelligence. Having overseen operations with combined revenues close to RM1 Billion, he offers unmatched insights into high-stakes automotive management.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
             <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <TrendingUp size={20} className="text-blue-400 mb-2"/>
                <div className="font-bold text-sm">Strategic Leadership</div>
                <div className="text-xs text-slate-500">COO EON, GM Rolls-Royce</div>
             </div>
             <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <Zap size={20} className="text-purple-400 mb-2"/>
                <div className="font-bold text-sm">Ops Excellence</div>
                <div className="text-xs text-slate-500">Profitability & Process</div>
             </div>
             <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <Globe size={20} className="text-emerald-400 mb-2"/>
                <div className="font-bold text-sm">ASEAN Consultant</div>
                <div className="text-xs text-slate-500">Network Development</div>
             </div>
          </div>
        </div>
      </div>
    </div>

    {/* Caleb's Profile - REARRANGED SECOND */}
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row-reverse gap-12 items-center relative z-10">
        <div className="hidden lg:block lg:w-1/3">
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
                    <GraduationCap size={48} className="text-blue-400"/>
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
                <Globe size={20} className="text-blue-400 mb-2"/>
                <div className="font-bold text-sm">Global Experience</div>
                <div className="text-xs text-slate-500">Saudi Aramco, Apple</div>
             </div>
             <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <Briefcase size={20} className="text-purple-400 mb-2"/>
                <div className="font-bold text-sm">Local Impact</div>
                <div className="text-xs text-slate-500">KPJ, Weststar, TNB</div>
             </div>
             <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <Brain size={20} className="text-emerald-400 mb-2"/>
                <div className="font-bold text-sm">AI Expert</div>
                <div className="text-xs text-slate-500">LLMs & Comp. Vision</div>
             </div>
          </div>
        </div>
      </div>
    </div>

    {/* Jack Zaal's Profile */}
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
        <div className="lg:w-1/3">
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
                    <Globe size={48} className="text-orange-400"/>
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
                <TrendingUp size={20} className="text-orange-400 mb-2"/>
                <div className="font-bold text-sm">Profitability Focus</div>
                <div className="text-xs text-slate-500">Sales & After-Sales</div>
             </div>
             <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <Briefcase size={20} className="text-blue-400 mb-2"/>
                <div className="font-bold text-sm">Brand Portfolio</div>
                <div className="text-xs text-slate-500">Volvo, BMW, Rolls-Royce</div>
             </div>
             <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <Globe size={20} className="text-white mb-2"/>
                <div className="font-bold text-sm">International</div>
                <div className="text-xs text-slate-500">Fluent in 4 Languages</div>
             </div>
          </div>
        </div>
      </div>
    </div>

    {/* Hal Serudin's Profile */}
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row-reverse gap-12 items-center relative z-10">
        <div className="hidden lg:block lg:w-1/3">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-slate-800 to-black rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden">
             {/* Hal's Image */}
             <img 
               src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/hal_profile_pic.png" 
               alt="Hal Serudin - Associate Trainer"
               className="w-full h-full object-cover rounded-2xl absolute inset-0 z-0"
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.nextSibling.style.display = 'block';
               }}
             />
             {/* Fallback Placeholder */}
             <div className="text-center p-8 hidden relative z-10">
                <div className="w-24 h-24 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={48} className="text-pink-400"/>
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
                <MessageSquare size={20} className="text-pink-400 mb-2"/>
                <div className="font-bold text-sm">Crisis Comms</div>
                <div className="text-xs text-slate-500">Expert Management</div>
             </div>
             <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <Briefcase size={20} className="text-purple-400 mb-2"/>
                <div className="font-bold text-sm">Luxury Auto</div>
                <div className="text-xs text-slate-500">Rolls-Royce Global PR</div>
             </div>
             <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <Users size={20} className="text-blue-400 mb-2"/>
                <div className="font-bold text-sm">Mentorship</div>
                <div className="text-xs text-slate-500">Regional Trainer</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const company = formData.get('company');
    const message = formData.get('message');

    const subject = `Lumina 3Sixty Inquiry: ${firstName} ${lastName}`;
    const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`;
    
    window.location.href = `mailto:yzkpremiums@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 mb-6">
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Build Your <br/>Training Roadmap.</h1>
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
                <p className="text-slate-400">training@lumina3sixty.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">Call / WhatsApp</h3>
                <p className="text-slate-400">+60 12-345 6789</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">HQ Location</h3>
                <p className="text-slate-400">Petaling Jaya, Selangor, Malaysia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
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

            <button type="submit" className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-blue-50 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState('home'); // 'home', 'contact', 'about'

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
    link.href = 'https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumima_favicon.png';
  }, []);

  const navigateTo = (target) => {
    setIsMenuOpen(false);
    
    if (target === 'contact') {
      setView('contact');
      window.scrollTo(0, 0);
    } else if (target === 'about') {
      setView('about');
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
              src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumima_logo.png" 
              alt="Lumina 3Sixty" 
              className="h-12 w-auto object-contain"
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

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
               <div className="mb-6 cursor-pointer" onClick={() => navigateTo('home')}>
                {/* Footer Logo */}
                <img 
                  src="https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumima_logo.png" 
                  alt="Lumina 3Sixty" 
                  className="h-10 w-auto object-contain"
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
                Lumina 3Sixty and Service PLT.<br/>
                We bridge the gap between traditional showroom hospitality and modern digital sales psychology.
              </p>
              <div className="flex space-x-4">
                 {/* Social placeholders */}
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer text-slate-400 hover:text-white transition-colors">
                    <Mail size={18}/>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer text-slate-400 hover:text-white transition-colors">
                    <Phone size={18}/>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer text-slate-400 hover:text-white transition-colors">
                    <MapPin size={18}/>
                 </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li onClick={() => navigateTo('services')} className="hover:text-white cursor-pointer">Mobility Consultant</li>
                <li onClick={() => navigateTo('services')} className="hover:text-white cursor-pointer">Digital Dominance</li>
                <li onClick={() => navigateTo('services')} className="hover:text-white cursor-pointer">Profit-Preserving Close</li>
                <li onClick={() => navigateTo('services')} className="hover:text-white cursor-pointer">Management Toolkits</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li onClick={() => navigateTo('about')} className="hover:text-white cursor-pointer">Trainers</li>
                <li onClick={() => navigateTo('home')} className="hover:text-white cursor-pointer">HRD Corp Status</li>
                <li onClick={() => navigateTo('contact')} className="hover:text-white cursor-pointer">Contact</li>
                <li onClick={() => navigateTo('home')} className="hover:text-white cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Lumina 3Sixty and Service PLT. All rights reserved.</p>
            <p className="text-slate-600 text-xs">Designed for Excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
