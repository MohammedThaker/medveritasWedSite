import logo_who from "./assets/org-logos/logo-who.svg";
import logo_unicef from "./assets/org-logos/UNICEF-Logo.svg";
import Polio1 from "./assets/org-logos/Polio2.jpg";
import public_health from "./assets/org-logos/public_health.jpg";
import { useState, useEffect } from "react";
// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:        #0D1B3E;
    --navy-mid:    #1E3A6E;
    --blue:        #29AAE1;
    --blue-dark:   #1a8bbf;
    --green:       #5BBB6B;
    --green-dark:  #44a354;
    --body:        #4A5568;
    --muted:       #6B7A9A;
    --bg:          #FFFFFF;
    --bg-off:      #F8FAFB;
    --border:      #E8EDF4;
    --shadow-sm:   0 2px 8px rgba(13,27,62,.06);
    --shadow-md:   0 6px 24px rgba(13,27,62,.10);
    --shadow-lg:   0 16px 48px rgba(13,27,62,.13);
    --r-sm:        8px;
    --r-md:        14px;
    --r-lg:        20px;
    --tr:          .25s cubic-bezier(.4,0,.2,1);
    --font-display:'Playfair Display', Georgia, serif;
    --font-body:   'DM Sans', system-ui, sans-serif;
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); color: var(--body); background: var(--bg); line-height: 1.6; overflow-x: hidden; }

  .container { width: min(1180px,100%); margin: auto; padding: 0 24px; }
  .section { padding: 100px 24px; }

  /* ── NAV ───────────────────────────────────── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000; height: 72px;
    display: flex; align-items: center; padding: 0 1rem;
    background: transparent; backdrop-filter: none;
    border-bottom: none; transition: background var(--tr), box-shadow var(--tr), backdrop-filter var(--tr);
  }
  .nav.scrolled {
    background: rgba(255,255,255,.96); backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border); box-shadow: var(--shadow-md);
  }
  .nav__inner { max-width: 1200px; margin: 0 auto; width: 100%; display: flex; align-items: center; justify-content: space-between; }

  /* ── LOGO ──────────────────────────────────── */
  .nav__logo { display: flex; align-items: center; gap: 8px; text-decoration: none; user-select: none; }
  .logo-icon { width: 42px; height: 36px; position: relative; flex-shrink: 0; }
  .logo-icon svg { width: 100%; height: 100%; }
  .nav__logo-text { display: flex; align-items: baseline; gap: 0; font-family: var(--font-body); font-size: 1.45rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1; }
  .nav__logo-text .l-med  { color: #4aad35; }
  .nav__logo-text .l-v    { color: #29AAE1; }
  .nav__logo-text .l-rest { color: #1a1a1a; transition: color var(--tr); }
  .nav.scrolled .nav__logo-text .l-rest { color: #1a1a1a; }

  .nav__links { display: flex; gap: 2.5rem; align-items: center; }
  .nav__links a { color: rgba(255,255,255,.88); font-size: .875rem; font-weight: 500; text-decoration: none; transition: color var(--tr); }
  .nav.scrolled .nav__links a { color: var(--body); }
  .nav__links a:hover { color: var(--blue); }
  .nav__cta { background: var(--green); color: #fff !important; padding: 9px 18px; border-radius: var(--r-sm); font-weight: 600 !important; transition: background var(--tr), transform var(--tr) !important; }
  .nav__cta:hover { background: var(--green-dark) !important; transform: translateY(-1px); }
  .nav__hamburger { display: none; background: none; border: none; color: rgba(255,255,255,.9); cursor: pointer; padding: 8px; border-radius: 6px; transition: background var(--tr), color var(--tr); line-height: 0; }
  .nav.scrolled .nav__hamburger { color: var(--navy); }
  .nav__hamburger:hover { background: rgba(255,255,255,.15); }
  .nav.scrolled .nav__hamburger:hover { background: rgba(13,27,62,.07); }

  /* ── MOBILE MENU OVERLAY ───────────────────── */
  .mobile-overlay {
    display: none; position: fixed; inset: 0; z-index: 998;
    background: rgba(0,0,0,.35); backdrop-filter: blur(2px);
    animation: fadeIn .2s ease;
  }
  .mobile-overlay.open { display: block; }

  /* ── MOBILE MENU PANEL ─────────────────────── */
  .mobile-menu {
    position: fixed; top: 72px; left: 0; right: 0; z-index: 999;
    background: #fff; border-bottom: 1px solid var(--border);
    flex-direction: column; padding: 16px 20px 20px; gap: 4px;
    box-shadow: var(--shadow-lg);
    /* slide animation via transform instead of display toggle */
    transform: translateY(-8px); opacity: 0; pointer-events: none;
    transition: transform .22s cubic-bezier(.4,0,.2,1), opacity .22s ease;
    display: flex;
  }
  .mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
  .mobile-menu a { color: var(--body); text-decoration: none; font-size: .95rem; font-weight: 500; padding: 11px 14px; border-radius: var(--r-sm); transition: background var(--tr), color var(--tr); display: block; }
  .mobile-menu a:hover { background: rgba(41,170,225,.08); color: var(--blue); }
  .mobile-menu .m-cta { background: var(--green); color: #fff !important; text-align: center; margin-top: 8px; }
  .mobile-menu .m-cta:hover { background: var(--green-dark) !important; }
  .mobile-menu__divider { height: 1px; background: var(--border); margin: 8px 0; }

  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }



  /* ── SECTION BADGE ─────────────────────────── */
  .sec-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(41,170,225,.08); border: 1px solid rgba(41,170,225,.2); border-radius: 100px; padding: 5px 16px; margin-bottom: 20px; }
  .sec-badge span { color: var(--blue); font-size: .75rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
  .sec-title { font-family: var(--font-display); font-weight: 700; color: var(--navy); letter-spacing: -0.02em; }

  /* ── SERVICES ──────────────────────────────── */
  .services { background: #b4c8d2; }
  .services__header { text-align: center; margin-bottom: 64px; }
  .services__header h2 { font-size: clamp(2rem, 3.5vw, 2.8rem); margin-bottom: 16px; }
  .services__header p { color: var(--body); font-size: 1.05rem; max-width: 540px; margin: 0 auto; }
  .services__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
  .service-card { background: #fff; border-radius: 16px; padding: 36px 32px; border: 1px solid var(--border); transition: transform var(--tr), box-shadow var(--tr); cursor: pointer; position: relative; overflow: hidden; }
  .service-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .service-card__accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 16px 16px 0 0; }
  .service-card__icon { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
  .service-card h3 { font-size: 1.1rem; font-weight: 700; color: var(--navy); margin-bottom: 14px; }
  .service-card p { color: var(--body); font-size: .9rem; line-height: 1.7; margin-bottom: 20px; }
  .service-card__link { display: inline-flex; align-items: center; gap: 6px; font-size: .875rem; font-weight: 600; text-decoration: none; }

  /* ── RESEARCH FLOW ─────────────────────────── */
  .flow { background: var(--navy); padding: 80px 1.25rem; position: relative; overflow: hidden; }
  .flow__bg { position: absolute; inset: 0; background-image: radial-gradient(circle at 80% 20%, rgba(41,170,225,.05) 0%, transparent 50%); }
  .flow__grid { max-width: 1200px; margin: 0 auto; position: relative; display: grid; grid-template-columns: 1fr 1.6fr; gap: 56px; align-items: start; }
  .flow__intro { padding-right: 8px; }
  .flow__intro .sec-badge { background: rgba(41,170,225,.12); border-color: rgba(41,170,225,.25); }
  .flow__intro h2 { font-family: var(--font-display); font-size: clamp(1.6rem, 3.8vw, 2.2rem); font-weight: 700; color: #fff; margin-bottom: 10px; line-height: 1.16; }
  .flow__intro p { color: rgba(255,255,255,.66); font-size: .98rem; line-height: 1.6; }
  .steps-list { display: flex; flex-direction: column; gap: 8px; }
  .step-item { display: flex; gap: 12px; align-items: flex-start; padding: 12px 14px; border-radius: 12px; background: transparent; border: 1px solid transparent; cursor: pointer; transition: background .18s, border .18s; }
  .step-item.active { background: rgba(41,170,225,.12); border-color: rgba(41,170,225,.28); }
  .step-number { width: 44px; min-width: 44px; height: 44px; border-radius: 10px; background: rgba(255,255,255,.04); display: flex; align-items: center; justify-content: center; color: var(--blue); font-weight: 700; font-size: 16px; transition: background .18s, color .18s; }
  .step-item.active .step-number { background: var(--blue); color: #fff; }
  .step-title { font-weight: 700; font-size: .98rem; color: rgba(255,255,255,.9); }
  .step-item.active .step-title { color: #fff; }
  .step-desc { margin-top: 8px; color: rgba(255,255,255,.65); font-size: .9rem; line-height: 1.6; display: none; }
  .step-item.active .step-desc { display: block; }

  /* ── RESEARCH CARDS ────────────────────────── */
  .research { background: #0720332e; }
  .research__header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 56px; flex-wrap: wrap; gap: 16px; }
  .research__header h2 { font-size: clamp(1.8rem, 3vw, 2.5rem); }
  .research__view-all { display: inline-flex; align-items: center; gap: 6px; color: var(--blue); font-weight: 600; font-size: .9rem; text-decoration: none; transition: gap var(--tr); }
  .research__view-all:hover { gap: 10px; }
  .research__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(256px, 1fr)); gap: 20px; }
  .pub-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid var(--border); transition: transform var(--tr), box-shadow var(--tr); cursor: pointer; }
  .pub-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
  .pub-card__thumb { height: 140px; background: linear-gradient(341deg, #ffffff 0%, #29aae1 100%); display: flex; align-items: center; justify-content: center; position: relative; }
  .pub-card__badge { position: absolute; top: 12px; left: 12px; color: #fff; font-size: .65rem; font-weight: 700; padding: 3px 10px; border-radius: 4px; letter-spacing: .06em; }
  .pub-card__body { padding: 22px 22px 20px; }
  .pub-card__body h4 { font-weight: 700; font-size: .95rem; color: var(--navy); margin-bottom: 10px; line-height: 1.45; }
  .pub-card__body p { color: var(--body); font-size: .82rem; line-height: 1.65; margin-bottom: 16px; }
  .pub-card__footer { display: grid; justify-content: space-between; align-items: center; border-top: 1px solid #F0F4F8; padding-top: 14px; }
  .pub-card__date { color: #94A3B8; font-size: .78rem; }
  .pub-card__link { display: inline-flex; align-items: center; gap: 4px; color: var(--blue); font-size: .8rem; font-weight: 600; text-decoration: none; }

  /* ── STATS ─────────────────────────────────── */
  .stats { background: #fff; }
  .stats__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2px; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
  .stat-cell { padding: 48px 32px; border-right: 1px solid var(--border); text-align: center; transition: background var(--tr); }
  .stat-cell:last-child { border-right: none; }
  .stat-cell:hover { background: rgba(41, 170, 225, 0.54); }
  .stat-cell__icon { color: var(--blue); margin-bottom: 14px; display: flex; justify-content: center; }
  .stat-cell__num { font-family: var(--font-display); font-size: 2.6rem; font-weight: 700; color: var(--navy); letter-spacing: -0.02em; margin-bottom: 8px; }
  .stat-cell__label { color: var(--body); font-size: .875rem; line-height: 1.5; }

  /* ── PLATFORM CAPS ─────────────────────────── */
  .platform { background: var(--bg-off); }
  .platform__header { text-align: center; margin-bottom: 56px; }
  .platform__header h2 { font-size: clamp(1.8rem, 3vw, 2.5rem); }
  .platform__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
  .cap-card { background: #fff; border-radius: 12px; padding: 28px 24px; border: 1px solid var(--border); transition: transform var(--tr), box-shadow var(--tr); }
  .cap-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .cap-card__icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(41,170,225,.1); display: flex; align-items: center; justify-content: center; color: var(--blue); margin-bottom: 16px; }
  .cap-card h4 { font-weight: 700; font-size: .92rem; color: var(--navy); margin-bottom: 6px; }
  .cap-card p { color: var(--body); font-size: .8rem; line-height: 1.6; }

  /* ── CTA ───────────────────────────────────── */
  .cta { padding: 100px 2rem; background: linear-gradient(135deg, var(--navy) 0%, #1E3A6E 100%); position: relative; overflow: hidden; }
  .cta__bg { position: absolute; inset: 0; background-image: radial-gradient(circle at 20% 50%, rgba(91,187,107,.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(41,170,225,.08) 0%, transparent 50%); }
  .cta__inner { max-width: 900px; margin: 0 auto; text-align: center; position: relative; }
  .cta__logo { display: flex; align-items: center; gap: 10px; justify-content: center; margin-bottom: 40px; }
  .cta__logo-text .med { font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; }
  .cta__logo-text .ver { font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; color: var(--blue); letter-spacing: -0.02em; }
  .cta h2 { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: #fff; line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 20px; }
  .cta p { color: rgba(255,255,255,.65); font-size: 1.05rem; line-height: 1.75; max-width: 520px; margin: 0 auto 48px; }
  .cta__actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn-green { display: inline-flex; align-items: center; gap: 8px; background: var(--green); color: #fff; padding: 14px 30px; border-radius: 10px; font-size: .95rem; font-weight: 600; text-decoration: none; transition: background var(--tr), transform var(--tr); }
  .btn-green:hover { background: var(--green-dark); transform: translateY(-1px); }
  .btn-outline-white { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #fff; padding: 14px 30px; border-radius: 10px; font-size: .95rem; font-weight: 500; text-decoration: none; border: 1px solid rgba(255,255,255,.3); transition: background var(--tr), transform var(--tr); }
  .btn-outline-white:hover { background: rgba(255,255,255,.08); transform: translateY(-1px); }

  /* ── FOOTER ────────────────────────────────── */
  .footer { background: #1A1A2E; padding: 64px 2rem 32px; color: #fff; }
  .footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1.3fr; gap: 40px; margin-bottom: 56px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,.07); }
  .footer__brand-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .footer__brand-mark { width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,.04); display: flex; align-items: center; justify-content: center; color: var(--blue); font-weight: 700; font-size: 1rem; }
  .footer__brand-name .med { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: #fff; }
  .footer__brand-name .ver { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: var(--blue); }
  .footer__brand-desc { color: rgba(255,255,255,.45); font-size: .85rem; line-height: 1.6; max-width: 320px; margin-bottom: 18px; }
  .footer__socials { display: flex; gap: 12px; }
  .footer__social-btn { width: 34px; height: 34px; border-radius: 8px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); display: inline-flex; align-items: center; justify-content: center; color: rgba(255,255,255,.8); text-decoration: none; font-size: .8rem; transition: background var(--tr), border-color var(--tr); }
  .footer__social-btn:hover { background: rgba(41,170,225,.2); border-color: rgba(41,170,225,.4); }
  .footer__col-title { color: #fff; font-weight: 700; font-size: .875rem; margin-bottom: 12px; }
  .footer__col-links { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .footer__col-links a { color: rgba(255,255,255,.45); text-decoration: none; font-size: .85rem; transition: color var(--tr); }
  .footer__col-links a:hover { color: var(--blue); }
  .footer__contact-row { display: flex; gap: 10px; align-items: flex-start; color: rgba(255,255,255,.5); font-size: .84rem; margin-bottom: 10px; }
  .footer__bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .footer__copy { color: rgba(255,255,255,.3); font-size: .8rem; }
  .footer__tagline { color: rgba(255,255,255,.2); font-size: .78rem; }

  /* ── RESPONSIVE ────────────────────────────── */
  @media (max-width: 1024px) {
    .section { padding: 80px 24px; }
  }

  @media (max-width: 900px) {
    .footer__grid { grid-template-columns: 1fr; gap: 28px; margin-bottom: 28px; padding-bottom: 28px; }
    .footer__brand-desc { max-width: 100%; }
    .footer__bottom { justify-content: center; text-align: center; }
  }

  @media (max-width: 768px) {
    .nav__links { display: none; }
    .nav__hamburger { display: flex; align-items: center; justify-content: center; }
    .flow__grid { grid-template-columns: 1fr; gap: 24px; }
    .research__header { flex-direction: column; align-items: flex-start; }
    .section { padding: 60px 16px; }
    .cta { padding: 80px 1.25rem; }
  }

  @media (max-width: 480px) {
    .btn-primary, .btn-outline, .btn-green, .btn-outline-white { width: 100%; justify-content: center; }
    .cta__actions { flex-direction: column; align-items: center; }
    .stats__grid { grid-template-columns: 1fr 1fr; }
    .stat-cell { border-right: none; border-bottom: 1px solid var(--border); }
    .stat-cell:nth-child(odd) { border-right: 1px solid var(--border); }
    .stat-cell:nth-last-child(-n+2) { border-bottom: none; }
  }
`;

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const Icon = {
  Logo: () => (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
      <path d="M8 12L24 4L40 12V28C40 36 32 42 24 46C16 42 8 36 8 28V12Z" fill="#29AAE1" opacity="0.15"/>
      <path d="M8 12L24 4L40 12V28C40 36 32 42 24 46C16 42 8 36 8 28V12Z" stroke="#29AAE1" strokeWidth="2" fill="none"/>
      <path d="M16 24L21 29L32 18" stroke="#5BBB6B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 8L24 14" stroke="#29AAE1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Menu: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>
    </svg>
  ),
  X: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
    </svg>
  ),
  ArrowRight: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  ChevronRight: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  Shield: ({ size = 20, color = "#5BBB6B" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
  Check: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#5BBB6B" strokeWidth="2" strokeLinecap="round">
      <path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>
    </svg>
  ),
  Globe: ({ size = 20, color = "#29AAE1", opacity = 1 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={size > 40 ? "0.8" : "2"} strokeLinecap="round" opacity={opacity}>
      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
    </svg>
  ),
  Lock: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#29AAE1" strokeWidth="2" strokeLinecap="round">
      <rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Bars: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M5 21v-6"/><path d="M12 21V3"/><path d="M19 21V9"/>
    </svg>
  ),
  Clipboard: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>
    </svg>
  ),
  Users: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>
    </svg>
  ),
  Award: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#29AAE1" strokeWidth="2" strokeLinecap="round">
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>
      <circle cx="12" cy="8" r="6"/>
    </svg>
  ),
  Database: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>
    </svg>
  ),
  FileText: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/>
      <path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
    </svg>
  ),
  TrendingUp: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>
    </svg>
  ),
  Mail: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>
    </svg>
  ),
  MapPin: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Phone: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
    </svg>
  ),
};
  const LogoMark = () => (
    <span className="logo-icon" aria-hidden="true">
      {/* Pure SVG recreation: green M with blue checkmark tick */}
      <svg viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left leg of M - green */}
        <path d="M2 34 L10 6 L18 22 L22 14" stroke="#4aad35" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Right leg of M - green */}
        <path d="M22 14 L26 22 L34 6" stroke="#4aad35" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Blue checkmark tick overlaid on right side */}
        <path d="M28 20 L33 27 L42 10" stroke="#29AAE1" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </span>
  );
// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") setMenuOpen(false);
};
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(o => !o);

  const links = ["About", "Services", "Projects", "Team", "Contact"];



  return (
    <>
      {/* Backdrop overlay — closes menu on outside click */}
      <div
        className={`mobile-overlay${menuOpen ? " open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav
        className={`nav${scrolled ? " scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav__inner">
          {/* Logo */}
          <a href="#home" className="nav__logo" onClick={closeMenu} aria-label="MedVeritas home">
            <LogoMark />
            <div className="nav__logo-text">
              <span className="l-med">Med</span>
              <span className="l-v">V</span>
              <span className="l-rest">eritas</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="nav__links" role="menubar">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} role="menuitem">{l}</a>
            ))}
            <a href="#contact" className="nav__cta" role="menuitem">Contact Us</a>
          </div>

          {/* Hamburger button */}
          <button
            className="nav__hamburger"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={toggleMenu}
          >
            {menuOpen
              ? /* X icon */
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
                </svg>
              : /* Hamburger icon */
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>
                </svg>
            }
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-nav"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        role="menu"
        aria-hidden={!menuOpen}
      >
        {links.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            role="menuitem"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
          >
            {l}
          </a>
        ))}
        <div className="mobile-menu__divider" />
        <a
          href="#contact"
          className="m-cta"
          role="menuitem"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        >
          Contact Us
        </a>
      </div>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const stats = [
    { icon: <Icon.Shield size={18} color="#5BBB6B" />, label: "Independent", sub: "Transparent & research-led" },
    { icon: <Icon.Check size={18} />, label: "Coverage Quality 94.2%", sub: "+8.4% improvement" },
    { icon: <Icon.Globe size={18} color="#29AAE1" />, label: "Field Verification", sub: "22 Governorates — national reach" },
    { icon: <Icon.Lock size={18} />, label: "Survey Accuracy 98%", sub: "Validated data & on-track delivery" },
  ];

  return (
    <section className="hero" id="home">
      <div className="hero__overlay" />

      <div className="hero__container">
        <div className="hero__content">

          <div className="badge">
            <div className="badge__dot" />
            <span>Independent Healthcare Research & Consulting in Yemen</span>
          </div>

          <h1 className="hero__title">
            Evidence-Driven <br /> Healthcare Solutions
          </h1>

          <p className="hero__sub">
            Research, Monitoring, Evaluation, and Strategic Health Consulting.
          </p>

          <p className="hero__desc">
            MedVeritas supports governments, NGOs, and international partners
            with credible data and practical solutions.
          </p>

          <div className="hero__actions">
            <a href="#services" className="btn-primary">
              Explore Services <Icon.ArrowRight />
            </a>
            <a href="#contact" className="btn-outline">
              Contact Us
            </a>
          </div>

        </div>
      </div>

      <div className="hero__stats">
        {stats.map(({ icon, label, sub }) => (
          <div key={label} className="stat">
            <div className="stat__icon">{icon}</div>
            <div>
              <div className="stat__label">{label}</div>
              <div className="stat__sub">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  const cards = [
    {
      color: "#29AAE1", bg: "rgba(41,170,225,.082)",
      icon: <Icon.Clipboard size={24} color="#29AAE1" />,
      title: "Research & Evaluation",
      desc: "Study design, health systems analysis, impact evaluation, and evidence generation for programs and policy.",
    },
    {
      color: "#5BBB6B", bg: "rgba(91,187,107,.082)",
      icon: <Icon.Bars size={24} color="#5BBB6B" />,
      title: "Health Surveys",
      desc: "High-quality field surveys, sampling design, validation, and reporting for complex operating environments.",
    },
    {
      color: "#29AAE1", bg: "rgba(41,170,225,.082)",
      icon: <Icon.Shield size={24} color="#29AAE1" />,
      title: "Monitoring & Evaluation",
      desc: "Framework development, indicator tracking, verification systems, and performance measurement across health interventions.",
    },
    {
      color: "#5BBB6B", bg: "rgba(91,187,107,.082)",
      icon: <Icon.Users size={24} />,
      title: "Training & Capacity Building",
      desc: "Workshops, mentoring, and practical training for field teams, enumerators, and health professionals.",
    },
    {
      color: "#29AAE1", bg: "rgba(41,170,225,.082)",
      icon: <Icon.Globe size={24} color="#29AAE1" />,
      title: "Healthcare Consulting",
      desc: "Strategic advisory for program design, operational efficiency, partner coordination, and evidence-based planning.",
    },
    {
      color: "#5BBB6B", bg: "rgba(91,187,107,.082)",
      icon: <Icon.TrendingUp size={24} />,
      title: "Implementation Support",
      desc: "On-the-ground technical assistance for field supervision, data quality assurance, and adaptive execution.",
    },
  ];

  return (
    <section className="services section" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="services__header">
          <div className="sec-badge"><span>What We Do</span></div>
          <h2 className="sec-title" id="services-title">Specialized Services Across the Healthcare Evidence Cycle</h2>
          <p>Designed to support governments, NGOs, donors, and implementing partners with clarity, speed, and scientific credibility.</p>
        </div>
        <div className="services__grid">
          {cards.map(({ color, bg, icon, title, desc }) => (
            <article key={title} className="service-card" tabIndex={0} aria-label={title}>
              <div className="service-card__accent" style={{ background: color }} />
              <div className="service-card__icon" style={{ background: bg, color }}>{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a href="#contact" className="service-card__link" style={{ color }}>
                Learn more <Icon.ChevronRight />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RESEARCH FLOW ────────────────────────────────────────────────────────────
function ResearchFlow() {
  const [active, setActive] = useState(3);
  const steps = [
    { n: 1, title: "WHO – Health Surveys", desc: "Field implementation, validation systems, and decision-ready reporting to support health program planning and improvement." },
    { n: 2, title: "UNICEF – Monitoring Projects", desc: "Monitoring frameworks, verification workflows, and performance tracking for child and community health initiatives." },
    { n: 3, title: "Immunization – Polio Campaigns", desc: "Coverage surveys and field monitoring to evaluate campaign reach, identify gaps, and improve intervention quality." },
    { n: 4, title: "Public Health Assessments", desc: "Health system analysis, needs assessments, and evidence-based recommendations to guide strategic planning and response." },
    { n: 5, title: "Reporting & Impact", desc: "Delivering actionable intelligence that drives measurable improvements across health programs and decision-making." },
  ];

  return (
    <section className="flow" aria-labelledby="flow-title">
      <div className="flow__bg" aria-hidden="true" />
      <div className="flow__grid">
        <div className="flow__intro">
          <div className="sec-badge"><span>Our Process</span></div>
          <h2 id="flow-title">Field-Led Insights with International-Level Rigour</h2>
          <p>From assessment design to implementation support, every engagement is built on credible evidence and decision-ready reporting that supports health system improvement.</p>
        </div>
        <div className="flow__steps">
          <ol className="steps-list" aria-label="Research process steps">
            {steps.map(({ n, title, desc }) => (
              <li
                key={n}
                role="button"
                tabIndex={0}
                className={`step-item${active === n ? " active" : ""}`}
                onClick={() => setActive(n)}
                onKeyDown={e => (e.key === "Enter" || e.key === " ") && setActive(n)}
                aria-pressed={active === n}
                aria-label={`Step ${n}: ${title}`}
              >
                <div className="step-number">{n}</div>
                <div style={{ flex: 1 }}>
                  <div className="step-title">{title}</div>
                  <p className="step-desc">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ─── RESEARCH PUBLICATIONS ────────────────────────────────────────────────────
function Research() {
  const pubs = [
    { badge: "WHO", badgeColor: "#29AAE1",  imageUrl: logo_who,title: "WHO Health Surveys", desc: "Design and field implementation support for healthcare surveys, quality checks, and evidence reporting for program decision-making.", date: "Field Validation · Data Collection" },
    { badge: "UNICEF", badgeColor: "#5BBB6B",imageUrl: logo_unicef, title: "UNICEF Monitoring Projects", desc: "Monitoring frameworks, verification workflows, and implementation tracking for child and community health initiatives.", date: "Indicator Monitoring · Site Verification" },
    { badge: "IMMUNIZATION", badgeColor: "#F59E0B",imageUrl: Polio1 ,title: "Polio Campaign Coverage Surveys", desc: "Coverage assessment and field monitoring to evaluate campaign reach, identify gaps, and improve intervention quality.", date: "Coverage Measurement · Rapid Feedback" },
    { badge: "PUBLIC HEALTH", badgeColor: "#0D1B3E",imageUrl: public_health, title: "Public Health Assessments", desc: "Needs assessments, service analysis, and evidence synthesis to guide health system response and strategic planning.", date: "Situation Analysis · Research Synthesis" },
  ];

  return (
    <section className="research section" id="projects" aria-labelledby="research-title">
      <div className="container">
        <div className="research__header">
          <div>
            <div className="sec-badge"><span>Work Experience</span></div>
            <h2 className="sec-title" id="research-title">Selected Public Health Projects</h2>
          </div>
          <a href="#" className="research__view-all" aria-label="View all projects">
            View all projects <Icon.ChevronRight size={16} />
          </a>
        </div>
         <div className="research__grid">
                 {pubs.map(({ badge, badgeColor, imageUrl, title, desc, date }) => (
                   <article key={title} className="pub-card" tabIndex={0} aria-label={title}>
                     <div className="pub-card__thumb">
                       {/* render image when provided, otherwise fallback to globe icon */}
                       {imageUrl ? (
                         <img src={imageUrl} alt={`${badge} logo`} style={{ width: "100%"}}  />
                       ) : (
                         <Icon.Globe size={48} color="rgba(225, 225, 230, 1)" />
                       )}
                       <div className="pub-card__badge" style={{ background: badgeColor }}>{badge}</div>
                     </div>
                     <div className="pub-card__body">
                       <h4>{title}</h4>
                       <p>{desc}</p>
                       <div className="pub-card__footer">
                         <span className="pub-card__date">{date}</span>
                         <a href="#" className="pub-card__link">Read more <Icon.ChevronRight size={12} /></a>
                       </div>
                     </div>
                   </article>
                 ))}
               </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function Stats() {
  const items = [
    { icon: <Icon.Clipboard size={28} />, num: "50+", label: "Field Experts in Our Network" },
    { icon: <Icon.Globe size={28} />, num: "22", label: "Governorates Covered Nationally" },
    { icon: <Icon.Database size={28} />, num: "10+", label: "Years of Proven Experience Operational since 2014" },
    { icon: <Icon.Shield size={28} color="#29AAE1" />, num: "WHO & UNICEF", label: "Trusted by International Partners" },
  ];

  return (
    <section className="stats section" aria-label="Key performance statistics">
      <div className="container">
        <div className="stats__grid">
          {items.map(({ icon, num, label }) => (
            <div key={label} className="stat-cell">
              <div className="stat-cell__icon" aria-hidden="true">{icon}</div>
              <div className="stat-cell__num">{num}</div>
              <div className="stat-cell__label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PLATFORM CAPABILITIES ────────────────────────────────────────────────────
function Platform() {
  const caps = [
    { icon: <Icon.Bars size={20} />, title: "Public Health Specialists", desc: "Sector experts who understand healthcare systems, program design, and evidence needs in humanitarian and development settings." },
    { icon: <Icon.Clipboard size={20} />, title: "Data Analysts & Researchers", desc: "Experts in study design, data interpretation, and turning complex findings into clear, decision-ready outputs." },
    { icon: <Icon.Globe size={20} />, title: "Epidemiologists", desc: "Technical professionals supporting surveillance, trend analysis, risk assessment, and scientific health evaluation." },
    { icon: <Icon.FileText size={20} />, title: "Field Teams", desc: "Extensive networks of trained enumerators and supervisors delivering robust coverage across all governorates." },
    { icon: <Icon.TrendingUp size={20} />, title: "M&E Specialists", desc: "Professionals designing monitoring frameworks, tracking indicators, and measuring program performance at scale." },
    { icon: <Icon.Shield size={20} color="#29AAE1" />, title: "Healthcare Consultants", desc: "Senior advisors supporting strategic planning, partner coordination, and evidence-based program design." },
  ];

  return (
    <section className="platform section" aria-labelledby="platform-title">
      <div className="container">
        <div className="platform__header">
          <div className="sec-badge"><span>Team &amp; Expertise</span></div>
          <h2 className="sec-title" id="platform-title">Multidisciplinary Professionals Delivering Analytical Depth and Field Execution</h2>
        </div>
        <div className="platform__grid">
          {caps.map(({ icon, title, desc }) => (
            <div key={title} className="cap-card">
              <div className="cap-card__icon" aria-hidden="true">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__bg" aria-hidden="true" />
      <div className="cta__inner">
        <div className="cta__logo" aria-hidden="true">
          <Icon.Logo />
          <div className="cta__logo-text">
            <span className="med">Med</span>
            <span className="ver">Veritas</span>
          </div>
        </div>
        <h2 id="cta-title">Let's Build Better Health Outcomes Together</h2>
        <p>Connect with MedVeritas for research partnerships, monitoring support, health assessments, and consulting inquiries.</p>
        <div className="cta__actions">
          <a href="#contact" className="btn-green">Contact Us <Icon.ArrowRight /></a>
          <a href="#services" className="btn-outline-white">Explore Our Services</a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const quickLinks = ["About", "Services", "Projects", "Contact"];
  const services = ["Healthcare Research", "Data Analysis", "Program Evaluation", "Public Health Consulting"];
  const legal = ["Privacy Policy", "Terms of Use", "Compliance"];

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">

          <div>
            <a href="#home" className="footer__brand-row" aria-label="MedVeritas home">
              <LogoMark />
              <div className="footer__brand-name">
                <span className="l-med">Med</span>
                <span className="l-v">V</span>
                <span className="l-rest">eritas</span>
              </div>
            </a>

            <p className="footer__brand-desc">
              Evidence-driven healthcare consulting for stronger decisions,
              better program performance, and measurable public health impact.
            </p>

            <div className="footer__socials">
              <a className="footer__social-btn" href="#" aria-label="LinkedIn">in</a>
              <a className="footer__social-btn" href="#" aria-label="X (Twitter)">𝕏</a>
              <a className="footer__social-btn" href="mailto:info@medveritasye.com">✉</a>
            </div>
          </div>

          {/* باقي الكود بدون تغيير */}
          <div>
            <h5 className="footer__col-title">Quick Links</h5>
            <ul className="footer__col-links">
              {quickLinks.map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="footer__col-title">Services</h5>
            <ul className="footer__col-links">
              {services.map(l => (
                <li key={l}><a href="#services">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="footer__col-title">Legal</h5>
            <ul className="footer__col-links">
              {legal.map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="footer__col-title">Contact Us</h5>
            <address style={{ fontStyle: "normal" }}>
              <div className="footer__contact-row"><Icon.Mail /><span>info@medveritasye.com</span></div>
              <div className="footer__contact-row"><Icon.MapPin /><span>Sana'a, Yemen</span></div>
              <div className="footer__contact-row"><Icon.Phone /><span>WhatsApp available</span></div>
            </address>
          </div>

        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2026 MedVeritas. All rights reserved.</p>
          <p className="footer__tagline">Healthcare Intelligence · Research · Evidence</p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <main id="main-content">
        <Hero />
      
        <Services />
        <ResearchFlow />
        <Research />
          <Stats />
        <Platform />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
