import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   AI COACH LANDING PAGE: Cloud Product Marketing (Scope B)
   sharmaautomation.com/ai-coach

   Marketing landing for AI Coach Cloud, the hosted SaaS endurance
   coaching platform. CTAs route to coach.sharmaautomation.com for
   signup and login. 7-day free trial on all plans.

   Color Palette:
     bgWhite #FFFFFF / bgWarm #F8F7F4 / bgDark #1B1B1B
     accent #E84525 / gold #F4A127 / steel #2B6CB0

   Race photos (in public/):
     race-hero.jpg, race-finish.jpg,
     race-bike.jpg, race-run.jpg, race-swim.jpeg, race-medal.jpg
═══════════════════════════════════════════════════════════════ */

/* ── Color Tokens ──────────────────────────────────────────── */
const s = {
  bgWhite: "#FFFFFF", bgWarm: "#F8F7F4", bgDark: "#1B1B1B", bgDarkCard: "#2A2A2A",
  accent: "#E84525", accentDim: "rgba(232,69,37,0.1)", accentGlow: "rgba(232,69,37,0.25)",
  gold: "#F4A127", goldDim: "rgba(244,161,39,0.12)", goldBg: "#fffbeb", goldBorder: "#fde68a", goldDark: "#92400e",
  steel: "#2B6CB0",
  textDark: "#1B1B1B", textBody: "#4A4A4A", textMuted: "#8A8A8A", textLight: "#F5F5F5",
  border: "#E5E5E5", borderDark: "#333",
  shadow: "0 2px 16px rgba(0,0,0,0.06)", shadowLift: "0 8px 30px rgba(0,0,0,0.1)",
};

/* ── Data Constants ──────────────────────────────────────────── */
const PAIN_POINTS = [
  { icon: "📊", title: "Data Without Answers", desc: "TrainingPeaks shows you a chart. You stare at it. You still don't know what to do today." },
  { icon: "📋", title: "Plans That Don't Adapt", desc: "Life happens. You miss a day. Your rigid training plan doesn't adjust, so you either skip it or push through when you shouldn't." },
  { icon: "📱", title: "Apps That Don't Coach", desc: "Your watch logs your run. Your phone tracks your sleep. None of them tell you what to do tomorrow. They show data; they don't give advice." },
];

const FEATURES = [
  { icon: "📊", title: "Personalized to YOUR Data", desc: "Every recommendation is generated from your actual training. Not a generic template, not advice scraped from running blogs." },
  { icon: "💬", title: "Conversational, Ask Anything", desc: "Talk to your coach like you'd text a friend. Get answers in plain English, backed by your numbers." },
  { icon: "📅", title: "Writes Workouts to Your Calendar", desc: "Say 'post it' and the structured workout lands on your Intervals.icu calendar. Syncs to Zwift, Garmin, and Wahoo." },
  { icon: "🧠", title: "Adapts to HRV, Sleep, and Fatigue", desc: "Your plan flexes when you do. Bad sleep or high fatigue? Your coach adjusts the day, not next month." },
  { icon: "🏃", title: "Built By An Athlete", desc: "A competitive age-group triathlete who uses this system every morning. Not a Silicon Valley product team." },
  { icon: "🔒", title: "Your Data, Your Control", desc: "Powered by your Intervals.icu account. Export, view, or delete anytime. No vendor lock-in." },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Sign Up", time: "60 seconds", desc: "Email and password. Confirm your address. You're in." },
  { num: "02", title: "Connect Intervals.icu", desc: "Paste your credentials once. We pull your training history, your fitness and fatigue trends, and your goal races." },
  { num: "03", title: "Get Coached", desc: "Your AI coach reads your data and starts giving personalized guidance from day one. Ask anything. Get answers backed by your real numbers." },
];

const PRICING = [
  { tier: "Founding", price: "$14.99", period: "/month", desc: "Lock in this rate for as long as you remain subscribed. Supporter pricing for getting in early.", features: ["7-day free trial", "Personalized AI coaching from your training data", "Workouts written to your Intervals.icu calendar", "Adapts to HRV, sleep, and fatigue", "Conversational, ask-anything", "Cancel anytime"], cta: "Claim Founding Rate", highlight: true, badge: "LIMITED TIME" },
  { tier: "Monthly", price: "$24.99", period: "/month", desc: "Full access, billed monthly. Cancel anytime.", features: ["7-day free trial", "Personalized AI coaching from your training data", "Workouts written to your Intervals.icu calendar", "Adapts to HRV, sleep, and fatigue", "Conversational, ask-anything", "Cancel anytime"], cta: "Start Free Trial", highlight: false, badge: null },
  { tier: "Annual", price: "$249", period: "/year", desc: "Save $51 versus monthly. Two months free.", features: ["7-day free trial", "Personalized AI coaching from your training data", "Workouts written to your Intervals.icu calendar", "Adapts to HRV, sleep, and fatigue", "Conversational, ask-anything", "Cancel anytime"], cta: "Start Free Trial", highlight: false, badge: "BEST VALUE" },
];

const PERSONAS = [
  { icon: "🏊‍♂️🚴‍♂️🏃‍♂️", title: "Self-Coached Triathletes", desc: "You train for 70.3s or full distance and want smarter guidance without a $200/month human coach." },
  { icon: "🏃", title: "Marathon Runners", desc: "You log miles, track paces, and need a coach that adapts to your fatigue, not a static 16-week PDF." },
  { icon: "🚴", title: "Cyclists and Zwift Riders", desc: "You ride with power. FTP, TSS, and IF are your vocabulary. Your coach should speak it too." },
  { icon: "🏊", title: "Swimmers", desc: "You log meters, track CSS or pace per 100, and need a coach that builds structured workouts you can actually follow at the pool." },
];

const FAQS = [
  { q: "Who built this?", a: "A competitive age-group triathlete who has completed multiple IRONMAN 70.3 races and uses this system every single day for his own training. This is not a Silicon Valley tech product. It was built by an athlete who needed smarter coaching and couldn't find it anywhere." },
  { q: "Do you actually use this yourself?", a: "Every morning. My AI coach analyzes my previous day's training, checks my fitness and fatigue trends, and gives me a personalized recommendation before I even lace up my shoes. What you're buying is the exact same system I rely on." },
  { q: "Do I need to be technical to use this?", a: "Not at all. Sign up takes 60 seconds. Connecting your Intervals.icu account takes another minute. From there, you talk to your coach like you'd text a friend. No installs, no setup calls, no command line." },
  { q: "What if I don't have an Intervals.icu account?", a: "You'll need one to use AI Coach. The good news: Intervals.icu is free, and it pulls data from most training apps automatically (Garmin Connect, Zwift, Apple Watch via HealthFit, and others). Sign up at intervals.icu, then connect AI Coach to your account." },
  { q: "Which AI does it use?", a: "AI Coach runs on Anthropic's Claude. The same models that power Claude.ai, configured specifically for endurance coaching. We chose Claude because it's the most reliable model available for the kind of careful reasoning coaching requires." },
  { q: "Is there a free trial?", a: "Yes. Every plan starts with a 7-day free trial. You enter a card upfront so your account stays active when the trial ends, but you can cancel anytime during the trial with no charge." },
  { q: "What's the catch with the founding rate?", a: "No catch. Early supporters get the founding rate locked in for as long as they remain subscribed. I'm building this with your feedback, and the founding price is my thank-you for getting in early. Use it, tell me what works and what doesn't, and share a testimonial or review when you're ready." },
  { q: "Is my data private?", a: "We take privacy seriously. Your account lives on encrypted, AWS-backed infrastructure (Supabase and Railway), with industry-standard encryption in transit and at rest. Your Intervals.icu credentials are stored in an encrypted vault, never logged or exposed. We never sell, rent, or share your data with third parties. Anthropic does not train its AI models on customer API data, so your conversations stay private. Your training data lives at Intervals.icu, which is the source of truth, and you can export it from there anytime. You can review your conversation history and remove individual threads at any time." },
];

const NAV_LINKS = [["Story", "story"], ["Features", "features"], ["Pricing", "pricing"], ["FAQ", "faq"]];

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
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function AICoachLanding() {
  const [faqOpen, setFaqOpen] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const h = () => { setShowBackToTop(window.scrollY > 400); setNavScrolled(window.scrollY > 80); };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: s.bgWhite, color: s.textBody, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .barlow { font-family: 'Barlow Condensed', sans-serif; }
        ::selection { background: ${s.accent}; color: #fff; }
        .btn-primary { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; background: ${s.accent}; color: #fff; border: none; padding: 14px 32px; border-radius: 4px; cursor: pointer; transition: all 0.25s; letter-spacing: 0.12em; text-transform: uppercase; box-shadow: 0 4px 16px ${s.accentGlow}; }
        .btn-primary:hover { background: #D03A1E; transform: translateY(-2px); }
        .btn-outline { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; background: transparent; color: ${s.accent}; border: 2px solid ${s.accent}; padding: 13px 32px; border-radius: 4px; cursor: pointer; transition: all 0.25s; letter-spacing: 0.12em; text-transform: uppercase; }
        .btn-outline:hover { background: ${s.accentDim}; }
        .btn-outline-light { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.4); padding: 13px 32px; border-radius: 4px; cursor: pointer; transition: all 0.25s; letter-spacing: 0.12em; text-transform: uppercase; }
        .btn-outline-light:hover { border-color: #fff; background: rgba(255,255,255,0.1); }
        .btn-gold { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; background: ${s.goldDark}; color: #fff; border: none; padding: 15px 34px; border-radius: 4px; cursor: pointer; transition: all 0.25s; letter-spacing: 0.12em; text-transform: uppercase; }
        .btn-gold:hover { background: #7c3610; transform: translateY(-2px); }
        .section-label { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 12px; }
        h2.heading { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(28px, 4vw, 44px); font-weight: 700; color: ${s.textDark}; line-height: 1.15; text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 20px; }
        .card { background: ${s.bgWhite}; border-radius: 8px; padding: 28px 24px; box-shadow: ${s.shadow}; border: 1px solid ${s.border}; height: 100%; transition: box-shadow 0.3s, transform 0.3s, border-color 0.2s; }
        .card:hover { box-shadow: ${s.shadowLift}; transform: translateY(-3px); border-color: ${s.accent}; }
        .faq-item { border: 1px solid ${s.border}; border-radius: 8px; margin-bottom: 12px; overflow: hidden; transition: border-color 0.2s; background: #fff; }
        .faq-item:hover { border-color: #cbd5e1; }
        .faq-q { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; color: ${s.textDark}; padding: 20px 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; user-select: none; }
        .faq-q:hover { color: ${s.accent}; }
        .faq-a { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; color: ${s.textBody}; line-height: 1.75; padding: 0 24px 20px; }
        .back-to-top-btn { position: fixed; bottom: 32px; right: 32px; width: 48px; height: 48px; border-radius: 50%; background: ${s.accent}; color: #fff; border: none; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; z-index: 200; transition: opacity 0.3s, transform 0.3s; box-shadow: 0 4px 16px ${s.accentGlow}; }
        section[id] { scroll-margin-top: 80px; }
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .pricing-grid, .feature-grid, .req-grid, .persona-grid, .setup-grid { grid-template-columns: 1fr !important; }
          .hero-buttons { flex-direction: column !important; gap: 12px !important; width: 100% !important; align-items: stretch !important; }
          .hero-buttons button { width: 100% !important; text-align: center; }
          .mobile-nav { display: flex !important; }
          .desktop-cta { display: none !important; }
          .booking-iframe { height: 1400px !important; }
          .back-to-top-btn { bottom: 20px !important; right: 20px !important; width: 42px !important; height: 42px !important; }
          .founding-box { padding: 32px 24px !important; }
          .story-grid { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
          section[id] { scroll-margin-top: 72px !important; }
        }
        @media (max-width: 480px) { .gallery-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 769px) { .mobile-nav { display: none !important; } }
      `}</style>

      {/* ═══ 1. STICKY NAV ═══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: navScrolled ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: navScrolled ? "blur(12px)" : "none", borderBottom: navScrolled ? `1px solid ${s.border}` : "1px solid transparent", padding: "0 5vw", transition: "all 0.3s" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/SharmaAutomationIcon.png" alt="Sharma Automation" style={{ height: 36, width: "auto", objectFit: "contain", filter: navScrolled ? "none" : "brightness(10)" }} />
          </div>
          <div className="desktop-cta" style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {NAV_LINKS.map(([label, target]) => (
              <span key={label} className="dm" onClick={() => scrollTo(target)} style={{ fontSize: 14, fontWeight: 500, color: navScrolled ? s.textBody : "rgba(255,255,255,0.85)", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = s.accent} onMouseLeave={e => e.target.style.color = navScrolled ? s.textBody : "rgba(255,255,255,0.85)"}>{label}</span>
            ))}
            <a href="https://coach.sharmaautomation.com/login" className="dm" style={{ fontSize: 14, fontWeight: 500, color: navScrolled ? s.textBody : "rgba(255,255,255,0.85)", textDecoration: "none", transition: "color 0.2s" }}>Sign In</a>
            <a href="https://coach.sharmaautomation.com/signup" className="btn-primary" style={{ padding: "10px 22px", fontSize: 13, textDecoration: "none", display: "inline-block" }}>Start Free Trial</a>
          </div>
          <button className="mobile-nav" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <div style={{ width: 22, height: 2.5, background: navScrolled ? s.textDark : "#fff", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <div style={{ width: 22, height: 2.5, background: navScrolled ? s.textDark : "#fff", borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 2.5, background: navScrolled ? s.textDark : "#fff", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 4, background: "rgba(255,255,255,0.98)" }}>
            {NAV_LINKS.map(([label, target]) => (
              <span key={label} className="dm" onClick={() => { scrollTo(target); setMenuOpen(false); }} style={{ fontSize: 16, fontWeight: 500, color: s.textDark, padding: "12px 0", borderBottom: `1px solid ${s.border}`, cursor: "pointer" }}>{label}</span>
            ))}
            <a href="https://coach.sharmaautomation.com/login" className="dm" style={{ fontSize: 16, fontWeight: 500, color: s.textDark, padding: "12px 0", borderBottom: `1px solid ${s.border}`, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Sign In</a>
            <a href="https://coach.sharmaautomation.com/signup" className="btn-primary" style={{ marginTop: 12, padding: 14, textAlign: "center", textDecoration: "none", display: "block" }} onClick={() => setMenuOpen(false)}>Start Free Trial</a>
          </div>
        )}
      </nav>

      {/* ═══ 2. HERO (with race photo) ═══ */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/race-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center top", filter: "brightness(0.35) saturate(0.8)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(27,27,27,0.75) 0%, rgba(232,69,37,0.12) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", width: "100%", textAlign: "center", padding: "130px 5vw 90px" }}>
          <FadeIn>
            <div className="barlow" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,69,37,0.2)", border: `1px solid ${s.accent}`, borderRadius: 4, padding: "8px 22px", marginBottom: 32, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: s.accent }}>
              Built by an IRONMAN 70.3 Finisher
            </div>
            <h1 className="barlow" style={{ fontSize: "clamp(42px, 7vw, 82px)", fontWeight: 800, lineHeight: 1.05, color: "#fff", textTransform: "uppercase", marginBottom: 24 }}>
              I Built The Coach<br /><span style={{ color: s.accent }}>I Wished I Had</span>
            </h1>
            <p className="dm" style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.8)", lineHeight: 1.65, marginBottom: 40, maxWidth: 620, margin: "0 auto 40px", fontWeight: 300 }}>
              A conversational AI coach that reads your real training data and tells you exactly what to do today. Sign up in 60 seconds, connect Intervals.icu, and start training smarter.
            </p>
            <div className="hero-buttons" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://coach.sharmaautomation.com/signup" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px", textDecoration: "none", display: "inline-block" }}>Start Free Trial</a>
              <button className="btn-outline-light" onClick={() => scrollTo("demo")} style={{ fontSize: 16, padding: "15px 36px" }}>Watch the Demo</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 3. FOUNDER STORY ═══ */}
      <section id="story" style={{ padding: "96px 5vw", background: s.bgWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <FadeIn>
              <div style={{ position: "relative" }}>
                <img src="/race-finish.jpg" alt="Rohit finishing an IRONMAN 70.3 triathlon" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "top", borderRadius: 8, boxShadow: s.shadowLift }} />
                <div style={{ position: "absolute", bottom: -6, left: 20, right: 20, height: 5, background: s.accent, borderRadius: 3 }} />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="section-label" style={{ color: s.accent }}>The Founder</p>
              <h2 className="heading" style={{ textTransform: "none", fontSize: "clamp(26px, 3.5vw, 38px)" }}>I've Been Where You Are</h2>
              <div className="dm" style={{ fontSize: 16, lineHeight: 1.8 }}>
                <p style={{ marginBottom: 20 }}>I've been a competitive age-group triathlete for five years. I've finished multiple IRONMAN 70.3 races. I train 7 to 10 hours a week. And like most self-coached athletes, I spent too much time staring at data I didn't fully understand and following plans that didn't adapt to how I actually felt.</p>
                <p style={{ marginBottom: 20 }}>So I built something better. An AI that connects to my Intervals.icu account, reads my real workout data (heart rate, power, sleep, HRV, and fitness trends), and gives me a personalized recommendation every morning.</p>
                <p style={{ marginBottom: 28, color: s.textDark, fontWeight: 600 }}>I use it every single day. Now I've made it available to other athletes, fully hosted in the cloud. No install, no technical setup. Just sign up and start training smarter.</p>
                <button className="btn-outline" onClick={() => scrollTo("demo")}>Watch the Demo ↓</button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 4. THE PROBLEM ═══ */}
      <section style={{ padding: "96px 5vw", background: s.bgWarm }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 60 }}>
            <p className="section-label" style={{ color: s.accent }}>Sound Familiar?</p>
            <h2 className="heading">Training Shouldn't Feel Like Guesswork</h2>
          </div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {PAIN_POINTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className="card" style={{ borderTop: `4px solid ${s.accent}` }}>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
                  <h3 className="barlow" style={{ fontSize: 20, fontWeight: 700, color: s.textDark, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: s.textBody, lineHeight: 1.75, fontWeight: 300 }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. THE SOLUTION (What Exists vs What I Built) ═══ */}
      <section style={{ padding: "96px 5vw", background: s.bgDark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="section-label" style={{ color: s.accent }}>The Solution</p>
            <h2 className="heading" style={{ color: "#fff" }}>One AI Coach. Built On Your Data.</h2>
            <p className="dm" style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 640, margin: "0 auto", fontWeight: 300 }}>Ask your coach a question and get a personalized answer backed by your real training data.</p>
          </div></FadeIn>
          <FadeIn delay={0.1}>
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 32 }}>
                <p className="barlow" style={{ fontSize: 12, letterSpacing: "0.15em", color: "#ef4444", textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>What Exists Today</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["TrainingPeaks shows charts. You interpret them yourself.", "Strava shows stats. No actionable coaching.", "Generic AI coaches give generic plans from templates.", "Every platform locks you into their app and their subscription."].map((pt, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#ef4444", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✕</span>
                      <span className="dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, fontWeight: 300 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(232,69,37,0.06)", border: `1px solid rgba(232,69,37,0.25)`, borderRadius: 8, padding: 32 }}>
                <p className="barlow" style={{ fontSize: 12, letterSpacing: "0.15em", color: "#10b981", textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>What I Built</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Conversational coaching from your actual training data.", "Tells you exactly what to do today in plain English.", "\"Post it\" and the workout lands on your Intervals.icu calendar.", "Sign up in 60 seconds."].map((pt, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#10b981", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✓</span>
                      <span className="dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, fontWeight: 400 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 6. LIVE DEMO ═══ */}
      <section id="demo" style={{ padding: "96px 5vw", background: s.bgWarm }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="section-label" style={{ color: s.accent }}>See It In Action</p>
            <h2 className="heading">The Full Picture.</h2>
          </div></FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: s.shadowLift }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe src="https://www.youtube.com/embed/t94TFathyCs?rel=0" title="Sharma AI Coach Demo" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 7. HOW IT WORKS ═══ */}
      <section id="how-it-works" style={{ padding: "96px 5vw", background: s.bgWhite }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 16 }}>
            <p className="section-label" style={{ color: s.accent }}>Getting Started</p>
            <h2 className="heading">From Sign Up to Coached in Minutes</h2>
          </div></FadeIn>
          <div style={{ marginTop: 48 }}>
            {HOW_IT_WORKS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.06}>
                <div style={{ display: "flex", gap: 24, marginBottom: 32, alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: 8, background: s.bgWarm, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="barlow" style={{ fontSize: 20, fontWeight: 700, color: s.textDark }}>{step.num}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                      <h3 className="barlow" style={{ fontSize: 18, fontWeight: 700, color: s.textDark, textTransform: "uppercase", letterSpacing: "0.04em" }}>{step.title}</h3>
                      {step.time && <span className="dm" style={{ fontSize: 12, color: s.textMuted, fontWeight: 400 }}>{step.time}</span>}
                    </div>
                    <p className="dm" style={{ fontSize: 14, color: s.textBody, lineHeight: 1.75, fontWeight: 300 }}>{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div style={{ textAlign: "center", marginTop: 16, padding: "24px 32px", background: s.bgWarm, borderRadius: 8, border: `1px solid ${s.border}` }}>
              <p className="dm" style={{ fontSize: 15, color: s.textBody, fontWeight: 500 }}>7-day free trial. Cancel anytime. No setup calls, no installs.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 8. RACE PHOTO GALLERY ═══ */}
      <section style={{ overflow: "hidden" }}>
        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", minHeight: 300 }}>
          {["/race-bike.jpg", "/race-run.jpg", "/race-swim.jpeg", "/race-medal.jpg"].map((src, i) => (
            <div key={i} style={{ backgroundImage: `url('${src}')`, backgroundSize: "cover", backgroundPosition: "center top", minHeight: 300, transition: "transform 0.4s", overflow: "hidden" }} onMouseEnter={e => e.target.style.transform = "scale(1.03)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
          ))}
        </div>
      </section>

      {/* ═══ 9. FEATURES ═══ */}
      <section id="features" style={{ padding: "96px 5vw", background: s.bgWarm }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="section-label" style={{ color: s.accent }}>Why AI Coach</p>
            <h2 className="heading">What Makes This Different</h2>
          </div></FadeIn>
          <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.06}>
                <div className="card">
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                  <h3 className="barlow" style={{ fontSize: 18, fontWeight: 700, color: s.textDark, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>{f.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: s.textBody, lineHeight: 1.75, fontWeight: 300 }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. PRICING (3 tiers, dark) ═══ */}
      <section id="pricing" style={{ padding: "96px 5vw", background: s.bgDark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="section-label" style={{ color: s.accent }}>Pricing</p>
            <h2 className="heading" style={{ color: "#fff" }}>Simple, Transparent Pricing</h2>
            <p className="dm" style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 640, margin: "0 auto", fontWeight: 300 }}>7-day free trial on every plan. Cancel anytime.</p>
          </div></FadeIn>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {PRICING.map((plan, i) => (
              <FadeIn key={plan.tier} delay={i * 0.08}>
                <div style={{ background: plan.highlight ? "rgba(232,69,37,0.08)" : "rgba(255,255,255,0.03)", border: plan.highlight ? `2px solid ${s.accent}` : "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
                  {plan.badge && (
                    <div className="barlow" style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: plan.highlight ? s.gold : s.steel, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", padding: "4px 14px", borderRadius: 4, textTransform: "uppercase", whiteSpace: "nowrap" }}>{plan.badge}</div>
                  )}
                  <p className="barlow" style={{ fontSize: 14, fontWeight: 700, color: s.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{plan.tier}</p>
                  <div style={{ marginBottom: 12 }}>
                    <span className="barlow" style={{ fontSize: 36, fontWeight: 800, color: "#fff" }}>{plan.price}</span>
                    <span className="dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginLeft: 4 }}>{plan.period}</span>
                  </div>
                  <p className="dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>{plan.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
                    {plan.features.map((feat, fi) => (
                      <div key={fi} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: "#10b981", fontSize: 13, marginTop: 2, flexShrink: 0 }}>✓</span>
                        <span className="dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, fontWeight: 300 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <a href="https://coach.sharmaautomation.com/signup" className="btn-primary" style={{ width: "100%", textAlign: "center", padding: "13px 20px", background: plan.highlight ? s.accent : "rgba(255,255,255,0.1)", border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.15)", boxShadow: plan.highlight ? `0 4px 16px ${s.accentGlow}` : "none", textDecoration: "none", display: "inline-block" }}>{plan.cta}</a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 11. FOUNDING SPOTLIGHT ═══ */}
      <section style={{ padding: "72px 5vw", background: s.bgWhite }}>
        <FadeIn>
          <div className="founding-box" style={{ maxWidth: 800, margin: "0 auto", background: s.goldBg, border: `1px solid ${s.goldBorder}`, borderRadius: 8, padding: "48px 40px", textAlign: "center" }}>
            <div className="barlow" style={{ display: "inline-block", background: "#fef3c7", color: s.goldDark, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", padding: "4px 14px", borderRadius: 4, textTransform: "uppercase", marginBottom: 20 }}>FOUNDING ATHLETE PROGRAM</div>
            <h2 className="heading" style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}>Founding Pricing. Limited Time.</h2>
            <p className="dm" style={{ fontSize: 15, color: s.textBody, lineHeight: 1.85, maxWidth: 600, margin: "0 auto 20px", fontWeight: 300 }}>Founding access is $14.99 per month, locked in at that rate for as long as you remain subscribed. You're getting in early. I'm building this with your feedback.</p>
            <p className="dm" style={{ fontSize: 15, color: s.textBody, lineHeight: 1.85, maxWidth: 600, margin: "0 auto 32px", fontWeight: 300 }}>
              <strong style={{ color: s.textDark, fontWeight: 600 }}>What I ask in return:</strong> Use it. Tell me what works and what doesn't. Share a testimonial or review when you're ready. That's it.
            </p>
            <a href="https://coach.sharmaautomation.com/signup" className="btn-gold" style={{ textDecoration: "none", display: "inline-block" }}>Claim Founding Rate</a>
          </div>
        </FadeIn>
      </section>

      {/* ═══ 12. BUILT FOR ═══ */}
      <section style={{ padding: "96px 5vw", background: s.bgWarm }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="section-label" style={{ color: s.accent }}>Who This Is For</p>
            <h2 className="heading">Built For Athletes Like You</h2>
          </div></FadeIn>
          <div className="persona-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {PERSONAS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className="card" style={{ textAlign: "center", borderBottom: `4px solid ${s.accent}` }}>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{p.icon}</div>
                  <h3 className="barlow" style={{ fontSize: 18, fontWeight: 700, color: s.textDark, marginBottom: 10, textTransform: "uppercase" }}>{p.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: s.textBody, lineHeight: 1.75, fontWeight: 300 }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 13. FAQ ═══ */}
      <section id="faq" style={{ padding: "96px 5vw", background: s.bgWhite }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="section-label" style={{ color: s.steel }}>Common Questions</p>
            <h2 className="heading">Frequently Asked Questions</h2>
          </div></FadeIn>
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className="faq-item" style={{ borderColor: faqOpen === i ? s.accent : s.border }}>
                <div className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <span>{faq.q}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0, transition: "transform 0.25s", transform: faqOpen === i ? "rotate(45deg)" : "rotate(0)" }}>
                    <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ maxHeight: faqOpen === i ? "600px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
                  <div className="faq-a">{faq.a}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ 14. FINAL CTA ═══ */}
      <section id="book" style={{ padding: "96px 5vw", background: s.bgDark }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 className="heading" style={{ color: "#fff", fontSize: "clamp(28px, 4.5vw, 48px)" }}>
              Your Coach Follows You.<br /><span style={{ color: s.accent }}>You Don't Follow Your Coach.</span>
            </h2>
            <p className="dm" style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px", fontWeight: 300 }}>Sign up takes 60 seconds. Your AI coach will be reading your training data within minutes.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <a
                href="https://coach.sharmaautomation.com/signup"
                className="btn-primary"
                style={{ fontSize: 18, padding: "18px 48px", textDecoration: "none", display: "inline-block" }}
              >
                Start Free Trial
              </a>
              <p className="dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                Already have an account?{" "}
                <a
                  href="https://coach.sharmaautomation.com/login"
                  style={{ color: s.accent, textDecoration: "none", fontWeight: 500 }}
                >
                  Sign in
                </a>
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="dm" style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>7-day free trial. Cancel anytime. No setup required.</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: s.bgWhite, padding: "40px 5vw", borderTop: `1px solid ${s.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto 16px", display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          <a href="/privacy" className="dm" style={{ fontSize: 13, color: s.textMuted, textDecoration: "none" }}>Privacy Policy</a>
          <span style={{ color: s.textMuted, fontSize: 13 }}>·</span>
          <a href="/terms" className="dm" style={{ fontSize: 13, color: s.textMuted, textDecoration: "none" }}>Terms of Service</a>
          <span style={{ color: s.textMuted, fontSize: 13 }}>·</span>
          <a href="mailto:sharma@sharmaautomation.com" className="dm" style={{ fontSize: 13, color: s.textMuted, textDecoration: "none" }}>Contact</a>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/SharmaAutomationIcon.png" alt="Sharma Automation" style={{ height: 36, width: "auto", objectFit: "contain" }} />
          </div>
          <p className="dm" style={{ fontSize: 13, color: s.textMuted }}>Built by an athlete, for athletes.</p>
          <p className="dm" style={{ fontSize: 12, color: s.textMuted }}>© 2026 Sharma Automation. All rights reserved.</p>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ opacity: showBackToTop ? 0.85 : 0, pointerEvents: showBackToTop ? "auto" : "none", transform: showBackToTop ? "translateY(0)" : "translateY(12px)" }} aria-label="Back to top">↑</button>
    </div>
  );
}
