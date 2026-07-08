import React, { useState, useEffect } from 'react';

const s = {
  bgWarm: '#F8F7F4',
  bgWhite: '#FFFFFF',
  textDark: '#1B1B1B',
  textBody: '#4A4A4A',
  textMuted: '#8A8A8A',
  accent: '#E84525',
  accentDim: 'rgba(232,69,37,0.08)',
  accentGlow: 'rgba(232,69,37,0.25)',
  border: '#E5E5E5',
};

export default function PrivacyPolicy() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setNavScrolled(window.scrollY > 80);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: s.bgWhite, color: s.textBody, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .barlow { font-family: 'Barlow Condensed', sans-serif; }
        ::selection { background: ${s.accent}; color: #fff; }
        .legal-btn-primary { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700; background: ${s.accent}; color: #fff; border: none; padding: 10px 22px; border-radius: 4px; cursor: pointer; transition: all 0.25s; letter-spacing: 0.12em; text-transform: uppercase; box-shadow: 0 4px 16px ${s.accentGlow}; text-decoration: none; display: inline-block; }
        .legal-btn-primary:hover { background: #D03A1E; transform: translateY(-2px); }
        .legal-h2 { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; color: ${s.textDark}; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 40px; margin-bottom: 16px; }
        .legal-h2.first { margin-top: 24px; }
        .legal-p { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 15px; color: ${s.textBody}; line-height: 1.85; margin-bottom: 14px; }
        .legal-p strong { font-family: 'DM Sans', sans-serif; font-weight: 600; color: ${s.textDark}; }
        .legal-ul { padding-left: 24px; list-style: disc; color: ${s.textBody}; margin-bottom: 14px; }
        .legal-ul li { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 15px; line-height: 1.85; margin-bottom: 8px; }
        .legal-ul li strong { font-weight: 600; color: ${s.textDark}; }
        .legal-link { color: ${s.accent}; text-decoration: none; }
        .legal-link:hover { text-decoration: underline; }
        section[id] { scroll-margin-top: 80px; }
        @media (max-width: 768px) {
          .legal-nav-desktop { display: none !important; }
          .legal-mobile-toggle { display: flex !important; }
          .legal-hero { padding: 112px 24px 40px !important; }
          .legal-body { padding: 56px 24px 80px !important; }
          .legal-footer { padding: 32px 24px !important; }
        }
        @media (min-width: 769px) {
          .legal-mobile-toggle { display: none !important; }
        }
      `}</style>

      {/* STICKY NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: navScrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', borderBottom: navScrolled ? `1px solid ${s.border}` : '1px solid transparent', padding: '0 5vw', transition: 'all 0.3s' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <a href="/ai-coach" style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textDecoration: 'none' }}>
            <img src="/SharmaAutomationIcon.png" alt="Sharma Automation" style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
          </a>
          <div className="legal-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a href="https://coach.sharmaautomation.com/login" className="dm" style={{ fontSize: 14, fontWeight: 500, color: s.textBody, textDecoration: 'none', transition: 'color 0.2s' }}>Sign In</a>
            <a href="https://coach.sharmaautomation.com/signup" className="legal-btn-primary">Start Free Trial</a>
          </div>
          <button className="legal-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} aria-label="Toggle menu">
            <div style={{ width: 22, height: 2.5, background: s.textDark, borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <div style={{ width: 22, height: 2.5, background: s.textDark, borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 2.5, background: s.textDark, borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ padding: '16px 0 24px', display: 'flex', flexDirection: 'column', gap: 4, background: 'rgba(255,255,255,0.98)' }}>
            <a href="https://coach.sharmaautomation.com/login" className="dm" style={{ fontSize: 16, fontWeight: 500, color: s.textDark, padding: '12px 0', borderBottom: `1px solid ${s.border}`, textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Sign In</a>
            <a href="https://coach.sharmaautomation.com/signup" className="legal-btn-primary" style={{ marginTop: 12, padding: 14, textAlign: 'center', fontSize: 15 }} onClick={() => setMenuOpen(false)}>Start Free Trial</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="legal-hero" style={{ background: s.bgWarm, padding: '128px 5vw 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'left' }}>
          <h1 className="barlow" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: s.textDark, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.1 }}>Privacy Policy</h1>
          <p className="dm" style={{ marginTop: 12, fontSize: 14, fontWeight: 300, color: s.textMuted }}>Effective Date: July 7, 2026</p>
        </div>
      </section>

      {/* BODY */}
      <section className="legal-body" style={{ background: s.bgWhite, padding: '64px 5vw 96px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p className="dm" style={{ fontSize: 13, fontWeight: 400, color: s.textMuted, marginBottom: 20, lineHeight: 1.7 }}>
            Operator: Sharma Automation, operated by Rohit Sharma, headquartered in New Jersey, United States.
          </p>
          <p className="legal-p">
            This Privacy Policy explains what information AI Coach Cloud collects, how it is used, and the rights you have over your data. By creating an account or using the Service, you consent to the practices described here.
          </p>

          <h2 className="legal-h2 first">Section 1. Information We Collect</h2>
          <p className="legal-p">We collect the following categories of information when you use AI Coach Cloud:</p>
          <p className="legal-p"><strong>Account information.</strong> When you sign up, we collect your name, email address, and a password. Passwords are stored only as one-way cryptographic hashes; we cannot read your password.</p>
          <p className="legal-p"><strong>Training data.</strong> If you connect an Intervals.icu account, AI Coach Cloud reads your training history from it, including workouts, heart rate, power, pace, HRV, sleep, fitness and fatigue metrics, and goal races. We access this data using credentials you provide. Your Intervals.icu credentials are stored in an encrypted vault and are never logged or exposed.</p>
          <p className="legal-p"><strong>Uploaded workout files.</strong> You can also provide training data directly by uploading workout files (FIT, TCX, or GPX, including gzip-compressed versions) without connecting any third-party account. Uploaded workouts are parsed and the resulting training data is stored securely in our database to power your coaching. The original file is retained to support duplicate detection and re-processing. You can request deletion of your data by contacting us at <a href="mailto:sharma@sharmaautomation.com" className="legal-link">sharma@sharmaautomation.com</a>.</p>
          <p className="legal-p"><strong>Payment information.</strong> Subscription payments are processed by Stripe, Inc. We do not store credit card numbers, CVV codes, or banking details. We receive only the limited information Stripe shares with us about your subscription status, plan, and renewal dates.</p>
          <p className="legal-p"><strong>Conversation history.</strong> Your conversations with the AI Coach are stored on our servers so the coach can refer back to context across sessions. You can view and delete individual conversation threads from within the Service at any time.</p>
          <p className="legal-p"><strong>Usage and technical data.</strong> Our servers automatically log standard technical information including IP address, browser type, device type, pages visited, and timestamps. We use these logs to monitor service health, diagnose problems, and prevent abuse. We do not use these logs for advertising or sale.</p>
          <p className="legal-p"><strong>Cookies.</strong> We use cookies that are necessary for the Service to function, primarily for authentication and session management. We do not use third-party advertising or tracking cookies.</p>

          <h2 className="legal-h2">Section 2. How We Use Your Information</h2>
          <p className="legal-p">We use the information described above to:</p>
          <ul className="legal-ul">
            <li>Provide the Service, including AI coaching, calendar synchronization, and account management.</li>
            <li>Process payments and manage subscriptions.</li>
            <li>Communicate with you about your account, billing, and important service updates.</li>
            <li>Monitor and improve service performance and security.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p className="legal-p">We do not sell, rent, or share your personal information for marketing purposes.</p>

          <h2 className="legal-h2">Section 3. How We Share Your Information</h2>
          <p className="legal-p">We share information with the following categories of third parties, each of which is contractually or technically bound to handle data appropriately:</p>
          <ul className="legal-ul">
            <li><strong>Anthropic, PBC</strong> (United States): We send conversation context to Anthropic's Claude API to generate coaching responses. Anthropic does not train its production AI models on customer API data, per its commercial API terms.</li>
            <li><strong>Intervals.icu</strong>: If you connect an Intervals.icu account, we read your training data via Intervals.icu using credentials you provide. We do not write to or modify your Intervals.icu data without your explicit instruction (such as posting a generated workout to your calendar). AI Coach Cloud is not affiliated with Intervals.icu; their handling of your data is governed by their own privacy policy.</li>
            <li><strong>Stripe, Inc.</strong> (United States): Stripe handles all payment processing. Stripe has its own privacy policy at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="legal-link">stripe.com/privacy</a>.</li>
            <li><strong>Hosting and infrastructure providers:</strong> Our infrastructure runs on Supabase (database and authentication), Railway (backend services), and Vercel (frontend hosting), each providing AWS-backed servers with industry-standard encryption.</li>
          </ul>
          <p className="legal-p">We do not transfer your data to any other third parties without your explicit consent, except as required by law (such as in response to a valid subpoena, court order, or legal process).</p>

          <h2 className="legal-h2">Section 4. Data Retention</h2>
          <p className="legal-p">We retain your account information and conversation history for as long as your account is active and for a reasonable period after cancellation to support billing reconciliation, audit, and legal compliance, typically 30 days. After that period, we delete your personal data, subject to any longer retention required by law (for example, financial records).</p>
          <p className="legal-p">If you connect an Intervals.icu account, your training data is read from it in real time and is not stored on our servers in bulk; Intervals.icu remains the source of truth for that training history. Training data from uploaded workout files is stored in our database as described in Section 1.</p>
          <p className="legal-p">Logs and technical data are retained for up to 90 days for security and operational purposes.</p>

          <h2 className="legal-h2">Section 5. Data Security</h2>
          <p className="legal-p">We protect your data using industry-standard security measures including:</p>
          <ul className="legal-ul">
            <li>Encryption in transit (TLS / HTTPS) for all communications between your device and our servers.</li>
            <li>Encryption at rest for our database and backups, using provider-managed encryption.</li>
            <li>Encrypted vault storage for sensitive third-party credentials (such as your Intervals.icu credentials).</li>
            <li>One-way password hashing.</li>
            <li>Role-based access controls within our infrastructure.</li>
            <li>Routine security monitoring and patching.</li>
          </ul>
          <p className="legal-p">No system is perfectly secure, and we cannot guarantee absolute security. If we ever experience a data incident that materially affects your personal information, we will notify you in accordance with applicable law.</p>

          <h2 className="legal-h2">Section 6. Your Rights</h2>
          <p className="legal-p">You have the following rights regarding your personal information:</p>
          <ul className="legal-ul">
            <li><strong>Access:</strong> You can view your account information and conversation history within the Service at any time.</li>
            <li><strong>Correction:</strong> You can update your account information at any time through your account settings.</li>
            <li><strong>Deletion:</strong> You can delete individual conversation threads at any time from within the Service. To request deletion of your entire account and associated personal data, contact us at <a href="mailto:sharma@sharmaautomation.com" className="legal-link">sharma@sharmaautomation.com</a>. We will process verified deletion requests within 30 days.</li>
            <li><strong>Portability:</strong> If you connect an Intervals.icu account, that training data remains at Intervals.icu, which provides export tools directly. Conversation history is available for export on request to <a href="mailto:sharma@sharmaautomation.com" className="legal-link">sharma@sharmaautomation.com</a>.</li>
            <li><strong>Marketing opt-out:</strong> We do not send marketing emails by default. Operational emails (account confirmation, password reset, billing notices) are required for service operation.</li>
          </ul>

          <h2 className="legal-h2">Section 7. International Users</h2>
          <p className="legal-p">If you are accessing AI Coach Cloud from outside the United States, please be aware that your information will be transferred to, stored, and processed in the United States, where our servers and infrastructure providers operate. By using the Service, you consent to this transfer.</p>
          <p className="legal-p"><strong>European Economic Area, United Kingdom, and Switzerland:</strong> If you are located in the EEA, UK, or Switzerland, you have rights under the General Data Protection Regulation (GDPR) and equivalent local laws, including the right to access, rectify, erase, restrict, object to, or port your personal data, and the right to lodge a complaint with your local supervisory authority. To exercise these rights, contact us at <a href="mailto:sharma@sharmaautomation.com" className="legal-link">sharma@sharmaautomation.com</a>.</p>

          <h2 className="legal-h2">Section 8. California Residents</h2>
          <p className="legal-p">If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA), including the right to know, the right to delete, the right to correct, and the right to opt out of the sale or sharing of your personal information. We do not sell or share your personal information as those terms are defined under the CCPA. To exercise other rights, contact us at <a href="mailto:sharma@sharmaautomation.com" className="legal-link">sharma@sharmaautomation.com</a>.</p>

          <h2 className="legal-h2">Section 9. Children's Privacy</h2>
          <p className="legal-p">AI Coach Cloud is intended for users aged 18 and older. We do not knowingly collect personal information from anyone under the age of 18. If you believe a child has provided us with personal information, contact us at <a href="mailto:sharma@sharmaautomation.com" className="legal-link">sharma@sharmaautomation.com</a> and we will delete it.</p>

          <h2 className="legal-h2">Section 10. Changes to This Policy</h2>
          <p className="legal-p">We may update this Privacy Policy from time to time. The "Effective Date" at the top of this Policy indicates when it was last revised. If we make material changes, we will notify you by email or through the Service before the changes take effect.</p>

          <h2 className="legal-h2">Section 11. Contact Us</h2>
          <p className="legal-p">Questions, requests, or concerns about this Privacy Policy or our data practices? Contact us at:</p>
          <div className="dm" style={{ fontSize: 15, fontWeight: 400, color: s.textBody, lineHeight: 1.75, marginTop: 8 }}>
            <div style={{ fontWeight: 600, color: s.textDark }}>Sharma Automation</div>
            <div>Email: <a href="mailto:sharma@sharmaautomation.com" className="legal-link">sharma@sharmaautomation.com</a></div>
            <div>Operator: Rohit Sharma</div>
            <div>New Jersey, United States</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="legal-footer" style={{ background: '#FFFFFF', padding: '40px 5vw', borderTop: '1px solid #E5E5E5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto 16px', display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          <a href="/privacy" style={{ fontSize: 13, color: '#8A8A8A', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Privacy Policy</a>
          <span style={{ color: '#8A8A8A', fontSize: 13 }}>·</span>
          <a href="/terms" style={{ fontSize: 13, color: '#8A8A8A', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Terms of Service</a>
          <span style={{ color: '#8A8A8A', fontSize: 13 }}>·</span>
          <a href="mailto:sharma@sharmaautomation.com" style={{ fontSize: 13, color: '#8A8A8A', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Contact</a>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <a href="/ai-coach" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/SharmaAutomationIcon.png" alt="Sharma Automation" style={{ height: 36 }} />
          </a>
          <p style={{ fontSize: 13, color: '#8A8A8A', fontFamily: "'DM Sans', sans-serif" }}>Built by an athlete, for athletes.</p>
          <p style={{ fontSize: 12, color: '#8A8A8A', fontFamily: "'DM Sans', sans-serif" }}>© 2026 Sharma Automation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
