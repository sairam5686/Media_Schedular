import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Stop = { offset: number; color: string };

const VBW = 1271;
const VBH = 599;

// Ruixen's stops, floor (0) → top (1): dark ember → blue → near-white → yellow
// → red-orange → magenta → transparent pink.
const RUIXEN_STOPS: Stop[] = [
  { offset: 0, color: "#340B05" },
  { offset: 0.1827, color: "#0358F7" },
  { offset: 0.2837, color: "#5092C7" },
  { offset: 0.4135, color: "#E1ECFE" },
  { offset: 0.5866, color: "#FFD400" },
  { offset: 0.6827, color: "#FA3D1D" },
  { offset: 0.8029, color: "#FD02F5" },
  { offset: 1, color: "#FFC0FD00" },
];

function bellHeights(n: number, peak: number, valley: number): number[] {
  const out: number[] = [];
  const mid = (n - 1) / 2;
  for (let i = 0; i < n; i++) {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid;
    const eased = 1 - Math.pow(t, 1.24);
    out.push(peak * VBH * (valley + (1 - valley) * eased));
  }
  return out;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export interface RuixenGradientFooterProps {
  children?: ReactNode;
  gradientHeight?: string;
  minReveal?: number;
  bars?: number;
  blur?: number;
  peak?: number;
  valley?: number;
  stops?: Stop[];
  className?: string;
  style?: CSSProperties;
}

export function RuixenGradientFooter({
  children,
  gradientHeight = "45vh",
  minReveal = 0.045,
  bars = 9,
  blur = 15,
  peak = 0.98,
  valley = 0.55,
  stops = RUIXEN_STOPS,
  className,
  style,
}: RuixenGradientFooterProps) {
  const uid = useId().replace(/:/g, "");
  const bandRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(minReveal);

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const doc = el.ownerDocument;
    const win = doc.defaultView ?? window;
    const measure = () => {
      const h = el.offsetHeight || 1;
      const left =
        doc.documentElement.scrollHeight - win.innerHeight - win.scrollY;
      const t = clamp01((h - left) / h);
      setProgress(minReveal + (1 - minReveal) * t);
    };
    measure();
    win.addEventListener("scroll", measure, { passive: true });
    win.addEventListener("resize", measure, { passive: true });
    return () => {
      win.removeEventListener("scroll", measure);
      win.removeEventListener("resize", measure);
    };
  }, [minReveal]);

  const colW = VBW / bars;

  return (
    <footer
      className={className}
      style={{ paddingBottom: gradientHeight, ...style }}
    >
      {children}

      <div
        ref={bandRef}
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: gradientHeight,
          pointerEvents: "none",
          transformOrigin: "bottom",
          transform: `scaleY(${progress})`,
          willChange: "transform",
        }}
      >
        <svg
          style={{ height: "100%", width: "100%", display: "block" }}
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-${uid}`} x1="0" y1="1" x2="0" y2="0">
              {stops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
            <filter
              id={`blur-${uid}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          </defs>
          {bellHeights(bars, peak, valley).map((barH, i) => (
            <g key={i} filter={`url(#blur-${uid})`}>
              <rect
                x={i * colW}
                y={VBH - barH}
                width={colW * 1.23}
                height={barH}
                fill={`url(#grad-${uid})`}
              />
            </g>
          ))}
        </svg>
      </div>
    </footer>
  );
}

const columns = [
  {
    title: "Product",
    links: ["Overview", "Features", "Integrations", "Pricing", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Docs", "Guides", "API reference", "Support", "Status"],
  },
  { title: "Company", links: ["About", "Careers", "Blog", "Press", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
];

export function Footer() {
  return (
    <RuixenGradientFooter gradientHeight="42vh" className="relative z-10 w-full">
      <div className="mx-auto w-full max-w-6xl px-6 pt-16">
        <div className="grid gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-neutral-900">
              <div className="flex h-6 w-6 items-center justify-center text-emerald-500">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" />
                  <path d="M12 2V6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M12 18V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M2 12H6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M18 12H22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-neutral-900">
                Supermi
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-neutral-500 leading-relaxed">
              Design tooling for teams who ship on Fridays. Built for the
              browser, offline by default.
            </p>

            <div className="mt-6 flex max-w-xs gap-2">
              <input
                type="email"
                aria-label="Email address"
                placeholder="you@company.com"
                className="h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
              />
              <button
                type="button"
                className="h-9 shrink-0 rounded-md bg-teal-700 px-4 font-mono text-xs uppercase tracking-wider text-white transition-opacity hover:bg-teal-800"
              >
                Join
              </button>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-8 font-mono text-xs uppercase tracking-wider sm:grid-cols-4 lg:col-span-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-semibold text-neutral-900">{col.title}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-neutral-500 transition-colors hover:text-neutral-900"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200/80 pt-6 pb-4 font-mono text-xs uppercase tracking-wider text-neutral-500 sm:flex-row">
          <span>© 2026 Supermi</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All systems normal
          </span>
          <span>Amsterdam · Remote</span>
        </div>
      </div>
    </RuixenGradientFooter>
  );
}
