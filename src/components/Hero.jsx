/**
 * Hero.jsx — Enhanced
 * Full-viewport opening section. Transparent bg — Layout provides the base.
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedRoles from "./AnimatedRoles";
import HeroVisual from "./HeroVisual";
import LineBorder from "./LineBorder";

const highlights = [
  "50+ deployments",
  "200+ DSA problems",
  "Open for freelance",
];

/* ── Stagger container ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-5 pb-16 pt-28 sm:px-8 md:flex-row md:gap-14 md:px-12 md:pt-32"
      >
        {/* Left: copy */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-xl font-mono text-white md:pl-2"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/[0.08] px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-cyan-200"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Building Digital Systems That Matter
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl"
          >
            Mohammed{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent">
                Faijan
              </span>
              {/* glow behind name */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(34,211,238,0.28) 0%, transparent 70%)",
                }}
              />
            </span>
          </motion.h1>

          <motion.div variants={fadeUp}>
            <AnimatedRoles />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg"
          >
            I build scalable web applications and backend systems driven by
            performance, clarity, and a production-first mindset.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap gap-3 md:gap-4"
          >
            <motion.button
              whileHover={{
                y: -2,
                boxShadow: "0 8px 28px -4px rgba(34,211,238,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-300 to-teal-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-xl border border-cyan-300/40 px-6 py-3 text-sm font-semibold text-cyan-200 transition-all hover:bg-cyan-300/[0.08] hover:border-cyan-300/70"
            >
              View Projects
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap gap-2 md:gap-3"
          >
            {highlights.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] tracking-wide text-slate-300"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden justify-center md:flex"
        >
          <HeroVisual />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
              scroll
            </span>
            <div className="h-10 w-px overflow-hidden bg-transparent">
              <motion.div
                className="h-4 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                animate={{ y: [0, 24, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      <LineBorder />
    </>
  );
}
