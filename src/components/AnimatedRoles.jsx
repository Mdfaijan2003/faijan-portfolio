/**
 * AnimatedRoles.jsx — Enhanced
 * Cycles through roles with a smooth exit/enter animation.
 * Uses AnimatePresence so the outgoing text slides up while the new one slides in.
 */
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Backend Specialist",
  "Cloud Engineer",
  "Problem Solver",
  "CP Enthusiast",
];

export default function AnimatedRoles() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setIndex((p) => (p + 1) % roles.length), 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="relative mt-3 h-9 overflow-hidden font-mono text-xl text-cyan-300 md:h-10 md:text-2xl">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 flex items-center gap-2 whitespace-nowrap"
        >
          <span className="text-slate-600">&gt;</span>
          {roles[index]}
          <span
            className="inline-block h-5 w-2 rounded-sm bg-cyan-300/80"
            style={{ animation: "roleBlink 1s steps(1) infinite" }}
          />
        </motion.span>
      </AnimatePresence>
      <style>{`
        @keyframes roleBlink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
