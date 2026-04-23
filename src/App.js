import { useState, useEffect, useRef } from "react";

const OTHER_NAV_LINKS = ["Industries", "How It Works", "About", "FAQ", "Contact"];

const PAIN_POINTS = [
  { icon: "⏰", title: "Drowning in Admin Work", desc: "Your team spends hours on scheduling, follow-ups, and data entry — time that should go toward growing your business." },
  { icon: "📉", title: "Leads Falling Through the Cracks", desc: "Without instant response systems, potential clients move on. Every missed inquiry is lost revenue." },
  { icon: "💸", title: "High Overhead, Thin Margins", desc: "Hiring more staff to handle growth isn't sustainable. There's a smarter, more scalable path forward." },
];

const VISIBILITY_SERVICES = [
  { icon: "📍", title: "Google Business Profile Optimization", desc: "I audit and optimize your Google Business Profile so your business shows up on Google Maps when local customers search for your services. Includes category optimization, description, photos, service listings, and a review strategy.", tag: "Local SEO" },
  { icon: "🔍", title: "Local SEO Audit", desc: "I perform a complete audit of your online presence — analyzing your Google listing, local search visibility, reviews, and directory listings — then deliver a clear action plan to improve your rankings and bring in more customers.", tag: "Audit" },
  { icon: "⭐", title: "Review Management", desc: "I help you build a strong review profile across Google and other platforms — setting up a simple system to request reviews after each job, responding professionally, and monitoring your reputation.", tag: "Reputation" },
  { icon: "📋", title: "Citation & Directory Management", desc: "I make sure your business name, address, and phone number are accurate and consistent across Google, Yelp, Facebook, Angi, Thumbtack, and other directories. Consistency directly improves your Google Maps ranking.", tag: "Citations" },
  { icon: "🌐", title: "Website Development", desc: "I build clean, fast, mobile-friendly websites designed to rank in local search results and turn visitors into customers. Every site includes lead capture forms, click-to-call buttons, and Google Maps integration.", tag: "Web" },
];

const AUTOMATION_SERVICES = [
  { icon: "🤖", title: "AI Chatbot & Lead Capture", desc: "Deploy a 24/7 AI assistant on your website that qualifies leads, answers common questions, and books appointments — even while you sleep.", tag: "Lead Gen" },
  { icon: "💬", title: "AI-Powered Customer Communication", desc: "Automatically respond to missed calls with a text, send personalized follow-ups, and keep the conversation going with AI — so no lead ever feels ignored, even when you're on a job.", tag: "AI Comms" },
  { icon: "🔗", title: "Systems Integration", desc: "Connect your CRM, scheduling tools, email, and more into a unified automated workflow — reducing manual data entry and keeping your business moving even after hours.", tag: "Integration" },
  { icon: "🔄", title: "Workflow Automation", desc: "I automate the repetitive tasks that eat up your day — booking confirmations, appointment reminders, post-job follow-ups, and review requests. Once it's set up, it runs in the background.", tag: "Automation" },
  { icon: "📊", title: "Performance Tracking Setup", desc: "I configure simple, clear reporting so you can see exactly how your automations are performing — leads captured, appointments booked, time saved — without digging through spreadsheets.", tag: "Analytics" },
];

const INDUSTRIES = [
  { name: "Personal Trainers & Gyms", icon: "💪", color: "#f59e0b", headline: "Fill your schedule. Keep your clients.", points: ["Automated lead capture from Instagram & website", "Session reminders that cut no-shows by 40%", "New client onboarding without the back-and-forth", "Missed call text-back so no lead goes unanswered"] },
  { name: "Landscaping & Lawn Care", icon: "🌿", color: "#10b981", headline: "Never miss a lead. Get paid on time.", points: ["Missed call capture — instant text response to every lead", "Automated quote follow-ups at Day 2 and Day 5", "Job scheduling and crew notifications sent automatically", "Post-job follow-ups and invoice reminders on autopilot"] },
  { name: "Contractors & Home Services", icon: "🔨", color: "#3B8BD4", headline: "Win more jobs. Spend less time on admin.", points: ["Automated lead response before competitors call back", "Estimate follow-up sequences that close more jobs", "Appointment confirmations and day-before reminders", "Post-job follow-ups and review requests — fully automated"] },
  { name: "Medical & Dental", icon: "🏥", color: "#0ea5e9", headline: "Free your staff from admin. Focus on patient care.", points: ["Automated appointment scheduling & reminders", "Digital new patient intake forms & follow-ups", "Post-visit check-in & satisfaction follow-ups", "No-show reduction through smart reminder sequences"] },
];

const STEPS = [
  { num: "01", title: "Discovery Call", desc: "I start with a free 30-minute consultation to understand your workflows, pain points, and goals. No jargon, no pressure — just a real conversation." },
  { num: "02", title: "Custom Blueprint", desc: "I map out exactly which agents to build, what tools to connect, and what results to expect — with a clear timeline and transparent pricing tailored to your project." },
  { num: "03", title: "Build & Deploy", desc: "I build, test, and launch your automation stack. Every system is thoroughly tested before going live so it performs reliably from day one." },
  { num: "04", title: "Measure & Optimize", desc: "I track performance from day one and stay available to refine your agents as your business evolves. You'll always know what's working and what can be improved." },
];

const FAQS = [
  { q: "What exactly is AI workflow automation?", a: "It means setting up systems that handle repetitive tasks for you automatically — things like responding to new leads, sending appointment reminders, following up after a job, and requesting reviews. Instead of you or your staff doing these manually, an AI-powered system runs them in the background 24/7. You set it up once, and it keeps working." },
  { q: "How much does this cost?", a: "Every project is different depending on what you need automated. Founding client setup starts at $500, which includes a full custom automation build tailored to your business. Monthly support and optimization runs from $200/mo. I provide a complete transparent quote on your free discovery call — no surprises, no obligation." },
  { q: "How long does it take to get set up?", a: "Most automation systems are fully built, tested, and live within 1–2 weeks. Simpler setups like missed-call text-back or appointment reminders can be done in a few days. I don't launch anything until it's been thoroughly tested, so it works reliably from day one." },
  { q: "Do I need to be tech-savvy to use this?", a: "Not at all. The whole point is that once it's set up, it runs on its own. I handle all the technical work — building, connecting, and testing everything. You'll get a simple walkthrough of how to monitor results, but the system does the heavy lifting." },
  { q: "What kind of businesses do you work with?", a: "I work with small local service businesses — landscapers, contractors, personal trainers, gym owners, dental offices, and home service companies. If you're spending too much time on scheduling, follow-ups, or chasing leads, I can help you automate it." },
  { q: "What happens after my system is live?", a: "I don't disappear after launch. Monthly support includes ongoing monitoring, performance tracking, and adjustments as your business evolves. If something needs tweaking or you want to add a new automation, I handle it. You always know what's working and what can be improved." },
  { q: "What is the AI Coach for athletes?", a: "It's a standalone product I built — a conversational AI endurance coach that reads your real training data (heart rate, power, HRV, sleep, fitness/fatigue trends) and gives you personalized coaching in plain English. It works through Discord, Claude Desktop, and Claude.ai. You just ask \"what should I do today?\" and it tells you. Say \"post it\" and the workout lands on your Intervals.icu calendar, ready to sync to Zwift, Garmin, or Wahoo." },
  { q: "Do I need to be technical to use the AI Coach?", a: "Not at all. I handle the entire setup in a white glove session — connecting your Strava and Intervals.icu accounts, configuring your coaching preferences, installing the system, and walking you through how to use it. After that, you just talk to your Discord bot." },
  { q: "Which AI model does the AI Coach use?", a: "Whichever one you want. The system is model agnostic — it runs on GPT, Grok, Gemini, or fully offline with Ollama on your own hardware. You can switch models anytime. There's no lock-in to any single AI provider." },
];



function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (<div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>{children}</div>);
}

export default function App() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(56);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const dropdownTimeout = useRef(null);

  useEffect(() => { const measure = () => { if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight); }; measure(); window.addEventListener("resize", measure); return () => window.removeEventListener("resize", measure); }, []);
  useEffect(() => { const h = () => { setShowBackToTop(window.scrollY > 400); }; window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const handleServiceNav = (tabIndex) => { setActiveServiceTab(tabIndex); setServicesDropdownOpen(false); setMobileServicesOpen(false); setMenuOpen(false); setTimeout(() => { document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }, 50); };
  const handleDropdownEnter = () => { clearTimeout(dropdownTimeout.current); setServicesDropdownOpen(true); };
  const handleDropdownLeave = () => { dropdownTimeout.current = setTimeout(() => { setServicesDropdownOpen(false); }, 200); };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // Handle deep links like /#ai-coach — wait for page to render, then scroll
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const timer = setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const s = { navy: "#0f172a", slate: "#334155", mid: "#64748b", light: "#f1f5f9", white: "#ffffff", accent: "#0ea5e9", accentDark: "#0369a1", border: "#e2e8f0" };
  const activeServices = activeServiceTab === 0 ? AUTOMATION_SERVICES : VISIBILITY_SERVICES;
  const activeTagBg = activeServiceTab === 0 ? "#f0f9ff" : "#ecfdf5";
  const activeTagColor = activeServiceTab === 0 ? "#0369a1" : "#065f46";

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: s.white, color: s.navy, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .playfair { font-family: 'Playfair Display', serif; }
        a { text-decoration: none; color: inherit; cursor: pointer; }
        ::selection { background: #bae6fd; }
        .nav-link { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: #334155; cursor: pointer; transition: color 0.2s; padding: 4px 0; position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1.5px; background: #0ea5e9; transition: width 0.25s; }
        .nav-link:hover { color: #0ea5e9; }
        .nav-link:hover::after { width: 100%; }
        .btn-primary { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; background: #0f172a; color: #fff; border: none; padding: 13px 28px; border-radius: 6px; cursor: pointer; transition: background 0.2s, transform 0.15s; letter-spacing: 0.3px; }
        .btn-primary:hover { background: #0ea5e9; transform: translateY(-1px); }
        .btn-outline { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; background: transparent; color: #0f172a; border: 1.5px solid #0f172a; padding: 12px 28px; border-radius: 6px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.3px; }
        .btn-outline:hover { background: #0f172a; color: #fff; transform: translateY(-1px); }
        .service-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; transition: all 0.25s; cursor: default; height: 100%; display: flex; flex-direction: column; }
        .service-card:hover { border-color: #0ea5e9; box-shadow: 0 8px 32px rgba(14,165,233,0.1); transform: translateY(-3px); }
        .industry-btn { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; padding: 10px 22px; border-radius: 6px; cursor: pointer; border: 1.5px solid #e2e8f0; background: #fff; color: #334155; transition: all 0.2s; }
        .industry-btn.active { background: #0f172a; color: #fff; border-color: #0f172a; }
        .industry-btn:hover:not(.active) { border-color: #0ea5e9; color: #0ea5e9; }
        .service-tab-btn { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 6px; cursor: pointer; border: 1.5px solid #e2e8f0; background: #fff; color: #334155; transition: all 0.2s; }
        .service-tab-btn.active { background: #0f172a; color: #fff; border-color: #0f172a; }
        .service-tab-btn:hover:not(.active) { border-color: #0ea5e9; color: #0ea5e9; }
        .step-card { border-left: 2px solid #e2e8f0; padding-left: 28px; transition: border-color 0.2s; }
        .step-card:hover { border-color: #0ea5e9; }
        input, textarea { font-family: 'DM Sans', sans-serif; font-size: 14px; width: 100%; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 13px 16px; color: #0f172a; outline: none; transition: border-color 0.2s; background: #fff; }
        input:focus, textarea:focus { border-color: #0ea5e9; }
        textarea { resize: vertical; min-height: 110px; }
        label { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #334155; display: block; margin-bottom: 6px; }
        .back-to-top-btn { position: fixed; bottom: 32px; right: 32px; width: 48px; height: 48px; border-radius: 50%; background: #0f172a; color: #fff; border: none; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; z-index: 200; transition: opacity 0.3s, transform 0.3s, background 0.2s; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
        .back-to-top-btn:hover { background: #0ea5e9; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(14,165,233,0.3); }
        .services-dropdown { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 12px 40px rgba(0,0,0,0.1); padding: 8px; min-width: 240px; z-index: 150; }
        .services-dropdown-item { font-family: 'DM Sans', sans-serif; display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 6px; cursor: pointer; transition: background 0.15s; font-size: 14px; font-weight: 500; color: #334155; }
        .services-dropdown-item:hover { background: #f0f9ff; color: #0ea5e9; }
        .services-dropdown-item .dd-sub { font-size: 12px; color: #94a3b8; font-weight: 400; margin-top: 1px; }
        .mobile-services-sub-item { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 400; color: #64748b; padding: 10px 0 10px 16px; cursor: pointer; border-bottom: 1px solid #f8fafc; display: flex; align-items: center; gap: 8px; }
        .mobile-services-sub-item:hover { color: #0ea5e9; }
        .faq-item { border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 12px; overflow: hidden; transition: border-color 0.2s; background: #fff; }
        .faq-item:hover { border-color: #cbd5e1; }
        .faq-q { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; color: #0f172a; padding: 20px 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; user-select: none; }
        .faq-q:hover { color: #0ea5e9; }
        .faq-a { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; color: #64748b; line-height: 1.75; padding: 0 24px 20px; }
        section[id] { scroll-margin-top: 120px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
          .nav-inner { height: 56px !important; }
          .ann-bar { display: none !important; }
          .hero-sub { font-size: 16px !important; }
          .hero-buttons { flex-direction: column !important; gap: 12px !important; width: 100% !important; align-items: stretch !important; }
          .hero-btn-primary { width: 100% !important; padding: 16px 24px !important; font-size: 15px !important; font-weight: 600 !important; background: #0f172a !important; color: #fff !important; border-radius: 6px !important; text-align: center; }
          .hero-btn-outline { width: 100% !important; padding: 15px 24px !important; font-size: 15px !important; background: transparent !important; color: #0f172a !important; border: 1.5px solid #0f172a !important; border-radius: 6px !important; text-align: center; }
          .hero-stats { gap: 24px !important; }
          .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .industry-panel { grid-template-columns: 1fr !important; gap: 32px !important; }
          .about-badge { display: none !important; }
          .industry-btn { flex: 1 1 auto; min-width: 140px; text-align: center; }
          .service-tab-btn { flex: 1 1 auto; text-align: center; font-size: 13px !important; padding: 10px 16px !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
          section:not(:first-of-type) { padding-top: 64px !important; padding-bottom: 64px !important; }
          .nav-logo-img { height: 34px !important; }
          * { max-width: 100%; }
          img { max-width: 100%; height: auto; }
          .back-to-top-btn { bottom: 20px !important; right: 20px !important; width: 42px !important; height: 42px !important; font-size: 18px !important; }
          .service-grid { grid-template-columns: 1fr !important; }
          .arch-flow { grid-template-columns: 1fr !important; gap: 8px !important; }
          .arch-arrow { transform: rotate(90deg); text-align: center; padding: 4px 0 !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .cta-grid { grid-template-columns: 1fr !important; }
          .ghl-form-iframe { height: 750px !important; }
          section[id] { scroll-margin-top: 72px !important; }
        }
        @media (min-width: 769px) { .hamburger { display: none !important; } .mobile-menu { display: none !important; } }
      `}</style>

      {/* HEADER */}
      <div ref={headerRef} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", flexDirection: "column" }}>
        <div className="ann-bar" style={{ width: "100%", background: "#92400e", color: "#ffffff", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "6px", minHeight: "44px", fontSize: "13px", padding: "10px 16px", textAlign: "center", boxSizing: "border-box" }}>
          <span>🎯 Founding client rate: $500 setup fee — only 3 spots left.</span>
          <span onClick={() => scrollTo("founding-clients")} style={{ color: "#fff", fontWeight: 700, cursor: "pointer", textDecoration: "underline", whiteSpace: "nowrap" }}>Claim Your Spot →</span>
        </div>
        <nav style={{ position: "relative", width: "100%", background: "#ffffff", borderBottom: "1px solid #e2e8f0", transition: "all 0.3s ease", padding: "0 5vw" }}>
          <div className="nav-inner" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
            <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <img src="/SharmaAutomationIcon.png" alt="Sharma Automation Logo" className="nav-logo-img" style={{ height: 42, width: "auto", objectFit: "contain" }} />
            </div>
            <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
              <div onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave} style={{ position: "relative" }}>
                <span className="nav-link" onClick={() => scrollTo("services")} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  Services
                  <svg width="10" height="6" viewBox="0 0 10 6" style={{ marginTop: 1, transition: "transform 0.2s", transform: servicesDropdownOpen ? "rotate(180deg)" : "rotate(0)" }}><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div className="services-dropdown" style={{ opacity: servicesDropdownOpen ? 1 : 0, pointerEvents: servicesDropdownOpen ? "auto" : "none", transform: servicesDropdownOpen ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-8px)", transition: "opacity 0.2s, transform 0.2s" }}>
                  <div className="services-dropdown-item" onClick={() => handleServiceNav(0)}>
                    <span style={{ fontSize: 16 }}>🤖</span>
                    <div><div>Automate Your Business</div><div className="dd-sub">Chatbots, Workflows, Integrations</div></div>
                  </div>
                  <div className="services-dropdown-item" onClick={() => handleServiceNav(1)}>
                    <span style={{ fontSize: 16 }}>📍</span>
                    <div><div>Get Found Online</div><div className="dd-sub">Google Maps, SEO, Reviews</div></div>
                  </div>
                  <div style={{ height: 1, background: "#e2e8f0", margin: "4px 8px" }} />
                  <div className="services-dropdown-item" onClick={() => { setServicesDropdownOpen(false); setMenuOpen(false); setTimeout(() => { document.getElementById("ai-coach")?.scrollIntoView({ behavior: "smooth" }); }, 50); }}>
                    <span style={{ fontSize: 16 }}>🏃</span>
                    <div><div>AI Coach for Athletes</div><div className="dd-sub">Endurance Training AI</div></div>
                  </div>
                </div>
              </div>
              {OTHER_NAV_LINKS.map(l => (<span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase().replaceAll(" ", "-"))}>{l}</span>))}
              <button className="btn-primary" onClick={() => window.open('https://api.leadconnectorhq.com/widget/booking/l0FfSuPINhd1ypD8cyiX', '_blank')} style={{ padding: "10px 22px" }}>Book Free Call</button>
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <div style={{ width: 24, height: 2, background: menuOpen ? s.accent : s.navy, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <div style={{ width: 24, height: 2, background: s.navy, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <div style={{ width: 24, height: 2, background: menuOpen ? s.accent : s.navy, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}
      <div className="mobile-menu" style={{ display: "none", position: "fixed", top: headerHeight, left: 0, right: 0, zIndex: 101, background: "rgba(255,255,255,0.98)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0", flexDirection: "column", padding: "16px 24px 24px", transform: menuOpen ? "translateY(0)" : "translateY(-120%)", visibility: menuOpen ? "visible" : "hidden", transition: "transform 0.3s ease, visibility 0.3s ease", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
        <span onClick={() => setMobileServicesOpen(!mobileServicesOpen)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, color: s.navy, padding: "14px 0", borderBottom: "1px solid #f1f5f9", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          Services
          <svg width="10" height="6" viewBox="0 0 10 6" style={{ transition: "transform 0.2s", transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0)" }}><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <div style={{ maxHeight: mobileServicesOpen ? "200px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
          <div className="mobile-services-sub-item" onClick={() => handleServiceNav(0)}>🤖 Automate Your Business</div>
          <div className="mobile-services-sub-item" onClick={() => handleServiceNav(1)}>📍 Get Found Online</div>
          <div className="mobile-services-sub-item" onClick={() => { setMenuOpen(false); setTimeout(() => { document.getElementById("ai-coach")?.scrollIntoView({ behavior: "smooth" }); }, 50); }}>🏃 AI Coach for Athletes</div>
        </div>
        {OTHER_NAV_LINKS.map(l => (<span key={l} onClick={() => scrollTo(l.toLowerCase().replaceAll(" ", "-"))} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, color: s.navy, padding: "14px 0", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}>{l}</span>))}
        <button className="btn-primary" onClick={() => { window.open('https://api.leadconnectorhq.com/widget/booking/l0FfSuPINhd1ypD8cyiX', '_blank'); setMenuOpen(false); }} style={{ marginTop: 16, padding: "14px", fontSize: 15, textAlign: "center" }}>Book Free Call</button>
      </div>

      {/* HERO */}
      <section style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f8fafc 0%, #f0f9ff 50%, #f8fafc 100%)", display: "flex", alignItems: "center", padding: `${headerHeight}px 5vw 80px`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 40, left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,23,42,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "8%", opacity: 0.06, pointerEvents: "none" }}>{[...Array(5)].map((_, i) => (<div key={i} style={{ width: 200 - i * 30, height: 200 - i * 30, border: "1px solid #0f172a", borderRadius: "50%", position: "absolute", top: i * 15, left: i * 15 }} />))}</div>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "6px 14px", marginBottom: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }} />
              <span className="dm" style={{ fontSize: 12, fontWeight: 500, color: s.slate, letterSpacing: "0.5px" }}>NOW ONBOARDING SMALL BUSINESSES</span>
            </div>
            <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>
            <h1 className="playfair" style={{ fontSize: "clamp(32px, 8vw, 66px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 24, color: s.navy }}>Put Your Business<br /><span style={{ color: s.accent }}>On Autopilot</span> With AI.</h1>
            <p className="dm hero-sub" style={{ fontSize: 18, color: s.mid, lineHeight: 1.75, marginBottom: 40, maxWidth: 520, fontWeight: 300 }}>I build AI-powered automation systems for small businesses — handling your leads, follow-ups, scheduling, and customer communication so you can focus on the work that actually makes you money.</p>
            <div className="hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <button className="btn-primary hero-btn-primary" onClick={() => window.open('https://api.leadconnectorhq.com/widget/booking/l0FfSuPINhd1ypD8cyiX', '_blank')} style={{ fontSize: 15, padding: "15px 34px" }}>Book a Free Consultation</button>
              <button className="btn-outline hero-btn-outline" onClick={() => scrollTo("how-it-works")} style={{ fontSize: 15, padding: "14px 34px" }}>See How It Works</button>
            </div>
            <div style={{ marginTop: 52, display: "flex", gap: 36, flexWrap: "wrap" }}>
              {[["1-on-1", "Personal Attention"], ["100%", "Custom Built For You"], ["Free", "Discovery Call"]].map(([val, label]) => (<div key={label}><div className="playfair" style={{ fontSize: 28, fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>{val}</div><div className="dm" style={{ fontSize: 12, color: s.mid, marginTop: 2, letterSpacing: "0.3px" }}>{label}</div></div>))}
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section style={{ padding: "96px 5vw", background: s.navy }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 60 }}><p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Sound Familiar?</p><h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>Your Business Deserves Better Than This</h2></div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "stretch" }}>
            {PAIN_POINTS.map((p, i) => (<FadeIn key={p.title} delay={i * 0.12}><div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "32px 28px", height: "100%" }}><div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div><h3 className="playfair" style={{ fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 12 }}>{p.title}</h3><p className="dm" style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.75, fontWeight: 300 }}>{p.desc}</p></div></FadeIn>))}
          </div>
        </div>
      </section>

      {/* SERVICES — TABBED */}
      <section id="services" style={{ padding: "96px 5vw", background: s.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>What I Do</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", marginBottom: 16 }}>Two Ways I Help Your Business Grow</h2>
              <p className="dm" style={{ fontSize: 16, color: s.mid, maxWidth: 560, margin: "0 auto 32px", fontWeight: 300, lineHeight: 1.7 }}>Automate the work that's eating your day, and get found by more customers online — so your business grows without adding hours to your schedule.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className={`service-tab-btn${activeServiceTab === 0 ? " active" : ""}`} onClick={() => setActiveServiceTab(0)}>🤖 Automate Your Business</button>
                <button className={`service-tab-btn${activeServiceTab === 1 ? " active" : ""}`} onClick={() => setActiveServiceTab(1)}>📍 Get Found Online</button>
              </div>
            </div>
          </FadeIn>
          <FadeIn><p className="dm" style={{ textAlign: "center", fontSize: 14, color: s.mid, marginBottom: 32, fontWeight: 300 }}>{activeServiceTab === 0 ? "Stop doing manually what a system can handle for you." : "Show up on Google Maps. Build your reviews. Get more customers calling you."}</p></FadeIn>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, alignItems: "stretch" }}>
            {activeServices.map((sv, i) => (
              <FadeIn key={sv.title} delay={i * 0.08}>
                <div className="service-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <span style={{ fontSize: 28 }}>{sv.icon}</span>
                    <span className="dm" style={{ fontSize: 11, background: activeTagBg, color: activeTagColor, padding: "4px 10px", borderRadius: 20, fontWeight: 600, letterSpacing: "0.5px" }}>{sv.tag}</span>
                  </div>
                  <h3 className="playfair" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: s.navy }}>{sv.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: s.mid, lineHeight: 1.75, fontWeight: 300 }}>{sv.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" style={{ padding: "96px 5vw", background: s.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Industries I Serve</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>Built For Your Industry</h2>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
              {INDUSTRIES.map((ind, i) => (<button key={ind.name} className={`industry-btn${activeIndustry === i ? " active" : ""}`} onClick={() => setActiveIndustry(i)}>{ind.icon} {ind.name}</button>))}
            </div>
          </FadeIn>
          <FadeIn>
            <div className="industry-panel" style={{ background: s.light, borderRadius: 16, padding: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, border: "1px solid #e2e8f0" }}>
              <div>
                <div style={{ display: "inline-block", padding: "8px 16px", borderRadius: 6, background: INDUSTRIES[activeIndustry].color + "15", color: INDUSTRIES[activeIndustry].color, fontSize: 12, fontWeight: 600, letterSpacing: "1px", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", marginBottom: 20 }}>{INDUSTRIES[activeIndustry].icon} {INDUSTRIES[activeIndustry].name}</div>
                <h3 className="playfair" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: s.navy, lineHeight: 1.25, marginBottom: 20 }}>{INDUSTRIES[activeIndustry].headline}</h3>
                <button className="btn-primary" onClick={() => scrollTo("contact")}>Talk To Me About {INDUSTRIES[activeIndustry].name} →</button>
              </div>
              <div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                  {INDUSTRIES[activeIndustry].points.map((pt, i) => (<li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}><div style={{ width: 22, height: 22, borderRadius: "50%", background: INDUSTRIES[activeIndustry].color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}><svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></div><span className="dm" style={{ fontSize: 15, color: s.slate, lineHeight: 1.6 }}>{pt}</span></li>))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "96px 5vw", background: s.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 64 }}><p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>The Process</p><h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>From Zero to Automated in 4 Steps</h2></div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {STEPS.map((step, i) => (<FadeIn key={step.num} delay={i * 0.1}><div className="step-card"><div className="playfair" style={{ fontSize: 42, fontWeight: 700, color: "#e2e8f0", marginBottom: 12, lineHeight: 1 }}>{step.num}</div><h3 className="playfair" style={{ fontSize: 19, fontWeight: 600, color: s.navy, marginBottom: 12 }}>{step.title}</h3><p className="dm" style={{ fontSize: 14, color: s.mid, lineHeight: 1.8, fontWeight: 300 }}>{step.desc}</p></div></FadeIn>))}
          </div>
        </div>
      </section>

      {/* RESULTS / SOCIAL PROOF */}
      <section style={{ padding: "72px 5vw", background: s.navy }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>What You Get</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>Systems That Work While You Don't</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              { icon: "🕐", stat: "24/7", label: "Lead Capture & Response", desc: "Your AI system never sleeps. Every inquiry gets an instant response — nights, weekends, holidays." },
              { icon: "⚡", stat: "<60s", label: "Average Response Time", desc: "Leads hear back in under a minute. Your competitors take hours. Speed wins jobs." },
              { icon: "📅", stat: "90%", label: "Less Admin Time", desc: "Scheduling, reminders, follow-ups, and review requests — all handled automatically." },
              { icon: "🚀", stat: "1–2 Weeks", label: "From Call to Live System", desc: "No drawn-out timelines. Your automation stack is built, tested, and running fast." },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "32px 24px", textAlign: "center", height: "100%" }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                  <div className="playfair" style={{ fontSize: 36, fontWeight: 700, color: s.accent, marginBottom: 4 }}>{item.stat}</div>
                  <div className="dm" style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{item.label}</div>
                  <p className="dm" style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "96px 5vw", background: s.white }}>
        <div className="two-col" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <FadeIn>
            <div style={{ position: "relative" }}>
              <div style={{ width: "100%", borderRadius: 16, overflow: "hidden", border: "1px solid #bae6fd" }}>
                <img
                  src="/AIHeadshot.png"
                  alt="Rohit Sharma - Sharma Automation"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <div className="about-badge" style={{ position: "absolute", bottom: -20, right: -20, background: s.navy, borderRadius: 12, padding: "18px 22px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}><div className="playfair" style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>Free</div><div className="dm" style={{ fontSize: 11, color: "#94a3b8", letterSpacing: "0.5px" }}>Discovery Call</div></div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>About</p>
              <h2 className="playfair" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 20 }}>Real Expertise.<br />No Fluff.</h2>
              <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 20, fontWeight: 300 }}>I'm Rohit Sharma, and I started Sharma Automation with one simple goal — to help small business owners stop spending their evenings doing work that a system could handle for them.</p>
              <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 20, fontWeight: 300 }}>I'm building this business one client at a time, which means when you work with me, you get my full attention — not a ticket number. Every system I build starts with a real conversation about how YOUR business actually works.</p>
              <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 32, fontWeight: 300 }}>I'm currently taking on a small number of founding clients — businesses that want to get ahead of the automation curve before their competitors do. If that's you, let's talk.</p>
              <div style={{ display: "flex", gap: 32 }}>
                {[["AI Automation", "Custom Built"], ["Workflow", "End-to-end"], ["Local SEO", "Google Maps"]].map(([title, sub]) => (<div key={title}><div className="dm" style={{ fontSize: 13, fontWeight: 600, color: s.navy, marginBottom: 2 }}>{title}</div><div className="dm" style={{ fontSize: 12, color: s.mid }}>{sub}</div></div>))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* AI COACH — PORTFOLIO TEASER */}
      <section id="ai-coach" style={{ padding: "96px 5vw", background: s.navy }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ display: "inline-block", background: "rgba(14,165,233,0.15)", color: s.accent, fontSize: 11, fontWeight: 700, letterSpacing: "2px", padding: "4px 14px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", marginBottom: 20 }}>FEATURED BUILD</div>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", marginBottom: 16 }}>AI Coach for Endurance Athletes</h2>
              <p className="dm" style={{ fontSize: 18, color: s.accent, fontWeight: 500, marginBottom: 16, fontStyle: "italic" }}>"Your coach follows you -- you don't follow your coach."</p>
              <p className="dm" style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.75, maxWidth: 680, margin: "0 auto", fontWeight: 300 }}>I built a full-stack AI coaching system from scratch. It connects to real training platforms, analyzes an athlete's actual performance data, and delivers personalized daily coaching through Discord. One conversation, and the workout lands on their calendar, ready to sync to Garmin or Zwift.</p>
            </div>
          </FadeIn>

          {/* YouTube Demo Embed */}
          <FadeIn delay={0.1}>
            <div style={{ maxWidth: 800, margin: "0 auto 56px", borderRadius: 12, overflow: "hidden", border: "2px solid rgba(14,165,233,0.3)", boxShadow: "0 12px 48px rgba(0,0,0,0.3)" }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/oAYBbpXXWI0"
                  title="Sharma AI Coach Demo"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </FadeIn>

          {/* What This Demonstrates */}
          <FadeIn delay={0.15}>
            <div style={{ marginBottom: 56 }}>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", fontWeight: 600 }}>What This Build Demonstrates</p>
              </div>
              <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                {[
                  { icon: "🤖", title: "Custom AI Agent", desc: "A conversational AI that reasons about real data and gives actionable recommendations -- not canned responses." },
                  { icon: "🔗", title: "Live Data Integration", desc: "Connected to Strava, Intervals.icu, and wearable devices. Real-time data flowing into every coaching decision." },
                  { icon: "📱", title: "Multi-Platform Delivery", desc: "One system, accessible from Discord, Claude Desktop, and Claude.ai simultaneously via MCP." },
                  { icon: "📦", title: "Packaged Product", desc: "Full installer, setup wizard, settings GUI, and automated onboarding. Ready to hand to a client." },
                ].map((item, i) => (
                  <div key={item.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "24px 20px", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(14,165,233,0.4)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
                    <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
                    <h3 className="dm" style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{item.title}</h3>
                    <p className="dm" style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Architecture Flow (compact) */}
          <FadeIn delay={0.2}>
            <div style={{ marginBottom: 56 }}>
              <div className="arch-flow" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 0, alignItems: "center", maxWidth: 800, margin: "0 auto" }}>
                <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                  <p className="dm" style={{ fontSize: 10, letterSpacing: "2px", color: "#10b981", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Data Sources</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {["Strava", "Intervals.icu", "Wearables"].map(item => (
                      <span key={item} className="dm" style={{ fontSize: 12, color: "#94a3b8", fontWeight: 300 }}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="arch-arrow" style={{ color: "#475569", fontSize: 22, padding: "0 10px" }}>→</div>
                <div style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                  <p className="dm" style={{ fontSize: 10, letterSpacing: "2px", color: s.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>AI Engine</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {["10 MCP Tools", "Any LLM Provider", "Sports Science"].map(item => (
                      <span key={item} className="dm" style={{ fontSize: 12, color: "#94a3b8", fontWeight: 300 }}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="arch-arrow" style={{ color: "#475569", fontSize: 22, padding: "0 10px" }}>→</div>
                <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                  <p className="dm" style={{ fontSize: 10, letterSpacing: "2px", color: "#f59e0b", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Delivery</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {["Discord", "Claude Desktop", "Calendar Sync"].map(item => (
                      <span key={item} className="dm" style={{ fontSize: 12, color: "#94a3b8", fontWeight: 300 }}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Dual CTAs */}
          <FadeIn delay={0.25}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <div className="cta-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 700, width: "100%" }}>
                <button className="btn-primary" onClick={() => window.location.href = '/ai-coach'} style={{ width: "100%", textAlign: "center", padding: "16px 24px", background: s.accent, fontSize: 15, borderRadius: 8 }}>See the Full AI Coach Page →</button>
                <button className="btn-primary" onClick={() => window.open('https://api.leadconnectorhq.com/widget/booking/l0FfSuPINhd1ypD8cyiX', '_blank')} style={{ width: "100%", textAlign: "center", padding: "16px 24px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", fontSize: 15, borderRadius: 8 }}>Want Something Like This? →</button>
              </div>
              <p className="dm" style={{ fontSize: 13, color: "#64748b", fontWeight: 300 }}>Athlete? Check out the AI Coach. Business owner? Let's talk about what I can build for you.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "96px 5vw", background: s.light }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Common Questions</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>Frequently Asked Questions</h2>
            </div>
          </FadeIn>
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="faq-item" style={{ borderColor: faqOpen === i ? s.accent : "#e2e8f0" }}>
                <div className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <span>{faq.q}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0, transition: "transform 0.25s", transform: faqOpen === i ? "rotate(45deg)" : "rotate(0)" }}>
                    <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ maxHeight: faqOpen === i ? "300px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
                  <div className="faq-a">{faq.a}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FOUNDING CLIENT BANNER */}
      <section id="founding-clients" style={{ padding: "72px 5vw", background: s.white }}>
        <FadeIn>
          <div style={{ maxWidth: 960, margin: "0 auto", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: 40, textAlign: "center" }}>
            <div style={{ display: "inline-block", background: "#fef3c7", color: "#92400e", fontSize: 11, fontWeight: 700, letterSpacing: "2px", padding: "4px 12px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", marginBottom: 20 }}>LIMITED AVAILABILITY</div>
            <h2 className="playfair" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", marginBottom: 20 }}>Now Accepting Founding Clients</h2>
            <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, maxWidth: 700, margin: "0 auto 32px", fontWeight: 300 }}>I'm currently taking on 3 founding clients at a specially reduced rate in exchange for an honest case study and testimonial. Founding client setup fee: $500 (normally $1,000+). Monthly support from $200/mo. You get a fully built automation system that pays for itself in the first month. I get real-world experience and a story to tell. If you're a personal trainer, gym owner, landscaper, or contractor — this offer is for you.</p>
            <button className="btn-primary" onClick={() => window.open('https://api.leadconnectorhq.com/widget/booking/l0FfSuPINhd1ypD8cyiX', '_blank')} style={{ fontSize: 15, padding: "15px 34px", background: "#92400e" }}>Claim a Founding Client Spot →</button>
          </div>
        </FadeIn>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "72px 5vw", background: s.navy }}>
        <FadeIn>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <h2 className="playfair" style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", marginBottom: 16 }}>Ready to Grow Your Business?</h2>
            <p className="dm" style={{ fontSize: 16, color: "#94a3b8", marginBottom: 36, lineHeight: 1.7, fontWeight: 300 }}>Book a free 30-minute discovery call. I'll show you exactly what's possible — no commitment required.</p>
            <button className="btn-primary" onClick={() => window.open('https://api.leadconnectorhq.com/widget/booking/l0FfSuPINhd1ypD8cyiX', '_blank')} style={{ fontSize: 15, padding: "16px 38px", background: s.accent }}>Book My Free Call →</button>
          </div>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "96px 5vw", background: s.light }}>
        <div className="two-col" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <FadeIn>
            <div>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Get In Touch</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", marginBottom: 20 }}>Let's Talk About<br />Your Business</h2>
              <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 40, fontWeight: 300 }}>Fill out the form and I'll get back to you within 24 hours. Founding client setup fees start from $500 — a fraction of what you'll recover in the first month. Monthly support from $200/mo. A full transparent quote is provided on your free call with no obligation.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[["📧", "Email", "Sharma@SharmaAutomation.com"], ["📍", "Based In", "Randolph, New Jersey"], ["⏱️", "Response Time", "Within 24 Hours"]].map(([icon, label, val]) => (<div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 40, height: 40, background: "#fff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e2e8f0", fontSize: 18 }}>{icon}</div><div><div className="dm" style={{ fontSize: 11, color: s.mid, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</div><div className="dm" style={{ fontSize: 14, color: s.navy, fontWeight: 500 }}>{val}</div></div></div>))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ borderRadius: 16, overflow: "hidden" }}>
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/jUedMA7PglKtkEaVgXMg"
                className="ghl-form-iframe"
                style={{ width: "100%", height: 650, border: "none", display: "block" }}
                scrolling="no"
                id="inline-jUedMA7PglKtkEaVgXMg"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Sharma Automation Contact Form"
                data-height="650"
                data-layout-iframe-id="inline-jUedMA7PglKtkEaVgXMg"
                data-form-id="jUedMA7PglKtkEaVgXMg"
                title="Sharma Automation Contact Form"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: s.navy, padding: "40px 5vw", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}><img src="/SharmaAutomationIcon.png" alt="Sharma Automation Logo" style={{ height: 36, width: "auto", objectFit: "contain" }} /></div>
          <div style={{ display: "flex", gap: 28 }}>
            {["Services", ...OTHER_NAV_LINKS].map(l => (<span key={l} className="dm" onClick={() => scrollTo(l.toLowerCase().replaceAll(" ", "-"))} style={{ fontSize: 13, color: "#64748b", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#64748b"}>{l}</span>))}
          </div>
          <p className="dm" style={{ fontSize: 12, color: "#475569" }}>© 2026 Sharma Automation. All rights reserved.</p>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ opacity: showBackToTop ? 0.85 : 0, pointerEvents: showBackToTop ? "auto" : "none", transform: showBackToTop ? "translateY(0)" : "translateY(12px)" }} aria-label="Back to top">↑</button>
    </div>
  );
}
