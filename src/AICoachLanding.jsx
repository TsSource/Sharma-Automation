import { useState, useEffect, useRef } from "react";

/* ── Color Tokens (matching main SA site) ──────────────────── */
const s = {
  navy: "#0f172a", slate: "#334155", mid: "#64748b",
  light: "#f1f5f9", white: "#ffffff", accent: "#0ea5e9",
  accentDark: "#0369a1", border: "#e2e8f0",
  amber: "#f59e0b", amberDark: "#92400e",
  amberBg: "#fffbeb", amberBorder: "#fde68a",
};

/* ── Data Constants ──────────────────────────────────────────── */
const PAIN_POINTS = [
  { icon: "📊", title: "Dashboards You Don't Understand", desc: "TrainingPeaks shows you a chart. You stare at it. You still don't know what to do today." },
  { icon: "📋", title: "Plans That Don't Adapt", desc: "Life happens. You miss a day. Your rigid training plan doesn't adjust, so you either skip it or push through when you shouldn't." },
  { icon: "📱", title: "Five Apps, Zero Coaching", desc: "Strava for logging. TrainingPeaks for planning. Garmin for data. None of them talk to each other. None of them tell you what to actually do." },
];

const FEATURES = [
  { icon: "📊", title: "Real Data Coaching", desc: "Reads your actual heart rate, power, HRV, sleep, and fitness/fatigue/form trends. Not generic advice from a template." },
  { icon: "📱", title: "Multi Platform via MCP", desc: "Works in Discord, Claude Desktop, and Claude.ai. One coaching engine, every platform you already use." },
  { icon: "📅", title: "Conversation to Calendar", desc: "Say \"post it\" and the structured workout lands on your Intervals.icu calendar. Syncs to Zwift, Garmin, and Wahoo." },
  { icon: "🧠", title: "Model Agnostic", desc: "Runs on GPT, Grok, Gemini, or fully local with Ollama. You choose the AI. Switch anytime. Zero vendor lock in." },
  { icon: "⚙️", title: "Customizable Philosophy", desc: "Tune the coaching for cycling power, running pace zones, triathlon distribution, or any approach. Your coach, your rules." },
  { icon: "🔒", title: "You Own Everything", desc: "Runs on your machine with your API key. No subscriptions to cancel. Your data never leaves your control." },
];

const REQUIREMENTS = [
  { icon: "💻", title: "Your Computer", desc: "Windows or Mac. Runs locally on your machine. Your data stays yours." },
  { icon: "📈", title: "Intervals.icu Account (free)", desc: "This is where your training data lives. Connects to Strava, Garmin, Zwift, Apple Watch, and more. If you don't have one, we create it together on the call." },
  { icon: "🧠", title: "AI Provider (pick one during setup)", items: ["ChatGPT Plus subscription with one click OAuth sign in (easiest, recommended)", "Bring your own API key from OpenAI, Google Gemini, Grok, or others", "Local AI via Ollama for fully offline coaching with zero subscription"] },
  { icon: "💬", title: "Discord (free)", desc: "Your coach lives in a private Discord server. You talk to it like texting a friend. We create the server and bot together on the call." },
  { icon: "⚡", title: "OpenClaw (open source, free)", desc: "The AI agent engine that powers everything. Installed automatically during setup. You never need to touch it directly." },
];

const SETUP_STEPS = [
  { num: "01", title: "Introductions", time: "5 min", desc: "We get to know each other. I'll ask about your training: what sports you do, how many hours a week, what apps or devices you currently use, and what frustrates you about your current coaching setup. This helps me customize your AI coach to fit how you actually train." },
  { num: "02", title: "Process Overview", time: "2 min", desc: "I'll walk you through exactly what we're about to do together so there are no surprises. You'll know every step before we start." },
  { num: "03", title: "Payment", time: "3 min", desc: "I'll send you the Stripe payment link directly in the Google Meet chat. For founding athletes, that's $99 total, which locks in your 3 months of support and the optional $29/mo grandfathered retainer rate for life. Once payment confirms, we move forward." },
  { num: "04", title: "Download the Installer", time: "5 min", desc: "After payment, I'll send you a private Google Drive link to download the AI Coach installer. You'll run the executable on your computer. I'll be watching your shared screen and guiding you through each prompt as the installer runs." },
  { num: "05", title: "Intervals.icu Setup", time: "10 min", desc: "If you already have an Intervals.icu account, we connect it. If you don't, I'll walk you through creating a free account right on the call. We'll link your training data sources like Strava, Garmin, Zwift, or Apple Watch so your history starts flowing in automatically." },
  { num: "06", title: "AI Provider Configuration", time: "10 min", desc: "You'll choose how your coach thinks. I'll guide you through one of three options: signing in with your ChatGPT subscription via one click OAuth, entering your own API key, or setting up Ollama for fully local offline coaching. You pick, I direct you through the setup." },
  { num: "07", title: "Discord and Bot Setup", time: "10 min", desc: "I'll walk you through creating a private Discord server (or using one you already have) and adding your personal coaching bot. You'll click through each step on your screen while I tell you exactly what to do and where to click." },
  { num: "08", title: "Coaching Personality", time: "5 min", desc: "This is the fun part. With your screen shared, I'll guide you through customizing your coach's personality, training philosophy, and tone. Want a coach who is blunt and pushes hard? We'll set that. Prefer something encouraging and supportive? We'll set that instead." },
  { num: "09", title: "First Real Conversation", time: "5 min", desc: "You type a real question to your AI coach. Something like \"What should I do today?\" You'll watch it pull your actual training data from Intervals.icu and respond with personalized, data driven coaching advice. This is the moment it all clicks." },
  { num: "10", title: "Wrap Up and Support Info", time: "5 min", desc: "I'll make sure everything is working, answer any remaining questions, and give you the rundown on your 90 days of founding athlete support. You'll know exactly how to reach me and what to expect over the next 3 months." },
];

const PRICING = [
  { tier: "Solo Athlete", price: "$199", period: "one time", desc: "Athletes who want AI powered daily guidance from their own data.", features: ["White glove setup session", "Full system on your machine", "Your choice of AI model", "10 MCP coaching tools", "Intervals.icu calendar integration", "Local training dashboard"], cta: "Get Started", highlight: false },
  { tier: "Founding Athlete", price: "$99", period: "limited offer", desc: "3 spots only. Full setup plus 3 months of dedicated support in exchange for honest feedback and a testimonial.", features: ["Everything in Solo Athlete", "3 months of dedicated support", "Priority bug fixes and updates", "Direct access to the developer", "Optional $29/mo grandfathered retainer"], cta: "Claim Your Spot", highlight: true },
  { tier: "Cloud Hosted", price: "$39-59", period: "/month", desc: "For athletes who don't want to run anything locally. I host it, you use it.", features: ["Fully managed hosting", "No local install needed", "Automatic updates", "Discord bot included", "All Solo features included", "Cancel anytime"], cta: "Contact Me", highlight: false },
];

const PERSONAS = [
  { icon: "🏊‍♂️", title: "The Self Coached Triathlete", desc: "You train swim, bike, and run but don't have a human coach. You want data driven guidance that adapts to your life." },
  { icon: "🏃", title: "The Data Curious Runner", desc: "You track everything but don't know what the numbers mean. You want plain English coaching from your actual data." },
  { icon: "👨‍🏫", title: "The Coach With 20 Athletes", desc: "You manage multiple athletes and need an AI that writes structured workouts to each one's calendar. You review, they execute." },
];

const COACH_FAQS = [
  { q: "Do I need to be technical to use this?", a: "Not at all. The entire setup happens on a Google Meet screenshare where I guide you through every click. You share your screen, I tell you exactly what to do. After setup, you just talk to your Discord bot." },
  { q: "What if I don't use Strava?", a: "The system works with any data source that connects to Intervals.icu, including Garmin Connect, Zwift, Apple Watch via HealthFit, and more. If you don't track anywhere yet, we set that up together on the call." },
  { q: "Which AI model does it use?", a: "Whichever one you want. The system is model agnostic. It runs on GPT, Grok, Gemini, or fully offline with Ollama on your own hardware. You can switch models anytime. There is no lock in to any single AI provider." },
  { q: "What happens after 3 months?", a: "You own the install forever. It doesn't stop working. If you want ongoing updates and priority support, you can optionally stay on at the $29/mo grandfathered retainer rate (locked in for life as a founding athlete). Or keep it standalone with no retainer." },
  { q: "What's the catch with the $99 founding rate?", a: "No catch. I'm looking for 3 athletes who will use it daily and give me honest feedback plus a short testimonial. You get a massive discount. I get real world proof that the system works. Everybody wins." },
];

/* ── Utility Components ──────────────────────────────────────── */
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

/* ── BOOKING URL (replace with your actual AI Coach calendar widget URL) ── */
const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/aqUuQwD1tP8e3LyBb51Z";

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function AICoachLanding() {
  const [faqOpen, setFaqOpen] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: s.white, color: s.navy, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .playfair { font-family: 'Playfair Display', serif; }
        ::selection { background: #bae6fd; }
        .btn-primary { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; background: ${s.navy}; color: #fff; border: none; padding: 13px 28px; border-radius: 6px; cursor: pointer; transition: background 0.2s, transform 0.15s; letter-spacing: 0.3px; }
        .btn-primary:hover { background: ${s.accent}; transform: translateY(-1px); }
        .btn-outline { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.4); padding: 12px 28px; border-radius: 6px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.3px; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: #fff; transform: translateY(-1px); }
        .faq-item { border: 1px solid ${s.border}; border-radius: 10px; margin-bottom: 12px; overflow: hidden; transition: border-color 0.2s; background: #fff; }
        .faq-item:hover { border-color: #cbd5e1; }
        .faq-q { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; color: ${s.navy}; padding: 20px 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; user-select: none; }
        .faq-q:hover { color: ${s.accent}; }
        .faq-a { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; color: ${s.mid}; line-height: 1.75; padding: 0 24px 20px; }
        .back-to-top-btn { position: fixed; bottom: 32px; right: 32px; width: 48px; height: 48px; border-radius: 50%; background: ${s.navy}; color: #fff; border: none; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; z-index: 200; transition: opacity 0.3s, transform 0.3s, background 0.2s; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
        .back-to-top-btn:hover { background: ${s.accent}; }
        section[id] { scroll-margin-top: 80px; }
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
          section:not(:first-of-type) { padding-top: 64px !important; padding-bottom: 64px !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .feature-grid { grid-template-columns: 1fr !important; }
          .req-grid { grid-template-columns: 1fr !important; }
          .persona-grid { grid-template-columns: 1fr !important; }
          .setup-grid { grid-template-columns: 1fr !important; }
          .hero-buttons { flex-direction: column !important; gap: 12px !important; width: 100% !important; align-items: stretch !important; }
          .hero-buttons button { width: 100% !important; text-align: center; }
          .mobile-nav { display: flex !important; }
          .desktop-cta { display: none !important; }
          .booking-iframe { height: 1400px !important; }
          .back-to-top-btn { bottom: 20px !important; right: 20px !important; width: 42px !important; height: 42px !important; font-size: 18px !important; }
          .founding-box { padding: 32px 24px !important; }
          section[id] { scroll-margin-top: 72px !important; }
        }
        @media (min-width: 769px) { .mobile-nav { display: none !important; } }
      `}</style>

      {/* ═══ 1. STICKY NAV ═══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${s.border}`, padding: "0 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/SharmaAutomationIcon.png" alt="Sharma Automation" style={{ height: 38, width: "auto", objectFit: "contain" }} />
          </div>
          <div className="desktop-cta" style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {["Features", "Setup Call", "Pricing", "FAQ"].map(label => {
              const target = label === "Setup Call" ? "setup-call" : label.toLowerCase();
              return <span key={label} className="dm" onClick={() => scrollTo(target)} style={{ fontSize: 14, fontWeight: 500, color: s.slate, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = s.accent} onMouseLeave={e => e.target.style.color = s.slate}>{label}</span>;
            })}
            <button className="btn-primary" onClick={() => scrollTo("book")} style={{ padding: "10px 22px", background: s.accent }}>Book Setup Call</button>
          </div>
          <button className="mobile-nav" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <div style={{ width: 22, height: 2.5, background: s.navy, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <div style={{ width: 22, height: 2.5, background: s.navy, borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 2.5, background: s.navy, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {["Features", "Setup Call", "Pricing", "FAQ"].map(label => {
              const target = label === "Setup Call" ? "setup-call" : label.toLowerCase();
              return <span key={label} className="dm" onClick={() => { scrollTo(target); setMenuOpen(false); }} style={{ fontSize: 16, fontWeight: 500, color: s.navy, padding: "12px 0", borderBottom: `1px solid ${s.light}`, cursor: "pointer" }}>{label}</span>;
            })}
            <button className="btn-primary" onClick={() => { scrollTo("book"); setMenuOpen(false); }} style={{ marginTop: 12, padding: 14, textAlign: "center", background: s.accent }}>Book Setup Call</button>
          </div>
        )}
      </nav>

      {/* ═══ 2. HERO ═══ */}
      <section style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${s.navy} 0%, #1e293b 50%, ${s.navy} 100%)`, display: "flex", alignItems: "center", paddingTop: 64, padding: "120px 5vw 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", textAlign: "center" }}>
          <FadeIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 32 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.amber }} />
              <span className="dm" style={{ fontSize: 12, fontWeight: 600, color: s.amber, letterSpacing: "0.5px" }}>3 FOUNDING ATHLETE SPOTS REMAINING</span>
            </div>
            <h1 className="playfair" style={{ fontSize: "clamp(32px, 7vw, 64px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 20, color: "#fff" }}>
              Your Coach Follows You.<br />
              <span style={{ color: s.accent }}>You Don't Follow Your Coach.</span>
            </h1>
            <p className="dm" style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: "#94a3b8", lineHeight: 1.75, marginBottom: 40, maxWidth: 640, margin: "0 auto 40px", fontWeight: 300 }}>
              A conversational AI coaching system that reads your real training data and tells you exactly what to do today. Works across Discord, Claude Desktop, and Claude.ai. Built by an athlete, for athletes.
            </p>
            <div className="hero-buttons" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("book")} style={{ fontSize: 16, padding: "16px 36px", background: s.accent }}>Book Your Free Setup Call</button>
              <button className="btn-outline" onClick={() => scrollTo("demo")} style={{ fontSize: 16, padding: "15px 36px" }}>Watch the 3 Min Demo</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 3. THE PROBLEM ═══ */}
      <section style={{ padding: "96px 5vw", background: s.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Sound Familiar?</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>Training Shouldn't Feel Like Guesswork</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {PAIN_POINTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div style={{ background: s.light, border: `1px solid ${s.border}`, borderRadius: 12, padding: "32px 28px", height: "100%", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#ef4444"} onMouseLeave={e => e.currentTarget.style.borderColor = s.border}>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
                  <h3 className="playfair" style={{ fontSize: 20, fontWeight: 600, color: s.navy, marginBottom: 12 }}>{p.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: s.mid, lineHeight: 1.75, fontWeight: 300 }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. THE SOLUTION ═══ */}
      <section style={{ padding: "96px 5vw", background: s.navy }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>The Solution</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", marginBottom: 16 }}>One AI Coach. Every Platform You Use.</h2>
              <p className="dm" style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.75, maxWidth: 640, margin: "0 auto", fontWeight: 300 }}>The same coaching engine works across Discord, Claude Desktop, and Claude.ai. Ask your coach a question anywhere. Get a personalized answer backed by your real training data.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 32 }}>
                <p className="dm" style={{ fontSize: 11, letterSpacing: "2px", color: "#ef4444", textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>What Exists Today</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["TrainingPeaks shows charts. You interpret them yourself.", "Strava shows stats. No actionable coaching.", "Generic AI coaches give generic plans from templates.", "Every platform locks you into their app and their subscription."].map((pt, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#ef4444", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✕</span>
                      <span className="dm" style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, fontWeight: 300 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 12, padding: 32 }}>
                <p className="dm" style={{ fontSize: 11, letterSpacing: "2px", color: "#10b981", textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>What I Built</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Conversational coaching from your actual training data.", "Tells you exactly what to do today in plain English.", "\"Post it\" and the workout lands on your calendar in one sentence.", "You own the AI, the data, and the entire system."].map((pt, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#10b981", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✓</span>
                      <span className="dm" style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.6, fontWeight: 400 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 5. LIVE DEMO ═══ */}
      <section id="demo" style={{ padding: "96px 5vw", background: s.light }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>See It In Action</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>3 Minutes. The Full Picture.</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: `2px solid ${s.accent}40`, boxShadow: "0 12px 48px rgba(0,0,0,0.1)" }}>
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
        </div>
      </section>

      {/* ═══ 6. YOUR SETUP CALL ═══ */}
      <section id="setup-call" style={{ padding: "96px 5vw", background: s.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>The White Glove Experience</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", marginBottom: 16 }}>One Call. Fully Installed.</h2>
              <p className="dm" style={{ fontSize: 16, color: s.mid, lineHeight: 1.75, maxWidth: 640, margin: "0 auto", fontWeight: 300 }}>Everything happens on a single Google Meet video call. You share your screen, I walk you through every step. By the end of the hour, your AI coach is live and ready.</p>
            </div>
          </FadeIn>
          <div style={{ marginTop: 48 }}>
            {SETUP_STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.04}>
                <div style={{ display: "flex", gap: 24, marginBottom: 32, alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: 12, background: i === 8 ? `${s.accent}15` : s.light, border: `1px solid ${i === 8 ? s.accent + "40" : s.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="playfair" style={{ fontSize: 20, fontWeight: 700, color: i === 8 ? s.accent : s.navy }}>{step.num}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                      <h3 className="playfair" style={{ fontSize: 18, fontWeight: 600, color: s.navy }}>{step.title}</h3>
                      <span className="dm" style={{ fontSize: 12, color: s.mid, fontWeight: 400 }}>{step.time}</span>
                    </div>
                    <p className="dm" style={{ fontSize: 14, color: s.mid, lineHeight: 1.75, fontWeight: 300 }}>{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div style={{ textAlign: "center", marginTop: 16, padding: "24px 32px", background: s.light, borderRadius: 12, border: `1px solid ${s.border}` }}>
              <p className="dm" style={{ fontSize: 15, color: s.slate, fontWeight: 400 }}>Total call time: roughly 45 to 60 minutes. You walk away with a fully installed, fully customized AI coach running on your own computer.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 7. FEATURES ═══ */}
      <section id="features" style={{ padding: "96px 5vw", background: s.navy }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Capabilities</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>What Your AI Coach Can Do</h2>
            </div>
          </FadeIn>
          <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.06}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "28px 24px", height: "100%", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(14,165,233,0.4)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                  <h3 className="playfair" style={{ fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{f.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.75, fontWeight: 300 }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. REQUIREMENTS ═══ */}
      <section style={{ padding: "96px 5vw", background: s.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Transparency</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", marginBottom: 16 }}>What Gets Installed</h2>
              <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.75, maxWidth: 640, margin: "0 auto", fontWeight: 300 }}>Everything below is set up for you during your white glove setup call. No technical knowledge required. This is just so you know what powers your AI Coach under the hood.</p>
            </div>
          </FadeIn>
          <div className="req-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginTop: 48 }}>
            {REQUIREMENTS.map((r, i) => (
              <FadeIn key={r.title} delay={i * 0.06}>
                <div style={{ background: "#fff", border: `1px solid ${s.border}`, borderRadius: 12, padding: "28px 24px", height: "100%", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = s.accent} onMouseLeave={e => e.currentTarget.style.borderColor = s.border}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{r.icon}</div>
                  <h3 className="playfair" style={{ fontSize: 18, fontWeight: 600, color: s.navy, marginBottom: 8 }}>{r.title}</h3>
                  {r.desc && <p className="dm" style={{ fontSize: 14, color: s.mid, lineHeight: 1.75, fontWeight: 300 }}>{r.desc}</p>}
                  {r.items && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                      {r.items.map((item, j) => (
                        <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <span style={{ color: s.accent, fontSize: 13, marginTop: 2, flexShrink: 0 }}>✓</span>
                          <span className="dm" style={{ fontSize: 13, color: s.mid, lineHeight: 1.6, fontWeight: 300 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="dm" style={{ textAlign: "center", marginTop: 32, fontSize: 14, color: s.slate, fontWeight: 500, fontStyle: "italic" }}>All of this is included in every white glove setup. You show up to the call, we handle the rest.</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 9. PRICING ═══ */}
      <section id="pricing" style={{ padding: "96px 5vw", background: s.navy }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Pricing</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>Simple, Transparent Pricing</h2>
            </div>
          </FadeIn>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {PRICING.map((plan, i) => (
              <FadeIn key={plan.tier} delay={i * 0.08}>
                <div style={{ background: plan.highlight ? "rgba(14,165,233,0.08)" : "rgba(255,255,255,0.03)", border: plan.highlight ? "2px solid rgba(14,165,233,0.5)" : "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
                  {plan.highlight && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: s.amber, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "1px", padding: "4px 14px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", whiteSpace: "nowrap" }}>3 SPOTS ONLY</div>
                  )}
                  <p className="dm" style={{ fontSize: 13, fontWeight: 600, color: s.accent, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>{plan.tier}</p>
                  <div style={{ marginBottom: 12 }}>
                    <span className="playfair" style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}>{plan.price}</span>
                    <span className="dm" style={{ fontSize: 14, color: "#64748b", marginLeft: 4 }}>{plan.period}</span>
                  </div>
                  <p className="dm" style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>{plan.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
                    {plan.features.map((feat, fi) => (
                      <div key={fi} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: "#10b981", fontSize: 13, marginTop: 2, flexShrink: 0 }}>✓</span>
                        <span className="dm" style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5, fontWeight: 300 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary" onClick={() => scrollTo("book")} style={{ width: "100%", textAlign: "center", padding: "13px 20px", background: plan.highlight ? s.accent : "rgba(255,255,255,0.1)", border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.15)", fontSize: 14 }}>{plan.cta}</button>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "32px auto 0" }}>
              <p className="dm" style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, fontWeight: 300 }}>
                <strong style={{ color: "#94a3b8", fontWeight: 500 }}>For coaches managing multiple athletes:</strong> Contact me for Coach tier pricing, which includes multi athlete dashboard, per athlete customization, and coach summary tools. Setup from $399 one time.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 10. FOUNDING ATHLETE SPOTLIGHT ═══ */}
      <section style={{ padding: "72px 5vw", background: s.white }}>
        <FadeIn>
          <div className="founding-box" style={{ maxWidth: 800, margin: "0 auto", background: s.amberBg, border: `1px solid ${s.amberBorder}`, borderRadius: 12, padding: "48px 40", textAlign: "center" }}>
            <div style={{ display: "inline-block", background: "#fef3c7", color: s.amberDark, fontSize: 11, fontWeight: 700, letterSpacing: "2px", padding: "4px 14px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", marginBottom: 20 }}>FOUNDING ATHLETE PROGRAM</div>
            <h2 className="playfair" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", marginBottom: 20 }}>$99 Gets You Everything</h2>
            <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, maxWidth: 600, margin: "0 auto 20px", fontWeight: 300 }}>I'm looking for 3 athletes who will use the AI Coach daily and give me honest feedback. In exchange, you get the full white glove setup, 3 months of dedicated support, and the optional $29/mo grandfathered retainer rate locked in for life.</p>
            <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, maxWidth: 600, margin: "0 auto 32px", fontWeight: 300 }}>
              <strong style={{ color: s.navy, fontWeight: 600 }}>What I ask in return:</strong> Use it. Tell me what works and what doesn't. Record a 60 second testimonial when you're ready. That's it.
            </p>
            <button className="btn-primary" onClick={() => scrollTo("book")} style={{ fontSize: 15, padding: "15px 34px", background: s.amberDark }}>Claim a Founding Athlete Spot</button>
          </div>
        </FadeIn>
      </section>

      {/* ═══ 11. BUILT FOR ═══ */}
      <section style={{ padding: "96px 5vw", background: s.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Who This Is For</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>Built For Athletes Like You</h2>
            </div>
          </FadeIn>
          <div className="persona-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {PERSONAS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div style={{ background: "#fff", border: `1px solid ${s.border}`, borderRadius: 12, padding: "32px 28px", height: "100%", textAlign: "center", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = s.accent} onMouseLeave={e => e.currentTarget.style.borderColor = s.border}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</div>
                  <h3 className="playfair" style={{ fontSize: 20, fontWeight: 600, color: s.navy, marginBottom: 12 }}>{p.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: s.mid, lineHeight: 1.75, fontWeight: 300 }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 12. FAQ ═══ */}
      <section id="faq" style={{ padding: "96px 5vw", background: s.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Common Questions</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>Frequently Asked Questions</h2>
            </div>
          </FadeIn>
          {COACH_FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="faq-item" style={{ borderColor: faqOpen === i ? s.accent : s.border }}>
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

      {/* ═══ 13. FINAL CTA + BOOKING ═══ */}
      <section id="book" style={{ padding: "96px 5vw", background: s.navy }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", marginBottom: 16 }}>Ready to Meet Your AI Coach?</h2>
            <p className="dm" style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.75, marginBottom: 40, fontWeight: 300, maxWidth: 560, margin: "0 auto 40px" }}>Book your free setup call below. We'll get everything installed on a single Google Meet screenshare. You walk away with a working AI coach by the end of the hour.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
              <iframe
                className="booking-iframe"
                src={BOOKING_URL}
                style={{ width: "100%", height: 1100, border: "none", display: "block" }}
                scrolling="yes"
                title="AI Coach Setup Call Booking"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="dm" style={{ marginTop: 24, fontSize: 13, color: "#475569" }}>Free call. No commitment. Just a real conversation about your training.</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: s.navy, padding: "40px 5vw", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/SharmaAutomationIcon.png" alt="Sharma Automation" style={{ height: 36, width: "auto", objectFit: "contain" }} />
          </div>
          <p className="dm" style={{ fontSize: 13, color: "#64748b" }}>Built by an athlete, for athletes.</p>
          <p className="dm" style={{ fontSize: 12, color: "#475569" }}>© 2026 Sharma Automation. All rights reserved.</p>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ opacity: showBackToTop ? 0.85 : 0, pointerEvents: showBackToTop ? "auto" : "none", transform: showBackToTop ? "translateY(0)" : "translateY(12px)" }} aria-label="Back to top">↑</button>
    </div>
  );
}
