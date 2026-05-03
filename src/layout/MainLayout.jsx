/**
 * Layout.jsx
 * ──────────────────────────────────────────────────────────────
 * Single shared background for the entire portfolio.
 * Wrap your App/page root with <Layout>…</Layout>.
 *
 * What it provides:
 *  • Deep navy base (#030a14) — no more per-section bg clashes
 *  • Slow-drifting ambient orbs (CSS animation, zero JS cost)
 *  • Subtle dot-grid texture
 *  • Spring-based cursor glow (framer-motion)
 *  • Thin horizontal scan-line overlay for depth
 *
 * Usage:
 *   import Layout from "./Layout";
 *   <Layout>
 *     <Header />
 *     <Hero />
 *     … all other sections …
 *   </Layout>
 */

import { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

/* ── Cursor glow ─────────────────────────────────────────── */
function CursorGlow() {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const h = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-0"
      style={{
        left: sx,
        top: sy,
        x: "-50%",
        y: "-50%",
        width: 560,
        height: 560,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(34,211,238,0.055) 0%, transparent 68%)",
      }}
    />
  );
}

export default function Layout({ children }) {
  return (
    <div
      className="relative overflow-x-hidden"
      style={{ background: "#030a14" }}
    >
      {/* ── Layer 1: Ambient drifting orbs ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* top-left orb */}
        <div
          className="absolute rounded-full"
          style={{
            width: 900,
            height: 900,
            top: "-18%",
            left: "-14%",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 65%)",
            animation: "orbDrift1 22s ease-in-out infinite alternate",
          }}
        />
        {/* bottom-right orb */}
        <div
          className="absolute rounded-full"
          style={{
            width: 820,
            height: 820,
            bottom: "-20%",
            right: "-12%",
            background:
              "radial-gradient(circle, rgba(20,184,166,0.065) 0%, transparent 65%)",
            animation: "orbDrift2 26s ease-in-out infinite alternate",
          }}
        />
        {/* centre mid orb — very faint */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: "38%",
            left: "38%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
            animation: "orbDrift3 30s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* ── Layer 2: Dot grid ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,215,255,0.75) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: 0.028,
        }}
      />

      {/* ── Layer 3: Scan-line ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
          opacity: 0.35,
        }}
      />

      {/* ── Layer 4: Top + bottom fade vignettes ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,10,20,0.7), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-32"
        style={{
          background: "linear-gradient(to top, rgba(3,10,20,0.7), transparent)",
        }}
      />

      {/* ── Cursor glow ── */}
      <CursorGlow />

      {/* ── Content ── */}
      <div className="relative z-10">{children}</div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes orbDrift1 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, 80px) scale(1.12); }
        }
        @keyframes orbDrift2 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-70px, -60px) scale(1.08); }
        }
        @keyframes orbDrift3 {
          0%   { transform: translate(-50%, -50%) scale(1); }
          100% { transform: translate(-50%, -50%) scale(1.18); }
        }
      `}</style>
    </div>
  );
}
