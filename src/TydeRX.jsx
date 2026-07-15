import React, { useState, useEffect, useRef } from "react";

/**
 * TydeRX — homepage demo v2
 * Education-first copy. Written for someone who has heard of Ozempic
 * and has no idea what a GLP-1 actually is.
 */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

.tx {
  --ink:      #0C1A1F;
  --deep:     #103B45;
  --tide:     #1B7F8C;
  --shallow:  #C3DCD9;
  --chart:    #EDF0EE;
  --paper:    #F6F8F6;
  --signal:   #E8C255;
  --slate:    #5A6B70;
  --line:     rgba(12,26,31,0.10);

  --display: 'Instrument Sans', system-ui, sans-serif;
  --body:    'Inter Tight', system-ui, sans-serif;
  --mono:    'JetBrains Mono', ui-monospace, monospace;

  background: var(--chart);
  color: var(--ink);
  font-family: var(--body);
  font-size: 17px;
  line-height: 1.62;
  -webkit-font-smoothing: antialiased;
}
  body { margin:0;}
.tx *, .tx *::before, .tx *::after { box-sizing: border-box; }
.tx p, .tx h1, .tx h2, .tx h3, .tx h4, .tx ul, .tx li, .tx figure { margin: 0; padding: 0; }
.tx ul { list-style: none; }
.tx button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; }
.tx a { color: inherit; text-decoration: none; }
.tx :focus-visible { outline: 2px solid var(--signal); outline-offset: 3px; border-radius: 2px; }

.tx h1, .tx h2, .tx h3 { font-family: var(--display); font-weight: 600; letter-spacing: -0.03em; line-height: 0.99; }
.tx h1 { font-size: clamp(2.9rem, 6.2vw, 5.1rem); }
.tx h2 { font-size: clamp(2rem, 3.6vw, 3.05rem); }
.tx h3 { font-size: 1.3rem; letter-spacing: -0.02em; line-height: 1.16; }
.tx .eyebrow { font-family: var(--mono); font-size: 0.68rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.16em; color: var(--tide); }
.tx .mono { font-family: var(--mono); font-variant-numeric: tabular-nums; }
.tx .lede { font-size: 1.15rem; color: var(--slate); max-width: 54ch; }
.tx .sub  { color: var(--slate); }
.tx .fine { font-size: 0.82rem; line-height: 1.55; color: var(--slate); }

.tx .wrap { max-width: 1180px; margin: 0 auto; padding: 0 28px; }
.tx section { padding: clamp(72px, 9vw, 124px) 0; }
.tx .bg-chart { background: var(--chart); }
.tx .bg-paper { background: var(--paper); }
.tx .bg-deep  { background: var(--deep); color: var(--paper); }
.tx .bg-deep .sub, .tx .bg-deep .fine, .tx .bg-deep .lede { color: rgba(246,248,246,0.66); }
.tx .bg-deep .eyebrow { color: var(--signal); }
.tx .bg-deep h2, .tx .bg-deep h3 { color: var(--paper); }
.tx .bg-ink   { background: var(--ink); color: var(--paper); }

.tx .btn { display: inline-flex; align-items: center; gap: 10px; padding: 15px 26px; border-radius: 2px; font-weight: 500; font-size: 0.97rem; transition: transform .5s cubic-bezier(.16,1,.3,1), background-color .3s, color .3s, border-color .3s; }
.tx .btn-primary { background: var(--ink); color: var(--paper); }
.tx .btn-primary:hover { background: var(--tide); transform: translateY(-1px); }
.tx .btn-ghost { border: 1px solid var(--line); }
.tx .btn-ghost:hover { border-color: var(--ink); }
.tx .bg-deep .btn-primary { background: var(--paper); color: var(--ink); }
.tx .bg-deep .btn-primary:hover { background: var(--signal); }
.tx .btn .arw, .tx .link .arw { transition: transform .5s cubic-bezier(.16,1,.3,1); }
.tx .btn:hover .arw, .tx .link:hover .arw { transform: translateX(4px); }
.tx .link { font-size: 0.93rem; font-weight: 500; border-bottom: 1px solid var(--line); padding-bottom: 2px; display: inline-flex; gap: 6px; align-items: center; transition: color .3s, border-color .3s; }
.tx .link:hover { color: var(--tide); border-color: var(--tide); }

.tx .utility { background: var(--ink); color: rgba(246,248,246,0.72); font-family: var(--mono); font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 9px 0; text-align: center; }
.tx .nav { position: sticky; top: 0; z-index: 50; background: rgba(237,240,238,0.88); backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
.tx .nav-row { display: flex; align-items: center; justify-content: space-between; height: 68px; position: relative; }
.tx .logo { display: flex; align-items: center; gap: 9px; font-family: var(--display); font-weight: 600; font-size: 1.22rem; letter-spacing: -0.04em; }
.tx .logo .rx { color: var(--tide); }
.tx .nav-links { display: flex; align-items: center; gap: 2px; }
.tx .nav-link { padding: 10px 14px; font-size: 0.94rem; border-radius: 2px; transition: color .25s; }
.tx .nav-link:hover, .tx .nav-link[aria-expanded="true"] { color: var(--tide); }
.tx .nav-right { display: flex; align-items: center; gap: 18px; }
.tx .nav-cta { padding: 11px 20px; font-size: 0.9rem; background: var(--ink); color: var(--paper); border-radius: 2px; transition: background-color .3s; }
.tx .nav-cta:hover { background: var(--tide); }
.tx .burger { display: none; }
.tx .mega { position: absolute; left: 0; right: 0; top: 100%; background: var(--paper); border-bottom: 1px solid var(--line); box-shadow: 0 24px 48px -28px rgba(12,26,31,0.28); }
.tx .mega-grid { display: grid; grid-template-columns: 1.1fr 1fr 0.95fr; gap: 48px; padding: 40px 0 44px; }
.tx .mega h4 { font-family: var(--mono); font-size: 0.64rem; text-transform: uppercase; letter-spacing: 0.16em; color: var(--slate); margin-bottom: 16px; font-weight: 500; }
.tx .mega li { margin-bottom: 11px; }
.tx .mega li a { font-size: 0.98rem; border-bottom: 1px solid transparent; transition: border-color .25s, color .25s; }
.tx .mega li a:hover { color: var(--tide); border-color: var(--tide); }
.tx .mega-card { background: var(--chart); padding: 24px; border-radius: 2px; }
.tx .mega-card p { font-size: 0.9rem; color: var(--slate); margin: 8px 0 16px; }

.tx .hero { padding-top: clamp(56px, 7vw, 88px); padding-bottom: 0; }
.tx .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
.tx .hero h1 { margin: 22px 0 24px; }
.tx .hero-ctas { display: flex; gap: 12px; margin-top: 34px; flex-wrap: wrap; }
.tx .trustrow { display: flex; flex-wrap: wrap; gap: 0 28px; margin-top: 44px; padding-top: 22px; border-top: 1px solid var(--line); }
.tx .trustrow li { font-family: var(--mono); font-size: 0.7rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--slate); padding: 6px 0; display: flex; align-items: center; gap: 8px; }
.tx .trustrow li::before { content: ""; width: 5px; height: 5px; background: var(--tide); border-radius: 50%; }

.tx .chart-card { background: var(--paper); border: 1px solid var(--line); border-radius: 2px; padding: 22px 22px 16px; }
.tx .chart-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; }
.tx .chart-head .t { font-family: var(--mono); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.14em; }
.tx .chart-head .r { font-family: var(--mono); font-size: 0.68rem; color: var(--slate); }
.tx .chart-note { font-family: var(--mono); font-size: 0.62rem; color: var(--slate); margin-top: 10px; letter-spacing: 0.04em; }
.tx svg .grid { stroke: rgba(12,26,31,0.07); }
.tx svg .axis { stroke: rgba(12,26,31,0.28); }
.tx svg .tick { font-family: var(--mono); font-size: 9px; fill: #5A6B70; }
.tx svg .ladder { fill: none; stroke: var(--ink); stroke-width: 2.25; stroke-linejoin: round; stroke-linecap: round; }
.tx svg .water { fill: var(--tide); opacity: 0.14; }
.tx svg .waterline { fill: none; stroke: var(--tide); stroke-width: 1.25; opacity: 0.5; }
.tx svg .marker { fill: var(--signal); stroke: var(--ink); stroke-width: 1.5; }
.tx svg .mlabel { font-family: var(--mono); font-size: 9.5px; font-weight: 500; fill: #0C1A1F; }

.tx .draw { stroke-dasharray: 1400; stroke-dashoffset: 1400; animation: draw 2.1s cubic-bezier(.16,1,.3,1) .25s forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
.tx .rise { transform-box: fill-box; transform-origin: bottom; transform: scaleY(0); animation: rise 2.4s cubic-bezier(.16,1,.3,1) .35s forwards; }
@keyframes rise { to { transform: scaleY(1); } }
.tx .pop { opacity: 0; animation: pop .6s cubic-bezier(.16,1,.3,1) forwards; }
@keyframes pop { to { opacity: 1; } }
.tx .swell { animation: swell 7s ease-in-out infinite; }
@keyframes swell { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
.tx .rv { opacity: 0; transform: translateY(18px); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
.tx .rv.in { opacity: 1; transform: none; }

.tx .strip ul { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.tx .strip .n { font-family: var(--mono); font-size: 1.45rem; font-weight: 500; display: block; }
.tx .strip .l { font-family: var(--mono); font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.13em; color: rgba(246,248,246,0.55); margin-top: 5px; display: block; }

.tx .sechead { max-width: 64ch; margin-bottom: 52px; }
.tx .sechead h2 { margin: 16px 0 18px; }

/* explainer */
.tx .learn { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
.tx .learn > div { background: var(--paper); padding: 30px 26px 34px; }
.tx .learn .n { font-family: var(--mono); font-size: 0.66rem; letter-spacing: 0.14em; color: var(--tide); }
.tx .learn h3 { margin: 16px 0 10px; font-size: 1.14rem; }
.tx .learn p { font-size: 0.94rem; color: var(--slate); }
.tx .learn-foot { margin-top: 28px; }

/* cards */
.tx .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.tx .card { background: var(--paper); border: 1px solid var(--line); border-radius: 2px; padding: 28px; display: flex; flex-direction: column; min-height: 350px; transition: border-color .4s, transform .6s cubic-bezier(.16,1,.3,1); }
.tx .card:hover { border-color: var(--ink); transform: translateY(-3px); }
.tx .card .idx { font-family: var(--mono); font-size: 0.66rem; color: var(--slate); letter-spacing: 0.12em; }
.tx .card h3 { margin: 14px 0 4px; }
.tx .card .brands { font-family: var(--mono); font-size: 0.74rem; color: var(--tide); letter-spacing: 0.03em; }
.tx .card p { font-size: 0.95rem; color: var(--slate); margin-top: 14px; }
.tx .card .foot { margin-top: auto; padding-top: 22px; }
.tx .status { display: inline-block; margin-top: 16px; padding: 4px 9px; border-radius: 2px; font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase; }
.tx .status.ok  { background: var(--shallow); color: var(--deep); }
.tx .status.alt { background: rgba(232,194,85,0.28); color: #5C4A12; }
.tx .card.gated { background: repeating-linear-gradient(135deg, transparent 0 9px, rgba(12,26,31,0.022) 9px 18px), var(--paper); }
.tx .compare { margin-top: 20px; background: var(--paper); border: 1px solid var(--line); padding: 22px 28px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }

.tx .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 48px; }
.tx .step { padding-top: 22px; border-top: 2px solid var(--ink); }
.tx .step .n { font-family: var(--mono); font-size: 0.7rem; letter-spacing: 0.14em; color: var(--tide); }
.tx .step h3 { margin: 14px 0 10px; }
.tx .step p { font-size: 0.95rem; color: var(--slate); }

.tx .diffs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: rgba(246,248,246,0.14); margin-top: 48px; }
.tx .diff { background: var(--deep); padding: 34px 30px; }
.tx .diff h3 { margin-bottom: 12px; }
.tx .diff p { font-size: 0.95rem; }
.tx .diff.wide { grid-column: 1 / -1; }

.tx .tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.tx .tile { background: var(--chart); border: 1px solid var(--line); padding: 26px; border-radius: 2px; transition: background-color .4s; }
.tx .tile:hover { background: var(--paper); }
.tx .tile .route { font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--tide); }
.tx .tile h3 { margin: 12px 0 8px; font-size: 1.14rem; }
.tx .tile p { font-size: 0.92rem; color: var(--slate); }
.tx .tile.stack { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.tx .tile.stack p { color: rgba(246,248,246,0.62); }
.tx .tile.stack .route { color: var(--signal); }

.tx .ptable { border-top: 1px solid var(--line); margin-top: 44px; }
.tx .prow { display: grid; grid-template-columns: 0.85fr 2fr; gap: 32px; padding: 24px 0; border-bottom: 1px solid var(--line); align-items: start; }
.tx .prow .k { font-family: var(--mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; padding-top: 3px; }
.tx .prow .v { font-size: 0.98rem; color: var(--slate); }
.tx .prow .v strong { color: var(--ink); font-weight: 500; }

.tx .knows { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px 48px; margin-top: 48px; }
.tx .know { border-left: 2px solid var(--shallow); padding-left: 22px; }
.tx .know h3 { font-size: 1.14rem; margin-bottom: 10px; }
.tx .know p { font-size: 0.95rem; color: var(--slate); }

.tx .faq { border-top: 1px solid var(--line); margin-top: 44px; }
.tx .q { border-bottom: 1px solid var(--line); }
.tx .q button { width: 100%; text-align: left; padding: 22px 0; display: flex; justify-content: space-between; gap: 24px; align-items: center; font-size: 1.02rem; font-weight: 500; }
.tx .q button:hover { color: var(--tide); }
.tx .q .sign { font-family: var(--mono); color: var(--tide); flex-shrink: 0; }
.tx .a { overflow: hidden; max-height: 0; transition: max-height .55s cubic-bezier(.16,1,.3,1); }
.tx .a.open { max-height: 300px; }
.tx .a p { padding: 0 0 24px; color: var(--slate); font-size: 0.96rem; max-width: 70ch; }

.tx .final { text-align: center; }
.tx .final h2 { margin: 18px auto 20px; max-width: 15ch; }
.tx .final .lede { margin: 0 auto 34px; text-align: center; }

.tx footer { background: var(--ink); color: rgba(246,248,246,0.6); padding: 72px 0 0; }
.tx .fgrid { display: grid; grid-template-columns: 1.4fr repeat(4, 1fr); gap: 36px; padding-bottom: 56px; }
.tx footer h4 { font-family: var(--mono); font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.14em; color: var(--paper); margin-bottom: 16px; font-weight: 500; }
.tx footer li { margin-bottom: 9px; font-size: 0.9rem; }
.tx footer li a:hover { color: var(--paper); }
.tx .fbrand .logo { color: var(--paper); margin-bottom: 14px; }
.tx .badges { display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap; }
.tx .badge { font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.08em; text-transform: uppercase; border: 1px solid rgba(246,248,246,0.22); padding: 6px 9px; border-radius: 2px; }
.tx .legal { border-top: 1px solid rgba(246,248,246,0.14); padding: 28px 0 40px; font-size: 0.76rem; line-height: 1.65; color: rgba(246,248,246,0.42); max-width: 94ch; }

.tx .scrim { position: fixed; inset: 0; background: rgba(12,26,31,0.55); backdrop-filter: blur(3px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
.tx .modal { background: var(--paper); width: 100%; max-width: 540px; border-radius: 2px; padding: 34px; max-height: 90vh; overflow-y: auto; }
.tx .modal .prog { display: flex; gap: 5px; margin-bottom: 26px; }
.tx .modal .prog i { height: 2px; flex: 1; background: var(--line); transition: background-color .4s; }
.tx .modal .prog i.on { background: var(--tide); }
.tx .modal h3 { margin-bottom: 8px; }
.tx .modal .help { font-size: 0.9rem; color: var(--slate); margin-bottom: 20px; }
.tx .opt { width: 100%; text-align: left; border: 1px solid var(--line); padding: 15px 18px; margin-bottom: 9px; border-radius: 2px; font-size: 0.98rem; transition: border-color .3s, background-color .3s; }
.tx .opt:hover { border-color: var(--ink); background: var(--chart); }
.tx .modal .foot { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 22px; }
.tx .result .status { margin: 0 0 14px; }

@media (max-width: 980px) {
  .tx .learn { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .tx .nav-links, .tx .nav-right .signin { display: none; }
  .tx .burger { display: block; font-family: var(--mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; }
  .tx .hero-grid { grid-template-columns: 1fr; gap: 40px; }
  .tx .cards, .tx .steps, .tx .tiles, .tx .diffs, .tx .knows, .tx .learn { grid-template-columns: 1fr; }
  .tx .strip ul { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .tx .fgrid { grid-template-columns: 1fr 1fr; }
  .tx .prow { grid-template-columns: 1fr; gap: 8px; }
  .tx .card { min-height: 0; }
  .tx .knows { gap: 32px; }
}
@media (prefers-reduced-motion: reduce) {
  .tx *, .tx *::before, .tx *::after { animation: none !important; transition: none !important; }
  .tx .draw { stroke-dashoffset: 0; }
  .tx .rise { transform: none; }
  .tx .pop, .tx .rv { opacity: 1; transform: none; }
}
`;

/* ---------------- signature chart ---------------- */

function TideChart() {
  const doses = [
    { wk: 0, mg: 0.25 }, { wk: 4, mg: 0.5 }, { wk: 8, mg: 1.0 },
    { wk: 12, mg: 1.7 }, { wk: 16, mg: 2.4 }, { wk: 20, mg: 2.4 },
  ];
  const X = (wk) => 46 + wk * 25.7;
  const Y = (mg) => 344 - (mg / 2.6) * 292;

  let ladder = `M ${X(0)} ${Y(doses[0].mg)}`;
  for (let i = 1; i < doses.length; i++) {
    ladder += ` L ${X(doses[i].wk)} ${Y(doses[i - 1].mg)} L ${X(doses[i].wk)} ${Y(doses[i].mg)}`;
  }
  const area = `${ladder} L ${X(20)} 344 L ${X(0)} 344 Z`;

  return (
    <figure className="chart-card">
      <div className="chart-head">
        <span className="t">Your tide table</span>
        <span className="r">semaglutide · wk 0–20 · mg/week</span>
      </div>
      <svg viewBox="0 0 600 380" width="100%" role="img"
        aria-label="A chart showing a typical semaglutide schedule rising in steps from 0.25 mg in week 0 to 2.4 mg by week 16, drawn like a rising tide.">
        <defs><clipPath id="tx2-clip"><rect x="46" y="40" width="516" height="304" /></clipPath></defs>

        {[0.5, 1.0, 1.5, 2.0, 2.5].map((mg) => (
          <g key={mg}>
            <line className="grid" x1="46" y1={Y(mg)} x2="562" y2={Y(mg)} />
            <text className="tick" x="34" y={Y(mg) + 3} textAnchor="end">{mg.toFixed(1)}</text>
          </g>
        ))}
        {[0, 4, 8, 12, 16, 20].map((wk) => (
          <text key={wk} className="tick" x={X(wk)} y="362" textAnchor="middle">w{wk}</text>
        ))}

        <line className="axis" x1="46" y1="344" x2="562" y2="344" />
        <line className="axis" x1="46" y1="40" x2="46" y2="344" />

        <g clipPath="url(#tx2-clip)">
          <path className="water rise" d={area} />
          <path className="waterline swell" d={`M 46 ${Y(0.12)} q 32 -7 64 0 t 64 0 t 64 0 t 64 0 t 64 0 t 64 0 t 64 0 t 64 0`} />
        </g>

        <path className="ladder draw" d={ladder} />

        {doses.slice(0, 5).map((d, i) => (
          <g key={d.wk} className="pop" style={{ animationDelay: `${1.05 + i * 0.16}s` }}>
            <circle className="marker" cx={X(d.wk)} cy={Y(d.mg)} r="4.5" />
            <text className="mlabel" x={X(d.wk) + 9} y={Y(d.mg) - 8}>{d.mg.toFixed(2).replace(/0$/, "")} mg</text>
          </g>
        ))}
      </svg>
      <figcaption className="chart-note">
        A typical schedule. Your clinician sets yours, and can slow it down any time.
      </figcaption>
    </figure>
  );
}

/* ---------------- reveal ---------------- */

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`rv ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------------- assessment ---------------- */

const QUIZ = [
  {
    q: "What would you like to work on?",
    help: "There is no wrong answer here. It just tells the clinician where to start.",
    a: ["Losing weight", "Energy and recovery", "Both", "I'm still figuring it out"],
  },
  {
    q: "Have you used a GLP-1 before?",
    help: "Semaglutide and tirzepatide are the two most common ones. If you have not, that is completely normal.",
    a: ["This would be my first time", "I'm on one now", "I stopped within the last year", "I stopped over a year ago"],
  },
  {
    q: "Has anyone in your family had medullary thyroid cancer or MEN 2?",
    help: "This is the first thing every clinician checks. It's rare, and it's the one history that changes the plan.",
    a: ["No", "Yes", "I'm not sure"],
  },
];

function Assessment({ onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const done = step >= QUIZ.length;
  const flagged = answers[2] === "Yes";
  const unsure = answers[2] === "I'm not sure";

  const pick = (a) => { setAnswers([...answers.slice(0, step), a]); setStep(step + 1); };

  return (
    <div className="scrim" role="dialog" aria-modal="true" aria-label="TydeRX assessment" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="prog">{QUIZ.map((_, i) => <i key={i} className={i < step ? "on" : ""} />)}</div>

        {!done ? (
          <>
            <h3>{QUIZ[step].q}</h3>
            <p className="help">{QUIZ[step].help}</p>
            {QUIZ[step].a.map((a) => <button key={a} className="opt" onClick={() => pick(a)}>{a}</button>)}
            <div className="foot">
              <span className="mono fine">Question {step + 1} of {QUIZ.length}</span>
              <button className="link" onClick={onClose}>Close</button>
            </div>
          </>
        ) : (
          <div className="result">
            {flagged ? (
              <>
                <span className="status alt">A clinician will review this personally</span>
                <h3>Thanks for telling us. That history matters.</h3>
                <p className="help" style={{ marginTop: 14 }}>
                  GLP-1 medications are not prescribed to people with a personal or family history of
                  medullary thyroid carcinoma or MEN 2, so a clinician will look at your full picture and
                  talk you through the other options available to you. The visit is still free.
                </p>
              </>
            ) : unsure ? (
              <>
                <span className="status alt">Let's find out together</span>
                <h3>That's a common answer, and it's easy to resolve.</h3>
                <p className="help" style={{ marginTop: 14 }}>
                  Your clinician will walk you through a few questions about your family history during the
                  full intake. Most people clear this in a minute. Nothing about it stops you from starting today.
                </p>
              </>
            ) : (
              <>
                <span className="status ok">You're likely a good candidate</span>
                <h3>Good news. Here's what happens next.</h3>
                <p className="help" style={{ marginTop: 14 }}>
                  Based on your answers, an FDA-approved GLP-1 looks like a strong starting point. The full
                  intake takes about three minutes and covers your history, medications, and goals. A licensed
                  clinician reviews it within 24 hours and explains their recommendation in writing.
                </p>
              </>
            )}
            <div className="foot">
              <span className="mono fine">Demo. Nothing is saved.</span>
              <button className="btn btn-primary" onClick={onClose}>Continue <span className="arw">→</span></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- nav ---------------- */

const MENUS = {
  weight: {
    cols: [
      { h: "Medications", items: [
        ["Semaglutide", "Wegovy®, Ozempic®"],
        ["Tirzepatide", "Zepbound®, Mounjaro®"],
        ["Compounded semaglutide", "eligibility required"],
        ["Compare both medications", ""],
      ]},
      { h: "New here?", items: [
        ["How GLP-1s work", ""],
        ["How TydeRX works", ""],
        ["What you'll pay", ""],
        ["Using HSA or FSA funds", ""],
      ]},
    ],
    card: { h: "Take the assessment", p: "Three minutes, free, no card. A licensed clinician reads it and tells you what fits.", cta: "Start" },
  },
  longevity: {
    cols: [
      { h: "NAD+", items: [
        ["NAD+ Injection", "subcutaneous"],
        ["NAD+ Nasal Spray", "intranasal"],
        ["NAD+ Oral Liposomal", "oral"],
        ["Choosing your NAD+", ""],
      ]},
      { h: "Peptides & metabolic", items: [
        ["Sermorelin", "injection"],
        ["MIC-B12", "injection"],
        ["The Stack", "bundle"],
      ]},
    ],
    card: { h: "How these are prescribed", p: "Each one is a compounded preparation written for you individually. Compounded medications are not FDA-approved.", cta: "Learn more" },
  },
};

function Nav({ onStart }) {
  const [open, setOpen] = useState(null);
  return (
    <header className="nav" onMouseLeave={() => setOpen(null)}>
      <div className="wrap nav-row">
        <a href="#" className="logo" aria-label="TydeRX home">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M1 13 q4.5 -5 9 0 t9 0" fill="none" stroke="#1B7F8C" strokeWidth="2" strokeLinecap="round" />
            <path d="M1 17 q4.5 -5 9 0 t9 0" fill="none" stroke="#0C1A1F" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
            <circle cx="10" cy="4" r="2.4" fill="#E8C255" />
          </svg>
          Tyde<span className="rx">RX</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <button className="nav-link" aria-expanded={open === "weight"}
            onMouseEnter={() => setOpen("weight")} onFocus={() => setOpen("weight")}
            onClick={() => setOpen(open === "weight" ? null : "weight")}>Weight Loss</button>
          <button className="nav-link" aria-expanded={open === "longevity"}
            onMouseEnter={() => setOpen("longevity")} onFocus={() => setOpen("longevity")}
            onClick={() => setOpen(open === "longevity" ? null : "longevity")}>Longevity &amp; Recovery</button>
          <a className="nav-link" href="#learn" onMouseEnter={() => setOpen(null)}>How GLP-1s Work</a>
          <a className="nav-link" href="#pricing" onMouseEnter={() => setOpen(null)}>Pricing</a>
          <a className="nav-link" href="#" onMouseEnter={() => setOpen(null)}>The Current</a>
        </nav>

        <div className="nav-right">
          <a href="#" className="signin">Sign in</a>
          <button className="nav-cta" onClick={onStart}>Get started</button>
          <button className="burger" onClick={onStart}>Menu</button>
        </div>
      </div>

      {open && (
        <div className="mega" onMouseLeave={() => setOpen(null)}>
          <div className="wrap mega-grid">
            {MENUS[open].cols.map((c) => (
              <div key={c.h}>
                <h4>{c.h}</h4>
                <ul>
                  {c.items.map(([name, meta]) => (
                    <li key={name}>
                      <a href="#">{name}</a>
                      {meta && <span className="mono fine" style={{ marginLeft: 8, fontSize: "0.72rem" }}>{meta}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mega-card">
              <h4 style={{ marginBottom: 8 }}>{MENUS[open].card.h}</h4>
              <p>{MENUS[open].card.p}</p>
              <button className="link" onClick={onStart}>{MENUS[open].card.cta} <span className="arw">→</span></button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- content ---------------- */

const LEARN = [
  ["01", "They copy a hormone you already make.", "GLP-1 is a hormone your gut releases after you eat. It tells your brain you have had enough and slows how quickly your stomach empties. These medications give your body more of that signal, for longer."],
  ["02", "Hunger gets quieter.", "Most people describe it the same way: the constant background noise about food turns down. Meals start to feel like enough. Snacking becomes a choice instead of a pull."],
  ["03", "The dose rises slowly, on purpose.", "You begin at a low dose and step up every few weeks. That gradual climb is what keeps side effects manageable and gives your body time to adjust. The chart above shows a typical schedule."],
  ["04", "What the results look like.", "In trials of FDA-approved semaglutide, participants lost an average of about 15% of their body weight over roughly 68 weeks alongside diet and exercise. Tirzepatide averaged higher at its top dose. Individual results vary."],
];

const TREATMENTS = [
  {
    idx: "01", name: "Semaglutide", brands: "Wegovy® · Ozempic®", status: "FDA-approved", tone: "ok",
    body: "The most studied GLP-1 available, with years of trial data behind it. A weekly injection, stepped up over about four months. A strong first choice for most people starting out.",
    cta: "See if it fits you",
  },
  {
    idx: "02", name: "Tirzepatide", brands: "Zepbound® · Mounjaro®", status: "FDA-approved", tone: "ok",
    body: "Works on two metabolic pathways instead of one. In trials it produced the highest average weight loss in this class. Often the choice when someone wants a stronger effect, or has plateaued.",
    cta: "See if it fits you",
  },
  {
    idx: "03", name: "Compounded semaglutide", brands: "Clinical eligibility required", status: "Prescribed case by case", tone: "alt", gated: true,
    body: "For the small number of people whose clinician documents a specific medical reason an FDA-approved product will not work, such as a dose the manufacturer does not make. Compounded medications are not FDA-approved. Your clinician will tell you whether this applies to you.",
    cta: "Understand eligibility",
  },
];

const DIFFS = [
  ["FDA-approved medication, at 2026 prices.", "Brand-name Wegovy®, Ozempic®, Zepbound® and Mounjaro®, sourced through standard pharmacy channels. Brand pricing came down substantially this year, and you get the real number."],
  ["A clinician who knows your chart.", "Every prescription is written by a licensed clinician who read your intake personally, and who stays with you as your dose climbs."],
  ["Support that is actually included.", "Messaging, dose adjustments, side effect coaching and refills all come with your membership. No per-visit fees, no upsell at the moment you need help."],
  ["A formulary that goes further.", "NAD+, sermorelin and MIC-B12 sit alongside your GLP-1 for energy, recovery and the long game. One clinical team, one shipping schedule."],
];

const LONGEVITY = [
  ["Subcutaneous", "NAD+ Injection", "The most direct route into circulation. Self-administered on the schedule your clinician sets."],
  ["Intranasal", "NAD+ Nasal Spray", "Needle-free and quick. Fits in a bag, travels well, easy to stay consistent with."],
  ["Oral", "NAD+ Oral Liposomal", "A daily liposomal capsule. The simplest place to begin if injections are not for you."],
  ["Injection", "Sermorelin", "A peptide that encourages your body's own growth hormone production. Commonly used to support sleep and recovery."],
  ["Injection", "MIC-B12", "Methionine, inositol, choline and B12. A long-standing lipotropic formula used alongside metabolic care."],
];

const KNOWS = [
  ["These are real medications, with real effects.", "Semaglutide and tirzepatide carry a boxed warning for thyroid C-cell tumors based on animal studies, and they are not prescribed to anyone with a personal or family history of medullary thyroid carcinoma or MEN 2. Your clinician screens for this before anything else."],
  ["Side effects are common early, and manageable.", "Nausea, constipation and fatigue show up most often during dose increases, and usually settle. Pancreatitis and gallbladder problems are less common but real. Your care team adjusts your pace when your body asks them to."],
  ["Compounded medications work differently.", "They are prepared for one patient at a time and are not FDA-approved or reviewed by the FDA for safety, efficacy or quality. They fit specific clinical situations, and your clinician will tell you clearly whether yours is one of them."],
  ["Results take months, not weeks.", "The trials behind the headline numbers ran for more than a year, and your dose climbs over roughly twelve weeks before you reach a full therapeutic level. Patience is part of the treatment."],
];

const FAQS = [
  ["I've never done anything like this. Where do I start?", "With the assessment. Three minutes, free, no card required. A licensed clinician reads your answers and tells you what fits."],
  ["Do I need insurance?", "No. Most members pay with HSA or FSA funds, and we provide a superbill if your plan reimburses."],
  ["Which medication will I get?", "Whichever one your clinician recommends after reading your history. Both semaglutide and tirzepatide are FDA-approved and effective, and they explain the reasoning in writing."],
  ["How soon will I hear back?", "Most clinical reviews are complete within 24 hours."],
  ["How much weight will I lose?", "Trials of FDA-approved semaglutide averaged roughly 15% of body weight over about 68 weeks with diet and exercise. Individual results vary, and your clinician will set expectations that fit you."],
  ["Will I feel sick?", "Some people feel nauseated during dose increases. Your clinician can slow the climb, and there are tools that help. Tell your care team early and they will adjust."],
  ["What if a GLP-1 is not the right fit for me?", "Your clinician will tell you and point you toward what is. The assessment is free either way."],
  ["Can I pause or cancel?", "Any time, at no cost. Pausing is one click."],
];

/* ---------------- page ---------------- */

export default function TydeRX() {
  const [quiz, setQuiz] = useState(false);
  const [faq, setFaq] = useState(null);
  const start = () => setQuiz(true);

  return (
    <div className="tx">
      <style>{CSS}</style>

      <div className="utility">Licensed U.S. clinicians · FDA-approved medication · HSA/FSA eligible</div>
      <Nav onStart={start} />

      {/* HERO */}
      <section className="hero bg-chart">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Medical weight care, made simple</span>
            <h1>Hi tide<br />does the work.</h1>
            <p className="lede">
              GLP-1 medication works with your biology instead of against it. Tell us about your health, and
              a licensed clinician will tell you which treatment fits, what it costs, and what to expect.
              Most people hear back within a day.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={start}>Take the 3-minute assessment <span className="arw">→</span></button>
              <a className="btn btn-ghost" href="#learn">Learn how GLP-1s work</a>
            </div>
            <ul className="trustrow">
              <li>Licensed in 50 states</li>
              <li>FDA-approved medication</li>
              <li>HSA/FSA eligible</li>
              <li>Clinical support included</li>
            </ul>
          </div>
          <TideChart />
        </div>
      </section>

      {/* STRIP */}
      <section className="strip bg-ink" style={{ paddingTop: 30, paddingBottom: 30 }}>
        <div className="wrap">
          <ul>
            <li><span className="n">50</span><span className="l">states licensed</span></li>
            <li><span className="n">&lt;24 hr</span><span className="l">clinician review</span></li>
            <li><span className="n">12 wk</span><span className="l">to your full dose</span></li>
            <li><span className="n">Included</span><span className="l">ongoing care</span></li>
          </ul>
        </div>
      </section>

      {/* LEARN */}
      <section id="learn" className="bg-chart">
        <div className="wrap">
          <Reveal className="sechead">
            <span className="eyebrow">Start here</span>
            <h2>New to this? Here's the whole idea.</h2>
            <p className="sub">
              You do not need to understand the science to begin, but knowing it helps. Here is what a GLP-1
              actually is, in plain language.
            </p>
          </Reveal>
          <Reveal>
            <div className="learn">
              {LEARN.map(([n, h, p]) => (
                <div key={n}>
                  <span className="n">{n}</span>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              ))}
            </div>
            <div className="learn-foot">
              <a href="#" className="link">Read the full guide in The Current <span className="arw">→</span></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="bg-paper">
        <div className="wrap">
          <Reveal className="sechead">
            <span className="eyebrow">Your options</span>
            <h2>Two proven medications. One right answer for you.</h2>
            <p className="sub">
              Both are FDA-approved, both are a weekly injection, and both work. The difference comes down to
              your history, your goals, and how your body responds. A licensed clinician chooses, and explains why.
            </p>
          </Reveal>

          <div className="cards">
            {TREATMENTS.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <article className={`card ${t.gated ? "gated" : ""}`}>
                  <span className="idx">{t.idx}</span>
                  <h3>{t.name}</h3>
                  <span className="brands">{t.brands}</span>
                  <span className={`status ${t.tone}`}>{t.status}</span>
                  <p>{t.body}</p>
                  <div className="foot">
                    <button className="link" onClick={start}>{t.cta} <span className="arw">→</span></button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="compare">
              <p style={{ fontWeight: 500 }}>Still deciding? That's exactly what the assessment is for.</p>
              <a href="#" className="link">Compare both medications <span className="arw">→</span></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW */}
      <section className="bg-chart">
        <div className="wrap">
          <Reveal className="sechead">
            <span className="eyebrow">How it works</span>
            <h2>From curious to starting, in three steps.</h2>
          </Reveal>
          <div className="steps">
            {[
              ["Step 01", "Tell us about your health.", "A three-minute questionnaire: your history, your medications, your goals, and anything you have already tried. The more you share, the better the answer you get back. No cost, no card."],
              ["Step 02", "A licensed clinician reviews it.", "Usually within 24 hours. They choose the medication, set your starting dose, and explain the reasoning in writing. You can ask questions before you fill anything."],
              ["Step 03", "Your medication ships, and your care begins.", "Delivered to your door with everything you need to take your first dose confidently. From there, message your care team any time. Dose changes, side effect questions and refills are all included."],
            ].map(([n, h, p], i) => (
              <Reveal key={n} delay={i * 110}>
                <div className="step">
                  <span className="n">{n}</span>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-deep">
        <div className="wrap">
          <Reveal className="sechead">
            <span className="eyebrow">Why TydeRX</span>
            <h2>Care that keeps up with you.</h2>
          </Reveal>
          <div className="diffs">
            {DIFFS.map(([h, p], i) => (
              <Reveal key={h} delay={i * 80}>
                <div className="diff">
                  <h3>{h}</h3>
                  <p className="sub">{p}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={340} className="diff wide">
              <div>
                <h3>Your pre-tax dollars go further here.</h3>
                <p className="sub">Most members pay with HSA or FSA funds, which can make treatment meaningfully cheaper in real terms. We prepare the documentation for you.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LONGEVITY */}
      <section className="bg-paper">
        <div className="wrap">
          <Reveal className="sechead">
            <span className="eyebrow">Beyond the scale</span>
            <h2>The rest of your metabolism.</h2>
            <p className="sub">
              Weight is one measure of metabolic health. Energy, sleep, recovery and cellular repair are
              others, and they respond to different tools. These are the therapies our clinicians add when
              someone wants to feel as good as their chart looks. Each is a compounded preparation prescribed
              individually, and compounded medications are not FDA-approved. Your clinician will explain what
              each one does and what the evidence supports.
            </p>
          </Reveal>
          <div className="tiles">
            {LONGEVITY.map(([route, name, body], i) => (
              <Reveal key={name} delay={i * 70}>
                <article className="tile">
                  <span className="route">{route}</span>
                  <h3>{name}</h3>
                  <p>{body}</p>
                </article>
              </Reveal>
            ))}
            <Reveal delay={350}>
              <article className="tile stack">
                <span className="route">Bundle</span>
                <h3>The Stack</h3>
                <p>NAD+ and MIC-B12 together, coordinated by one clinician and shipped on one schedule.</p>
                <a href="#" className="link" style={{ marginTop: 14, color: "#F6F8F6", borderColor: "rgba(246,248,246,0.3)" }}>
                  See what's inside <span className="arw">→</span>
                </a>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-chart">
        <div className="wrap">
          <Reveal className="sechead">
            <span className="eyebrow">Pricing</span>
            <h2>You'll see the full price before you decide.</h2>
            <p className="sub">
              One flat membership for your clinical care, plus the real cost of your medication. Both are on
              screen before you enter a card.
            </p>
          </Reveal>
          <Reveal>
            <div className="ptable">
              {[
                ["Membership", <>A flat monthly fee covering clinician visits, unlimited messaging, dose adjustments and refills.</>],
                ["Medication", <>Quoted at cost with the pharmacy before you pay. <strong>Brand-name GLP-1 pricing dropped substantially in 2026</strong>, and you get that number.</>],
                ["HSA / FSA", <>Eligible for most members. We prepare the documentation.</>],
                ["Insurance", <>We don't bill insurance directly. If your plan reimburses, we provide a superbill.</>],
                ["If a GLP-1 isn't the fit", <><strong>The assessment is free</strong>, and your clinician will point you toward what is.</>],
              ].map(([k, v]) => (
                <div className="prow" key={k}>
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 34 }}>
              <button className="btn btn-primary" onClick={start}>See your price <span className="arw">→</span></button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* KNOW */}
      <section className="bg-paper">
        <div className="wrap">
          <Reveal className="sechead">
            <span className="eyebrow">Good to know</span>
            <h2>The honest version, so you can decide well.</h2>
          </Reveal>
          <div className="knows">
            {KNOWS.map(([h, p], i) => (
              <Reveal key={h} delay={i * 70}>
                <div className="know">
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: 40 }}>
              <a href="#" className="link">Full safety information <span className="arw">→</span></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-chart">
        <div className="wrap">
          <Reveal className="sechead">
            <span className="eyebrow">Questions</span>
            <h2>Answered plainly.</h2>
          </Reveal>
          <div className="faq">
            {FAQS.map(([q, a], i) => (
              <div className="q" key={q}>
                <button aria-expanded={faq === i} onClick={() => setFaq(faq === i ? null : i)}>
                  {q}<span className="sign">{faq === i ? "−" : "+"}</span>
                </button>
                <div className={`a ${faq === i ? "open" : ""}`}><p>{a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="bg-deep final">
        <div className="wrap">
          <span className="eyebrow">Get started</span>
          <h2>Three minutes. A real answer.</h2>
          <p className="lede">
            Find out which medication a licensed clinician recommends for your body, at a price you can see
            before you decide.
          </p>
          <button className="btn btn-primary" onClick={start}>Take the assessment <span className="arw">→</span></button>
          <p className="fine" style={{ marginTop: 18 }}>Free. No card required. No obligation.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap fgrid">
          <div className="fbrand">
            <div className="logo">Tyde<span className="rx">RX</span></div>
            <p className="fine" style={{ maxWidth: "30ch" }}>Metabolic health and recovery, prescribed by licensed U.S. clinicians.</p>
            <div className="badges">
              <span className="badge">LegitScript</span>
              <span className="badge">HIPAA</span>
              <span className="badge">HSA/FSA</span>
            </div>
          </div>
          {[
            ["Medications", ["Semaglutide", "Tirzepatide", "Compounded eligibility", "Compare medications"]],
            ["Longevity", ["NAD+ Injection", "NAD+ Nasal Spray", "NAD+ Oral", "Sermorelin", "MIC-B12"]],
            ["Learn", ["How GLP-1s work", "What to expect", "The Current", "Safety information"]],
            ["Support", ["FAQ", "Shipping", "Pause or cancel", "Contact", "State licensure"]],
          ].map(([h, items]) => (
            <div key={h}>
              <h4>{h}</h4>
              <ul>{items.map((i) => <li key={i}><a href="#">{i}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="wrap">
          <p className="legal">
            Wegovy® and Ozempic® are registered trademarks of Novo Nordisk A/S. Zepbound® and Mounjaro® are
            registered trademarks of Eli Lilly and Company. TydeRX is not affiliated with, endorsed by, or
            sponsored by either company. TydeRX is a technology platform and does not provide medical services.
            Clinical services are provided by independent, U.S.-licensed clinicians. Prescriptions are issued
            solely at the discretion of the prescribing clinician. Compounded medications are not FDA-approved
            and have not been evaluated by the FDA for safety, efficacy or quality. Individual results vary.
            © 2026 TydeRX.
          </p>
        </div>
      </footer>

      {quiz && <Assessment onClose={() => setQuiz(false)} />}
    </div>
  );
}
