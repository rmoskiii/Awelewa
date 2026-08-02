/**
 * ÀWÉLÉWÀ — Official Website v2
 * White background · Brown logo colour · Real campaign images
 *
 * ── FILE STRUCTURE ──────────────────────────────────────────────────────────
 *  public/
 *    images/
 *      awelewa.png     ← unnamed-1.png  (wordmark, white bg)
 *      ele.png         ← unnamed.png    (symbol mark, white bg)
 *      hero.jpg        ← IMG_0056.jpg   (golden hour full-figure)
 *      look.jpg        ← IMG_0035.jpg   (profile portrait, brown kimono)
 *      rack.jpg        ← IMG_0068.jpg   (garment rack, multiple colours)
 * ────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef, ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE PATHS — all in public/images/
// ─────────────────────────────────────────────────────────────────────────────
const IMG = {
    wordmark: "/images/awelewa.png",   // nav logo
    mark:     "/images/ele.png",       // symbol (footer + placeholders)
    hero:     "/images/hero.jpg",      // IMG_0056
    look:     "/images/look.jpg",      // IMG_0035 — profile portrait
    rack:     "/images/rack.jpg",      // IMG_0068 — garment rack
    beach:    "/images/lewaaa.JPG",
};

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  @font-face {
    font-family: 'Mansory';
    src: url('/fonts/Mansory Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Mansory';
    src: url('/fonts/Mansory Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
  }

  * {
    font-family: 'Mansory', sans-serif;
  }

:root {
    --white:        #FFFFFF;
    --brown:        #3D1A08;
    --brown-mid:    #604f43;
    --sand:         #D6B297;
    --terracotta:   #9B4A1F;
    --cream-tint:   #F7F0E6;
    --border:       rgba(61,26,8,.1);
    --pad-x:        clamp(20px, 5vw, 108px);
    --pad-y:        clamp(56px, 8vw, 120px);
    --ease:         cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --font-display: 'Mansory', sans-serif;
    --font-ui:      'Mansory', sans-serif;
}

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html  { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  body  { background: var(--white); color: var(--brown); font-weight: 400; overflow-x: hidden; }  img   { display: block; width: 100%; height: 100%; object-fit: cover; }
  a     { color: inherit; text-decoration: none; }
  button{ background: none; border: none; cursor: pointer; font-family: inherit; color: inherit; padding: 0; }
  ul,ol { list-style: none; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    height: 80px;
    transition: padding .4s var(--ease), background .4s var(--ease), box-shadow .4s var(--ease);
  }
  .nav--solid {
  height: 64px;
    background: rgba(255,255,255,.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 1px 0 var(--border);
  }
 .nav__logo img {
    height: 188px; width: auto;
    transition: opacity .2s ease;
}
.nav__logo img:hover { opacity: .7; }
  .nav__logo img:hover { opacity: .7; }
  .nav__links { display: flex; gap: 48px; }
  .nav__link {
    font-size: 10px; letter-spacing: .3em; text-transform: uppercase;
    opacity: .75; border-bottom: 1px solid transparent;
    padding-bottom: 2px;
    transition: opacity .2s ease, border-color .2s ease;
  }
  .nav__link:hover { opacity: 1; border-color: var(--brown); }
  .nav__burger { display: none; flex-direction: column; gap: 5px; padding: 4px; }
  .nav__burger span {
    display: block; width: 22px; height: 1.5px; background: var(--brown);
    transition: transform .3s ease, opacity .3s ease;
  }
  .nav__burger--open span:nth-child(1) { transform: rotate(45deg) translate(4.7px, 4.7px); }
  .nav__burger--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav__burger--open span:nth-child(3) { transform: rotate(-45deg) translate(4.7px, -4.7px); }

  /* ── MOBILE DRAWER ── */
  .drawer {
    position: fixed; inset: 0; z-index: 99;
    background: var(--white);
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 48px;
    opacity: 0; pointer-events: none; transition: opacity .3s ease;
  }
  .drawer--open { opacity: 1; pointer-events: all; }
  .drawer a {
    font-family: var(--font-display); font-size: 42px; font-weight: 400;
    letter-spacing: .06em; color: var(--brown);
  }

  /* ── HERO ── */
  .hero {
    position: relative; height: 55svh; min-height: 380px;
    display: flex; align-items: flex-end; overflow: hidden;
  }
  .hero__img { position: absolute; inset: 0; }
  .hero__img img { object-position: center 35%; }  .hero__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top,
      rgba(20,8,2,.75) 0%,
      rgba(20,8,2,.25) 45%,
      transparent 80%
    );
  }
  .hero__body {
    position: relative; z-index: 2;
    padding: 0 var(--pad-x) clamp(52px, 8vw, 120px);
  }
  .hero__eyebrow {
    font-size: 9px; letter-spacing: .46em; text-transform: uppercase;
    color: rgba(255,255,255,.85); margin-bottom: 20px;    font-weight: 500;
  }
  .hero__heading {
    font-family: var(--font-display);
    font-size: clamp(52px, 10vw, 80px); font-weight: 500; font-style: italic;
    line-height: .92; letter-spacing: -.02em; color: #fff;
    margin-bottom: 36px; max-width: 780px;
  }
  .hero__cta {
    display: inline-flex; align-items: center; gap: 14px;
    font-size: 10px; letter-spacing: .28em; text-transform: uppercase;
    color: rgba(255,255,255,.8);
    border-bottom: 1px solid rgba(255,255,255,.3); padding-bottom: 4px;
    transition: gap .25s ease, border-color .25s ease;
  }
  .hero__cta:hover { gap: 22px; border-color: rgba(255,255,255,.8); }
  .hero__scroll {
    position: absolute; right: var(--pad-x); bottom: clamp(32px,5vw,64px);
    z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 14px;
    font-size: 8px; letter-spacing: .3em; text-transform: uppercase; color: rgba(255,255,255,.35);
  }
  .hero__scroll-line {
    width: 1px; height: 56px; background: rgba(255,255,255,.25);
    animation: scrollPulse 2.6s var(--ease) infinite;
  }
  @keyframes scrollPulse {
    0%   { transform: scaleY(0); opacity:0; transform-origin: top; }
    45%  { transform: scaleY(1); opacity:1; transform-origin: top; }
    55%  { transform: scaleY(1); opacity:1; transform-origin: bottom; }
    100% { transform: scaleY(0); opacity:0; transform-origin: bottom; }
  }

  /* ── MARQUEE ── */
  .marquee { overflow: hidden; background: var(--brown); padding: 14px 0; }
  .marquee__track {
    display: flex; white-space: nowrap;
    animation: marquee 30s linear infinite;
  }
  .marquee__seg {
    flex-shrink: 0; padding-right: 80px;
    font-size: 9px; letter-spacing: .42em; text-transform: uppercase;
    color: rgba(255,255,255,.5);
    font-weight: 500;
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ── SHARED PRIMITIVES ── */
  .section { padding: var(--pad-y) var(--pad-x); }
  .eyebrow {
    font-size: 9px; letter-spacing: .42em; text-transform: uppercase;
    opacity: .7; display: flex; align-items: center; gap: 16px;    
    margin-bottom: clamp(32px, 4.5vw, 56px);
    font-weight: 500;
  }
  .eyebrow::after { content:''; display:block; width:36px; height:1px; background:currentColor; }
  .heading {
    font-family: var(--font-display);
    font-size: clamp(36px, 5.5vw, 76px); font-weight: 500;
    line-height: 1.04; letter-spacing: -.01em; color: var(--brown);
  }
  .heading em { font-style: italic; font-weight: 400; }
  .rule { width: 36px; height: 2px; background: var(--terracotta); }

  /* ── STATEMENT ── */
  .statement {
    text-align: center;
    padding: clamp(88px,13vw,160px) clamp(24px,10vw,220px);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .statement__quote {
    font-family: var(--font-display);
    font-size: clamp(30px, 5vw, 64px); font-style: italic; font-weight: 500;    line-height: 1.28; color: var(--brown); max-width: 840px; margin: 0 auto 40px;
  }
  .statement__rule { margin: 0 auto 40px; }
  .statement__attrs { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px 48px; }
  .statement__attr { font-size: 10px; letter-spacing: .38em; text-transform: uppercase; opacity: .65; font-weight: 500; }
  /* ── EDITORIAL SPLIT ── */
  .editorial {
    display: grid; grid-template-columns: 1.1fr 1fr;
    min-height: 88vh;
  }
  .editorial__img {
    position: relative; overflow: hidden;
    min-height: clamp(420px, 60vw, 820px);
  }
  .editorial__img img { object-position: center 20%; }
  .editorial__body {
    display: flex; flex-direction: column; justify-content: center;
    padding: clamp(56px, 8vw, 120px) clamp(40px, 5.5vw, 96px);
    border-left: 1px solid var(--border);
  }
  .editorial__body .heading { margin-bottom: 32px; }
  .editorial__body p {
    font-size: clamp(15px, 1.5vw, 18px); line-height: 1.9;
    opacity: .88; max-width: 440px; font-weight: 500;
  }
  .editorial__body p + p { margin-top: 18px; }
  .editorial__link {
    margin-top: 40px;
    display: inline-flex; align-items: center; gap: 12px;
    font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
    border-bottom: 1px solid var(--brown); padding-bottom: 3px; opacity: .65;
    transition: opacity .2s ease, gap .2s ease;
    width: fit-content;
  }
  .editorial__link:hover { opacity: 1; gap: 18px; }

  /* ── RACK FULLWIDTH ── */
  .rack {
    position: relative; height: clamp(360px, 55vw, 680px); overflow: hidden;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .rack img { object-position: center 35%; }
  .rack__caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: clamp(28px,4vw,52px) var(--pad-x);
    background: linear-gradient(to top, rgba(20,8,2,.68) 0%, transparent 100%);
    display: flex; align-items: flex-end; justify-content: space-between; gap: 24px;
    flex-wrap: wrap;
  }
  .rack__caption-title {
    font-family: var(--font-display);
    font-size: clamp(22px,3.5vw,42px); font-weight: 500; color: #fff;
    letter-spacing: .02em;
  }
  .rack__caption-sub {
    font-size: 9px; letter-spacing: .38em; text-transform: uppercase;
    color: rgba(255,255,255,.75); text-align: right; font-weight: 500;  }

  /* ── COLLECTIONS ── */
  .collections__grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: clamp(8px, 1.5vw, 18px);
    margin-top: clamp(40px, 5vw, 64px);
  }
  .card__frame {
    position: relative; aspect-ratio: 2/3; overflow: hidden;
    background: var(--cream-tint);
  }
  .card__frame img { transition: transform 1.6s var(--ease); }
  .card:hover .card__frame img { transform: scale(1.06); }
  .card__meta { padding: 18px 0 8px; }
  .card__vol { font-size: 10px; letter-spacing: .32em; text-transform: uppercase; opacity: .65; margin-bottom: 6px; font-weight: 500; }  .card__title {
    font-family: var(--font-display);
    font-size: clamp(18px,2vw,24px); font-weight: 500; color: var(--brown);
  }
  /* placeholder gradient fallbacks */
  .card:nth-child(1) .card__ph { background: linear-gradient(155deg,#e4cdb4,#b87a42,#7a3a12); }
  .card:nth-child(2) .card__ph { background: linear-gradient(155deg,#c8bdb0,#8e7060,#4a2010); }
  .card:nth-child(3) .card__ph { background: linear-gradient(155deg,#d8cbc0,#c4a582,#9B4A1F); }
  .card__ph {
    position: absolute; inset:0;
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;
  }
  .card__ph-mark { opacity:.18; }
  .card__ph-badge {
    font-size:8px; letter-spacing:.4em; text-transform:uppercase;
    color:rgba(255,255,255,.65); border:1px solid rgba(255,255,255,.22);
    padding:6px 16px;
  }

  /* ── CRAFT DARK QUOTE ── */
  .craft {
    background: var(--brown);
    padding: clamp(44px,6vw,72px) clamp(20px,8vw,120px);    text-align: center;
  }
  .craft__mark { margin: 0 auto 44px; opacity: .2; }
  .craft__quote {
    font-family: var(--font-display);
    font-size: clamp(24px,4vw,50px); font-style:italic; font-weight:500;    line-height: 1.5; color: var(--cream-tint); max-width: 820px; margin: 0 auto;
  }
  .craft__attr {
    margin-top: 36px; font-size: 9px; letter-spacing: .38em; text-transform: uppercase;
    color: var(--sand); opacity: .45;
    font-weight: 500;
  }

  /* ── CAMPAIGN PANELS ── */
  .campaign__panels { display: grid; grid-template-columns: 1fr 1fr; }
  .campaign__panel {
    position: relative; overflow:hidden;
    min-height: clamp(280px, 40vw, 560px);
    display:flex; align-items:center; justify-content:center;
  }
  .campaign__panel:nth-child(1) { background: linear-gradient(140deg,#c4a582,#9B4A1F,#4B2511); }
  .campaign__panel:nth-child(2) { background: linear-gradient(140deg,#f0e8df,#D6B297,#b08060); }
  .campaign__panel img { position:absolute; inset:0; z-index:0; }
  .campaign__panel img:nth-child(1) { object-position: center 15%; }
  .campaign__overlay { position:absolute; inset:0; z-index:1; background:rgba(15,5,0,.3); }
  .campaign__body { position:relative; z-index:2; text-align:center; padding:48px; }
  .campaign__label {
    display:block; font-size:9px; letter-spacing:.46em; text-transform:uppercase;
    color:rgba(255,255,255,.85); margin-bottom:14px; font-weight: 500;  }
  .campaign__title {
    font-family:var(--font-display);
    font-size:clamp(26px,4vw,52px); font-weight:500; line-height:1.08;
    color:#fff; letter-spacing:.02em;
  }
  /* Second panel — light */
  .campaign__panel:nth-child(2) .campaign__overlay { background: rgba(15,5,0,.12); }

  /* ── EMAIL STRIP ── */
  .email-strip {
    padding: clamp(40px,6vw,72px) var(--pad-x);
    display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap;
    border-top: 1px solid var(--border);
  }
  .email-strip__headline {
    font-family:var(--font-display);
    font-size:clamp(22px,3vw,38px); font-style:italic; color:var(--brown); max-width:400px;
  }
  .email-strip__form { display:flex; }
  .email-strip__input {
    padding:14px 20px; width:clamp(200px,20vw,280px);
    border:1px solid rgba(61,26,8,.25); border-right:none;
    background:transparent; outline:none;
    font-family:var(--font-ui); font-size:11px; letter-spacing:.06em; color:var(--brown);
    transition:border-color .2s ease;
  }
  .email-strip__input::placeholder { color:rgba(61,26,8,.3); }
  .email-strip__input:focus { border-color:rgba(61,26,8,.6); }
  .email-strip__btn {
    padding:14px 28px;
    background:var(--brown); color:#fff;
    border:1px solid var(--brown);
    font-family:var(--font-ui); font-size:9px; letter-spacing:.3em; text-transform:uppercase;
    transition:background .22s ease, color .22s ease; white-space:nowrap;
  }
  .email-strip__btn:hover { background:transparent; color:var(--brown); }
  .email-strip__success {
    font-size:10px; letter-spacing:.22em; text-transform:uppercase; opacity:.55; padding:14px 0;
  }

  /* ── FOOTER ── */
  .footer {
    background: var(--brown);
    padding: clamp(72px,10vw,120px) var(--pad-x) clamp(36px,4vw,56px);
  }
  .footer__top {
    display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:48px;
    padding-bottom: clamp(48px,6vw,72px);
    border-bottom: 1px solid rgba(255,255,255,.08);
  }
  .footer__brand { display:flex; flex-direction:column; gap:20px; }
  .footer__mark img {
    height:48px; width:auto; filter:brightness(0) invert(1); opacity:.75;
  }
  .footer__name {
    font-family:var(--font-display); font-size:28px; font-weight:500;
    letter-spacing:.18em; color:#fff;
  }
  .footer__sub {
    font-size:9px; letter-spacing:.22em; text-transform:uppercase;
    color:rgba(255,255,255,.6); line-height:2; max-width:260px; font-weight: 500;  }
    color:rgba(255,255,255,.4); transition:color .2s ease;
  .footer__links {
    display:grid; grid-template-columns:repeat(2,1fr); gap:16px 72px;
  }
  .footer__link {
    font-size:10px; letter-spacing:.2em; text-transform:uppercase;
    color:rgba(255,255,255,.4); transition:color .2s ease;
  }
  .footer__link:hover { color:rgba(255,255,255,.9); }
  .footer__bottom {
    display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;
    padding-top: clamp(28px,3.5vw,44px);
  }
  .footer__copy { font-size:9px; letter-spacing:.12em; color:rgba(255,255,255,.2); }
  .footer__heritage { font-size:9px; letter-spacing:.26em; text-transform:uppercase; color:rgba(214,178,151,.35); }

  /* ── FADE REVEAL ── */
  .fade { opacity:0; transform:translateY(28px); transition:opacity .9s var(--ease), transform .9s var(--ease); }
  .fade--d1 { transition-delay:.1s; }
  .fade--d2 { transition-delay:.22s; }
  .fade--d3 { transition-delay:.36s; }
  .fade--in { opacity:1; transform:translateY(0); }

  /* ── RESPONSIVE ── */
  @media(max-width:1024px) {
    .editorial { grid-template-columns:1fr; }
    .editorial__img { min-height:60vw; }
    .editorial__body { border-left:none; border-top:1px solid var(--border); }
    .collections__grid { grid-template-columns:repeat(2,1fr); }
  }
  @media(max-width:680px) {
    .nav__links { display:none; }
    .nav__burger { display:flex; }
    .collections__grid { grid-template-columns:1fr; }
    .campaign__panels { grid-template-columns:1fr; }
    .footer__links { grid-template-columns:1fr; }
    .email-strip { flex-direction:column; align-items:flex-start; }
    .email-strip__input { width:100%; }
    .hero__heading { font-size: clamp(32px, 8vw, 48px); }
    .hero__body { padding: 0 20px 36px; }
    .statement { padding: 52px 20px; }
    .craft { padding: 44px 24px; }
    .editorial { min-height: auto; }
    .editorial__body { padding: 40px 20px; }
    .rack__caption { flex-direction: column; gap: 8px; }
    .rack__caption-sub { text-align: left; }
    .footer__top { flex-direction: column; }
    .email-strip__form { width: 100%; }
    .email-strip__input { width: 100%; }
  }
  @media(prefers-reduced-motion:reduce) {
    .fade { transition:none; opacity:1; transform:none; }
    .marquee__track { animation:none; }
    .hero__scroll-line { animation:none; }
    .card__frame img { transition:none; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────
function useScrolled(t = 60) {
    const [s, setS] = useState(false);
    useEffect(() => {
        const fn = () => setS(window.scrollY > t);
        fn();
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, [t]);
    return s;
}

function useFadeIn(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: 0|1|2|3; className?: string }) {
    const { ref, visible } = useFadeIn();
    return (
        <div ref={ref} className={["fade", visible ? "fade--in" : "", delay ? `fade--d${delay}` : "", className].filter(Boolean).join(" ")}>
            {children}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// ELE MARK SVG — used as fallback if ele.png not yet in place
// ─────────────────────────────────────────────────────────────────────────────
function EleMark({ size = 52, color = "#3D1A08" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size * 0.875} viewBox="0 0 160 140" fill="none"
             stroke={color} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M80 7 L80 97" strokeWidth="7.5" />
            <line x1="63" y1="111" x2="97" y2="111" strokeWidth="5.5" />
            <line x1="53" y1="126" x2="107" y2="126" strokeWidth="5.5" />
            <path d="M74 36 L32 59 L74 82" strokeWidth="6.5" />
            <line x1="34" y1="49" x2="68" y2="49" strokeWidth="5" />
            <line x1="31" y1="60" x2="68" y2="60" strokeWidth="5" />
            <line x1="36" y1="71" x2="68" y2="71" strokeWidth="5" />
            <circle cx="40" cy="101" r="5.8" fill={color} stroke="none" />
            <path d="M86 36 L128 59 L86 82" strokeWidth="6.5" />
            <line x1="126" y1="49" x2="92" y2="49" strokeWidth="5" />
            <line x1="129" y1="60" x2="92" y2="60" strokeWidth="5" />
            <line x1="124" y1="71" x2="92" y2="71" strokeWidth="5" />
            <circle cx="120" cy="101" r="5.8" fill={color} stroke="none" />
        </svg>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────
function Nav() {
    const scrolled = useScrolled();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const links = [
        { label: "Collections", href: "#collections" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <>
            <nav className={`nav${scrolled ? " nav--solid" : ""}`} aria-label="Main navigation">
                <a href="#" className="nav__logo" aria-label="Àwéléwà — home">
                    <img
                        src={IMG.wordmark}
                        alt="Àwéléwà"
                        style={scrolled
                            ? {mixBlendMode: "multiply"} as React.CSSProperties          // white bg disappears on white nav
                            : {filter: "brightness(0) invert(1)", opacity: 0.88}         // white logo on dark hero
                        }
                    /> </a>
                <ul className="nav__links" role="list">
                    {links.map(l => <li key={l.href}><a href={l.href} className="nav__link">{l.label}</a></li>)}
                </ul>
                <button
                    className={`nav__burger${open ? " nav__burger--open" : ""}`}
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    <span /><span /><span />
                </button>
            </nav>

            <nav className={`drawer${open ? " drawer--open" : ""}`} aria-label="Mobile navigation" role="dialog" aria-modal hidden={!open}>
                {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
            </nav>
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
    return (
        <section className="hero" aria-label="Àwéléwà — hero">
            <div className="hero__img">
                <img src={IMG.hero} alt="Àwéléwà campaign" />
            </div>
            <div className="hero__overlay" aria-hidden="true" />
            <div className="hero__body">
                <p className="hero__eyebrow">Àwéléwà · Est. 2026 · Lagos</p>
                <h1 className="hero__heading">
                    Garments that<br />honour the body.
                </h1>
                <a href="#collections" className="hero__cta">
                    Explore the Collection
                    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
                        <path d="M1 5H17M17 5L13 1M17 5L13 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>
            <div className="hero__scroll" aria-hidden="true">
                <span className="hero__scroll-line" />
                <span>Scroll</span>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────────────────────────────────────────
function Marquee() {
    const text = "STRUCTURED · CONSIDERED · PRECISE · EFFORTLESS · ELEVATED · SCULPTURAL · EARTHY · INTENTIONAL · TIMELESS   ";
    return (
        <div className="marquee" aria-hidden="true">
            <div className="marquee__track">
                <span className="marquee__seg">{text}</span>
                <span className="marquee__seg">{text}</span>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATEMENT
// ─────────────────────────────────────────────────────────────────────────────
function Statement() {
    return (
        <section className="statement" aria-labelledby="statement-q">
            <Reveal>
                <blockquote className="statement__quote" id="statement-q">
                    "Construction-led fashion<br />with proportional intelligence."
                </blockquote>
                <div className="rule statement__rule" role="presentation" />
                <ul className="statement__attrs" role="list">
                    {["Sculptural", "Earthy", "Editorial", "Minimal", "Intentional", "Timeless"].map(a => (
                        <li key={a} className="statement__attr">{a}</li>
                    ))}
                </ul>
            </Reveal>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// EDITORIAL SPLIT — large portrait + brand story
// ─────────────────────────────────────────────────────────────────────────────
function EditorialSplit() {
    const imgFade = useFadeIn(0.08);
    const txtFade = useFadeIn(0.08);
    return (
        <section id="about" className="editorial" aria-labelledby="about-heading">
            {/* Image — portrait */}
            <div ref={imgFade.ref} className={`editorial__img fade${imgFade.visible ? " fade--in" : ""}`}>
                <img src={IMG.look} alt="Àwéléwà — Foundation Forms look" />
            </div>
            {/* Text */}
            <div ref={txtFade.ref} className={`editorial__body fade fade--d2${txtFade.visible ? " fade--in" : ""}`}>
                <span className="eyebrow">Our Story</span>
                <h2 className="heading" id="about-heading">
                    Built for your body.<br /><em>Not for a mannequin.</em>
                </h2>
                <p>
                    Àwéléwà is a construction-led fashion and lifestyle brand rooted in African material
                    culture — specifically Yoruba heritage. Built by a systems-minded creative with a
                    background in mechanical engineering and garment construction.
                </p>
                <p>
                    We design and produce elevated, considered garments that honour the intelligence of
                    the body — closing the gap between how clothing looks and how it actually fits.
                    Every detail, from the pattern block to the finishing stitch, is deliberate.
                </p>
                <a href="#contact" className="editorial__link">
                    Get in touch
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
                        <path d="M1 4H13M13 4L10 1M13 4L10 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                    </svg>
                </a>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// RACK — full-width garment photo
// ─────────────────────────────────────────────────────────────────────────────
function RackFeature() {
    const { ref, visible } = useFadeIn(0.05);
    return (
        <div ref={ref} className={`rack fade${visible ? " fade--in" : ""}`} aria-label="Garment rack — Volume I">
            <img src={IMG.rack} alt="Àwéléwà garments on rack" />
            <div className="rack__caption">
                <p className="rack__caption-title">The Garments</p>
                <p className="rack__caption-sub">Volume I — Foundation Forms<br />Every piece, considered.</p>
            </div>
        </div>
    );
}
function LifestyleStrip() {
    const { ref, visible } = useFadeIn(0.05);
    return (
        <div ref={ref} className={`rack fade${visible ? " fade--in" : ""}`}
             aria-label="Àwéléwà in the wild" style={{ height: "clamp(350px, 55vw, 580px)" }}>
            <img src={IMG.beach} alt="Àwéléwà trousers on the beach" style={{ objectPosition: "left 85%" }} />
            <div className="rack__caption">
                <p className="rack__caption-title">Wear it anywhere.</p>
                <p className="rack__caption-sub">Built for movement.<br />Made to be lived in.</p>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTIONS
// ─────────────────────────────────────────────────────────────────────────────
const CARDS = [
    { id: "i",   vol: "Volume I",   title: "Foundation Forms",   img: IMG.look,  pos: "center 15%" },
    { id: "ii",  vol: "Volume II",  title: "Structured Ease",    img: IMG.rack,  pos: "center 30%" },
    { id: "iii", vol: "Volume III", title: "Proportional Study", img: IMG.hero,  pos: "center 20%" },
];

function Collections() {
    return (
        <section id="collections" className="section" aria-labelledby="coll-heading">
            <Reveal>
                <span className="eyebrow">Collections</span>
                <h2 className="heading" id="coll-heading">
                    Every piece,<br /><em>considered.</em>
                </h2>
            </Reveal>
            <div className="collections__grid">
                {CARDS.map((c, i) => (
                    <Reveal key={c.id} delay={(i + 1) as 1|2|3}>
                        <article className="card">
                            <div className="card__frame">
                                <img src={c.img} alt={`${c.title} — ${c.vol}`} loading="lazy"
                                     style={{ objectPosition: c.pos }} />
                            </div>
                            <div className="card__meta">
                                <p className="card__vol">{c.vol}</p>
                                <h3 className="card__title">{c.title}</h3>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// CRAFT QUOTE — dark section
// ─────────────────────────────────────────────────────────────────────────────
function CraftQuote() {
    return (
        <section className="craft" aria-label="Brand philosophy">
            <Reveal>
                <div className="craft__mark">
                    <EleMark size={48} color="#F7F0E6" />
                </div>
                <blockquote className="craft__quote">
                    "The brand celebrates natural materials and tactile surfaces. They bring
                    depth, honesty and connection to the Àwéléwà identity. Every material
                    choice — from the fabric to the packaging — is deliberate."
                </blockquote>
                <p className="craft__attr">Àwéléwà Brand Philosophy</p>
            </Reveal>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAMPAIGN + EMAIL
// ─────────────────────────────────────────────────────────────────────────────
function Campaign() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const submit = () => {
        if (!email.trim() || !email.includes("@")) { inputRef.current?.focus(); return; }
        setSent(true);
        console.log("Waitlist:", email); // TODO: wire to Klaviyo / Resend / Mailchimp
    };

    return (
        <section id="contact">
            {/* Panels */}
            <div className="campaign__panels">
                <div className="campaign__panel">
                    <img src={IMG.look} alt="Àwéléwà campaign" loading="lazy" />
                    <div className="campaign__overlay" aria-hidden="true" />
                    <div className="campaign__body">
                        <span className="campaign__label">Campaign 2026</span>
                        <h2 className="campaign__title">The First<br />Collection</h2>
                    </div>
                </div>
                <div className="campaign__panel">
                    <img src={IMG.hero} alt="Àwéléwà campaign" loading="lazy"
                         style={{ objectPosition: "center 10%" }} />
                    <div className="campaign__overlay" aria-hidden="true" />
                    <div className="campaign__body">
                        <span className="campaign__label">Volume I — Foundation Forms</span>
                        <h2 className="campaign__title">Fit is not<br />a luxury.</h2>
                    </div>
                </div>
            </div>

            {/* Email */}
            <div className="email-strip">
                <p className="email-strip__headline">Be first to know when we launch.</p>
                <div className="email-strip__form" role="form" aria-label="Waitlist">
                    {sent ? (
                        <p className="email-strip__success">You're on the list — we'll be in touch.</p>
                    ) : (
                        <>
                            <input
                                ref={inputRef} type="email" className="email-strip__input"
                                placeholder="Your email address" value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && submit()}
                                aria-label="Email" autoComplete="email"
                            />
                            <button className="email-strip__btn" onClick={submit}>Notify Me</button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
    const year = new Date().getFullYear();
    const links = [
        { label: "Collections", href: "#collections" },
        { label: "About",       href: "#about" },
        { label: "Instagram",   href: "https://instagram.com/awelewa", target: "_blank", rel: "noopener noreferrer" },
        { label: "Stockists",   href: "#" },
        { label: "Press",       href: "#" },
        { label: "Contact",     href: "#contact" },
    ];
    return (
        <footer className="footer" aria-label="Site footer">
            <div className="footer__top">
                <div className="footer__brand">
                    <div className="footer__mark">
                        <img src={IMG.mark} alt="Ele mark" />
                    </div>
                    <span className="footer__name">ÀWÉLÉWÀ</span>
                    <p className="footer__sub">
                        Construction-led fashion<br />
                        with proportional intelligence.<br />
                        Rooted in Yoruba heritage.
                    </p>
                </div>
                <nav aria-label="Footer navigation">
                    <ul className="footer__links" role="list">
                        {links.map(l => (
                            <li key={l.label}>
                                <a href={l.href} className="footer__link" target={l.target} rel={l.rel}>{l.label}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="footer__bottom">
                <p className="footer__copy">© {year} Àwéléwà. All rights reserved.</p>
                <p className="footer__heritage">Rooted in Yoruba Heritage</p>
            </div>
        </footer>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
    useEffect(() => {
        const id = "aw-styles";
        if (document.getElementById(id)) return;
        const el = document.createElement("style");
        el.id = id; el.textContent = CSS;
        document.head.prepend(el);
        return () => document.getElementById(id)?.remove();
    }, []);

    return (
        <>
            <a href="#collections" style={{ position:"absolute", left:"-9999px", width:"1px", height:"1px", overflow:"hidden" }}>
                Skip to main content
            </a>
            <Nav />
            <main>
                <Hero />
                <Marquee />
                <Statement />
                <EditorialSplit />
                <RackFeature />
                <Collections />
                <LifestyleStrip />
                <CraftQuote />
                <Campaign />
            </main>
            <Footer />
        </>
    );
}