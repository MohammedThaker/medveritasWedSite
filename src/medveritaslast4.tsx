import logo_who from "./assets/org-logos/logo-who.svg";
import logo_unicef from "./assets/org-logos/UNICEF-Logo.svg";
import Polio1 from "./assets/org-logos/Polio2.jpg";
import public_health from "./assets/org-logos/public_health.jpg";
import { useState, useEffect } from "react";
// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const Icon = {
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
            <LogoMark />
            <div className="nav__logo-text">
              <span className="l-med">Med</span>
              <span className="l-v">V</span>
              <span className="l-rest">eritas</span>
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
