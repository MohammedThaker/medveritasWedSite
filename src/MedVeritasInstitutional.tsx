/**
 * MedVeritas — Institutional Research Platform
 * Grade: WHO / NIH / Harvard Medical School standard
 *
 * Design Direction: "Measured Authority" — every element earns its place.
 * No decoration for decoration's sake. Trust is built through structure,
 * precision, and restraint, not visual noise.
 *
 * Color system sourced exclusively from the MedVeritas logo:
 *   Primary blue:   #1A5C8A  (logo navy-blue, darkened for text/authority)
 *   Accent cyan:    #29AAE1  (logo cyan — used sparingly for links/accents)
 *   Accent green:   #5BBB6B  (logo green — used for positive indicators only)
 *   Navy deep:      #0D1B3E  (logo navy — used for hero/dark surfaces)
 *
 * Typography: IBM Plex Sans (academic, technical, trustworthy)
 * Layout: 12-column, 8px grid, strict alignment
 *
 * Dependencies: framer-motion (minimal use), react
 * Zero third-party UI libraries.
 */

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo
} from "react";
import { motion, useScroll, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import type {
  ReactNode,
  MouseEvent,
   FC,
} from "react";
/* ═══════════════════════════════════════════════════════════
   DESIGN SYSTEM — Institutional Grade
   All values are multiples of 8px where possible.
   Color palette is locked to logo colors only.
═══════════════════════════════════════════════════════════ */

const DS = {
  // ── Colors (logo-derived only) ──────────────────────────
  // Primary text/structural (darkened logo navy for readability)
  ink:        "#0F2137",
  // Secondary text
  inkMid:     "#3B4F63",
  // Tertiary / muted
  inkLight:   "#6B7D8F",
  // Logo navy (hero/dark surfaces)
  navy:       "#0D1B3E",
  navyMid:    "#162347",
  // Logo blue (institutional primary — derived from logo navy's blue tone)
  blue:       "#1A5C8A",
  blueMid:    "#1E6FA8",
  blueLight:  "rgba(26,92,138,.08)",
  // Logo cyan (link/accent — used minimally)
  cyan:       "#29AAE1",
  cyanLight:  "rgba(41,170,225,.1)",
  // Logo green (positive states, data points)
  green:      "#5BBB6B",
  greenLight: "rgba(91,187,107,.1)",

  // ── Neutral Surface System ────────────────────────────────
  white:      "#FFFFFF",
  surface:    "#F8F9FB",   // near-white, barely perceptible
  surfaceAlt: "#F0F3F7",   // subtle differentiation
  rule:       "#DDE3EA",   // dividers
  ruleFaint:  "#EEF1F5",   // very subtle separators

  // ── Typography ────────────────────────────────────────────
  font:       "'IBM Plex Sans', 'Source Sans 3', system-ui, sans-serif",
  fontMono:   "'IBM Plex Mono', 'Courier New', monospace",

  // ── Spacing (8px grid) ───────────────────────────────────
  s1: "4px",    // half-unit
  s2: "8px",
  s3: "12px",
  s4: "16px",
  s5: "24px",
  s6: "32px",
  s7: "48px",
  s8: "64px",
  s9: "80px",
  s10:"96px",
  s11:"128px",

  // ── Radii (minimal — institutional prefers rectangles) ────
  r2: "2px",
  r4: "4px",
  r6: "6px",
  r8: "8px",

  // ── Shadows (flat, no drama) ──────────────────────────────
  s_xs:  "0 1px 2px rgba(15,33,55,.05)",
  s_sm:  "0 1px 4px rgba(15,33,55,.06), 0 2px 8px rgba(15,33,55,.04)",
  s_md:  "0 2px 8px rgba(15,33,55,.06), 0 4px 20px rgba(15,33,55,.05)",
  s_lg:  "0 4px 16px rgba(15,33,55,.07), 0 8px 40px rgba(15,33,55,.06)",

  // ── Transitions ───────────────────────────────────────────
  t_fast: "0.15s ease",
  t_base: "0.22s ease",
  t_slow: "0.35s ease",

  // ── Motion ease ──────────────────────────────────────────
  ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number],

  // ── Max widths ───────────────────────────────────────────
  maxContent: "1200px",
  maxNarrow:  "800px",
  maxWide:    "1440px",
} as const;

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES + FONT INJECTION
═══════════════════════════════════════════════════════════ */
const GlobalStyles: FC = memo(() => {
  useEffect(() => {
    if (document.getElementById("mv-inst-styles")) return;
    const s = document.createElement("style");
    s.id = "mv-inst-styles";
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&display=swap');

      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        font-size: 16px;
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }

      body {
        font-family: 'IBM Plex Sans', 'Source Sans 3', system-ui, sans-serif;
        color: #0F2137;
        background: #FFFFFF;
        line-height: 1.65;
        overflow-x: hidden;
      }

      /* Institutional link style */
      a {
        color: #1A5C8A;
        text-decoration: underline;
        text-decoration-color: rgba(26,92,138,.3);
        text-underline-offset: 2px;
        transition: text-decoration-color 0.15s ease, color 0.15s ease;
      }
      a:hover {
        color: #29AAE1;
        text-decoration-color: rgba(41,170,225,.5);
      }

      /* No decorative underline on nav/UI links */
      a.ui-link { text-decoration: none; }

      img { display: block; max-width: 100%; }
      button { font-family: inherit; cursor: pointer; border: none; background: none; }

      :focus-visible {
        outline: 2px solid #29AAE1;
        outline-offset: 3px;
        border-radius: 2px;
      }

      /* Custom scrollbar — minimal */
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #F0F3F7; }
      ::-webkit-scrollbar-thumb { background: #B0BCCA; border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: #1A5C8A; }

      /* Selection */
      ::selection { background: rgba(41,170,225,.2); color: #0F2137; }

      /* ── Responsive layout helpers ────────────── */
      .mv-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 clamp(1.25rem, 4vw, 3rem);
      }

      .mv-grid-12 {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 24px;
      }

      /* Section padding rhythm */
      .mv-section {
        padding: clamp(4rem, 8vw, 7rem) 0;
      }
      .mv-section-sm {
        padding: clamp(2.5rem, 5vw, 4rem) 0;
      }

      /* Hero grid */
      .mv-hero-grid {
        display: grid;
        grid-template-columns: 1fr 420px;
        gap: 64px;
        align-items: center;
      }

      /* Three-column */
      .mv-col-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }

      /* Four-column */
      .mv-col-4 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
      }

      /* Two-column */
      .mv-col-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        align-items: start;
      }

      /* Footer grid */
      .mv-footer-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: clamp(2rem, 4vw, 4rem);
      }

      /* Partners grid */
      .mv-partners-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 1px;
      }

      /* Publications list */
      .mv-publications-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1px;
      }

      /* Hide on mobile */
      .mv-desktop-only { display: block; }

      @media (max-width: 1024px) {
        .mv-hero-grid { grid-template-columns: 1fr; gap: 40px; }
        .mv-col-3 { grid-template-columns: 1fr 1fr; }
        .mv-col-4 { grid-template-columns: 1fr 1fr; }
        .mv-footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
        .mv-partners-grid { grid-template-columns: repeat(3, 1fr); }
      }

      @media (max-width: 768px) {
        .mv-col-2 { grid-template-columns: 1fr; }
        .mv-col-3 { grid-template-columns: 1fr; }
        .mv-partners-grid { grid-template-columns: repeat(2, 1fr); }
        .mv-desktop-only { display: none; }
      }

      @media (max-width: 540px) {
        .mv-col-4 { grid-template-columns: 1fr; }
        .mv-footer-grid { grid-template-columns: 1fr; }
        .mv-partners-grid { grid-template-columns: repeat(2, 1fr); }
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* Print */
      @media print {
        .mv-nav, .mv-mobile-menu { display: none !important; }
        .mv-section { padding: 2rem 0; }
        body { color: #000; background: #fff; }
      }

      /* Institutional rule line — used across sections */
      .mv-rule {
        border: none;
        border-top: 1px solid #DDE3EA;
        margin: 0;
      }

      /* Label / overline text */
      .mv-overline {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #1A5C8A;
      }

      /* Navigation active indicator */
      .mv-nav-active {
        color: #1A5C8A !important;
        border-bottom: 2px solid #1A5C8A;
      }

      /* Card — minimal institutional */
      .mv-card {
        background: #FFFFFF;
        border: 1px solid #DDE3EA;
        border-radius: 4px;
        transition: border-color 0.22s ease, box-shadow 0.22s ease;
      }
      .mv-card:hover {
        border-color: #B0BCCA;
        box-shadow: 0 2px 8px rgba(15,33,55,.06), 0 4px 20px rgba(15,33,55,.05);
      }

      /* Tag/chip */
      .mv-tag {
        display: inline-block;
        padding: 2px 8px;
        border: 1px solid #DDE3EA;
        border-radius: 2px;
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #6B7D8F;
        background: #F8F9FB;
      }

      /* Hamburger */
      .mv-hamburger { display: none !important; }
      .mv-nav-links { display: flex !important; }

      @media (max-width: 900px) {
        .mv-hamburger { display: flex !important; }
        .mv-nav-links { display: none !important; }
      }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
});
GlobalStyles.displayName = "GlobalStyles";

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL — subtle, one-directional fade only
═══════════════════════════════════════════════════════════ */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}
const Reveal: FC<RevealProps> = memo(({ children, delay = 0, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduce ? 0.1 : 0.5, delay: reduce ? 0 : delay, ease: DS.ease }}
    >
      {children}
    </motion.div>
  );
});
Reveal.displayName = "Reveal";

/* ═══════════════════════════════════════════════════════════
   TYPOGRAPHY COMPONENTS — strict academic hierarchy
═══════════════════════════════════════════════════════════ */
interface TypographyProps {
  children: ReactNode;
  style?: React.CSSProperties;
  id?: string;
  className?: string;
}

const Overline: FC<TypographyProps> = ({ children, style }) => (
  <div className="mv-overline" style={style}>{children}</div>
);

const H1: FC<TypographyProps> = ({ children, style, id }) => (
  <h1 id={id} style={{
    fontFamily: DS.font,
    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
    fontWeight: 700,
    color: DS.white,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    ...style
  }}>{children}</h1>
);

const H2: FC<TypographyProps> = ({ children, style, id }) => (
  <h2 id={id} style={{
    fontFamily: DS.font,
    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
    fontWeight: 600,
    color: DS.ink,
    lineHeight: 1.25,
    letterSpacing: "-0.018em",
    ...style
  }}>{children}</h2>
);

const H3: FC<TypographyProps> = ({ children, style }) => (
  <h3 style={{
    fontFamily: DS.font,
    fontSize: "1.0625rem",
    fontWeight: 600,
    color: DS.ink,
    lineHeight: 1.35,
    letterSpacing: "-0.01em",
    ...style
  }}>{children}</h3>
);

const Lead: FC<TypographyProps> = ({ children, style }) => (
  <p style={{
    fontSize: "1.0625rem",
    fontWeight: 400,
    color: "rgba(255,255,255,.72)",
    lineHeight: 1.75,
    maxWidth: "52ch",
    ...style
  }}>{children}</p>
);

const Body: FC<TypographyProps> = ({ children, style }) => (
  <p style={{
    fontSize: "0.9375rem",
    fontWeight: 400,
    color: DS.inkMid,
    lineHeight: 1.72,
    ...style
  }}>{children}</p>
);

/* ═══════════════════════════════════════════════════════════
   BUTTON COMPONENTS — institutional, non-promotional
═══════════════════════════════════════════════════════════ */
interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  href?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
}

const InstitutionalBtn: FC<ButtonProps> = memo(({
  children, variant = "primary", href = "#", style, onClick, "aria-label": ariaLabel
}) => {
  const reduce = useReducedMotion();

  const variantMap: Record<string, React.CSSProperties> = {
    primary: {
      background: DS.blue,
      color: "#fff",
      border: `1px solid ${DS.blue}`,
    },
    secondary: {
      background: "transparent",
      color: DS.white,
      border: "1px solid rgba(255,255,255,.35)",
    },
    outline: {
      background: "transparent",
      color: DS.blue,
      border: `1px solid ${DS.blue}`,
    },
    ghost: {
      background: DS.blueLight,
      color: DS.blue,
      border: "1px solid transparent",
    },
  };

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      className="ui-link"
      whileHover={reduce ? {} : { backgroundColor: variant === "primary" ? DS.blueMid : undefined }}
      whileTap={reduce ? {} : { scale: 0.985 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 22px",
        borderRadius: DS.r4,
        fontSize: "0.875rem",
        fontWeight: 500,
        letterSpacing: "0.01em",
        cursor: "pointer",
        transition: DS.t_base,
        textDecoration: "none",
        flexShrink: 0,
        ...variantMap[variant],
        ...style,
      }}
    >
      {children}
    </motion.a>
  );
});
InstitutionalBtn.displayName = "InstitutionalBtn";

/* ═══════════════════════════════════════════════════════════
   SVG ICON SYSTEM — line icons only, no gradients
═══════════════════════════════════════════════════════════ */
interface SvgIconProps { size?: number; color?: string; }

const ArrowRight: FC<SvgIconProps> = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
);
const ArrowUpRight: FC<SvgIconProps> = ({ size = 13, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12L12 4M6 4h6v6"/>
  </svg>
);
const MenuIcon: FC<SvgIconProps> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M4 8h16M4 16h16"/>
  </svg>
);
const CloseIcon: FC<SvgIconProps> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const ChevronRight: FC<SvgIconProps> = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4.5 2.5l3 3-3 3"/>
  </svg>
);
const SearchIcon: FC<SvgIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const MailIcon: FC<SvgIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
    <rect x="2" y="4" width="20" height="16" rx="2"/>
  </svg>
);
const PhoneIcon: FC<SvgIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
  </svg>
);
const PinIcon: FC<SvgIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
// Domain-specific icons (line only)
const MicroscopeIcon: FC<SvgIconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/>
    <path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/>
    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>
  </svg>
);
const ChartIcon: FC<SvgIconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);
const NetworkIcon: FC<SvgIconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/>
    <rect x="9" y="2" width="6" height="6" rx="1"/>
    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
    <path d="M12 12V8"/>
  </svg>
);
const GraduateIcon: FC<SvgIconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
    <path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
  </svg>
);
const ShieldIcon: FC<SvgIconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const GlobeIcon: FC<SvgIconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20"/>
    <path d="M2 12h20"/>
  </svg>
);
const DocumentIcon: FC<SvgIconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
  </svg>
);
const LinkedInIcon: FC<SvgIconProps> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwitterXIcon: FC<SvgIconProps> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const ResearchGateIcon: FC<SvgIconProps> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53c.038.207.087.395.153.57.196.52.478.918.843 1.208.364.29.793.44 1.292.44.706 0 1.323-.287 1.85-.859V9.67h-2.024V8.207h3.68v2.755c-.286.598-.723 1.083-1.314 1.45-.59.37-1.275.554-2.055.554-.612 0-1.174-.111-1.682-.334a3.605 3.605 0 0 1-1.285-.967 4.52 4.52 0 0 1-.822-1.527 6.509 6.509 0 0 1-.291-2.022c0-.813.098-1.534.291-2.162.194-.63.484-1.16.87-1.59A3.65 3.65 0 0 1 17.6.688a4.95 4.95 0 0 1 1.986-.413c.835 0 1.56.163 2.177.49.618.325 1.098.813 1.44 1.461l-1.392.8c-.216-.467-.517-.83-.903-1.092-.385-.26-.851-.391-1.397-.391zM0 .338h2.029l3.665 9.354L9.358.338h2.028L6.791 12.17H4.607z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   DATA LAYER
═══════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { label: "About",         href: "#about"        },
  { label: "Research",      href: "#research"     },
  { label: "Projects",      href: "#projects"     },
  { label: "Publications",  href: "#publications" },
  { label: "Partners",      href: "#partners"     },
  { label: "Contact",       href: "#contact"      },
];

const METRICS = [
  { value: "50+",   label: "Active research projects",   sub: "across Yemen and the region"       },
  { value: "5M+",   label: "Beneficiaries reached",      sub: "through evidence-based programs"   },
  { value: "80+",   label: "Published reports",          sub: "peer-reviewed and institutional"   },
  { value: "30+",   label: "Partner organizations",      sub: "UN agencies, NGOs, and governments"},
];

const RESEARCH_DOMAINS = [
  {
    Icon: MicroscopeIcon,
    code: "HSD-01",
    title: "Health Systems Research",
    desc: "Evaluating health system performance, service delivery models, and governance frameworks across conflict and post-conflict contexts.",
    tags: ["Systems Analysis", "Governance", "Service Delivery"],
  },
  {
    Icon: ChartIcon,
    code: "DAE-02",
    title: "Data Analytics & Epidemiology",
    desc: "Advanced quantitative methods for disease surveillance, burden-of-disease estimation, and population-level health indicator monitoring.",
    tags: ["Surveillance", "Biostatistics", "GIS Mapping"],
  },
  {
    Icon: GlobeIcon,
    code: "HHP-03",
    title: "Humanitarian Health Programs",
    desc: "Field-based research and program evaluation in humanitarian settings, integrating SPHERE standards and cluster coordination frameworks.",
    tags: ["Emergency Response", "Nutrition", "WASH"],
  },
  {
    Icon: GraduateIcon,
    code: "CBR-04",
    title: "Capacity Building & Training",
    desc: "Institutional strengthening through curriculum development, competency-based training, and mentorship for national health cadres.",
    tags: ["Workforce Development", "Curriculum", "Mentorship"],
  },
  {
    Icon: ShieldIcon,
    code: "PHG-05",
    title: "Public Health Governance",
    desc: "Policy analysis and advisory support for health financing reform, regulatory frameworks, and inter-sectoral coordination.",
    tags: ["Policy Analysis", "Health Financing", "Regulation"],
  },
  {
    Icon: NetworkIcon,
    code: "MEL-06",
    title: "Monitoring, Evaluation & Learning",
    desc: "Design and implementation of MEL systems for complex multi-stakeholder health programs, with focus on adaptive management.",
    tags: ["MEL Design", "Adaptive Management", "Impact Evaluation"],
  },
];

const PROJECTS = [
  {
    id: "YE-HSS-2023",
    status: "Active",
    statusColor: DS.green,
    title: "Yemen Health System Strengthening Program",
    funder: "World Health Organization / MoPHP",
    period: "2022 – 2025",
    scope: "12 governorates",
    desc: "Comprehensive assessment and strengthening of primary healthcare infrastructure, human resources, and information systems across underserved governorates.",
    domain: "Health Systems Research",
  },
  {
    id: "YE-DSE-2023",
    status: "Active",
    statusColor: DS.green,
    title: "National Disease Surveillance Enhancement",
    funder: "USAID / WHO EMRO",
    period: "2023 – 2026",
    scope: "National",
    desc: "Building sustainable capacity for early warning, event-based surveillance, and integrated disease management at all levels of the health system.",
    domain: "Data Analytics & Epidemiology",
  },
  {
    id: "YE-NUT-2023",
    status: "Active",
    statusColor: DS.green,
    title: "Multi-Sector Nutrition Assessment",
    funder: "UNICEF / WFP",
    period: "2023 – 2024",
    scope: "4 governorates",
    desc: "SMART survey methodology to assess acute malnutrition prevalence, food security status, and WASH conditions in food-insecure populations.",
    domain: "Data Analytics & Epidemiology",
  },
  {
    id: "YE-CHE-2022",
    status: "Completed",
    statusColor: DS.cyan,
    title: "Community Health Empowerment Initiative",
    funder: "The World Bank",
    period: "2021 – 2023",
    scope: "6 governorates",
    desc: "Community-based participatory research to assess and enhance demand for essential health services through health literacy interventions.",
    domain: "Capacity Building & Training",
  },
];

const PUBLICATIONS = [
  {
    type: "Field Report",
    year: "2024",
    title: "Health Service Availability and Readiness Assessment: Yemen 2023",
    authors: "MedVeritas Research Team",
    journal: "MedVeritas Institutional Reports",
    pages: "84 pp.",
    doi: "",
  },
  {
    type: "Policy Brief",
    year: "2024",
    title: "Strengthening Health Information Systems in Fragile States: Lessons from Yemen",
    authors: "Al-Maknawi A., Hussein M., et al.",
    journal: "Health Policy and Planning",
    pages: "12 pp.",
    doi: "10.1093/heapol/",
  },
  {
    type: "Research Article",
    year: "2023",
    title: "Acute Malnutrition Prevalence Among Children Under Five in Conflict-Affected Governorates",
    authors: "MedVeritas Nutrition Team",
    journal: "Bulletin of the World Health Organization",
    pages: "9 pp.",
    doi: "10.2471/BLT.",
  },
  {
    type: "Technical Report",
    year: "2023",
    title: "Primary Healthcare Infrastructure Assessment: Baseline Survey Report",
    authors: "MedVeritas Health Systems Team",
    journal: "MedVeritas Institutional Reports",
    pages: "112 pp.",
    doi: "",
  },
];

const PARTNERS = [
  { name: "World Health Organization",  abbr: "WHO",    type: "UN Agency"     },
  { name: "UNICEF",                      abbr: "UNICEF", type: "UN Agency"     },
  { name: "USAID",                       abbr: "USAID",  type: "Bilateral"     },
  { name: "The World Bank",              abbr: "WB",     type: "IFI"           },
  { name: "UNDP",                        abbr: "UNDP",   type: "UN Agency"     },
  { name: "Gavi, The Vaccine Alliance",  abbr: "Gavi",   type: "Partnership"   },
  { name: "IRC",                         abbr: "IRC",    type: "INGO"          },
  { name: "MSF",                         abbr: "MSF",    type: "INGO"          },
  { name: "Save the Children",           abbr: "SCI",    type: "INGO"          },
  { name: "MoPHP Yemen",                 abbr: "MoPHP",  type: "Government"    },
  { name: "London School of Hygiene",    abbr: "LSHTM",  type: "Academic"      },
  { name: "Johns Hopkins Bloomberg SPH", abbr: "JHU",    type: "Academic"      },
];

const typeColor: Record<string, string> = {
  "UN Agency":   DS.blue,
  "Bilateral":   DS.navy,
  "IFI":         DS.ink,
  "Partnership": "#4A7B5F",
  "INGO":        "#6B5B4E",
  "Government":  "#5B4A7B",
  "Academic":    "#7B4A5B",
};

/* ═══════════════════════════════════════════════════════════
   LOGO COMPONENT — renders MedVeritas institutional logo
═══════════════════════════════════════════════════════════ */
interface LogoProps { dark?: boolean; size?: "sm" | "md" | "lg"; }
const Logo: FC<LogoProps> = memo(({ dark = false, size = "md" }) => {
  const sizes = { sm: { icon: 28, text: "1rem" }, md: { icon: 34, text: "1.15rem" }, lg: { icon: 44, text: "1.4rem" } };
  const s = sizes[size];
  const textColor = dark ? DS.ink : "#fff";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* Logo mark — preserving the original double-chevron structure */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M8 8L20 20L8 32" stroke={DS.green} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 8L32 20L20 32" stroke={DS.cyan} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontFamily: DS.font, fontWeight: 700, fontSize: s.text, color: textColor, letterSpacing: "-0.02em" }}>
          Med<span style={{ color: dark ? DS.blue : DS.cyan }}>Veritas</span>
        </span>
        <span style={{ fontFamily: DS.font, fontWeight: 400, fontSize: "0.6rem", color: dark ? DS.inkLight : "rgba(255,255,255,.5)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 2 }}>
          Health Research &amp; Analytics
        </span>
      </div>
    </div>
  );
});
Logo.displayName = "Logo";

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════ */
const Navigation: FC = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  useEffect(() => scrollY.on("change", (y: number) => setScrolled(y > 40)), [scrollY]);
  useEffect(() => {
    const fn = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <motion.header
        role="banner"
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: reduce ? 0.1 : 0.4, ease: DS.ease }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          height: 64,
          display: "flex", alignItems: "center",
          background: scrolled ? "rgba(255,255,255,.98)" : "rgba(13,27,62,.97)",
          borderBottom: scrolled ? `1px solid ${DS.rule}` : "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(16px) saturate(180%)",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div className="mv-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <a href="#" className="ui-link" aria-label="MedVeritas home">
            <Logo dark={scrolled} size="sm" />
          </a>

          {/* Desktop nav */}
          <nav className="mv-nav-links" role="navigation" aria-label="Primary navigation"
            style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className="ui-link"
                style={{ padding: "6px 14px", fontSize: "0.8125rem", fontWeight: 500, borderRadius: DS.r4, color: scrolled ? DS.inkMid : "rgba(255,255,255,.75)", transition: DS.t_base, letterSpacing: "0.01em" }}
                onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = scrolled ? DS.blue : "#fff"; e.currentTarget.style.background = scrolled ? DS.blueLight : "rgba(255,255,255,.07)"; }}
                onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = scrolled ? DS.inkMid : "rgba(255,255,255,.75)"; e.currentTarget.style.background = "transparent"; }}>
                {item.label}
              </a>
            ))}
            <InstitutionalBtn href="#contact" style={{ marginLeft: 8, padding: "7px 18px", fontSize: "0.8125rem" }}>
              Collaborate
            </InstitutionalBtn>
          </nav>

          {/* Hamburger */}
          <button
            className="mv-hamburger ui-link"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: DS.r4, color: scrolled ? DS.ink : "#fff", border: `1px solid ${scrolled ? DS.rule : "rgba(255,255,255,.2)"}`, background: "transparent" }}>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </motion.header>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div role="dialog" aria-modal="true" aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: DS.ease }}
            style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 199, background: "#fff", borderBottom: `1px solid ${DS.rule}`, boxShadow: DS.s_lg }}>
            <div className="mv-container" style={{ padding: "1.5rem clamp(1.25rem, 4vw, 3rem)" }}>
              {NAV_ITEMS.map((item, i) => (
                <motion.a key={item.label} href={item.href} className="ui-link"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: `1px solid ${DS.ruleFaint}`, fontSize: "0.9375rem", fontWeight: 500, color: DS.ink }}>
                  {item.label}
                  <ChevronRight />
                </motion.a>
              ))}
              <div style={{ paddingTop: 20 }}>
                <InstitutionalBtn href="#contact" style={{ width: "100%", justifyContent: "center" }}>
                  Collaboration Inquiries
                </InstitutionalBtn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
Navigation.displayName = "Navigation";

/* ═══════════════════════════════════════════════════════════
   SECTION HEADER — reusable institutional section opener
═══════════════════════════════════════════════════════════ */
interface SectionHeaderProps {
  overline: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  titleColor?: string;
}
const SectionHeader: FC<SectionHeaderProps> = memo(({ overline, title, body, align = "left", titleColor }) => (
  <Reveal>
    <div style={{ maxWidth: align === "center" ? 640 : "none", margin: align === "center" ? "0 auto" : undefined, textAlign: align }}>
      <Overline style={{ marginBottom: DS.s3, color: DS.blue }}>{overline}</Overline>
      <div style={{ width: 32, height: 2, background: DS.blue, marginBottom: DS.s5, marginLeft: align === "center" ? "auto" : undefined, marginRight: align === "center" ? "auto" : undefined }} />
      <H2 style={{ color: titleColor ?? DS.ink, marginBottom: body ? DS.s5 : 0 }}>{title}</H2>
      {body && <Body style={{ color: DS.inkMid, maxWidth: "56ch", margin: align === "center" ? "0 auto" : undefined }}>{body}</Body>}
    </div>
  </Reveal>
));
SectionHeader.displayName = "SectionHeader";

/* ═══════════════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════════════ */
const Hero: FC = memo(() => {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      style={{ position: "relative", paddingTop: 64, minHeight: "100svh", display: "flex", alignItems: "center", background: DS.navy, overflow: "hidden" }}>

      {/* Structural background — not decorative, conveys institutional depth */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }} aria-hidden="true">
        {/* Base texture: subtle grid — used in WHO, NIH documentation */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .028 }}>
          <pattern id="inst-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="white" strokeWidth=".75"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#inst-grid)"/>
        </svg>
        {/* Right edge: subtle blue institutional accent block */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "42%", background: "rgba(26,92,138,.12)", borderLeft: "1px solid rgba(41,170,225,.08)" }} />
        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to top, rgba(13,27,62,1), transparent)` }} />
      </div>

      <div className="mv-container" style={{ position: "relative", zIndex: 1, width: "100%", padding: "clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 4vw, 3rem)" }}>
        <div className="mv-hero-grid">
          {/* Left: Institutional text */}
          <div>
            {/* Institutional classification badge */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: .1, duration: reduce ? .1 : .5 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: DS.s6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: DS.green }} />
              <span style={{ fontFamily: DS.fontMono, fontSize: "0.6875rem", fontWeight: 500, color: "rgba(255,255,255,.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Health Research &amp; Analytics Organization — Yemen
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2, duration: reduce ? .1 : .55, ease: DS.ease }}>
              {/* Institutional divider — vertical line before H1 */}
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ width: 3, height: 76, background: `linear-gradient(to bottom, ${DS.cyan}, ${DS.green})`, flexShrink: 0, borderRadius: 2, marginTop: 4 }} aria-hidden="true" />
                <H1 id="hero-heading">
                  Evidence-based research for
                  <span style={{ display: "block", color: DS.cyan, fontStyle: "italic", fontWeight: 300 }}>
                    equitable health systems
                  </span>
                </H1>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .35, duration: reduce ? .1 : .5, ease: DS.ease }}
              style={{ marginTop: DS.s6 }}>
              <Lead>
                MedVeritas is a Yemen-based health research and analytics organization generating high-quality evidence to strengthen health systems, inform policy, and improve health outcomes for vulnerable populations.
              </Lead>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: .5, duration: reduce ? .1 : .45 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: DS.s7 }}>
              <InstitutionalBtn href="#research" variant="primary">
                Research Domains <ArrowRight />
              </InstitutionalBtn>
              <InstitutionalBtn href="#publications" variant="secondary">
                View Publications <DocumentIcon size={15} />
              </InstitutionalBtn>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: .65, duration: .5 }}
              style={{ marginTop: DS.s8, paddingTop: DS.s6, borderTop: "1px solid rgba(255,255,255,.1)" }}>
              <span style={{ fontFamily: DS.fontMono, fontSize: "0.6875rem", color: "rgba(255,255,255,.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Commissioned by
              </span>
              <div style={{ display: "flex", gap: 24, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
                {["WHO", "UNICEF", "USAID", "World Bank", "Gavi"].map((p) => (
                  <span key={p} style={{ fontFamily: DS.font, fontWeight: 600, fontSize: "0.8125rem", color: "rgba(255,255,255,.4)", letterSpacing: "0.04em" }}>
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Institutional KPI panel */}
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .4, duration: reduce ? .1 : .6, ease: DS.ease }}
            style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Panel header */}
            <div style={{ padding: "14px 20px", background: "rgba(26,92,138,.4)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
              <span style={{ fontFamily: DS.fontMono, fontSize: "0.6875rem", color: "rgba(255,255,255,.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Institutional Impact — 2024
              </span>
            </div>
            {/* KPI rows */}
            {METRICS.map((m, i) => (
              <div key={m.label} style={{ padding: "18px 20px", background: i % 2 === 0 ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.02)", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: DS.fontMono, fontSize: "1.75rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {m.value}
                  </div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: "rgba(255,255,255,.65)", marginTop: 4 }}>{m.label}</div>
                  <div style={{ fontFamily: DS.fontMono, fontSize: "0.6875rem", color: "rgba(255,255,255,.3)", marginTop: 2 }}>{m.sub}</div>
                </div>
                <div style={{ width: 32, height: 32, borderRadius: DS.r4, background: "rgba(41,170,225,.12)", border: "1px solid rgba(41,170,225,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: i < 2 ? DS.cyan : DS.green }} />
                </div>
              </div>
            ))}
            {/* Panel footer */}
            <div style={{ padding: "12px 20px", background: "rgba(26,92,138,.25)" }}>
              <a href="#projects" className="ui-link" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8125rem", fontWeight: 500, color: DS.cyan }}>
                View full project portfolio <ArrowRight size={12} color={DS.cyan} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom boundary — clean break to white */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(41,170,225,.15)", zIndex: 2 }} aria-hidden="true" />
    </section>
  );
});
Hero.displayName = "Hero";

/* ═══════════════════════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════════════════════ */
const About: FC = memo(() => (
  <section id="about" className="mv-section" aria-labelledby="about-heading">
    <div className="mv-container">
      <div className="mv-col-2" style={{ gap: "clamp(2.5rem, 6vw, 6rem)" }}>
        <Reveal>
          <Overline style={{ marginBottom: DS.s3 }}>About the Institution</Overline>
          <div style={{ width: 32, height: 2, background: DS.blue, marginBottom: DS.s6 }} />
          <H2 id="about-heading" style={{ marginBottom: DS.s5 }}>
            Advancing health knowledge through scientific rigor
          </H2>
          <Body style={{ marginBottom: DS.s5 }}>
            MedVeritas is a specialized health research and analytics organization based in Sana'a, Yemen.
            Founded to address the critical gap in locally generated, high-quality health evidence, we work
            at the intersection of research, policy, and practice to strengthen health systems and improve
            outcomes for vulnerable populations.
          </Body>
          <Body style={{ marginBottom: DS.s6 }}>
            Our multidisciplinary team of epidemiologists, health economists, data scientists, and public
            health specialists employs internationally recognized methodologies adapted to complex,
            resource-constrained environments.
          </Body>
          <InstitutionalBtn href="#research" variant="outline">
            Explore Our Research <ArrowRight />
          </InstitutionalBtn>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: DS.s4 }}>
          {[
            {
              title: "Mission",
              text: "To generate and translate rigorous health evidence into actionable knowledge that strengthens health systems and improves population health in Yemen and fragile-state contexts."
            },
            {
              title: "Vision",
              text: "A Yemen where health policy and programs are driven by robust, locally-generated scientific evidence, and where health systems are equitable, resilient, and responsive."
            },
            {
              title: "Core Values",
              text: "Scientific integrity · Evidence-based practice · Ethical conduct · Local ownership · Transparency and accountability · Institutional partnership"
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div style={{ padding: "20px 24px", border: `1px solid ${DS.rule}`, borderRadius: DS.r4, background: DS.surface }}>
                <div style={{ display: "flex", alignItems: "center", gap: DS.s3, marginBottom: DS.s3 }}>
                  <div style={{ width: 3, height: 16, background: DS.blue, borderRadius: 2 }} />
                  <span style={{ fontFamily: DS.font, fontWeight: 600, fontSize: "0.875rem", color: DS.ink, letterSpacing: "0.01em" }}>
                    {item.title}
                  </span>
                </div>
                <p style={{ fontSize: "0.875rem", color: DS.inkMid, lineHeight: 1.7 }}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
));
About.displayName = "About";

/* ═══════════════════════════════════════════════════════════
   RESEARCH DOMAINS
═══════════════════════════════════════════════════════════ */
const ResearchDomains: FC = memo(() => (
  <section id="research" className="mv-section" aria-labelledby="research-heading"
    style={{ background: DS.surface, borderTop: `1px solid ${DS.rule}`, borderBottom: `1px solid ${DS.rule}` }}>
    <div className="mv-container">
      <div style={{ marginBottom: DS.s8 }}>
        <SectionHeader
          overline="Research Portfolio"
          title="Research Domains"
          body="Our research is organized across six interconnected domains, each reflecting a critical dimension of health system performance and population health in fragile and conflict-affected states."
        />
      </div>

      <div className="mv-col-3" style={{ gap: 1, border: `1px solid ${DS.rule}`, borderRadius: DS.r4, overflow: "hidden" }}>
        {RESEARCH_DOMAINS.map((domain, i) => (
          <Reveal key={domain.code} delay={i * 0.06}>
            <div
              className="mv-card"
              style={{ padding: "28px 24px", height: "100%", borderRadius: 0, border: "none", borderRight: `1px solid ${DS.rule}`, borderBottom: `1px solid ${DS.rule}`, background: "#fff" }}>
              {/* Domain code */}
              <div style={{ fontFamily: DS.fontMono, fontSize: "0.6875rem", color: DS.inkLight, letterSpacing: "0.1em", marginBottom: DS.s4 }}>
                {domain.code}
              </div>
              {/* Icon */}
              <div style={{ width: 44, height: 44, borderRadius: DS.r4, background: DS.blueLight, border: `1px solid rgba(26,92,138,.15)`, display: "flex", alignItems: "center", justifyContent: "center", color: DS.blue, marginBottom: DS.s5 }}>
                <domain.Icon size={20} />
              </div>
              <H3 style={{ marginBottom: DS.s3 }}>{domain.title}</H3>
              <p style={{ fontSize: "0.875rem", color: DS.inkMid, lineHeight: 1.72, marginBottom: DS.s5 }}>{domain.desc}</p>
              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {domain.tags.map((t) => (
                  <span key={t} className="mv-tag">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
));
ResearchDomains.displayName = "ResearchDomains";

/* ═══════════════════════════════════════════════════════════
   PROJECTS / PROGRAMS
═══════════════════════════════════════════════════════════ */
const Projects: FC = memo(() => {
  const [selected, setSelected] = useState<string>("all");
  const domains = ["all", ...Array.from(new Set(PROJECTS.map((p) => p.domain)))];

  const filtered = useMemo(
    () => selected === "all" ? PROJECTS : PROJECTS.filter((p) => p.domain === selected),
    [selected]
  );

  return (
    <section id="projects" className="mv-section" aria-labelledby="projects-heading">
      <div className="mv-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: DS.s7, flexWrap: "wrap" }}>
          <SectionHeader overline="Programs & Projects" title="Active Research Portfolio" />
          <Reveal>
            <a href="#" className="ui-link" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.875rem", fontWeight: 500, color: DS.blue, textDecoration: "none" }}>
              Full project registry <ArrowUpRight size={13} />
            </a>
          </Reveal>
        </div>

        {/* Filter — domain tabs, institutional style */}
        <Reveal>
          <div role="tablist" aria-label="Filter by domain" style={{ display: "flex", gap: 2, marginBottom: DS.s6, overflowX: "auto", paddingBottom: 2 }}>
            {domains.map((d) => (
              <button key={d} role="tab" aria-selected={selected === d}
                onClick={() => setSelected(d)}
                style={{ padding: "7px 14px", borderRadius: DS.r4, fontSize: "0.8125rem", fontWeight: selected === d ? 500 : 400, border: `1px solid ${selected === d ? DS.blue : DS.rule}`, background: selected === d ? DS.blueLight : "transparent", color: selected === d ? DS.blue : DS.inkLight, cursor: "pointer", transition: DS.t_fast, whiteSpace: "nowrap" }}>
                {d === "all" ? "All Programs" : d}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Projects list — structured table style */}
        <div style={{ border: `1px solid ${DS.rule}`, borderRadius: DS.r4, overflow: "hidden" }}>
          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 180px 100px", gap: 0, background: DS.surfaceAlt, borderBottom: `1px solid ${DS.rule}`, padding: "10px 24px" }}>
            {["Project ID", "Title & Description", "Funder / Period", "Status"].map((h) => (
              <span key={h} style={{ fontFamily: DS.fontMono, fontSize: "0.6875rem", fontWeight: 500, color: DS.inkLight, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div key={project.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                style={{ display: "grid", gridTemplateColumns: "110px 1fr 180px 100px", gap: 0, padding: "20px 24px", borderBottom: i < filtered.length - 1 ? `1px solid ${DS.ruleFaint}` : "none", background: "#fff", alignItems: "start", transition: "background 0.15s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = DS.surface; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#fff"; }}>
                {/* ID */}
                <div style={{ fontFamily: DS.fontMono, fontSize: "0.75rem", color: DS.inkLight, paddingTop: 2 }}>{project.id}</div>
                {/* Title + desc */}
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: DS.ink, marginBottom: 6 }}>{project.title}</div>
                  <p style={{ fontSize: "0.8125rem", color: DS.inkMid, lineHeight: 1.65, maxWidth: "56ch" }}>{project.desc}</p>
                  <div style={{ marginTop: 10 }}>
                    <span className="mv-tag" style={{ marginRight: 6 }}>{project.scope}</span>
                    <span className="mv-tag">{project.domain}</span>
                  </div>
                </div>
                {/* Funder */}
                <div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: DS.inkMid }}>{project.funder}</div>
                  <div style={{ fontFamily: DS.fontMono, fontSize: "0.75rem", color: DS.inkLight, marginTop: 4 }}>{project.period}</div>
                </div>
                {/* Status badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: project.statusColor, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: project.statusColor }}>{project.status}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Reveal>
          <div style={{ marginTop: DS.s5, display: "flex", justifyContent: "flex-end" }}>
            <a href="#" className="ui-link" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8125rem", color: DS.blue }}>
              Request full project profiles <ArrowRight size={13} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
});
Projects.displayName = "Projects";

/* ═══════════════════════════════════════════════════════════
   PUBLICATIONS
═══════════════════════════════════════════════════════════ */
const Publications: FC = memo(() => (
  <section id="publications" className="mv-section" aria-labelledby="publications-heading"
    style={{ background: DS.surface, borderTop: `1px solid ${DS.rule}`, borderBottom: `1px solid ${DS.rule}` }}>
    <div className="mv-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: DS.s7, flexWrap: "wrap" }}>
        <SectionHeader
          overline="Research Output"
          title="Publications & Reports"
          body="Selected publications, technical reports, and policy briefs produced by MedVeritas researchers."
        />
        {/* Search field — institutional style */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: DS.s3, padding: "9px 14px", border: `1px solid ${DS.rule}`, borderRadius: DS.r4, background: "#fff", minWidth: 240 }}>
            <SearchIcon size={15} color={DS.inkLight} />
            <input type="search" placeholder="Search publications…" aria-label="Search publications"
              style={{ border: "none", outline: "none", fontSize: "0.875rem", color: DS.ink, background: "transparent", width: "100%", fontFamily: DS.font }} />
          </div>
        </Reveal>
      </div>

      <div style={{ border: `1px solid ${DS.rule}`, borderRadius: DS.r4, overflow: "hidden" }}>
        {PUBLICATIONS.map((pub, i) => (
          <Reveal key={pub.title} delay={i * 0.07}>
            <div style={{ padding: "22px 28px", borderBottom: i < PUBLICATIONS.length - 1 ? `1px solid ${DS.ruleFaint}` : "none", background: "#fff", display: "flex", gap: 24, alignItems: "flex-start", transition: "background 0.15s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = DS.surface; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#fff"; }}>
              {/* Type label */}
              <div style={{ flexShrink: 0, width: 120 }}>
                <span className="mv-tag" style={{ fontSize: "0.6rem", marginBottom: 6, display: "block" }}>{pub.type}</span>
                <span style={{ fontFamily: DS.fontMono, fontSize: "0.75rem", color: DS.inkLight }}>{pub.year}</span>
              </div>
              {/* Content */}
              <div style={{ flex: 1 }}>
                <a href="#" style={{ fontWeight: 600, fontSize: "0.9375rem", color: DS.ink, textDecoration: "none", lineHeight: 1.4, display: "block", marginBottom: 6 }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = DS.blue; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = DS.ink; }}>
                  {pub.title}
                </a>
                <p style={{ fontSize: "0.8125rem", color: DS.inkMid, marginBottom: 4 }}>{pub.authors}</p>
                <p style={{ fontFamily: DS.fontMono, fontSize: "0.75rem", color: DS.inkLight }}>
                  {pub.journal} · {pub.pages}
                  {pub.doi && <> · DOI: <a href={`https://doi.org/${pub.doi}`} style={{ color: DS.blue, fontSize: "0.75rem" }}>{pub.doi}</a></>}
                </p>
              </div>
              {/* Download */}
              <div style={{ flexShrink: 0 }}>
                <a href="#" className="ui-link" style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", border: `1px solid ${DS.rule}`, borderRadius: DS.r4, fontSize: "0.8125rem", fontWeight: 500, color: DS.inkMid, transition: DS.t_fast }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = DS.blue; (e.currentTarget as HTMLAnchorElement).style.color = DS.blue; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = DS.rule; (e.currentTarget as HTMLAnchorElement).style.color = DS.inkMid; }}>
                  <DocumentIcon size={14} /> Access
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div style={{ marginTop: DS.s5, display: "flex", justifyContent: "center" }}>
          <InstitutionalBtn href="#" variant="outline">
            Access Full Publication Library <ArrowRight />
          </InstitutionalBtn>
        </div>
      </Reveal>
    </div>
  </section>
));
Publications.displayName = "Publications";

/* ═══════════════════════════════════════════════════════════
   PARTNERS & COLLABORATIONS
═══════════════════════════════════════════════════════════ */
const Partners: FC = memo(() => (
  <section id="partners" className="mv-section" aria-labelledby="partners-heading">
    <div className="mv-container">
      <div style={{ marginBottom: DS.s8 }}>
        <SectionHeader
          overline="Institutional Partnerships"
          title="Partners & Collaborators"
          body="MedVeritas works in formal partnership with leading international organizations, UN agencies, bilateral donors, and academic institutions."
        />
      </div>

      <div className="mv-partners-grid" style={{ border: `1px solid ${DS.rule}`, borderRadius: DS.r4, overflow: "hidden" }}>
        {PARTNERS.map((partner, i) => (
          <Reveal key={partner.name} delay={i * 0.04}>
            <div style={{
              padding: "24px 20px",
              borderRight: `1px solid ${DS.rule}`,
              borderBottom: `1px solid ${DS.rule}`,
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              minHeight: 100,
              transition: DS.t_base,
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = DS.surface; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#fff"; }}>
              {/* Abbreviation mark — institutional placeholder for logo */}
              <div style={{ fontFamily: DS.fontMono, fontSize: "1.125rem", fontWeight: 700, color: typeColor[partner.type] ?? DS.ink, letterSpacing: "-0.02em", marginBottom: 6 }}>
                {partner.abbr}
              </div>
              <div style={{ fontSize: "0.6875rem", fontWeight: 400, color: DS.inkLight, lineHeight: 1.4, maxWidth: 100 }}>
                {partner.name}
              </div>
              <div style={{ marginTop: 8 }}>
                <span className="mv-tag" style={{ fontSize: "0.6rem", color: typeColor[partner.type] ?? DS.inkLight, borderColor: "transparent" }}>
                  {partner.type}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div style={{ marginTop: DS.s6, padding: "20px 28px", background: DS.blueLight, border: `1px solid rgba(26,92,138,.15)`, borderRadius: DS.r4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: DS.ink, marginBottom: 4 }}>Interested in a formal partnership?</div>
            <p style={{ fontSize: "0.875rem", color: DS.inkMid }}>We welcome collaboration proposals from research institutions, UN agencies, governments, and NGOs.</p>
          </div>
          <InstitutionalBtn href="#contact" variant="outline">Partnership Inquiry <ArrowRight /></InstitutionalBtn>
        </div>
      </Reveal>
    </div>
  </section>
));
Partners.displayName = "Partners";

/* ═══════════════════════════════════════════════════════════
   CONTACT / COLLABORATION
═══════════════════════════════════════════════════════════ */
const Contact: FC = memo(() => {
  const [form, setForm] = useState({ name: "", org: "", email: "", type: "research", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback(() => {
    if (form.name && form.email && form.message) setSent(true);
  }, [form]);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: `1px solid ${DS.rule}`,
    borderRadius: DS.r4,
    fontSize: "0.875rem",
    fontFamily: DS.font,
    color: DS.ink,
    background: "#fff",
    outline: "none",
    transition: DS.t_fast,
  };

  return (
    <section id="contact" className="mv-section" aria-labelledby="contact-heading"
      style={{ background: DS.navy, borderTop: `1px solid rgba(41,170,225,.12)` }}>
      <div className="mv-container">
        <div className="mv-col-2" style={{ gap: "clamp(2.5rem, 6vw, 5rem)" }}>
          {/* Left: Contact info */}
          <Reveal>
            <Overline style={{ color: DS.cyan, marginBottom: DS.s3 }}>Institutional Contact</Overline>
            <div style={{ width: 32, height: 2, background: DS.cyan, marginBottom: DS.s6 }} />
            <H2 id="contact-heading" style={{ color: "#fff", marginBottom: DS.s5 }}>
              Research Collaboration & Institutional Inquiries
            </H2>
            <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,.6)", lineHeight: 1.75, marginBottom: DS.s7 }}>
              We welcome inquiries from governments, UN agencies, research institutions, and implementing partners. Our team will respond within 2 business days.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: DS.s4 }}>
              {[
                { Icon: MailIcon,  val: "research@medveritasye.com", label: "Research Inquiries" },
                { Icon: PhoneIcon, val: "+967 711 123 456",          label: "Office (Sana'a)"    },
                { Icon: PinIcon,   val: "Sana'a, Republic of Yemen", label: "Headquarters"       },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: DS.r4, background: "rgba(41,170,225,.1)", border: "1px solid rgba(41,170,225,.18)", display: "flex", alignItems: "center", justifyContent: "center", color: DS.cyan, flexShrink: 0 }}>
                    <c.Icon size={15} />
                  </div>
                  <div>
                    <div style={{ fontFamily: DS.fontMono, fontSize: "0.6875rem", color: "rgba(255,255,255,.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>{c.label}</div>
                    <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,.75)" }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social — minimal, institutional */}
            <div style={{ marginTop: DS.s7, paddingTop: DS.s6, borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", gap: DS.s3 }}>
              {[
                { Icon: LinkedInIcon,   label: "LinkedIn"    },
                { Icon: TwitterXIcon,   label: "X / Twitter" },
                { Icon: ResearchGateIcon, label: "ResearchGate" },
              ].map(({ Icon: SocialIcon, label }) => (
                <a key={label} href="#" className="ui-link" aria-label={label}
                  style={{ width: 36, height: 36, borderRadius: DS.r4, border: "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.45)", transition: DS.t_base }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,.3)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.45)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,.12)"; }}>
                  <SocialIcon size={14} />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Right: Collaboration form */}
          <Reveal delay={0.12}>
            <div style={{ background: "#fff", borderRadius: DS.r4, border: `1px solid ${DS.rule}`, overflow: "hidden" }}>
              {/* Form header */}
              <div style={{ padding: "16px 24px", background: DS.surface, borderBottom: `1px solid ${DS.rule}` }}>
                <span style={{ fontFamily: DS.fontMono, fontSize: "0.6875rem", color: DS.inkLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Collaboration / Research Inquiry Form
                </span>
              </div>

              {sent ? (
                <div style={{ padding: "40px 28px", textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: DS.greenLight, border: `1px solid ${DS.green}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: DS.green }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m20 6-11 11-5-5"/></svg>
                  </div>
                  <H3 style={{ marginBottom: DS.s3, color: DS.ink }}>Inquiry Received</H3>
                  <p style={{ fontSize: "0.875rem", color: DS.inkMid, lineHeight: 1.7 }}>
                    Thank you for your inquiry. Our research team will review your message and respond within 2 business days.
                  </p>
                </div>
              ) : (
                <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: DS.s4 }}>
                  <div className="mv-col-2" style={{ gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: DS.inkMid, marginBottom: 6 }}>Full Name *</label>
                      <input type="text" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="Dr. / Mr. / Ms."
                        onFocus={(e) => { e.currentTarget.style.borderColor = DS.blue; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = DS.rule; }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: DS.inkMid, marginBottom: 6 }}>Organization</label>
                      <input type="text" value={form.org} onChange={(e) => setForm(f => ({ ...f, org: e.target.value }))} style={inputStyle} placeholder="Institution / Agency"
                        onFocus={(e) => { e.currentTarget.style.borderColor = DS.blue; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = DS.rule; }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: DS.inkMid, marginBottom: 6 }}>Email Address *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} placeholder="institutional.email@org.int"
                      onFocus={(e) => { e.currentTarget.style.borderColor = DS.blue; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = DS.rule; }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: DS.inkMid, marginBottom: 6 }}>Inquiry Type</label>
                    <select value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}
                      style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="research">Research Collaboration</option>
                      <option value="data">Data / Analytics Services</option>
                      <option value="training">Training & Capacity Building</option>
                      <option value="publication">Publication / Report Access</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: DS.inkMid, marginBottom: 6 }}>Message *</label>
                    <textarea rows={4} value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                      placeholder="Please describe your collaboration interest or inquiry…"
                      onFocus={(e) => { e.currentTarget.style.borderColor = DS.blue; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = DS.rule; }} />
                  </div>
                  <div style={{ paddingTop: DS.s3, borderTop: `1px solid ${DS.ruleFaint}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <p style={{ fontSize: "0.75rem", color: DS.inkLight }}>* Required fields. All inquiries are treated confidentially.</p>
                    <InstitutionalBtn onClick={handleSubmit} href="#" style={{ padding: "10px 24px" }}>
                      Submit Inquiry <ArrowRight />
                    </InstitutionalBtn>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
});
Contact.displayName = "Contact";

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
const Footer: FC = memo(() => (
  <footer role="contentinfo" style={{ background: DS.ink, borderTop: "1px solid rgba(255,255,255,.06)" }}>
    <div className="mv-container">
      {/* Main footer grid */}
      <div className="mv-footer-grid" style={{ paddingTop: DS.s9, paddingBottom: DS.s8, borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        {/* Brand */}
        <div>
          <a href="#" className="ui-link" aria-label="MedVeritas home">
            <Logo dark={false} size="md" />
          </a>
          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,.38)", lineHeight: 1.75, marginTop: DS.s5, maxWidth: 280 }}>
            A health research and analytics organization committed to generating evidence that strengthens health systems in fragile states.
          </p>
          <div style={{ marginTop: DS.s5, display: "flex", flexDirection: "column", gap: DS.s3 }}>
            <div style={{ fontFamily: DS.fontMono, fontSize: "0.6875rem", color: "rgba(255,255,255,.25)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              ISSN (forthcoming) · Registered in Yemen
            </div>
          </div>
        </div>

        {/* Research */}
        <div>
          <h4 style={{ fontFamily: DS.font, fontWeight: 600, fontSize: "0.8125rem", color: "rgba(255,255,255,.45)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: DS.s5 }}>Research</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: DS.s3 }}>
            {["Health Systems", "Data & Analytics", "Humanitarian Health", "Capacity Building", "Governance", "MEL"].map((l) => (
              <a key={l} href="#research" className="ui-link" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,.42)", transition: DS.t_fast }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.8)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.42)"; }}>
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Institution */}
        <div>
          <h4 style={{ fontFamily: DS.font, fontWeight: 600, fontSize: "0.8125rem", color: "rgba(255,255,255,.45)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: DS.s5 }}>Institution</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: DS.s3 }}>
            {["About MedVeritas", "Our Team", "Projects", "Partners", "Publications", "Careers"].map((l) => (
              <a key={l} href="#" className="ui-link" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,.42)", transition: DS.t_fast }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.8)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.42)"; }}>
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 style={{ fontFamily: DS.font, fontWeight: 600, fontSize: "0.8125rem", color: "rgba(255,255,255,.45)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: DS.s5 }}>Resources</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: DS.s3 }}>
            {["Publication Library", "Data Repository", "Tools & Frameworks", "Methodology Notes", "Newsletters", "Press Releases"].map((l) => (
              <a key={l} href="#" className="ui-link" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,.42)", transition: DS.t_fast }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.8)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.42)"; }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ padding: `${DS.s5} 0`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontFamily: DS.fontMono, fontSize: "0.75rem", color: "rgba(255,255,255,.2)" }}>
          © {new Date().getFullYear()} MedVeritas. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: DS.s5 }}>
          {["Privacy Policy", "Terms of Use", "Accessibility", "Sitemap"].map((l) => (
            <a key={l} href="#" className="ui-link" style={{ fontFamily: DS.fontMono, fontSize: "0.75rem", color: "rgba(255,255,255,.2)", transition: DS.t_fast }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.2)"; }}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
));
Footer.displayName = "Footer";

/* ═══════════════════════════════════════════════════════════
   SKIP TO CONTENT — accessibility
═══════════════════════════════════════════════════════════ */
const SkipLink: FC = () => (
  <a href="#main-content" className="ui-link" style={{
    position: "absolute", top: -60, left: 24, padding: "8px 16px",
    background: DS.blue, color: "#fff", borderRadius: DS.r4,
    fontSize: "0.875rem", fontWeight: 500, zIndex: 999, transition: "top 0.15s",
  }}
    onFocus={(e) => { e.currentTarget.style.top = "8px"; }}
    onBlur={(e) => { e.currentTarget.style.top = "-60px"; }}>
    Skip to main content
  </a>
);

/* ═══════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════ */
const MedVeritasInstitutional: FC = () => (
  <>
    <GlobalStyles />
    <SkipLink />
    <Navigation />
    <main id="main-content">
      <Hero />
      <About />
      <ResearchDomains />
      <Projects />
      <Publications />
      <Partners />
      <Contact />
    </main>
    <Footer />
  </>
);

export default MedVeritasInstitutional;
