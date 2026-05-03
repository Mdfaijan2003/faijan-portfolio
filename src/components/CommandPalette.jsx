/**
 * CommandPalette.jsx — Enhanced
 * Full-screen overlay on mobile; compact spotlight on desktop.
 * Accepts onNavigate callback so Header can drive smooth-scroll.
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const commands = [
  { id: "about", label: "About", icon: "👤", desc: "Who I am" },
  { id: "skills", label: "Skills", icon: "⚡", desc: "What I build with" },
  { id: "projects", label: "Projects", icon: "🚀", desc: "Case studies" },
  { id: "education", label: "Education", icon: "🎓", desc: "Credentials" },
  { id: "contact", label: "Contact", icon: "✉️", desc: "Start a conversation" },
];

export default function CommandPalette({ open, setOpen, onNavigate }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.desc.toLowerCase().includes(query.toLowerCase()),
      )
    : commands;

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const go = (id) => {
    onNavigate?.(id);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[18vh]"
          style={{ background: "rgba(3,10,20,0.88)" }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            key="palette-box"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#07111f] shadow-[0_24px_64px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3.5">
              <span className="font-mono text-sm text-cyan-400">$</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="navigate to..."
                className="flex-1 bg-transparent font-mono text-sm text-white placeholder-slate-600 outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="rounded border border-white/10 px-2 py-0.5 font-mono text-[11px] text-slate-500 transition-colors hover:text-slate-300"
              >
                esc
              </button>
            </div>

            {/* Results */}
            <div className="py-2">
              {filtered.map((cmd, i) => (
                <motion.button
                  key={cmd.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => go(cmd.id)}
                  className="group flex w-full items-center gap-3.5 px-4 py-3 transition-colors hover:bg-cyan-300/[0.06]"
                >
                  <span className="text-base">{cmd.icon}</span>
                  <span className="flex-1 text-left">
                    <span className="block font-mono text-sm text-slate-200 group-hover:text-white">
                      &gt; {cmd.label.toLowerCase()}
                    </span>
                    <span className="block text-xs text-slate-600">
                      {cmd.desc}
                    </span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-600 opacity-0 transition-opacity group-hover:opacity-100">
                    ↵
                  </span>
                </motion.button>
              ))}
              {filtered.length === 0 && (
                <p className="px-4 py-4 text-center font-mono text-xs text-slate-600">
                  no commands match &quot;{query}&quot;
                </p>
              )}
            </div>

            <div className="border-t border-white/[0.05] px-4 py-2.5 text-[11px] text-slate-600">
              <span className="font-mono">↑↓</span> navigate &nbsp;·&nbsp;
              <span className="font-mono">↵</span> select &nbsp;·&nbsp;
              <span className="font-mono">esc</span> close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
