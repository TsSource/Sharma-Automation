import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE: Sharma Automation Consulting (Wave CONSULT-1)
   sharmaautomation.com/

   One service, three steps: AI Fit Assessment, Build, Support.
   Booking runs through the GoHighLevel LeadConnector widget.
   Section copy is ratified and must not be reworded.
═══════════════════════════════════════════════════════════════ */

const NAV_LINKS = ["How It Works", "Examples", "About", "FAQ", "Contact"];

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/l0FfSuPINhd1ypD8cyiX";

const STEPS = [
  {
    num: "01",
    label: "Step 1",
    title: "AI Fit Assessment",
    body: "One call about how your business runs day to day. Within a week you get a written plan: the exact systems worth building, what each costs per month, the hours or jobs it recovers, and the payback in weeks. If AI is not a fit for your business, the plan says so. That answer costs the same and saves you thousands.",
    pricing: "Small business (owner-run, under roughly 10 people): $1,500. Larger operations: scoped on the fit call, typically $3,500 to $5,000. 50% of your assessment cost is credited toward any build.",
  },
  {
    num: "02",
    label: "Step 2",
    title: "Build",
    body: "I build and install any system from your plan at a fixed price quoted per line item. There is no hourly meter. You own everything; nothing is held hostage.",
  },
  {
    num: "03",
    label: "Step 3",
    title: "Support",
    body: "Optional monthly plan covering everything I built: next-business-day response, fixes included, small tweaks included, new features quoted. From $250/month, scoped in writing.",
  },
];

const SCENARIOS = [
  {
    icon: "🔌",
    title: "The electrician",
    problem: "On a ladder all day, calls go to voicemail, and callers dial the next name on Google.",
    fix: "missed calls get a text back in 30 seconds, an AI assistant books the estimate, and quotes get automatic day-2 and day-5 follow-ups.",
    payoff: "Recover two jobs a month at $400 each and the system pays for itself several times over every month.",
  },
  {
    icon: "🧾",
    title: "The accounting office",
    problem: "Staff spends hours a week chasing client documents, retyping data, and answering the same onboarding questions.",
    fix: "automated document collection with reminders, AI extraction into your existing software, and an assistant that answers routine client questions.",
    payoff: "That recovers 6 to 8 staff-hours a week, which at billable rates is four figures a month in capacity.",
  },
  {
    icon: "🛍️",
    title: "The online boutique",
    problem: 'Nights lost to "where\'s my order?" emails, and slow replies kill sales.',
    fix: "an AI assistant on the site and inbox that handles order status, sizing, and returns instantly, and escalates the rest.",
    payoff: "Roughly 70% of tickets get answered without you, replies go out in seconds instead of hours, and fewer carts get abandoned.",
  },
  {
    icon: "📦",
    title: "The small distributor",
    problem: "Quotes take two or three days because someone has to read the spec sheet, check stock, and type it up, and slow quotes lose bids.",
    fix: "AI reads the incoming request and drafts the quote from your price list and inventory, then a human approves and sends.",
    payoff: "Quotes go out same day, and one extra won bid a month typically covers the system's annual cost.",
  },
];

const FAQS = [
  {
    q: "What does the assessment cost and what do I get?",
    a: "$1,500 for owner-run businesses under roughly 10 people. Larger operations are scoped on the fit call, typically $3,500 to $5,000. You get a written plan listing each recommended system, its monthly cost, the time or jobs it recovers, and the payback period. 50% of the assessment cost is credited toward any build.",
  },
  {
    q: "What happens on the free fit call?",
    a: "Fifteen minutes on how your business runs. Its only purpose is to decide whether the assessment is worth your money. If it isn't, I'll say so on the call.",
  },
  {
    q: "What if AI is not a fit for my business?",
    a: "Then your plan says exactly that, and it costs the same. You keep the plan either way. You will never get a recommendation whose only job is to sell you a build.",
  },
  {
    q: "Do I own the systems you build?",
    a: "Yes. Accounts are created in your name, documentation is handed over, and nothing is held hostage. You can run everything without me.",
  },
  {
    q: "What does the support plan cover?",
    a: "Everything I built for you: next-business-day response, fixes included, small tweaks included, and new features quoted before any work. From $250/month, with the scope in writing.",
  },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(56);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => { const measure = () => { if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight); }; measure(); window.addEventListener("resize", measure); return () => window.removeEventListener("resize", measure); }, []);
  useEffect(() => { const h = () => { setShowBackToTop(window.scrollY > 400); }; window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const openBooking = () => { window.open(BOOKING_URL, "_blank"); setMenuOpen(false); };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // Handle deep links like /#faq: wait for page to render, then scroll
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
        .step-card { border-left: 2px solid #e2e8f0; padding-left: 28px; transition: border-color 0.2s; height: 100%; }
        .step-card:hover { border-color: #0ea5e9; }
        .panel-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; transition: all 0.25s; cursor: default; height: 100%; display: flex; flex-direction: column; }
        .panel-card:hover { border-color: #0ea5e9; box-shadow: 0 8px 32px rgba(14,165,233,0.1); transform: translateY(-3px); }
        input, textarea { font-family: 'DM Sans', sans-serif; font-size: 14px; width: 100%; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 13px 16px; color: #0f172a; outline: none; transition: border-color 0.2s; background: #fff; }
        input:focus, textarea:focus { border-color: #0ea5e9; }
        textarea { resize: vertical; min-height: 110px; }
        label { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #334155; display: block; margin-bottom: 6px; }
        .back-to-top-btn { position: fixed; bottom: 32px; right: 32px; width: 48px; height: 48px; border-radius: 50%; background: #0f172a; color: #fff; border: none; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; z-index: 200; transition: opacity 0.3s, transform 0.3s, background 0.2s; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
        .back-to-top-btn:hover { background: #0ea5e9; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(14,165,233,0.3); }
        .faq-item { border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 12px; overflow: hidden; transition: border-color 0.2s; background: #fff; }
        .faq-item:hover { border-color: #cbd5e1; }
        .faq-q { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; color: #0f172a; padding: 20px 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; user-select: none; }
        .faq-q:hover { color: #0ea5e9; }
        .faq-a { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; color: #64748b; line-height: 1.75; padding: 0 24px 20px; }
        section[id] { scroll-margin-top: 88px; }
        .hero-section { min-height: 78vh; }
        .hero-panel { position: absolute; top: 0; right: 0; bottom: 0; width: 38%; clip-path: polygon(26% 0, 100% 0, 100% 100%, 0 100%); background: linear-gradient(210deg, #132036 0%, #0f172a 48%, #0a1120 100%); z-index: 1; }
        .hero-panel-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .hero-trace { position: relative; flex: 1; height: 100px; min-width: 80px; }
        .hero-band { display: none; position: absolute; left: 0; right: 0; bottom: 0; height: 88px; clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 100%); background: linear-gradient(100deg, #132036 0%, #0f172a 55%, #0a1120 100%); z-index: 1; }
        @keyframes heroPulse { 0% { left: 2%; opacity: 0; } 12% { opacity: 0.9; } 55% { opacity: 0.9; } 70% { left: 98%; opacity: 0; } 100% { left: 98%; opacity: 0; } }
        .hero-pulse { position: absolute; top: -1.5px; left: 2%; width: 5px; height: 5px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 8px 2px rgba(56,189,248,0.55); animation: heroPulse 7s ease-in-out 1.2s infinite; }
        @media (prefers-reduced-motion: reduce) { .hero-pulse { animation: none; opacity: 0; } }
        @media (max-width: 1150px) and (min-width: 769px) {
          .hero-panel { width: 30%; }
          .hero-copy { max-width: 56vw !important; }
          .hero-copy h1 { font-size: clamp(30px, 4.6vw, 44px) !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
          .nav-inner { height: 56px !important; }
          .hero-sub { font-size: 16px !important; }
          .hero-buttons { flex-direction: column !important; gap: 12px !important; width: 100% !important; align-items: stretch !important; }
          .hero-btn-primary { width: 100% !important; padding: 16px 24px !important; font-size: 15px !important; font-weight: 600 !important; background: #0f172a !important; color: #fff !important; border-radius: 6px !important; text-align: center; }
          .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
          section:not(:first-of-type) { padding-top: 64px !important; padding-bottom: 64px !important; }
          .nav-logo-img { height: 34px !important; }
          .hero-logo { height: 64px !important; }
          .hero-section { min-height: auto !important; padding-bottom: 140px !important; }
          .hero-panel { display: none !important; }
          .hero-trace { display: none !important; }
          .hero-band { display: block !important; }
          .hero-mark-row { margin-bottom: 28px !important; }
          * { max-width: 100%; }
          img { max-width: 100%; height: auto; }
          .back-to-top-btn { bottom: 20px !important; right: 20px !important; width: 42px !important; height: 42px !important; font-size: 18px !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .panel-grid { grid-template-columns: 1fr !important; }
          .ghl-form-iframe { height: 750px !important; }
          section[id] { scroll-margin-top: 72px !important; }
        }
        @media (min-width: 769px) { .hamburger { display: none !important; } .mobile-menu { display: none !important; } }
      `}</style>

      {/* HEADER */}
      <div ref={headerRef} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", flexDirection: "column" }}>
        <nav style={{ position: "relative", width: "100%", background: "#ffffff", borderBottom: "1px solid #e2e8f0", transition: "all 0.3s ease", padding: "0 5vw" }}>
          <div className="nav-inner" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
            <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <img src="/SharmaAutomationIcon.png" alt="Sharma Automation logo" className="nav-logo-img" style={{ height: 42, width: "auto", objectFit: "contain" }} />
            </div>
            <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
              {NAV_LINKS.map(l => (<span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase().replaceAll(" ", "-"))}>{l}</span>))}
              <button className="btn-primary" onClick={openBooking} style={{ padding: "10px 22px" }}>Book a fit call</button>
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <div style={{ width: 24, height: 2, background: menuOpen ? s.accent : s.navy, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <div style={{ width: 24, height: 2, background: s.navy, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <div style={{ width: 24, height: 2, background: menuOpen ? s.accent : s.navy, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}
      <div className="mobile-menu" style={{ display: "none", position: "fixed", top: headerHeight, left: 0, right: 0, zIndex: 101, background: "rgba(255,255,255,0.98)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0", flexDirection: "column", padding: "16px 24px 24px", transform: menuOpen ? "translateY(0)" : "translateY(-120%)", visibility: menuOpen ? "visible" : "hidden", transition: "transform 0.3s ease, visibility 0.3s ease", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
        {NAV_LINKS.map(l => (<span key={l} onClick={() => scrollTo(l.toLowerCase().replaceAll(" ", "-"))} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, color: s.navy, padding: "14px 0", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}>{l}</span>))}
        <button className="btn-primary" onClick={openBooking} style={{ marginTop: 16, padding: "14px", fontSize: 15, textAlign: "center" }}>Book a fit call</button>
      </div>

      {/* 1. HERO — split banner: light type field left, navy circuit panel right,
             the mark's own circuit traces continue across the seam. The mark is a
             stand-in PNG; swap the src for the brand SVG later — the row layout,
             explicit dimensions, and trace geometry do not depend on the file. */}
      <section className="hero-section" style={{ position: "relative", display: "flex", alignItems: "center", background: "linear-gradient(160deg, #f8fafc 0%, #f0f9ff 55%, #e9f3fa 100%)", padding: `${headerHeight + 20}px 5vw 48px`, overflow: "hidden" }}>
        <div className="hero-panel" aria-hidden="true">
          <svg className="hero-panel-svg" viewBox="0 0 420 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="none" stroke="#7dd3fc" strokeWidth="1.5" strokeOpacity="0.14">
              <path d="M 96 0 V 148 H 188 V 276" />
              <path d="M 150 760 V 596 H 244 V 462 H 356" />
              <path d="M 316 0 V 96 H 400" />
              <path d="M 420 308 H 306 V 392 H 216 V 528" />
              <path d="M 388 760 V 648 H 330" />
            </g>
            <g fill="#38bdf8" fillOpacity="0.32">
              <circle cx="188" cy="276" r="3.5" />
              <circle cx="356" cy="462" r="3.5" />
              <circle cx="400" cy="96" r="3.5" />
              <circle cx="216" cy="528" r="3.5" />
              <circle cx="330" cy="648" r="3.5" />
            </g>
            <g fill="#7dd3fc" fillOpacity="0.2">
              <rect x="92" y="144" width="8" height="8" />
              <rect x="240" y="592" width="8" height="8" />
              <rect x="302" y="388" width="8" height="8" />
            </g>
          </svg>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 68% 26%, rgba(56,189,248,0.16) 0%, transparent 55%)" }} />
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
          <div className="hero-mark-row" style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
            <img
              src="/SharmaAutomationLogoHero.png"
              alt="Sharma Automation"
              width={314}
              height={144}
              fetchPriority="high"
              className="hero-logo"
              style={{ height: 100, width: "auto", display: "block", flexShrink: 0 }}
            />
            <div className="hero-trace" aria-hidden="true">
              <div style={{ position: "absolute", top: 41, left: 0, width: "30%", height: 2, background: "rgba(14,165,233,0.5)" }} />
              <div style={{ position: "absolute", top: 42, left: "30%", marginLeft: -2, width: 2, height: 16, background: "rgba(14,165,233,0.5)" }} />
              <div style={{ position: "absolute", top: 43, left: "30%", width: 6, height: 6, marginLeft: -3, marginTop: -3, borderRadius: "50%", background: "rgba(14,165,233,0.8)" }} />
              <div style={{ position: "absolute", top: 57, left: "30%", right: "4%", height: 2, background: "rgba(14,165,233,0.5)" }}>
                <div className="hero-pulse" />
              </div>
              <div style={{ position: "absolute", top: 58, right: "4%", width: 8, height: 8, marginRight: -4, marginTop: -4, borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 12px 2px rgba(56,189,248,0.5)" }} />
              <div style={{ position: "absolute", top: 74, left: 0, width: "46%", height: 1.5, background: "rgba(14,165,233,0.22)" }} />
              <div style={{ position: "absolute", top: 72, left: "46%", width: 4, height: 4, borderRadius: "50%", background: "rgba(14,165,233,0.35)" }} />
            </div>
          </div>
          <div className="hero-copy" style={{ maxWidth: 760 }}>
            <h1 className="playfair" style={{ fontSize: "clamp(30px, 5.5vw, 54px)", fontWeight: 700, lineHeight: 1.18, letterSpacing: "-1px", marginBottom: 18, color: s.navy, maxWidth: 680 }}>Tell me about your typical day. I'll tell you where AI actually saves you time and money, <span style={{ color: s.accentDark }}>and where it won't.</span></h1>
            <p className="dm hero-sub" style={{ fontSize: 18, color: s.slate, lineHeight: 1.75, marginBottom: 28, maxWidth: 560, fontWeight: 300 }}>One service. Three steps. You only buy the next step if the last one earned it.</p>
            <div className="hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <button className="btn-primary hero-btn-primary" onClick={openBooking} style={{ fontSize: 15, padding: "15px 34px" }}>Book a free 15-minute fit call</button>
            </div>
          </div>
        </div>
        <div className="hero-band" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 800 88" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="none" stroke="#7dd3fc" strokeWidth="1.5" strokeOpacity="0.2">
              <path d="M 0 58 H 210 V 34 H 380" />
              <path d="M 460 70 H 620 V 44 H 800" />
              <path d="M 300 88 V 62 H 430" />
            </g>
            <g fill="#38bdf8" fillOpacity="0.4">
              <circle cx="380" cy="34" r="3" />
              <circle cx="430" cy="62" r="3" />
            </g>
          </svg>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "96px 5vw", background: s.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 64 }}><p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>The Process</p><h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>How It Works</h2></div></FadeIn>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, alignItems: "stretch" }}>
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1} style={{ height: "100%" }}>
                <div className="step-card">
                  <div className="playfair" style={{ fontSize: 42, fontWeight: 700, color: "#cbd5e1", marginBottom: 12, lineHeight: 1 }}>{step.num}</div>
                  <p className="dm" style={{ fontSize: 11, letterSpacing: "2px", color: s.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>{step.label}</p>
                  <h3 className="playfair" style={{ fontSize: 22, fontWeight: 600, color: s.navy, marginBottom: 14 }}>{step.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: s.mid, lineHeight: 1.8, fontWeight: 300 }}>{step.body}</p>
                  {step.pricing && (
                    <p className="dm" style={{ fontSize: 14, color: s.navy, lineHeight: 1.8, fontWeight: 500, marginTop: 14, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "14px 16px" }}>{step.pricing}</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE HONEST NO */}
      <section id="honest-no" style={{ padding: "96px 5vw", background: s.navy }}>
        <FadeIn>
          <div style={{ maxWidth: 860, margin: "0 auto", background: "rgba(244,161,39,0.08)", border: "1px solid rgba(244,161,39,0.45)", borderLeft: "6px solid #f4a127", borderRadius: 12, padding: "48px 40px", textAlign: "center" }}>
            <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: "#f4a127", textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>Straight Answers</p>
            <h2 className="playfair" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", marginBottom: 20 }}>The Honest No</h2>
            <p className="dm" style={{ fontSize: 17, color: "#e2e8f0", lineHeight: 1.85, maxWidth: 680, margin: "0 auto", fontWeight: 300 }}>Sometimes the right answer is: don't buy AI. Some businesses hear exactly that from me. You will never get a recommendation whose only job is to sell you Step 2.</p>
          </div>
        </FadeIn>
      </section>

      {/* 4. WHAT THIS LOOKS LIKE */}
      <section id="examples" style={{ padding: "96px 5vw", background: s.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Examples</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", marginBottom: 16 }}>What This Looks Like</h2>
              <p className="dm" style={{ fontSize: 16, color: s.mid, maxWidth: 620, margin: "0 auto", fontWeight: 300, lineHeight: 1.7 }}>Typical examples of what I recommend and build. Every business is scoped from its own day-to-day, not a template.</p>
            </div>
          </FadeIn>
          <div className="panel-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "stretch" }}>
            {SCENARIOS.map((sc, i) => (
              <FadeIn key={sc.title} delay={i * 0.08} style={{ height: "100%" }}>
                <div className="panel-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 26 }}>{sc.icon}</span>
                    <h3 className="playfair" style={{ fontSize: 20, fontWeight: 600, color: s.navy }}>{sc.title}</h3>
                  </div>
                  <p className="dm" style={{ fontSize: 14, color: s.mid, lineHeight: 1.75, fontWeight: 300, marginBottom: 12 }}>{sc.problem}</p>
                  <p className="dm" style={{ fontSize: 14, color: s.slate, lineHeight: 1.75, fontWeight: 300, marginBottom: 12 }}><strong style={{ fontWeight: 600, color: s.navy }}>The fix:</strong> {sc.fix}</p>
                  <p className="dm" style={{ fontSize: 14, color: s.accentDark, lineHeight: 1.75, fontWeight: 500, marginTop: "auto" }}>{sc.payoff}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHO YOU'RE HIRING */}
      <section id="about" style={{ padding: "96px 5vw", background: s.light }}>
        <div className="two-col" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <FadeIn>
            <div style={{ width: "100%", borderRadius: 16, overflow: "hidden", border: "1px solid #bae6fd" }}>
              <img
                src="/AIHeadshot.png"
                alt="Rohit Sharma, founder of Sharma Automation"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>About</p>
              <h2 className="playfair" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 20 }}>Who You're Hiring</h2>
              <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 20, fontWeight: 300 }}>I'm Rohit Sharma. I spent years as a paramedic, where the whole job was triage: figure out fast what actually matters, then act on it. Now I do that for businesses.</p>
              <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 20, fontWeight: 300 }}>I also designed, built, and operate <a href="/ai-coach" style={{ color: s.accentDark, textDecoration: "underline" }}>AI Coach Cloud</a>, a production AI coaching platform for triathletes. That is the standard of build quality your systems get.</p>
              <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, fontWeight: 300 }}>Based in New Jersey, working with businesses anywhere.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq" style={{ padding: "96px 5vw", background: s.white }}>
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
                <div style={{ maxHeight: faqOpen === i ? "480px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
                  <div className="faq-a">{faq.a}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 7. CONTACT / BOOKING */}
      <section id="contact" style={{ padding: "96px 5vw", background: s.light }}>
        <div className="two-col" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <FadeIn>
            <div>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Get In Touch</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", marginBottom: 20 }}>Let's Talk About<br />Your Business</h2>
              <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 28, fontWeight: 300 }}>Fill out the form and I'll get back to you within 24 hours.</p>
              <button className="btn-primary" onClick={openBooking} style={{ fontSize: 15, padding: "15px 34px", marginBottom: 40 }}>Book a free 15-minute fit call</button>
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
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}><img src="/SharmaAutomationIcon.png" alt="Sharma Automation logo" style={{ height: 36, width: "auto", objectFit: "contain" }} /></div>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {NAV_LINKS.map(l => (<span key={l} className="dm" onClick={() => scrollTo(l.toLowerCase().replaceAll(" ", "-"))} style={{ fontSize: 13, color: "#64748b", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#64748b"}>{l}</span>))}
            <a href="/ai-coach" className="dm" style={{ fontSize: 13, color: "#64748b", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#64748b"}>AI Coach Cloud</a>
          </div>
          <p className="dm" style={{ fontSize: 12, color: "#475569" }}>© 2026 Sharma Automation. All rights reserved.</p>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ opacity: showBackToTop ? 0.85 : 0, pointerEvents: showBackToTop ? "auto" : "none", transform: showBackToTop ? "translateY(0)" : "translateY(12px)" }} aria-label="Back to top">↑</button>
    </div>
  );
}
