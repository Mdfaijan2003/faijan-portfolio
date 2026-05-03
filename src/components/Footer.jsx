/**
 * Footer.jsx — Enhanced
 * Sits flush at the bottom of the page with no extra space below.
 * The border-top acts as a visual section divider against the unified navy Layout bg.
 */
import React from "react";
import { MapPin, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { icon: Mail, href: "mailto:mdfaijancoder@gmail.com", label: "Email" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/md-faijan-b29052294/",
    label: "LinkedIn",
  },
  { icon: Github, href: "https://github.com/Mdfaijan2003", label: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#030a14] px-4 py-6 font-mono sm:px-6 lg:px-8">
      {/* top glow line */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row sm:gap-4">
        {/* Left — copyright */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-xs text-slate-500"
        >
          <span className="text-slate-300 font-medium">
            © {year} Mohammed Faijan.
          </span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="hidden sm:inline">Crafted with precision.</span>
        </motion.div>

        {/* Centre — terminal tag */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="group flex cursor-default items-center gap-1.5 rounded-md border border-slate-800 bg-[#0a1628] px-3 py-1.5 text-xs transition-colors hover:border-slate-700"
        >
          <span className="text-[#FF5F56]">faijan@dev</span>
          <span className="text-slate-600">:</span>
          <span className="text-cyan-400">~</span>
          <span className="text-slate-600">$</span>
          <span className="text-slate-300 transition-colors group-hover:text-white">
            exit
          </span>
        </motion.div>

        {/* Right — location + status + social icons */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="flex items-center gap-4"
        >
          {/* Social icons */}
          <div className="flex items-center gap-2">
            {links.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-800 text-slate-500 transition-all hover:border-cyan-300/30 hover:text-cyan-300"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
            <MapPin size={12} className="text-slate-600" />
            <span>Kolkata, India</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Status */}
          <div className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-[#0a1628] px-2.5 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] text-slate-400">
              All systems normal
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
