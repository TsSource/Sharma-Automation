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

export default function TermsOfService() {
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
        .legal-p-caps { font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 14px; color: ${s.textBody}; line-height: 1.85; margin-bottom: 14px; letter-spacing: 0.02em; }
        .legal-ul { padding-left: 24px; list-style: disc; color: ${s.textBody}; margin-bottom: 14px; }
        .legal-ul li { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 15px; line-height: 1.85; margin-bottom: 8px; }
        .legal-ul li strong { font-weight: 600; color: ${s.textDark}; }
        .legal-link { color: ${s.accent}; text-decoration: none; }
        .legal-link:hover { text-decoration: underline; }
        .legal-callout { background: rgba(232,69,37,0.08); border: 1px solid ${s.accent}; border-radius: 6px; padding: 14px 18px; margin-bottom: 20px; font-family: 'DM Sans', sans-serif; font-weight: 600; color: ${s.textDark}; font-size: 15px; line-height: 1.6; }
        section[id] { scroll-margin-top: 80px; }
        @media (max-width: 768px) {
          .legal-nav-desktop { display: none !important; }
          .legal-mobile-toggle { display: flex !important; }
          .legal-hero { padding: 112px 24px 40px !important; }
          .legal-body { padding: 56px 24px 80px !important; }
          .legal-footer { padding: 32px 24px !important; }
          .legal-p-caps { font-size: 13px !important; }
        }
        @media (min-width: 769px) {
          .legal-mobile-toggle { display: none !important; }
        }
      `}</style>

      {/* STICKY NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', borderBottom: navScrolled ? `1px solid ${s.border}` : '1px solid transparent', padding: '0 5vw', transition: 'all 0.3s' }}>
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
          <h1 className="barlow" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: s.textDark, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.1 }}>Terms of Service</h1>
          <p className="dm" style={{ marginTop: 12, fontSize: 14, fontWeight: 300, color: s.textMuted }}>Effective Date: [TO BE SET AT LAUNCH]</p>
        </div>
      </section>

      {/* BODY */}
      <section className="legal-body" style={{ background: s.bgWhite, padding: '64px 5vw 96px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p className="dm" style={{ fontSize: 13, fontWeight: 400, color: s.textMuted, marginBottom: 20, lineHeight: 1.7 }}>
            Operator: Sharma Automation, operated by Rohit Sharma, headquartered in New Jersey, United States.
          </p>
          <p className="legal-p">
            These Terms of Service ("Terms") govern your use of AI Coach Cloud ("the Service"), operated by Sharma Automation ("we," "us," or "our"). By creating an account or using the Service, you agree to these Terms.
          </p>

          <h2 className="legal-h2 first">Section 1. The Service</h2>
          <p className="legal-p">AI Coach Cloud is a hosted SaaS endurance training coaching platform that uses artificial intelligence to provide personalized coaching guidance based on your training data. The Service can optionally connect to your Intervals.icu account and provides:</p>
          <ul className="legal-ul">
            <li>AI-generated training recommendations.</li>
            <li>A conversational coaching interface.</li>
            <li>Structured workout writing to your training calendar.</li>
            <li>Adaptive guidance based on HRV, sleep, fatigue, and other recovery signals.</li>
          </ul>
          <p className="legal-p">The Service is provided "as is" and may be modified, suspended, or discontinued at our discretion, subject to the cancellation rights described in Section 6.</p>

          <h2 className="legal-h2">Section 2. Eligibility</h2>
          <p className="legal-p">You must be at least 18 years old to create an account or use the Service. By using the Service, you represent that you are at least 18 years old and have the legal capacity to enter into these Terms.</p>

          <h2 className="legal-h2">Section 3. Your Account</h2>
          <p className="legal-p">You are responsible for:</p>
          <ul className="legal-ul">
            <li>Providing accurate and complete information during signup.</li>
            <li>Maintaining the confidentiality of your account credentials.</li>
            <li>All activity that occurs under your account.</li>
            <li>Notifying us immediately of any unauthorized use of your account.</li>
          </ul>
          <p className="legal-p">You may not share your account with others or create multiple accounts to circumvent payment.</p>

          <h2 className="legal-h2">Section 4. Third-Party Account Connection</h2>
          <p className="legal-p">The Service does not require an Intervals.icu account to function. You may optionally connect an Intervals.icu account to enable features that read your training data and write workouts to your calendar. If you connect an Intervals.icu account, you are responsible for maintaining it and for ensuring the credentials you provide to AI Coach Cloud remain valid. AI Coach Cloud is not affiliated with Intervals.icu; the use of Intervals.icu is governed by their own terms of service.</p>

          <h2 className="legal-h2">Section 5. Subscriptions, Trial, and Billing</h2>
          <p className="legal-p"><strong>Free trial.</strong> All subscription plans begin with a 7-day free trial. To start a trial, you must provide a valid payment method. You can cancel at any time during the trial period at no charge.</p>
          <p className="legal-p"><strong>Subscription plans.</strong> We offer the following subscription tiers:</p>
          <ul className="legal-ul">
            <li>Founding ($14.99 per month, available for a limited time).</li>
            <li>Monthly ($24.99 per month).</li>
            <li>Annual ($249 per year).</li>
          </ul>
          <p className="legal-p">Prices are stated in United States dollars and may be subject to applicable taxes.</p>
          <p className="legal-p"><strong>Founding pricing.</strong> Founding pricing is a promotional rate available to early subscribers. Once you are subscribed at the Founding rate, the rate remains locked for as long as your subscription remains active without interruption. If you cancel and later resubscribe, Founding pricing may no longer be available and you may be subject to current pricing.</p>
          <p className="legal-p"><strong>Billing.</strong> After your trial ends, you will be charged the applicable subscription fee at the start of each billing period (monthly or annually, depending on your plan). All payments are processed by Stripe, Inc. and subject to Stripe's terms.</p>
          <p className="legal-p"><strong>Auto-renewal.</strong> Your subscription will automatically renew at the end of each billing period unless you cancel before renewal.</p>
          <p className="legal-p"><strong>Price changes.</strong> We may change subscription prices for new subscribers and renewals with at least 30 days' advance notice. Founding rate holders are not subject to standard price increases as long as their subscription remains active without interruption.</p>

          <h2 className="legal-h2">Section 6. Cancellation and Refunds</h2>
          <p className="legal-p"><strong>Trial cancellation.</strong> You may cancel during the 7-day free trial at any time with no charge.</p>
          <p className="legal-p"><strong>Post-trial cancellation.</strong> You may cancel your subscription at any time through the customer billing portal. Cancellation takes effect at the end of your current billing period. You will retain access to the Service until the end of the period you have paid for.</p>
          <p className="legal-p"><strong>Refunds.</strong> Subscription fees are non-refundable except where required by law. We do not provide prorated refunds for cancellation mid-period. For example, if you cancel an annual subscription in month 3, you retain access through the end of the year but are not refunded the unused portion.</p>
          <p className="legal-p"><strong>Failed payments.</strong> If a payment fails, we will attempt to recover it through Stripe's standard retry mechanism over approximately 7 days. If recovery fails, your access may be suspended until payment is resolved.</p>

          <h2 className="legal-h2">Section 7. Acceptable Use</h2>
          <p className="legal-p">You agree not to:</p>
          <ul className="legal-ul">
            <li>Use the Service for any illegal purpose or in violation of any applicable law.</li>
            <li>Reverse engineer, decompile, scrape, or attempt to extract source code or proprietary algorithms from the Service.</li>
            <li>Use the Service to develop a competing product.</li>
            <li>Resell, sublicense, or otherwise commercialize the Service.</li>
            <li>Use the Service to send spam, malware, or other harmful content.</li>
            <li>Attempt to gain unauthorized access to the Service, other users' accounts, or our infrastructure.</li>
            <li>Impersonate any person or entity or misrepresent your identity.</li>
            <li>Use automated tools to interact with the Service except where we explicitly permit it.</li>
          </ul>
          <p className="legal-p">Violation of these terms may result in suspension or termination of your account without refund.</p>

          <h2 className="legal-h2">Section 8. Intellectual Property</h2>
          <p className="legal-p"><strong>Our property.</strong> AI Coach Cloud, including all software, design, content (excluding your data and conversations), and trademarks, is owned by Sharma Automation and protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable, revocable license to use the Service for your personal training purposes, subject to these Terms.</p>
          <p className="legal-p"><strong>Your content.</strong> You retain ownership of the content you create through the Service, including your conversations with the AI Coach. You grant us a non-exclusive license to process this content as necessary to operate the Service, including transmitting conversation context to Anthropic for AI response generation.</p>
          <p className="legal-p"><strong>Feedback.</strong> If you provide us with feedback, suggestions, or ideas about the Service, you grant us a non-exclusive, royalty-free, perpetual license to use that feedback to improve the Service without obligation to you.</p>

          <h2 className="legal-h2">Section 9. AI-Generated Content</h2>
          <p className="legal-p">AI Coach Cloud uses large language models to generate coaching recommendations. AI-generated content may occasionally be incorrect, incomplete, or inappropriate for your specific situation. You are responsible for evaluating whether any recommendation makes sense for you before acting on it.</p>

          <h2 className="legal-h2">Section 10. Health, Training, and Medical Disclaimer</h2>
          <div className="legal-callout">This section is critically important. Please read carefully.</div>
          <p className="legal-p">AI Coach Cloud provides training guidance based on your data. It is not a substitute for medical advice, diagnosis, or treatment from a qualified healthcare professional. The Service is not designed or intended to diagnose, treat, cure, or prevent any disease or medical condition.</p>
          <p className="legal-p">You should consult a physician before beginning any new training program, especially if you have any pre-existing medical condition, injury, or concern. If you experience pain, dizziness, shortness of breath, or other unusual symptoms during training, stop immediately and seek medical attention.</p>
          <p className="legal-p">AI Coach Cloud does not guarantee:</p>
          <ul className="legal-ul">
            <li>Specific race results, performance outcomes, or fitness improvements.</li>
            <li>Freedom from injury, illness, or any adverse health event.</li>
            <li>The accuracy or appropriateness of any specific recommendation for your individual circumstances.</li>
          </ul>
          <p className="legal-p">You are solely responsible for assessing whether any recommendation provided by the Service is safe and appropriate for you, and for the consequences of acting on any such recommendation. By using AI Coach Cloud, you acknowledge that endurance training involves inherent physical risks and you assume those risks knowingly and voluntarily.</p>

          <h2 className="legal-h2">Section 11. Service Availability</h2>
          <p className="legal-p">We strive to keep the Service available at all times but do not guarantee uninterrupted access. The Service may be unavailable due to maintenance, third-party outages (Intervals.icu, Anthropic, Stripe, or our hosting providers), or events beyond our reasonable control. We are not liable for any inability to access the Service.</p>

          <h2 className="legal-h2">Section 12. Disclaimers</h2>
          <p className="legal-p-caps">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, SECURE, OR UNINTERRUPTED.</p>

          <h2 className="legal-h2">Section 13. Limitation of Liability</h2>
          <p className="legal-p-caps">TO THE FULLEST EXTENT PERMITTED BY LAW, SHARMA AUTOMATION AND ITS OPERATOR ROHIT SHARMA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE, REGARDLESS OF THE LEGAL THEORY (CONTRACT, TORT, STATUTE, OR OTHERWISE).</p>
          <p className="legal-p-caps">OUR TOTAL CUMULATIVE LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATED TO THE SERVICE SHALL NOT EXCEED THE TOTAL AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR ONE HUNDRED UNITED STATES DOLLARS, WHICHEVER IS GREATER.</p>
          <p className="legal-p">Some jurisdictions do not allow the exclusion or limitation of certain damages, so the above limitations may not apply to you in full.</p>

          <h2 className="legal-h2">Section 14. Indemnification</h2>
          <p className="legal-p">You agree to defend, indemnify, and hold harmless Sharma Automation and Rohit Sharma from any claim, demand, loss, or expense (including reasonable attorneys' fees) arising out of or related to your use of the Service, your violation of these Terms, or your violation of any rights of another.</p>

          <h2 className="legal-h2">Section 15. Termination</h2>
          <p className="legal-p">We may suspend or terminate your account at any time if you violate these Terms, fail to make payment, or engage in conduct we determine to be harmful to the Service or other users. Upon termination, your right to use the Service ends immediately. Sections that by their nature should survive termination will survive, including ownership, disclaimers, limitations of liability, and dispute resolution.</p>
          <p className="legal-p">You may terminate your account at any time by canceling your subscription and requesting account deletion as described in our Privacy Policy.</p>

          <h2 className="legal-h2">Section 16. Changes to These Terms</h2>
          <p className="legal-p">We may modify these Terms at any time. If we make material changes, we will notify you by email or through the Service at least 30 days before the changes take effect. Your continued use of the Service after the effective date constitutes acceptance of the modified Terms.</p>

          <h2 className="legal-h2">Section 17. Governing Law and Jurisdiction</h2>
          <p className="legal-p">These Terms are governed by the laws of the State of New Jersey, United States, without regard to its conflict of laws principles. Any dispute arising out of or related to these Terms or the Service shall be resolved exclusively in the state or federal courts located in New Jersey, and you consent to the personal jurisdiction of those courts.</p>

          <h2 className="legal-h2">Section 18. Dispute Resolution</h2>
          <p className="legal-p">Before filing a formal legal claim, you agree to attempt to resolve the dispute informally by contacting us at <a href="mailto:sharma@sharmaautomation.com" className="legal-link">sharma@sharmaautomation.com</a> and giving us 30 days to respond and attempt to resolve the matter.</p>

          <h2 className="legal-h2">Section 19. Miscellaneous</h2>
          <p className="legal-p"><strong>Entire agreement.</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and Sharma Automation regarding the Service.</p>
          <p className="legal-p"><strong>Severability.</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.</p>
          <p className="legal-p"><strong>Waiver.</strong> Our failure to enforce any right or provision of these Terms is not a waiver of that right or provision.</p>
          <p className="legal-p"><strong>Assignment.</strong> You may not assign or transfer these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets.</p>
          <p className="legal-p"><strong>Notices.</strong> We may provide notices via email to the address associated with your account or by posting on the Service.</p>

          <h2 className="legal-h2">Section 20. Contact Us</h2>
          <p className="legal-p">Questions about these Terms?</p>
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
