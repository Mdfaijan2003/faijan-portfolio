/**
 * Project.jsx
 * ─────────────────────────────────────────────────────────────
 * Project cards section. Clicking "Read Case Study" on any card
 * opens ProjectDetail as a full-screen overlay.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ChevronDown, BookOpen } from "lucide-react";

import { projectsData } from "../js/ProjectData"; // ← your single source of truth
import ProjectDetail from "./ProjectDetails"; // ← the case-study overlay

/* ── Stats strip data ── */
const stats = [
  { label: "Projects Built", value: "10+", icon: "🚀" },
  { label: "DSA Problems", value: "200+", icon: "🧠" },
  { label: "GFG Problems", value: "150+", icon: "⚡" },
  { label: "LeetCode", value: "200+", icon: "💡" },
];

/* ── Type badge ── */
function TypeBadge({ type, accentColor, accentBg, accentBorder }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${accentColor} ${accentBg} ${accentBorder}`}
    >
      {type}
    </span>
  );
}

/* ── Expandable bullet list ── */
function BulletList({ bullets }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? bullets : bullets.slice(0, 2);
  return (
    <div className="mt-4 space-y-2">
      {visible.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-2.5 text-sm text-slate-400"
        >
          <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/50" />
          {b}
        </motion.div>
      ))}
      {bullets.length > 2 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 flex items-center gap-1 font-mono text-[11px] text-slate-600 transition-colors hover:text-slate-300"
        >
          <ChevronDown
            size={12}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
          {expanded ? "show less" : `+${bullets.length - 2} more`}
        </button>
      )}
    </div>
  );
}

/* ── "Read Case Study" button ── */
function CaseStudyButton({ onClick, accentColor, accentBorder, accentBg }) {
  return (
    <button
      onClick={onClick}
      className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-xs transition-all hover:brightness-110 ${accentColor} ${accentBorder} ${accentBg}`}
    >
      <BookOpen size={13} />
      Read Case Study
      <ArrowUpRight size={11} />
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main component
══════════════════════════════════════════════════════════════ */
export default function Project() {
  // activeId  → which card's details are expanded inline (show/hide bullets)
  // detailId  → which project's full case-study overlay is open
  const [activeId, setActiveId] = useState(null);
  const [detailId, setDetailId] = useState(null);

  const featured = projectsData.find((p) => p.featured);
  const rest = projectsData.filter((p) => !p.featured);

  return (
    <>
      {/* ── Full-screen case-study overlay ── */}
      <AnimatePresence>
        {detailId && (
          <ProjectDetail
            projectId={detailId}
            onBack={() => setDetailId(null)}
          />
        )}
      </AnimatePresence>

      <section
        id="projects"
        className="relative bg-transparent px-4 py-28 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* ── Section header ── */}
          <div className="mb-14">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-200"
            >
              Case Studies
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl"
            >
              Real projects.{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Real impact.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="mt-4 max-w-2xl text-slate-400"
            >
              From open-source tools to client deployments — spanning full-stack
              web apps, system-level C++ tools, and AI-integrated platforms.
            </motion.p>
          </div>

          {/* ── Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.93 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 text-center"
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="mt-2 font-mono text-2xl font-bold text-white">
                  {s.value}
                </span>
                <span className="mt-1 text-xs text-slate-500">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Featured project card ── */}
          {featured && (
            <motion.article
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-5 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#07111f]/80 backdrop-blur-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${featured.gradient} opacity-80 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

              <div className="relative z-10 grid gap-8 p-7 md:grid-cols-[1fr_auto] md:p-10">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-2.5">
                    <TypeBadge
                      type={featured.type}
                      accentColor={featured.accentColor}
                      accentBg={featured.accentBg}
                      accentBorder={featured.accentBorder}
                    />
                    <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                      {featured.category}
                    </span>
                    <span className="ml-auto font-mono text-[11px] text-slate-600">
                      {featured.year}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white md:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-slate-300">
                    {featured.summary}
                  </p>

                  <BulletList bullets={featured.bullets} />

                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* ★ Case Study button on featured card */}
                  <CaseStudyButton
                    onClick={() => setDetailId(featured.id)}
                    accentColor={featured.accentColor}
                    accentBorder={featured.accentBorder}
                    accentBg={featured.accentBg}
                  />
                </div>

                <div className="flex flex-row items-start gap-3 md:flex-col md:items-end md:justify-between">
                  <div
                    className={`rounded-xl border px-4 py-3 text-center ${featured.accentBorder} ${featured.accentBg}`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                      Impact
                    </p>
                    <p
                      className={`mt-1 text-sm font-medium ${featured.accentColor}`}
                    >
                      {featured.impact}
                    </p>
                  </div>
                  {featured.github && (
                    <a
                      href={featured.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:border-cyan-300/40 hover:text-cyan-300"
                    >
                      <Github size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          )}

          {/* ── Rest of projects (3-col grid) ── */}
          <div className="grid gap-5 md:grid-cols-3">
            {rest.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.22 } }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#07111f]/80 backdrop-blur-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px]" />
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${p.accentBorder} to-transparent`}
                />

                <div className="relative z-10 flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <TypeBadge
                      type={p.type}
                      accentColor={p.accentColor}
                      accentBg={p.accentBg}
                      accentBorder={p.accentBorder}
                    />
                    <span className="font-mono text-[11px] text-slate-600">
                      {p.year}
                    </span>
                  </div>

                  <p
                    className={`mb-1 font-mono text-[10px] uppercase tracking-widest opacity-70 ${p.accentColor}`}
                  >
                    {p.category}
                  </p>
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {p.summary}
                  </p>

                  {/* Expandable bullets */}
                  <AnimatePresence>
                    {activeId === p.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <BulletList bullets={p.bullets} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => setActiveId(activeId === p.id ? null : p.id)}
                    className={`mt-2 flex items-center gap-1 font-mono text-[11px] opacity-70 transition-opacity hover:opacity-100 ${p.accentColor}`}
                  >
                    <ChevronDown
                      size={12}
                      className={`transition-transform ${activeId === p.id ? "rotate-180" : ""}`}
                    />
                    {activeId === p.id ? "hide details" : "show details"}
                  </button>

                  <div className="flex-1" />

                  {/* Stack pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-slate-400"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="rounded-full border border-white/[0.08] px-2.5 py-0.5 font-mono text-[10px] text-slate-600">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer row: impact + github + ★ case study */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/[0.05] pt-4">
                    <span
                      className={`font-mono text-[11px] opacity-80 ${p.accentColor}`}
                    >
                      {p.impact}
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                      {/* ★ Case Study button on every card */}
                      <button
                        onClick={() => setDetailId(p.id)}
                        className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[11px] transition-all hover:brightness-110 ${p.accentColor} ${p.accentBorder} ${p.accentBg}`}
                      >
                        <BookOpen size={11} />
                        Case Study
                      </button>
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] text-slate-500 transition-all hover:border-white/20 hover:text-white"
                        >
                          <Github size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ── Coding practice strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#07111f]/70 backdrop-blur-xl"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
            <div className="grid gap-5 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-8">
              <div>
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/[0.07] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-300">
                    Coding Practice
                  </span>
                  <span className="font-mono text-[11px] text-slate-600">
                    2023 – Present
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Competitive Programming
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Solved <span className="font-medium text-white">200+</span>{" "}
                  DSA problems on{" "}
                  <span className="text-amber-300">LeetCode</span> and{" "}
                  <span className="font-medium text-white">150+</span> on{" "}
                  <span className="text-amber-300">GeeksforGeeks</span> to
                  sharpen problem-solving abilities.
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-amber-300/25 bg-amber-300/[0.06] px-4 py-2.5 font-mono text-sm text-amber-200 transition-all hover:border-amber-300/50"
                >
                  LeetCode <ArrowUpRight size={13} />
                </a>
                <a
                  href="https://geeksforgeeks.org"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-emerald-300/25 bg-emerald-300/[0.06] px-4 py-2.5 font-mono text-sm text-emerald-200 transition-all hover:border-emerald-300/50"
                >
                  GFG <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── GitHub CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-5 flex justify-center"
          >
            <a
              href="https://github.com/Mdfaijan2003"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-7 py-4 text-slate-300 transition-all hover:border-cyan-300/30 hover:bg-cyan-300/[0.04] hover:text-white"
            >
              <Github
                size={17}
                className="text-slate-500 transition-colors group-hover:text-cyan-300"
              />
              <span className="font-mono text-sm">
                View all projects on <span className="text-white">GitHub</span>
              </span>
              <ArrowUpRight
                size={13}
                className="text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300"
              />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
