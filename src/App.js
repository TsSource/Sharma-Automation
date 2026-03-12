import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Services", "Industries", "How It Works", "About", "Contact"];

const PAIN_POINTS = [
  { icon: "⏰", title: "Drowning in Admin Work", desc: "Your team spends hours on scheduling, follow-ups, and data entry — time that should go toward growing your business." },
  { icon: "📉", title: "Leads Falling Through the Cracks", desc: "Without instant response systems, potential clients move on. Every missed inquiry is lost revenue." },
  { icon: "💸", title: "High Overhead, Thin Margins", desc: "Hiring more staff to handle growth isn't sustainable. There's a smarter, more scalable path forward." },
];

const SERVICES = [
  { icon: "🤖", title: "Custom AI Agent Setup", desc: "We design and deploy intelligent agents tailored to your specific business workflows — from lead capture to client communication.", tag: "Core Service" },
  { icon: "🔗", title: "Systems Integration", desc: "Connect your CRM, scheduling tools, email, and more into a unified automated workflow — reducing manual data entry and keeping your business moving even after hours.", tag: "Integration" },
  { icon: "📊", title: "Performance Tracking Setup", desc: "We configure simple, clear reporting so you can see exactly how your automations are performing — leads captured, appointments booked, time saved — without digging through spreadsheets.", tag: "Visibility" },  { icon: "💬", title: "AI Chatbot & Lead Capture", desc: "Deploy a 24/7 AI assistant on your website that qualifies leads, answers common questions, and books appointments — even while you sleep.", tag: "Lead Gen" },
  { icon: "🗺️", title: "AI Strategy Consultation", desc: "Not sure where AI fits in your business? We audit your current workflows and deliver a plain-English automation roadmap — so you invest in the right systems from day one.", tag: "Strategy" },
  { icon: "🔄", title: "Ongoing Support & Refinement", desc: "After launch, we stay available to troubleshoot, adjust, and improve your systems as your business evolves. You're never left figuring it out alone.", tag: "Support" },];

const INDUSTRIES = [
  {
    name: "Medical & Dental",
    icon: "🏥",
    color: "#0ea5e9",
    headline: "Free your staff from admin. Focus on patient care.",
    points: ["Automated appointment scheduling & reminders", "Digital new patient intake forms & follow-ups", "Post-visit check-in & review request automation", "No-show reduction through smart reminder sequences"],
  },
  {
    name: "Real Estate",
    icon: "🏡",
    color: "#10b981",
    headline: "Respond to every lead. Close more deals.",
    points: ["Automated lead capture & instant follow-up sequences", "Showing scheduling & confirmation reminders", "Personalized property listing follow-ups", "CRM-connected pipelines that keep every lead warm"],
  },
  {
    name: "Fitness & Wellness",
    icon: "💪",
    color: "#f59e0b",
    headline: "Fill your classes. Retain your members.",
    points: ["Automated class booking & waitlist management", "New member welcome sequences & check-in reminders", "Re-engagement campaigns for inactive members", "Review & referral automation to grow your community"],
  },
];

const STEPS = [
  { num: "01", title: "Discovery Call", desc: "We start with a free 30-minute consultation to understand your workflows, pain points, and goals. No jargon, no pressure — just a real conversation." },
  { num: "02", title: "Custom Blueprint", desc: "We map out exactly which agents to build, what tools to connect, and what results to expect — with a clear timeline and transparent pricing tailored to your project." },
  { num: "03", title: "Build & Deploy", desc: "We build, test, and launch your automation stack. Every system is thoroughly tested before going live so it performs reliably from day one." },
  { num: "04", title: "Measure & Optimize", desc: "We track performance from day one and stay available to refine your agents as your business evolves. You'll always know what's working and what can be improved." },
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
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function App() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", business: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    if (formData.name && formData.email) setSubmitted(true);
  };

  const s = {
    // Colors
    navy: "#0f172a",
    slate: "#334155",
    mid: "#64748b",
    light: "#f1f5f9",
    white: "#ffffff",
    accent: "#0ea5e9",
    accentDark: "#0369a1",
    border: "#e2e8f0",
  };

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
        .step-card { border-left: 2px solid #e2e8f0; padding-left: 28px; transition: border-color 0.2s; }
        .step-card:hover { border-color: #0ea5e9; }
        input, textarea { font-family: 'DM Sans', sans-serif; font-size: 14px; width: 100%; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 13px 16px; color: #0f172a; outline: none; transition: border-color 0.2s; background: #fff; }
        input:focus, textarea:focus { border-color: #0ea5e9; }
        textarea { resize: vertical; min-height: 110px; }
        label { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #334155; display: block; margin-bottom: 6px; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        padding: "0 5vw",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: s.navy, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 14, border: "2px solid #0ea5e9", borderRadius: 2, transform: "rotate(45deg)" }} />
            </div>
            <span className="playfair" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.3px" }}>Sharma Automation</span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase().replaceAll(" ", "-"))}>{l}</span>
            ))}
            <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ padding: "10px 22px" }}>Book Free Call</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, #f8fafc 0%, #f0f9ff 50%, #f8fafc 100%)`,
        display: "flex", alignItems: "center",
        padding: "100px 5vw 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background geometry */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 40, left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,23,42,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "8%", opacity: 0.06, pointerEvents: "none" }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ width: 200 - i * 30, height: 200 - i * 30, border: "1px solid #0f172a", borderRadius: "50%", position: "absolute", top: i * 15, left: i * 15 }} />
          ))}
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20,
              padding: "6px 14px", marginBottom: 32,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }} />
              <span className="dm" style={{ fontSize: 12, fontWeight: 500, color: s.slate, letterSpacing: "0.5px" }}>NOW ONBOARDING SMALL BUSINESSES</span>
            </div>
            <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>

            <h1 className="playfair" style={{ fontSize: "clamp(38px, 5.5vw, 66px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 24, color: s.navy }}>
              Put Your Business<br />
              <span style={{ color: s.accent }}>On Autopilot</span>{" "}
              With AI.
            </h1>
            <p className="dm" style={{ fontSize: 18, color: s.mid, lineHeight: 1.75, marginBottom: 40, maxWidth: 520, fontWeight: 300 }}>
              We design and deploy custom AI agent systems for small businesses — so your team spends less time on repetitive tasks and more time on what actually grows revenue.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ fontSize: 15, padding: "15px 34px" }}>Book a Free Consultation</button>
              <button className="btn-outline" onClick={() => scrollTo("how-it-works")} style={{ fontSize: 15, padding: "14px 34px" }}>See How It Works</button>
            </div>
            <div style={{ marginTop: 52, display: "flex", gap: 36, flexWrap: "wrap" }}>
              {[["Free", "Discovery Call"], ["100%", "Custom Built For You"], ["24/7", "Automation That Never Sleeps"]].map(([val, label]) => (
                <div key={label}>
                  <div className="playfair" style={{ fontSize: 28, fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>{val}</div>
                  <div className="dm" style={{ fontSize: 12, color: s.mid, marginTop: 2, letterSpacing: "0.3px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section style={{ padding: "96px 5vw", background: s.navy }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Sound Familiar?</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>Your Business Deserves Better Than This</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "stretch" }}>
            {PAIN_POINTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.12}>
               <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "32px 28px", height: "100%" }}>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
                  <h3 className="playfair" style={{ fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 12 }}>{p.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.75, fontWeight: 300 }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "96px 5vw", background: s.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>What We Build</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", marginBottom: 16 }}>End-to-End Automation Services</h2>
              <p className="dm" style={{ fontSize: 16, color: s.mid, maxWidth: 480, margin: "0 auto", fontWeight: 300, lineHeight: 1.7 }}>Everything you need to automate your operations — designed specifically for your business.</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, alignItems: "stretch" }}>
            {SERVICES.map((sv, i) => (
              <FadeIn key={sv.title} delay={i * 0.08}>
                <div className="service-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <span style={{ fontSize: 28 }}>{sv.icon}</span>
                    <span className="dm" style={{ fontSize: 11, background: "#f0f9ff", color: s.accent, padding: "4px 10px", borderRadius: 20, fontWeight: 600, letterSpacing: "0.5px" }}>{sv.tag}</span>
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
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Industries We Serve</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>Built For Your Industry</h2>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
              {INDUSTRIES.map((ind, i) => (
                <button key={ind.name} className={`industry-btn${activeIndustry === i ? " active" : ""}`} onClick={() => setActiveIndustry(i)}>
                  {ind.icon} {ind.name}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{
              background: s.light, borderRadius: 16, padding: "48px",
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
              border: "1px solid #e2e8f0",
            }}>
              <div>
                <div style={{
                  display: "inline-block", padding: "8px 16px", borderRadius: 6,
                  background: INDUSTRIES[activeIndustry].color + "15",
                  color: INDUSTRIES[activeIndustry].color,
                  fontSize: 12, fontWeight: 600, letterSpacing: "1px",
                  fontFamily: "'DM Sans', sans-serif",
                  textTransform: "uppercase", marginBottom: 20,
                }}>
                  {INDUSTRIES[activeIndustry].icon} {INDUSTRIES[activeIndustry].name}
                </div>
                <h3 className="playfair" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: s.navy, lineHeight: 1.25, marginBottom: 20 }}>
                  {INDUSTRIES[activeIndustry].headline}
                </h3>
                <button className="btn-primary" onClick={() => scrollTo("contact")}>
                  Talk To Us About {INDUSTRIES[activeIndustry].name} →
                </button>
              </div>
              <div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                  {INDUSTRIES[activeIndustry].points.map((pt, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: INDUSTRIES[activeIndustry].color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span className="dm" style={{ fontSize: 15, color: s.slate, lineHeight: 1.6 }}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "96px 5vw", background: s.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>The Process</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px" }}>From Zero to Automated in 4 Steps</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="step-card">
                  <div className="playfair" style={{ fontSize: 42, fontWeight: 700, color: "#e2e8f0", marginBottom: 12, lineHeight: 1 }}>{step.num}</div>
                  <h3 className="playfair" style={{ fontSize: 19, fontWeight: 600, color: s.navy, marginBottom: 12 }}>{step.title}</h3>
                  <p className="dm" style={{ fontSize: 14, color: s.mid, lineHeight: 1.8, fontWeight: 300 }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "96px 5vw", background: s.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <FadeIn>
            <div style={{ position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "4/3", background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #bae6fd" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 64, marginBottom: 12 }}>👤</div>
                  <div className="dm" style={{ fontSize: 13, color: s.mid, letterSpacing: "1px" }}>YOUR PHOTO HERE</div>
                </div>
              </div>
              <div style={{ position: "absolute", bottom: -20, right: -20, background: s.navy, borderRadius: 12, padding: "18px 22px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
                <div className="playfair" style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>Free</div>
                <div className="dm" style={{ fontSize: 11, color: "#94a3b8", letterSpacing: "0.5px" }}>Discovery Call</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>About</p>
              <h2 className="playfair" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 20 }}>
                Real Expertise.<br />No Fluff.
              </h2>
              <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 20, fontWeight: 300 }}>
               I'm <strong style={{ color: s.navy, fontWeight: 600 }}>Rohit Sharma</strong>, an AI automation specialist with a simple mission: help small businesses reclaim their time.
             </p>
             <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 20, fontWeight: 300 }}>
               I built Sharma Automation because I kept watching talented business owners drown in tasks that technology should be handling — scheduling, follow-ups, billing, reminders. Work that's necessary, but pulls you away from what you're actually good at.
             </p>
             <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 32, fontWeight: 300 }}>
               I have a particular focus on medical & dental, real estate, and fitness & wellness — but any small business with repetitive workflows and big growth goals is exactly who I'm here to help. Every engagement starts with a free consultation, because the right automation strategy begins with truly understanding your business first.
             </p>
              <div style={{ display: "flex", gap: 32 }}>
                {[["Local LLMs", "On-premise AI"], ["API Integrations", "Cloud AI"], ["Workflow Design", "End-to-end"]].map(([title, sub]) => (
                  <div key={title}>
                    <div className="dm" style={{ fontSize: 13, fontWeight: 600, color: s.navy, marginBottom: 2 }}>{title}</div>
                    <div className="dm" style={{ fontSize: 12, color: s.mid }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "72px 5vw", background: s.navy }}>
        <FadeIn>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <h2 className="playfair" style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", marginBottom: 16 }}>
              Ready to Automate Your Business?
            </h2>
            <p className="dm" style={{ fontSize: 16, color: "#94a3b8", marginBottom: 36, lineHeight: 1.7, fontWeight: 300 }}>
              Book a free 30-minute discovery call. We'll map out exactly what's possible for your business — no commitment required.
            </p>
            <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ fontSize: 15, padding: "16px 38px", background: s.accent }}>
              Book My Free Call →
            </button>
          </div>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "96px 5vw", background: s.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <FadeIn>
            <div>
              <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Get In Touch</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: s.navy, letterSpacing: "-0.5px", marginBottom: 20 }}>
                Let's Talk About<br />Your Business
              </h2>
              <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 40, fontWeight: 300 }}>
                Fill out the form and I'll get back to you within 24 hours. Or if you'd prefer, book a time directly on my calendar.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[["📧", "Email", "hello@flowmind.ai"], ["📍", "Based In", "Randolph, New Jersey"], ["⏱️", "Response Time", "Within 24 Hours"]].map(([icon, label, val]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, background: "#fff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e2e8f0", fontSize: 18 }}>{icon}</div>
                    <div>
                      <div className="dm" style={{ fontSize: 11, color: s.mid, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</div>
                      <div className="dm" style={{ fontSize: 14, color: s.navy, fontWeight: 500 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            {submitted ? (
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "52px 40px", textAlign: "center" }}>
                <div style={{ fontSize: 52, marginBottom: 20 }}>✅</div>
                <h3 className="playfair" style={{ fontSize: 24, fontWeight: 700, color: s.navy, marginBottom: 12 }}>Message Received!</h3>
                <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.7 }}>Thanks for reaching out. I'll be in touch within 24 hours to schedule your free consultation.</p>
              </div>
            ) : (
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "40px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div><label>Your Name</label><input placeholder="Jane Smith" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                    <div><label>Email Address</label><input placeholder="jane@business.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                  </div>
                  <div><label>Business Name & Industry</label><input placeholder="Smith Dental Group — Medical" value={formData.business} onChange={e => setFormData({ ...formData, business: e.target.value })} /></div>
                  <div><label>What would you like to automate?</label><textarea placeholder="Tell me about your biggest time drains or the tasks you'd love to hand off..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} /></div>
                  <button className="btn-primary" onClick={handleSubmit} style={{ width: "100%", padding: "15px", fontSize: 15, textAlign: "center" }}>
                    Send Message →
                  </button>
                  <p className="dm" style={{ fontSize: 12, color: s.mid, textAlign: "center" }}>No spam. No pressure. Just a conversation.</p>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: s.navy, padding: "40px 5vw", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: s.accent, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 12, height: 12, border: "2px solid #fff", borderRadius: 2, transform: "rotate(45deg)" }} />
            </div>
            <span className="playfair" style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Sharma Automation</span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {NAV_LINKS.map(l => (
              <span key={l} className="dm" onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))} style={{ fontSize: 13, color: "#64748b", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "#64748b"}>{l}</span>
            ))}
          </div>
          <p className="dm" style={{ fontSize: 12, color: "#475569" }}>© 2026 Sharma Automation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}