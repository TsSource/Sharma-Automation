import { Fragment, useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   COMPANY INTELLIGENCE: Productized Service Page (Wave CI-PAGE-1)
   sharmaautomation.com/company-intelligence

   A business-wide AI assistant that answers employee questions from
   the company's own data and systems. The only conversion action is
   the existing free GoHighLevel booking call, labeled here as the
   free Intelligence Audit. Section copy is ratified and must not be
   reworded.

   Palette and type follow the consulting root page (App.js), not the
   /ai-coach product page: Playfair Display + DM Sans, navy/sky.
═══════════════════════════════════════════════════════════════ */

/* Same calendar as the root page. App.js:14 is the source of truth;
   App.js does not export it, so it is declared locally here. Owner
   ruling: the free 15-minute fit call IS the Intelligence Audit. */
const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/l0FfSuPINhd1ypD8cyiX";

/* Google Ads conversion. The global tag (AW-18119945677) is loaded in
   public/index.html but fires no events anywhere on the site.
   PM ACTION REQUIRED: replace REPLACE_WITH_CONVERSION_LABEL below with
   the real conversion label from Google Ads. Until that is pasted the
   event posts an unrecognized label and no conversion is recorded. */
const GTAG_CONVERSION_SEND_TO = "AW-18119945677/REPLACE_WITH_CONVERSION_LABEL";

const NAV_LINKS = [["Watch", "watch"], ["How It Works", "how-it-works"], ["FAQ", "faq"]];

const CHAT = [
  { q: "What's overdue right now?", a: "Three items are past due. The oldest is 12 days.", source: "Accounting" },
  { q: "What's the status of the Henderson job?", a: "Scheduled work completed yesterday. Final sign-off is pending.", source: "Job tracker" },
  { q: "Has anyone missed a required step this week?", a: "One item is missing a signature. It was due Monday.", source: "Records" },
  { q: "What's our procedure for a warranty claim?", a: "Four steps. Here's the summary, and the full document.", source: "Company docs" },
];

const STEPS = [
  { num: "01", title: "Audit", body: "A free call. We map the questions your team asks every day and where those answers live." },
  { num: "02", title: "Build", body: "We connect your documents and systems, set who can see what, and test against your real questions." },
  { num: "03", title: "Pilot", body: "A handful of your people use it daily for two weeks. We fix every miss before rollout." },
  { num: "04", title: "Rollout", body: "Company-wide launch, training included, and ongoing care as your business changes." },
];

const TRUST = [
  { title: "Answers with receipts", body: "Every answer cites its source document or system. If it doesn't know, it says so." },
  { title: "Respects the org chart", body: "Field staff can't see payroll. Permissions are enforced in the plumbing, not on the honor system." },
  { title: "Private by design", body: "Your data stays in your own dedicated, secured environment. It is never used to train anyone's model." },
  { title: "Grows into automation", body: "Once trusted, it doesn't just answer. It sends the reminders and flags the gaps, all under your approval rules." },
];

const FAQS = [
  { q: "What does it cost?", a: "Every business is different, so setup is scoped in your free audit. The price depends on how many systems we connect. Ongoing service is a flat monthly plan. Founding clients receive preferred rates." },
  { q: "What systems does it work with?", a: "The ones you already use. Accounting, scheduling, documents, email, and the software specific to your trade. The audit maps exactly which ones matter for your questions." },
  { q: "Is our data safe?", a: "Your data lives in its own dedicated, secured environment, separated from every other client, and is never used to train any model. Access follows your org chart." },
  { q: "How long until it's running?", a: "Typically a few weeks from audit to pilot, depending on how many systems we connect." },
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

export default function CompanyIntelligence() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(56);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  /* The player shows the branded poster and its own play affordance until the
     viewer starts it; from the first play the native controls take over. */
  const videoRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);

  const startVideo = () => {
    setVideoStarted(true);
    videoRef.current?.play();
  };

  useEffect(() => { const measure = () => { if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight); }; measure(); window.addEventListener("resize", measure); return () => window.removeEventListener("resize", measure); }, []);
  useEffect(() => { const h = () => { setShowBackToTop(window.scrollY > 400); }; window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const openBooking = () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", { send_to: GTAG_CONVERSION_SEND_TO });
    }
    window.open(BOOKING_URL, "_blank");
    setMenuOpen(false);
  };

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
        .panel-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; transition: all 0.25s; cursor: default; height: 100%; display: flex; flex-direction: column; }
        .panel-card:hover { border-color: #0ea5e9; box-shadow: 0 8px 32px rgba(14,165,233,0.1); transform: translateY(-3px); }
        .step-card { border-left: 2px solid #e2e8f0; padding-left: 24px; transition: border-color 0.2s; height: 100%; }
        .step-card:hover { border-color: #0ea5e9; }
        .faq-item { border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 12px; overflow: hidden; transition: border-color 0.2s; background: #fff; }
        .faq-item:hover { border-color: #cbd5e1; }
        .faq-q { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; color: #0f172a; padding: 20px 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; user-select: none; }
        .faq-q:hover { color: #0ea5e9; }
        .faq-a { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; color: #64748b; line-height: 1.75; padding: 0 24px 20px; }
        .back-to-top-btn { position: fixed; bottom: 32px; right: 32px; width: 48px; height: 48px; border-radius: 50%; background: #0f172a; color: #fff; border: none; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; z-index: 200; transition: opacity 0.3s, transform 0.3s, background 0.2s; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
        .back-to-top-btn:hover { background: #0ea5e9; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(14,165,233,0.3); }
        section[id] { scroll-margin-top: 88px; }
        .chat-panel { position: relative; border-radius: 16px; overflow: hidden; background: linear-gradient(210deg, #132036 0%, #0f172a 48%, #0a1120 100%); padding: 40px 36px; }
        .chat-panel-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .chat-rows { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 22px; }
        .chat-q { align-self: flex-end; max-width: 76%; background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.16); border-radius: 14px 14px 4px 14px; padding: 13px 17px; }
        .chat-a { align-self: flex-start; max-width: 82%; background: rgba(14,165,233,0.10); border: 1px solid rgba(56,189,248,0.28); border-radius: 14px 14px 14px 4px; padding: 13px 17px; }
        .chat-chip { display: inline-flex; align-items: center; gap: 7px; margin-top: 10px; background: rgba(56,189,248,0.16); border: 1px solid rgba(56,189,248,0.3); border-radius: 999px; padding: 4px 11px; }
        /* Launch-video section, in the root page's own vocabulary.
           The media border is #bae6fd rather than the grey #e2e8f0 used on
           text cards: App.js frames its one photograph exactly that way, and a
           screen is media, not a card. The rail and its travelling dot are the
           root hero's .hero-trace / .hero-pulse, which is the only motion the
           site owns anywhere, reused here so the section reads as the same
           hand. Keyframes are namespaced ci* so they can never collide with
           the root page's. */
        .video-frame { position: relative; border-radius: 16px; overflow: hidden; border: 1px solid #bae6fd; box-shadow: 0 20px 60px rgba(2,8,20,0.12); background: #0a1120; line-height: 0; }
        .video-frame video { display: block; width: 100%; height: auto; }
        .watch-field { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; }
        .watch-rail { position: relative; height: 18px; margin-bottom: 20px; }
        @keyframes ciPulse { 0% { left: 2%; opacity: 0; } 12% { opacity: 0.9; } 55% { opacity: 0.9; } 70% { left: 98%; opacity: 0; } 100% { left: 98%; opacity: 0; } }
        .ci-pulse { position: absolute; top: -1.5px; left: 2%; width: 5px; height: 5px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 8px 2px rgba(56,189,248,0.55); animation: ciPulse 7s ease-in-out 1.2s infinite; }
        @media (prefers-reduced-motion: reduce) { .ci-pulse { animation: none; opacity: 0; } }
        /* Branded play affordance. The browser's own control bar is the one
           generic object in this section, and parking it across the poster
           undoes the framing, so controls stay off until the viewer starts the
           piece and this stands in until then. It is a real button, so it is
           focusable and operable from the keyboard, and the native controls
           take over from the first play onward. */
        /* Parked bottom-left, not centred. The poster is the film's own title
           card, so a disc in the middle of the frame sits straight on top of
           the product name and the strapline. The whole overlay stays a
           full-bleed click target; only its contents move to the corner, and
           the scrim guarantees contrast over whatever frame is behind it. */
        .watch-play { position: absolute; inset: 0; z-index: 3; display: flex; align-items: flex-end; justify-content: flex-start; padding: 34px; background: linear-gradient(to top, rgba(2,8,20,0.74) 0%, rgba(2,8,20,0.16) 34%, rgba(2,8,20,0) 62%); border: none; cursor: pointer; }
        .watch-play-row { display: flex; align-items: center; gap: 18px; }
        .watch-play-disc { width: 72px; height: 72px; border-radius: 50%; background: rgba(15,23,42,0.8); border: 1.5px solid rgba(125,211,252,0.55); display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 40px rgba(2,8,20,0.5); transition: background 0.2s, border-color 0.2s, transform 0.2s; flex-shrink: 0; }
        .watch-play:hover .watch-play-disc, .watch-play:focus-visible .watch-play-disc { background: #0ea5e9; border-color: #38bdf8; transform: scale(1.06); }
        .watch-play-label { font-family: 'DM Sans', sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; color: #bae6fd; }
        @media (max-width: 768px) {
          .watch-play { padding: 20px !important; }
          .watch-play-disc { width: 58px !important; height: 58px !important; }
          .watch-play-label { font-size: 11px !important; letter-spacing: 1.4px !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
          .nav-inner { height: 56px !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
          section:not(:first-of-type) { padding-top: 64px !important; padding-bottom: 64px !important; }
          .nav-logo-img { height: 34px !important; }
          .hero-sub { font-size: 16px !important; }
          .hero-buttons { flex-direction: column !important; gap: 12px !important; width: 100% !important; align-items: stretch !important; }
          .hero-buttons button { width: 100% !important; padding: 16px 24px !important; font-size: 15px !important; text-align: center; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .panel-grid { grid-template-columns: 1fr !important; }
          .chat-panel { padding: 26px 18px !important; }
          .chat-q, .chat-a { max-width: 90% !important; }
          .back-to-top-btn { bottom: 20px !important; right: 20px !important; width: 42px !important; height: 42px !important; font-size: 18px !important; }
          * { max-width: 100%; }
          img { max-width: 100%; height: auto; }
          section[id] { scroll-margin-top: 72px !important; }
        }
        @media (min-width: 769px) { .hamburger { display: none !important; } .mobile-menu { display: none !important; } }
      `}</style>

      {/* HEADER */}
      <div ref={headerRef} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", flexDirection: "column" }}>
        <nav style={{ position: "relative", width: "100%", background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "0 5vw" }}>
          <div className="nav-inner" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="/SharmaAutomationIcon.png" alt="Sharma Automation logo" className="nav-logo-img" style={{ height: 42, width: "auto", objectFit: "contain" }} />
            </a>
            <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
              {NAV_LINKS.map(([label, target]) => (<span key={label} className="nav-link" onClick={() => scrollTo(target)}>{label}</span>))}
              <button className="btn-primary" onClick={openBooking} style={{ padding: "10px 22px" }}>Book your free Intelligence Audit</button>
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
        {NAV_LINKS.map(([label, target]) => (<span key={label} onClick={() => scrollTo(target)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, color: s.navy, padding: "14px 0", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}>{label}</span>))}
        <button className="btn-primary" onClick={openBooking} style={{ marginTop: 16, padding: "14px", fontSize: 15, textAlign: "center" }}>Book your free Intelligence Audit</button>
      </div>

      {/* A. HERO */}
      <section style={{ position: "relative", display: "flex", alignItems: "center", background: "linear-gradient(160deg, #f8fafc 0%, #f0f9ff 55%, #e9f3fa 100%)", padding: `${headerHeight + 72}px 5vw 88px`, overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 780 }}>
            <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 18, fontWeight: 600 }}>Company Intelligence</p>
            <h1 className="playfair" style={{ fontSize: "clamp(30px, 5.5vw, 54px)", fontWeight: 700, lineHeight: 1.18, letterSpacing: "-1px", marginBottom: 20, color: s.navy, maxWidth: 700 }}>Your entire business, one question away.</h1>
            <p className="dm hero-sub" style={{ fontSize: 18, color: s.slate, lineHeight: 1.75, marginBottom: 30, maxWidth: 620, fontWeight: 300 }}>Company Intelligence is a private, secure assistant built on your business: your documents, your systems, your rules. Any employee asks in plain English. It answers with the source shown.</p>
            <div className="hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <button className="btn-primary" onClick={openBooking} style={{ fontSize: 15, padding: "15px 34px" }}>Book your free Intelligence Audit</button>
            </div>
            <p className="dm" style={{ fontSize: 13, color: s.mid, marginTop: 16, fontWeight: 300 }}>Free, 15 minutes, no obligation. You leave with a map of what's possible.</p>
          </div>
        </div>
      </section>

      {/* A2. LAUNCH VIDEO
          Sits between the hero and the chat mock on purpose. The video tells
          the whole story (the scattered systems, the name, the four exchanges,
          the trust points, the audit), so it belongs where intent is highest,
          directly under the headline. The chat mock stays exactly as it is
          below: it is the readable version for the large majority who never
          press play, and the caption under the player says so rather than
          leaving the repetition unexplained.

          Self-hosted rather than embedded. This is a conversion page, and an
          embed ends by offering somebody else's videos on it. The file is
          remuxed with the moov atom at the front so playback starts before the
          whole 8.6 MB has arrived, and preload is metadata only so a visitor
          who never plays it never pays for it. Captions are burned into the
          picture, so the video carries its own text track. */}
      <section id="watch" style={{ position: "relative", padding: "96px 5vw", background: s.light, overflow: "hidden" }}>
        {/* The board the section sits on. Same orthogonal trace grammar as the
            root hero's navy panel, re-inked for a light field: sky at low
            opacity instead of #7dd3fc on navy, which is how the brand already
            draws traces on light elsewhere. */}
        {/* Traces run in the MARGINS, terminating before x=230 and after
            x=1210, because the player sits over the middle of this box. Routed
            edge-inward to interior nodes exactly like the root hero's panel,
            so the section reads as a board the screen is mounted on rather
            than as loose fragments behind it. */}
        <svg className="watch-field" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.11">
            <path d="M 0 132 H 128 V 246 H 214" />
            <path d="M 0 372 H 88 V 470" />
            <path d="M 0 640 H 152 V 546 H 226" />
            <path d="M 0 812 H 196 V 726" />
            <path d="M 1440 108 H 1298 V 214 H 1226" />
            <path d="M 1440 402 H 1352 V 486 H 1252" />
            <path d="M 1440 664 H 1286 V 578" />
            <path d="M 1440 836 H 1338 V 748 H 1240" />
          </g>
          <g fill="#0ea5e9" fillOpacity="0.2">
            <circle cx="214" cy="246" r="3.5" />
            <circle cx="88" cy="470" r="3.5" />
            <circle cx="226" cy="546" r="3.5" />
            <circle cx="196" cy="726" r="3.5" />
            <circle cx="1226" cy="214" r="3.5" />
            <circle cx="1252" cy="486" r="3.5" />
            <circle cx="1286" cy="578" r="3.5" />
            <circle cx="1240" cy="748" r="3.5" />
          </g>
          <g fill="#0ea5e9" fillOpacity="0.13">
            <rect x="124" y="242" width="8" height="8" />
            <rect x="148" y="542" width="8" height="8" />
            <rect x="1294" y="210" width="8" height="8" />
            <rect x="1348" y="482" width="8" height="8" />
          </g>
        </svg>

        <div style={{ maxWidth: 940, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>See It In Action</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", marginBottom: 16 }}>Watch It Work</h2>
              <p className="dm" style={{ fontSize: 16, color: s.mid, maxWidth: 620, margin: "0 auto", fontWeight: 300, lineHeight: 1.7 }}>Seventy seconds, with captions on screen. Everything below is the same story in writing.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            {/* The signal reaching the screen: the root hero's trace and pulse. */}
            <div className="watch-rail" aria-hidden="true">
              <div style={{ position: "absolute", top: 8, left: 0, right: 0, height: 2, background: "rgba(14,165,233,0.35)" }}>
                <div className="ci-pulse" />
              </div>
              <div style={{ position: "absolute", top: 5, left: 0, width: 8, height: 8, borderRadius: "50%", background: "rgba(14,165,233,0.55)" }} />
              <div style={{ position: "absolute", top: 5, right: 0, width: 8, height: 8, borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 12px 2px rgba(56,189,248,0.5)" }} />
            </div>
            <div className="video-frame">
              <video
                ref={videoRef}
                controls={videoStarted}
                preload="metadata"
                playsInline
                poster="/company-intelligence-poster.jpg"
                aria-label="Company Intelligence launch video, 71 seconds, with captions shown on screen."
              >
                <source src="/company-intelligence.mp4" type="video/mp4" />
                Your browser cannot play this video. <a href="/company-intelligence.mp4">Download it instead.</a>
              </video>
              {!videoStarted && (
                <button className="watch-play" onClick={startVideo} aria-label="Play the Company Intelligence video, 71 seconds">
                  <span className="watch-play-row">
                    <span className="watch-play-disc">
                      <svg width="26" height="30" viewBox="0 0 26 30" aria-hidden="true">
                        <path d="M24 15 L2 29 L2 1 Z" fill="#ffffff" />
                      </svg>
                    </span>
                    <span className="watch-play-label">Watch. 1 min 11 sec</span>
                  </span>
                </button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* B. CHAT MOCK */}
      <section id="chat-demo" style={{ padding: "96px 5vw", background: s.white }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <FadeIn>
            <p className="dm" style={{ textAlign: "center", fontSize: 17, color: s.slate, marginBottom: 30, fontWeight: 300 }}>Imagine your team could ask</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="chat-panel">
              <svg className="chat-panel-svg" viewBox="0 0 900 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <g fill="none" stroke="#7dd3fc" strokeWidth="1.5" strokeOpacity="0.14">
                  <path d="M 0 96 H 148 V 208 H 286" />
                  <path d="M 900 148 H 742 V 40" />
                  <path d="M 620 560 V 452 H 764 V 336" />
                  <path d="M 82 560 V 412 H 208" />
                  <path d="M 900 468 H 828 V 252" />
                </g>
                <g fill="#38bdf8" fillOpacity="0.32">
                  <circle cx="286" cy="208" r="3.5" />
                  <circle cx="742" cy="40" r="3.5" />
                  <circle cx="764" cy="336" r="3.5" />
                  <circle cx="208" cy="412" r="3.5" />
                  <circle cx="828" cy="252" r="3.5" />
                </g>
                <g fill="#7dd3fc" fillOpacity="0.2">
                  <rect x="144" y="204" width="8" height="8" />
                  <rect x="616" y="448" width="8" height="8" />
                  <rect x="824" y="464" width="8" height="8" />
                </g>
              </svg>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 74% 22%, rgba(56,189,248,0.16) 0%, transparent 58%)" }} />
              <div className="chat-rows">
                {CHAT.map((row) => (
                  <Fragment key={row.q}>
                    <div className="chat-q">
                      <p className="dm" style={{ fontSize: 15, color: "#e2e8f0", lineHeight: 1.6, fontWeight: 400 }}>{row.q}</p>
                    </div>
                    <div className="chat-a">
                      <p className="dm" style={{ fontSize: 15, color: "#f1f5f9", lineHeight: 1.65, fontWeight: 300 }}>{row.a}</p>
                      <span className="chat-chip">
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#38bdf8", flexShrink: 0 }} />
                        <span className="dm" style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 500, letterSpacing: "0.4px" }}>{row.source}</span>
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="dm" style={{ textAlign: "center", fontSize: 15, color: s.mid, marginTop: 30, fontWeight: 300, lineHeight: 1.75 }}>Your questions will be different. Finding them is what the audit is for.</p>
          </FadeIn>
        </div>
      </section>

      {/* C. HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "96px 5vw", background: s.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>The Process</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>How It Works</h2>
            </div>
          </FadeIn>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, alignItems: "stretch" }}>
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.08} style={{ height: "100%" }}>
                <div className="step-card">
                  <div className="playfair" style={{ fontSize: 40, fontWeight: 700, color: "#cbd5e1", marginBottom: 12, lineHeight: 1 }}>{step.num}</div>
                  <h3 className="playfair" style={{ fontSize: 22, fontWeight: 600, color: s.navy, marginBottom: 14 }}>{step.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: s.mid, lineHeight: 1.8, fontWeight: 300 }}>{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* D. TRUST */}
      <section style={{ padding: "96px 5vw", background: s.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>Built to be trusted</h2>
            </div>
          </FadeIn>
          <div className="panel-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "stretch" }}>
            {TRUST.map((t, i) => (
              <FadeIn key={t.title} delay={i * 0.08} style={{ height: "100%" }}>
                <div className="panel-card">
                  <h3 className="playfair" style={{ fontSize: 20, fontWeight: 600, color: s.navy, marginBottom: 12 }}>{t.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: s.mid, lineHeight: 1.75, fontWeight: 300 }}>{t.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* E. FAQ */}
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
                    <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

      {/* F. FINAL CTA */}
      <section style={{ padding: "96px 5vw", background: s.navy }}>
        <FadeIn>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", marginBottom: 32 }}>Find out what your business could answer.</h2>
            <button className="btn-primary" onClick={openBooking} style={{ fontSize: 15, padding: "16px 36px", background: s.accent }}>Book your free Intelligence Audit</button>
            <p className="dm" style={{ fontSize: 14, color: "#94a3b8", marginTop: 20, fontWeight: 300 }}>Prefer email? <a href="mailto:Sharma@SharmaAutomation.com" style={{ color: "#7dd3fc", textDecoration: "underline" }}>Sharma@SharmaAutomation.com</a></p>
          </div>
        </FadeIn>
      </section>

      {/* G. FOOTER */}
      <footer style={{ background: s.navy, padding: "40px 5vw", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/SharmaAutomationIcon.png" alt="Sharma Automation logo" style={{ height: 36, width: "auto", objectFit: "contain" }} />
          </a>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <a href="/" className="dm" style={{ fontSize: 13, color: "#64748b", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#64748b"}>Home</a>
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
