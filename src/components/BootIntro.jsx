/**
 * BootIntro.jsx — Enhanced
 * Full-screen boot sequence on first visit.
 * Uses Web Audio API for typing sounds, respects prefers-reduced-motion.
 * Background is intentionally the same #030a14 as Layout.
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_LINES = [
  "✓ verifying recruiter identity...",
  "✓ validating credentials...",
  "✓ loading candidate profile...",
  "✓ compiling project index...",
  "✓ initializing dashboard...",
  "✓ access granted.",
];

export default function BootIntro({
  onComplete,
  userName = "candidate_access",
  bootLines = DEFAULT_LINES,
}) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [showCaret, setShowCaret] = useState(false);
  const [done, setDone] = useState(false);
  const audioCtxRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Audio ── */
  useEffect(() => {
    if (!prefersReducedMotion && typeof window !== "undefined") {
      audioCtxRef.current = new (
        window.AudioContext || window.webkitAudioContext
      )();
    }
    return () => audioCtxRef.current?.close();
  }, [prefersReducedMotion]);

  const playTick = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || prefersReducedMotion) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "square";
    osc.frequency.value = 700 + Math.random() * 500;
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  };

  const playBeep = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || prefersReducedMotion) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  };

  /* ── Typing effect ── */
  useEffect(() => {
    if (currentLineIndex >= bootLines.length) {
      setShowCaret(true);
      playBeep();
      const t = setTimeout(
        () => {
          setDone(true);
          setTimeout(() => onComplete?.(), prefersReducedMotion ? 0 : 600);
        },
        prefersReducedMotion ? 100 : 800,
      );
      return () => clearTimeout(t);
    }

    const line = bootLines[currentLineIndex];

    if (prefersReducedMotion) {
      setDisplayedLines((p) => [...p, line]);
      setCurrentLineIndex((p) => p + 1);
      return;
    }

    const delay = setTimeout(
      () => {
        let i = 0;
        const speed = 28 + Math.random() * 22;
        const iv = setInterval(() => {
          if (i <= line.length) {
            setCurrentText(line.slice(0, i));
            playTick();
            i++;
          } else {
            clearInterval(iv);
            setDisplayedLines((p) => [...p, line]);
            setCurrentText("");
            setCurrentLineIndex((p) => p + 1);
          }
        }, speed);
        return () => clearInterval(iv);
      },
      160 + Math.random() * 110,
    );

    return () => clearTimeout(delay);
  }, [currentLineIndex]); // eslint-disable-line

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "#030a14" }}
        >
          {/* Ambient orbs (matching Layout) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div
              className="absolute rounded-full"
              style={{
                width: 700,
                height: 700,
                top: "-10%",
                left: "-10%",
                background:
                  "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 65%)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 600,
                height: 600,
                bottom: "-15%",
                right: "-8%",
                background:
                  "radial-gradient(circle, rgba(20,184,166,0.065) 0%, transparent 65%)",
              }}
            />
          </div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[820px] overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
            style={{ background: "rgba(7,17,31,0.92)" }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] shadow-[0_0_6px_rgba(255,95,86,0.5)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_rgba(255,189,46,0.4)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.4)]" />
              <span className="ml-2 font-mono text-xs text-slate-500">
                {userName}
                <span className="text-slate-700">@</span>
                <span className="text-cyan-400/70">terminal</span>
              </span>
              <span className="ml-auto rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                ● authenticating
              </span>
            </div>

            {/* Body */}
            <div className="min-h-[340px] p-6">
              {/* Progress bar */}
              <div
                className="mb-6 overflow-hidden rounded-full bg-white/[0.06]"
                style={{ height: 2 }}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${(currentLineIndex / bootLines.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Log */}
              <div className="space-y-1 font-mono text-sm">
                {displayedLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="leading-relaxed text-white/80"
                  >
                    {line}
                  </motion.div>
                ))}
                {currentText && (
                  <div className="leading-relaxed text-white/80">
                    {currentText}
                  </div>
                )}
                {showCaret && (
                  <div className="flex items-center gap-2 text-cyan-300">
                    <span
                      className="inline-block h-4 w-2 rounded-sm bg-cyan-300"
                      style={{ animation: "bootBlink 0.85s steps(1) infinite" }}
                    />
                    <span className="text-xs text-slate-500">
                      press any key to continue
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <style>{`
            @keyframes bootBlink { 50% { opacity: 0.15; } }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
