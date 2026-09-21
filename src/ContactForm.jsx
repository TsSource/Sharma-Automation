import { useState } from "react";
import { FORMSPREE_ENDPOINT } from "./config/contact";
import { openCalendlyPopup } from "./lib/calendly";

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM (Wave SITE-FORMS-1)
   Root page, section #contact.

   Replaces the third-party form iframe that sat here. Posts JSON to
   Formspree. No cookies, no storage, no captcha: the only spam
   control is the hidden honeypot below.

   Styling leans on the root page's global input / textarea / label
   rules in App.js, so the card matches the panels around it.
═══════════════════════════════════════════════════════════════ */

const EMAIL_ADDRESS = "Sharma@SharmaAutomation.com";
const SUBJECT = "New website enquiry: sharmaautomation.com";

const EMPTY = { name: "", email: "", phone: "", business: "", message: "" };

const s = { navy: "#0f172a", slate: "#334155", mid: "#64748b", accent: "#0ea5e9", border: "#e2e8f0" };

const cardStyle = {
  background: "#fff",
  border: "1px solid " + s.border,
  borderRadius: 16,
  padding: 32,
};

/* Off-screen rather than display:none, so the trap still looks like
   a real field to a bot filling the form. */
const honeypotStyle = {
  position: "absolute",
  left: "-9999px",
  top: "auto",
  width: 1,
  height: 1,
  overflow: "hidden",
  opacity: 0,
  pointerEvents: "none",
};

const fireGtag = (name, params) => {
  if (typeof window.gtag === "function") {
    try { window.gtag("event", name, params); } catch (e) { /* analytics must never break the form */ }
  }
};

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [gotcha, setGotcha] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;

    /* Honeypot: pretend it worked, send nothing. */
    if (gotcha.trim()) { setStatus("success"); return; }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      business: values.business.trim(),
      message: values.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill in your name, your email, and a short message.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, _subject: SUBJECT }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      fireGtag("generate_lead", { method: "contact_form" });
    } catch (err) {
      setError("Your message did not go through. Please try again in a moment, or email me directly.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={cardStyle}>
        <div aria-live="polite">
          <p className="dm" style={{ fontSize: 12, letterSpacing: "3px", color: s.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Message Sent</p>
          <h3 className="playfair" style={{ fontSize: 26, fontWeight: 700, color: s.navy, letterSpacing: "-0.3px", marginBottom: 14 }}>Thanks! Your message is on its way.</h3>
          <p className="dm" style={{ fontSize: 15, color: s.mid, lineHeight: 1.85, marginBottom: 28, fontWeight: 300 }}>I'll reply within one business day.</p>
        </div>
        <p className="dm" style={{ fontSize: 14, color: s.slate, lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>Want to talk sooner? Pick a time that suits you.</p>
        <button type="button" className="btn-outline" onClick={openCalendlyPopup}>Book a fit call</button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form style={cardStyle} onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required value={values.name} onChange={set("name")} disabled={submitting} />
        </div>
        <div>
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={set("email")} disabled={submitting} />
        </div>
        <div>
          <label htmlFor="contact-phone">Phone (optional)</label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} disabled={submitting} />
        </div>
        <div>
          <label htmlFor="contact-business">Business name (optional)</label>
          <input id="contact-business" name="business" type="text" autoComplete="organization" value={values.business} onChange={set("business")} disabled={submitting} />
        </div>
        <div>
          <label htmlFor="contact-message">How can I help?</label>
          <textarea id="contact-message" name="message" rows={5} required value={values.message} onChange={set("message")} disabled={submitting} />
        </div>

        <div style={honeypotStyle} aria-hidden="true">
          <label htmlFor="contact-gotcha">Leave this field empty</label>
          <input id="contact-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={gotcha} onChange={(e) => setGotcha(e.target.value)} />
        </div>

        <button type="submit" className="btn-primary" disabled={submitting} style={{ fontSize: 15, padding: "15px 34px", opacity: submitting ? 0.65 : 1, cursor: submitting ? "default" : "pointer" }}>
          {submitting ? "Sending…" : "Send message"}
        </button>

        <div aria-live="polite">
          {status === "error" && (
            <p className="dm" style={{ fontSize: 14, color: "#b91c1c", lineHeight: 1.7, fontWeight: 400 }}>
              {error}{" "}
              <a href={"mailto:" + EMAIL_ADDRESS} style={{ color: s.accent, textDecoration: "underline" }}>{EMAIL_ADDRESS}</a>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
