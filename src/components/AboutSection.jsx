/**
 * AboutSection.jsx — Enhanced
 * bg-transparent — Layout's unified dark navy shows through.
 */
import React from "react";
import { User, Code2, Terminal, Rocket, ShieldCheck, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const focusAreas = [
  "Backend Architecture",
  "Algorithm Optimization",
  "Scalable Full-Stack Systems",
];

const metrics = [
  { label: "Problem Solving", value: "200+ DSA solved", icon: "🧠" },
  { label: "Build Approach", value: "Performance + Clarity", icon: "⚙️" },
  { label: "Current Goal", value: "Launch-ready products", icon: "🚀" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-transparent px-4 py-28 font-sans sm:px-6 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* ── Header ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-300"
          >
            <User size={12} />
            The Developer
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold tracking-tight text-white md:text-5xl"
          >
            Engineering with{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Precision.
            </span>
          </motion.h2>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/[0.08] bg-[#07111f]/80 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:col-span-8 lg:p-9"
          >
            {/* Top accent bar */}
            <div className="mb-7 h-px w-full bg-gradient-to-r from-cyan-300/40 via-teal-300/20 to-transparent" />

            <div className="space-y-5 leading-relaxed">
              <p className="text-base text-slate-100 md:text-lg">
                I&apos;m a software developer and Computer Science student at{" "}
                <span className="font-mono text-cyan-300">
                  Netaji Subhash Engineering College
                </span>
                , with a strong product-engineering mindset. My journey started
                with curiosity about how systems work under the hood and evolved
                into building production-grade, scalable applications.
              </p>
              <p className="text-slate-400">
                As a competitive programming enthusiast, I focus on solution
                quality — not just implementation speed. My foundation in C++
                and Java helps me optimize for performance, reason about
                trade-offs, and prevent bottlenecks early in design.
              </p>
              <p className="text-slate-400">
                Right now, I&apos;m focused on bridging raw code with measurable
                business impact: robust backend architecture, seamless UX
                delivery, and launch-ready reliability across real-world
                projects.
              </p>
            </div>

            {/* Metric cards */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="group rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 transition-colors hover:border-cyan-300/25 hover:bg-cyan-300/[0.04]"
                >
                  <span className="text-xl">{m.icon}</span>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    {m.label}
                  </p>
                  <p className="mt-1 text-sm text-cyan-100">{m.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-2xl border border-white/[0.08] bg-[#07111f]/80 p-7 backdrop-blur-xl lg:col-span-4"
          >
            <div className="space-y-6 font-mono text-sm">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-slate-600">
                  // Mindset
                </p>
                <div className="flex items-center gap-2 text-emerald-300">
                  <Terminal size={14} /> Problem Solver First
                </div>
              </div>

              <div className="h-px bg-white/[0.07]" />

              <div>
                <p className="mb-3 text-[10px] uppercase tracking-widest text-slate-600">
                  // Focus Areas
                </p>
                <div className="space-y-2.5">
                  {focusAreas.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      className="flex items-center gap-2 text-cyan-200"
                    >
                      <Code2 size={13} className="text-cyan-400/60" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/[0.07]" />

              <div className="space-y-2.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <Rocket size={13} className="text-cyan-300" />
                  Building for real-world impact
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={13} className="text-teal-300" />
                  Reliability-first execution
                </div>
                <div className="flex items-center gap-2">
                  <Cpu size={13} className="text-violet-300" />
                  Performance-obsessed
                </div>
              </div>

              {/* Status */}
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-3.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[11px] text-emerald-300">
                    Open to opportunities
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
