import { useState } from "react";

const workflows = [
  {
    id: 1,
    phase: "Patient Acquisition",
    color: "#00C9A7",
    icon: "🎯",
    agents: [
      {
        name: "Lead Capture Agent",
        trigger: "Website visitor / Google ad click",
        actions: [
          "Greets visitor via chat widget",
          "Collects name, contact info, insurance",
          "Qualifies new vs. returning patient",
          "Books intro appointment slot",
        ],
        tools: ["Website chatbot", "Google Ads", "CRM"],
        hipaa: false,
      },
      {
        name: "Review & Reputation Agent",
        trigger: "Post-visit (48 hrs after appointment)",
        actions: [
          "Sends SMS/email review request",
          "Routes happy patients to Google/Yelp",
          "Flags negative feedback for staff",
          "Tracks monthly reputation score",
        ],
        tools: ["Twilio SMS", "Birdeye", "Google Business"],
        hipaa: false,
      },
    ],
  },
  {
    id: 2,
    phase: "Scheduling & Intake",
    color: "#4D9FFF",
    icon: "📅",
    agents: [
      {
        name: "Appointment Scheduling Agent",
        trigger: "Inbound call / online form / text",
        actions: [
          "Checks real-time provider availability",
          "Books, reschedules, or cancels appointments",
          "Sends confirmation + calendar invite",
          "Handles waitlist management",
        ],
        tools: ["Calendly", "Dentrix", "OpenDental", "EHR"],
        hipaa: true,
      },
      {
        name: "Patient Intake Agent",
        trigger: "48 hrs before appointment",
        actions: [
          "Sends digital intake forms via secure link",
          "Collects medical history & allergies",
          "Uploads signed consent forms to chart",
          "Alerts staff if forms incomplete",
        ],
        tools: ["Klara", "Phreesia", "EHR system"],
        hipaa: true,
      },
    ],
  },
  {
    id: 3,
    phase: "Insurance & Billing",
    color: "#FF6B6B",
    icon: "💳",
    agents: [
      {
        name: "Insurance Verification Agent",
        trigger: "New patient booked / annual renewal",
        actions: [
          "Verifies insurance eligibility in real-time",
          "Checks coverage, copays & deductibles",
          "Sends patient their benefits summary",
          "Flags coverage gaps for front desk",
        ],
        tools: ["Availity", "Change Healthcare", "EHR"],
        hipaa: true,
      },
      {
        name: "Billing & Collections Agent",
        trigger: "Post-visit claim submission",
        actions: [
          "Auto-submits insurance claims",
          "Sends patient statements & payment links",
          "Follows up on unpaid balances (Day 7, 14, 30)",
          "Escalates to staff after 3 failed attempts",
        ],
        tools: ["Kareo", "DrChrono", "Stripe"],
        hipaa: true,
      },
    ],
  },
  {
    id: 4,
    phase: "Patient Communication",
    color: "#FFB347",
    icon: "💬",
    agents: [
      {
        name: "Reminder & Recall Agent",
        trigger: "Scheduled time before appointment",
        actions: [
          "Sends reminders (72hr, 24hr, 2hr before)",
          "Allows 1-click confirm/cancel via SMS",
          "Recalls patients overdue for checkups",
          "Reduces no-show rate automatically",
        ],
        tools: ["Twilio", "Solutionreach", "Lighthouse 360"],
        hipaa: true,
      },
      {
        name: "Post-Care Follow-up Agent",
        trigger: "24 hrs after procedure",
        actions: [
          "Checks in on patient recovery",
          "Answers common post-op questions",
          "Escalates urgent symptoms to on-call staff",
          "Books follow-up visit if needed",
        ],
        tools: ["Klara", "Spruce Health", "EHR"],
        hipaa: true,
      },
    ],
  },
  {
    id: 5,
    phase: "Operations & Admin",
    color: "#A78BFA",
    icon: "⚙️",
    agents: [
      {
        name: "Staff Coordination Agent",
        trigger: "Daily at 7:00 AM",
        actions: [
          "Generates daily schedule briefing for staff",
          "Flags double bookings or prep needs",
          "Tracks provider utilization rates",
          "Notifies about supply reorder thresholds",
        ],
        tools: ["Slack", "Google Workspace", "EHR"],
        hipaa: false,
      },
      {
        name: "Reporting & Analytics Agent",
        trigger: "Weekly / Monthly automated report",
        actions: [
          "Tracks KPIs: revenue, no-shows, new patients",
          "Monitors patient satisfaction scores",
          "Identifies slow appointment slots",
          "Emails summary report to practice owner",
        ],
        tools: ["Google Analytics", "Looker Studio", "EHR"],
        hipaa: false,
      },
    ],
  },
];

export default function App() {
  const [activePhase, setActivePhase] = useState(null);
  const [activeAgent, setActiveAgent] = useState(null);

  const selected = workflows.find((w) => w.id === activePhase);
  const agent = selected?.agents.find((a) => a.name === activeAgent);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050d1a",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e8f0fe",
      padding: "40px 24px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #00C9A7, #4D9FFF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "13px",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "4px",
          marginBottom: "12px",
          textTransform: "uppercase",
        }}>AI Agentic Automation Blueprint</div>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: "700",
          margin: "0 0 12px",
          lineHeight: 1.15,
          color: "#fff",
          letterSpacing: "-0.5px",
        }}>Medical & Dental Practice</h1>
        <p style={{ color: "#6b85a8", fontSize: "15px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
          10 AI agents across 5 workflow phases — click any phase to explore
        </p>
      </div>

      {/* Phase Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
        gap: "14px",
        maxWidth: "960px",
        margin: "0 auto 40px",
      }}>
        {workflows.map((w) => (
          <button
            key={w.id}
            onClick={() => { setActivePhase(w.id === activePhase ? null : w.id); setActiveAgent(null); }}
            style={{
              background: activePhase === w.id
                ? `linear-gradient(135deg, ${w.color}22, ${w.color}44)`
                : "rgba(255,255,255,0.04)",
              border: `1.5px solid ${activePhase === w.id ? w.color : "rgba(255,255,255,0.08)"}`,
              borderRadius: "14px",
              padding: "20px 16px",
              cursor: "pointer",
              transition: "all 0.25s ease",
              textAlign: "left",
              color: "#e8f0fe",
            }}
          >
            <div style={{ fontSize: "26px", marginBottom: "10px" }}>{w.icon}</div>
            <div style={{
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: w.color,
              fontFamily: "'Courier New', monospace",
              marginBottom: "4px",
            }}>Phase {w.id}</div>
            <div style={{ fontSize: "14px", fontWeight: "600", lineHeight: 1.3 }}>{w.phase}</div>
            <div style={{ marginTop: "10px", fontSize: "12px", color: "#6b85a8" }}>
              {w.agents.length} agents
            </div>
          </button>
        ))}
      </div>

      {/* Expanded Phase */}
      {selected && (
        <div style={{
          maxWidth: "960px",
          margin: "0 auto 40px",
          animation: "fadeIn 0.3s ease",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}>
            {selected.agents.map((ag) => (
              <button
                key={ag.name}
                onClick={() => setActiveAgent(activeAgent === ag.name ? null : ag.name)}
                style={{
                  background: activeAgent === ag.name
                    ? `linear-gradient(135deg, ${selected.color}18, ${selected.color}30)`
                    : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${activeAgent === ag.name ? selected.color : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "14px",
                  padding: "22px",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "#e8f0fe",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ fontSize: "15px", fontWeight: "600" }}>{ag.name}</div>
                  {ag.hipaa && (
                    <span style={{
                      background: "#FF6B6B22",
                      border: "1px solid #FF6B6B55",
                      color: "#FF6B6B",
                      fontSize: "9px",
                      padding: "3px 7px",
                      borderRadius: "20px",
                      fontFamily: "'Courier New', monospace",
                      letterSpacing: "1px",
                      whiteSpace: "nowrap",
                    }}>HIPAA</span>
                  )}
                </div>
                <div style={{
                  fontSize: "11px",
                  color: selected.color,
                  fontFamily: "'Courier New', monospace",
                  marginBottom: "12px",
                  opacity: 0.85,
                }}>⚡ {ag.trigger}</div>
                <ul style={{ margin: 0, padding: "0 0 0 16px", color: "#9bb3cc", fontSize: "13px", lineHeight: 1.8 }}>
                  {ag.actions.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
                <div style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {ag.tools.map((t) => (
                    <span key={t} style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      padding: "3px 9px",
                      fontSize: "11px",
                      color: "#7a9cc4",
                      fontFamily: "'Courier New', monospace",
                    }}>{t}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* HIPAA Note */}
      <div style={{
        maxWidth: "960px",
        margin: "0 auto 32px",
        background: "rgba(255,107,107,0.06)",
        border: "1px solid rgba(255,107,107,0.2)",
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
      }}>
        <span style={{ fontSize: "18px" }}>🔒</span>
        <div>
          <div style={{ fontSize: "12px", color: "#FF6B6B", fontFamily: "'Courier New', monospace", letterSpacing: "1.5px", marginBottom: "4px" }}>HIPAA COMPLIANCE NOTE</div>
          <div style={{ fontSize: "13px", color: "#8aa5c0", lineHeight: 1.6 }}>
            Agents marked <strong style={{ color: "#FF9999" }}>HIPAA</strong> handle Protected Health Information (PHI) and require a signed Business Associate Agreement (BAA) with all vendors. Recommended compliant platforms: <strong style={{ color: "#ccddf5" }}>Klara, Spruce Health, Phreesia, Kareo</strong>.
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{
        maxWidth: "960px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "12px",
      }}>
        {[
          { label: "Total AI Agents", value: "10", color: "#00C9A7" },
          { label: "Workflow Phases", value: "5", color: "#4D9FFF" },
          { label: "HIPAA-Sensitive", value: "6", color: "#FF6B6B" },
          { label: "Est. Hours Saved/wk", value: "20–30", color: "#FFB347" },
          { label: "No-Show Reduction", value: "~40%", color: "#A78BFA" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px",
            padding: "18px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "28px", fontWeight: "700", color: s.color, marginBottom: "4px" }}>{s.value}</div>
            <div style={{ fontSize: "11px", color: "#5a7a9a", letterSpacing: "0.5px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        button:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}