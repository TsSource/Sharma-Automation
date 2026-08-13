import React, { useEffect } from 'react';

const s = {
  bgWarm: '#F8F7F4',
  bgWhite: '#FFFFFF',
  textDark: '#1B1B1B',
  textBody: '#4A4A4A',
  textMuted: '#8A8A8A',
  accent: '#E84525',
  accentGlow: 'rgba(232,69,37,0.25)',
  border: '#E5E5E5',
};

export default function NotFound() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Page Not Found · Sharma Automation';
    return () => { document.title = prev; };
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: s.bgWhite, color: s.textBody, minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        ::selection { background: ${s.accent}; color: #fff; }
        .nf-btn-primary { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700; background: ${s.accent}; color: #fff; border: none; padding: 12px 26px; border-radius: 4px; cursor: pointer; transition: all 0.25s; letter-spacing: 0.12em; text-transform: uppercase; box-shadow: 0 4px 16px ${s.accentGlow}; text-decoration: none; display: inline-block; }
        .nf-btn-primary:hover { background: #D03A1E; transform: translateY(-2px); }
        .nf-btn-ghost { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700; background: transparent; color: ${s.textDark}; border: 1px solid ${s.border}; padding: 12px 26px; border-radius: 4px; cursor: pointer; transition: all 0.25s; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; display: inline-block; }
        .nf-btn-ghost:hover { border-color: ${s.textDark}; }
        .nf-link { color: ${s.accent}; text-decoration: none; }
        .nf-link:hover { text-decoration: underline; }
        @media (max-width: 768px) {
          .nf-body { padding: 96px 24px 64px !important; }
          .nf-footer { padding: 32px 24px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${s.border}`, padding: '0 5vw' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', height: 64 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/SharmaAutomationIcon.png" alt="Sharma Automation" style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
          </a>
        </div>
      </nav>

      {/* BODY */}
      <section className="nf-body" style={{ background: s.bgWarm, flex: 1, display: 'flex', alignItems: 'center', padding: '128px 5vw 96px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'left' }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, color: s.accent, textTransform: 'uppercase', letterSpacing: '0.16em' }}>Error 404</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", marginTop: 12, fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: s.textDark, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.1 }}>Page Not Found</h1>
          <p style={{ marginTop: 16, fontSize: 15, fontWeight: 300, color: s.textBody, lineHeight: 1.85 }}>
            The page you are looking for does not exist, or it has moved. Check the address, or head back to a page that does exist.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/" className="nf-btn-primary">Back to Home</a>
            <a href="/ai-coach" className="nf-btn-ghost">AI Coach Cloud</a>
          </div>
          <p style={{ marginTop: 28, fontSize: 14, fontWeight: 300, color: s.textMuted, lineHeight: 1.85 }}>
            Still stuck? Email <a href="mailto:sharma@sharmaautomation.com" className="nf-link">sharma@sharmaautomation.com</a>.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="nf-footer" style={{ background: s.bgWhite, padding: '40px 5vw', borderTop: `1px solid ${s.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          <a href="/privacy" style={{ fontSize: 13, color: s.textMuted, textDecoration: 'none' }}>Privacy Policy</a>
          <span style={{ color: s.textMuted, fontSize: 13 }}>·</span>
          <a href="/terms" style={{ fontSize: 13, color: s.textMuted, textDecoration: 'none' }}>Terms of Service</a>
          <span style={{ color: s.textMuted, fontSize: 13 }}>·</span>
          <a href="mailto:sharma@sharmaautomation.com" style={{ fontSize: 13, color: s.textMuted, textDecoration: 'none' }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
