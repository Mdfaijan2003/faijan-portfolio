/**
 * ProjectDetail.jsx
 * ─────────────────────────────────────────────────────────────
 * Full case-study / blog page for each project.
 * Rendered as an overlay/page when user clicks "Read Case Study".
 *
 * Props:
 *   projectId  — string id matching projectsData
 *   onBack     — callback to close and return to portfolio
 */
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Code2,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { projectsData } from "../js/ProjectData"; // ← your single source of truth

/* ── Difficulty colour ── */
const diffColor = {
  Hard: "text-rose-300 border-rose-300/30 bg-rose-300/[0.07]",
  Medium: "text-amber-300 border-amber-300/30 bg-amber-300/[0.07]",
  Easy: "text-emerald-300 border-emerald-300/30 bg-emerald-300/[0.07]",
};

/* ── Section heading ── */
function SectionHeading({ icon: Icon, label, color = "text-cyan-300" }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] ${color}`}
      >
        <Icon size={15} />
      </span>
      <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
        {label}
      </h2>
    </div>
  );
}

/* ── Tech choice card ── */
function TechCard({ item, accentColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className={`font-mono text-sm font-bold ${accentColor}`}>
          {item.tech}
        </span>
        <Code2 size={13} className="text-slate-600" />
      </div>
      <p className="mb-3 text-sm leading-relaxed text-slate-300">{item.why}</p>
      {item.tradeoff && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-300/15 bg-amber-300/[0.05] p-3">
          <AlertTriangle size={13} className="mt-0.5 shrink-0 text-amber-400" />
          <p className="text-xs leading-relaxed text-slate-400">
            {item.tradeoff}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function ProjectDetail({ projectId, onBack }) {
  const project = projectsData.find((p) => p.id === projectId);
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!project) return null;

  return (
    <motion.div
      key="project-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] overflow-y-auto"
      style={{ background: "#030a14" }}
      ref={topRef}
    >
      {/* Ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div
          className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 65%)",
          }}
        />
      </div>
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,215,255,0.8) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ── Back button ── */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="group mb-10 flex items-center gap-2.5 font-mono text-sm text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to projects
        </motion.button>

        {/* ── Hero header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="relative mb-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#07111f]/90 p-8 md:p-12"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.headerGradient} opacity-80`}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

          <div className="relative z-10">
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${project.accentColor} ${project.accentBg} ${project.accentBorder}`}
              >
                {project.type}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                {project.category}
              </span>
              <span className="ml-auto font-mono text-[11px] text-slate-600">
                {project.year}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {project.title}
            </h1>
            <p className={`mt-2 font-mono text-sm ${project.accentColor}`}>
              {project.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-slate-400 leading-relaxed">
              {project.summary}
            </p>

            {/* Stack pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-6 flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-sm text-slate-300 transition-all hover:border-cyan-300/40 hover:text-white"
              >
                <Github size={14} /> GitHub
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-sm transition-all hover:text-white ${project.accentBorder} ${project.accentBg} ${project.accentColor}`}
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              <div
                className={`ml-auto flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] ${project.accentBorder} ${project.accentBg} ${project.accentColor}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                {project.status}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Overview ── */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-2xl border border-white/[0.07] bg-[#07111f]/60 p-7 md:p-9"
        >
          <SectionHeading
            icon={Lightbulb}
            label="Project Overview"
            color="text-amber-300"
          />
          <div className="space-y-4 text-slate-300 leading-relaxed">
            {project.overview
              .trim()
              .split("\n\n")
              .map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
          </div>
        </motion.section>

        {/* ── Why Built ── */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-2xl border border-white/[0.07] bg-[#07111f]/60 p-7 md:p-9"
        >
          <SectionHeading
            icon={Zap}
            label="Why This Was Built"
            color="text-sky-300"
          />
          <p className="text-slate-300 leading-relaxed">{project.whyBuilt}</p>
        </motion.section>

        {/* ── Tech Choices ── */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-cyan-300">
              <Code2 size={15} />
            </span>
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
              Technology Decisions
            </h2>
          </div>
          <div className="space-y-4">
            {project.techChoices.map((item, i) => (
              <TechCard key={i} item={item} accentColor={project.accentColor} />
            ))}
          </div>
        </motion.section>

        {/* ── What Worked / Not Optimized — two columns ── */}
        <div className="mb-12 grid gap-5 md:grid-cols-2">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.04] p-7"
          >
            <SectionHeading
              icon={CheckCircle2}
              label="What Worked Well"
              color="text-emerald-300"
            />
            <ul className="space-y-3">
              {project.whatWorked.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-7"
          >
            <SectionHeading
              icon={AlertTriangle}
              label="Known Gaps / Not Optimized"
              color="text-amber-300"
            />
            <ul className="space-y-3">
              {project.whatNotOptimized.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* ── Key Learnings ── */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-2xl border border-violet-300/15 bg-violet-300/[0.04] p-7 md:p-9"
        >
          <SectionHeading
            icon={Lightbulb}
            label="Key Learnings"
            color="text-violet-300"
          />
          <div className="space-y-4">
            {project.keyLearnings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <span className="mt-0.5 font-mono text-xs text-violet-400 opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-slate-300">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Footer nav ── */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-8">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 font-mono text-sm text-slate-500 transition-colors hover:text-white"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            All projects
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 rounded-xl border px-5 py-2.5 font-mono text-sm transition-all hover:text-white ${project.accentBorder} ${project.accentBg} ${project.accentColor}`}
            >
              <Github size={14} /> View on GitHub <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
