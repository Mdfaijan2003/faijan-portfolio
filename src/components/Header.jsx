/**
 * Header.jsx — Enhanced
 * Fixed top nav with terminal aesthetic, active-section tracking,
 * smooth scroll, animated underline indicator, and mobile command palette.
 */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommandPalette from "./CommandPalette";

const sections = ["about", "skills", "projects", "education", "contact"];

export default function Header() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* ── scroll spy ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Walk sections in order; last one whose top is <= 160px wins
      let current = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Cmd+K shortcut ── */
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const scrollTo = useCallback((id) => {
    setActive(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* ── Desktop Header ── */}
      <header
        className={`fixed left-0 top-0 z-50 hidden w-full font-mono md:block transition-all duration-500 ${
          scrolled
            ? "border-b border-cyan-300/10 bg-[#030a14]/85 backdrop-blur-xl shadow-[0_1px_0_rgba(34,211,238,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3.5">
          {/* Left — session tag */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] shadow-[0_0_6px_rgba(255,95,86,0.6)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_rgba(255,189,46,0.5)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.5)]" />
            </div>
            <span className="text-xs text-slate-500">
              session: <span className="text-cyan-300">faijan@dev</span>
            </span>
          </motion.div>

          {/* Centre — nav */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-1"
          >
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="relative px-4 py-1.5 text-xs transition-colors duration-200"
              >
                <span
                  className={`transition-colors duration-200 ${
                    active === s
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {active === s ? `[ ${s} ]` : s}
                </span>
                {active === s && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md border border-cyan-300/25 bg-cyan-300/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
              </button>
            ))}
          </motion.nav>

          {/* Right — CTA */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-slate-400 transition-colors hover:border-cyan-300/30 hover:text-slate-200"
            >
              <span>⌘K</span>
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="group relative overflow-hidden rounded-full border border-cyan-300/40 px-5 py-2 text-xs text-cyan-200 transition-all hover:border-cyan-300/80 hover:text-white"
            >
              <span className="relative z-10">Let&apos;s Talk →</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </button>
          </motion.div>
        </div>

        {/* Thin prompt line */}
        <div className="border-t border-white/[0.04] bg-[#030a14]/60 px-8 py-2">
          <span className="font-mono text-[11px] text-slate-600">
            <span className="text-cyan-400/70">$</span> open{" "}
            <span className="text-slate-300">{active}</span>
            <span className="ml-1 animate-pulse text-cyan-300/80">▌</span>
          </span>
        </div>
      </header>

      {/* ── Mobile Header ── */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.07] bg-[#030a14]/80 font-mono backdrop-blur-xl md:hidden">
        <div className="flex h-14 items-center justify-between px-5">
          <span className="text-sm font-semibold text-cyan-300">
            faijan<span className="text-slate-500">@dev</span>
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="text-lg text-cyan-300 transition-transform active:scale-90"
            >
              ⌘
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="rounded-full border border-cyan-300/50 px-3.5 py-1.5 text-xs text-cyan-200 transition-all hover:bg-cyan-300/10"
            >
              Hire Me →
            </button>
          </div>
        </div>
      </header>

      <CommandPalette open={open} setOpen={setOpen} onNavigate={scrollTo} />
    </>
  );
}
