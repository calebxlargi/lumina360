'use client';
import React, { useState, useEffect } from 'react';

// --- Icon Components (Replacing lucide-react) ---
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
// ---------------------------------------------

// Added generic styles for the custom animation to ensure it doesn't break if tailwind config is missing it
const CustomStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translate3d(0, 20px, 0); }
      to { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    /* CRITICAL FAILSAFE: Forces dark mode even if Tailwind fails to load */
    body, html, #root, #__next {
      background-color: #000000 !important;
      color: #ffffff !important;
      min-height: 100vh;
      margin: 0;
      padding: 0;
    }
  `}</style>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}
      className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden"
    >
      <CustomStyles />
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-serif italic">L</span>
            </div>
            <span>Lumina<span className="text-slate-400 font-light">3Sixty</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Services</a>
            <a href="#approach" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Approach</a>
            <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</a>
            <button className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-blue-50 transition-all transform hover:scale-105">
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
            <a href="#services" className="text-lg text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#approach" className="text-lg text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Approach</a>
            <a href="#about" className="text-lg text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>About</a>
            <button className="w-full py-3 bg-white text-black font-medium rounded-lg">Contact Us</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects - Enhanced visibility */}
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
            <button className="group px-8 py-4 bg-white text-black rounded-full font-semibold transition-all hover:bg-blue-50 flex items-center gap-2">
              Start Transformation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-all">
              View Curriculum
            </button>
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
                  <a href="#" className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 group/link">
                    View Agenda <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform"/>
                  </a>
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
                  <a href="#" className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 group/link">
                    View Agenda <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform"/>
                  </a>
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
                  <a href="#" className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 group/link">
                    View Agenda <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform"/>
                  </a>
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
           <button className="px-10 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
             Get Your Proposal
           </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
               <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white font-serif italic text-xs">L</span>
                </div>
                <span>Lumina<span className="text-slate-400 font-light">3Sixty</span></span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                Lumina3Sixty and Service PLT.<br/>
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
                <li className="hover:text-white cursor-pointer">Mobility Consultant</li>
                <li className="hover:text-white cursor-pointer">Digital Dominance</li>
                <li className="hover:text-white cursor-pointer">Profit-Preserving Close</li>
                <li className="hover:text-white cursor-pointer">Management Toolkits</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">HRD Corp Status</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Lumina3Sixty and Service PLT. All rights reserved.</p>
            <p className="text-slate-600 text-xs">Designed for Excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
