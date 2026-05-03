/**
 * LineBorder.jsx — Enhanced
 * Infinite marquee with pause-on-hover, dual rows (opposite directions).
 */
const tags = [
  "Full Stack Developer",
  "MERN Specialist",
  "C++ Engineer",
  "System Design",
  "Cybersecurity",
  "Cloud Computing",
  "AI Enthusiast",
  "Backend Architecture",
  "Performance Engineering",
  "Open Source",
];

function Row({ reverse = false }) {
  return (
    <div
      className="flex items-center gap-0 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      {/* doubled for seamless loop */}
      {[0, 1].map((n) => (
        <div
          key={n}
          aria-hidden={n === 1}
          className="flex shrink-0 items-center gap-5 py-3 pr-5"
          style={{
            animation: `marquee${reverse ? "Rev" : ""} 32s linear infinite`,
          }}
        >
          {tags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="whitespace-nowrap rounded-full border border-cyan-300/15 bg-cyan-300/[0.04] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-200/60 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
            >
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function LineBorder() {
  return (
    <section
      aria-label="Core expertise"
      className="relative overflow-hidden border-y border-white/[0.05] py-0"
      style={{ background: "rgba(34,211,238,0.015)" }}
    >
      <div className="group space-y-0 [&>div]:group-hover:[animation-play-state:paused]">
        <Row />
      </div>

      <style>{`
        @keyframes marquee    { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeRev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  );
}
