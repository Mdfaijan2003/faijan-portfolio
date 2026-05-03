/**
 * ContactSection.jsx — Enhanced
 * bg-transparent — Layout provides unified dark navy.
 */
import React, { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  Terminal,
  Clock3,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Field({
  num,
  label,
  id,
  type = "text",
  value,
  onChange,
  as = "input",
  rows,
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const Tag = as;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: num * 0.06 }}
      className="relative"
    >
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 select-none font-mono transition-all duration-200 ${
          focused || filled
            ? "top-2 text-[10px] text-cyan-400"
            : "top-[15px] text-xs text-slate-500"
        }`}
      >
        <span className="mr-1 text-cyan-400/70">
          {String(num).padStart(2, "0")}.
        </span>
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        rows={rows}
        className={`w-full rounded-xl border bg-[#040e1c] text-slate-100 outline-none transition-all duration-200 ${
          as === "textarea"
            ? "min-h-[110px] resize-none px-4 pb-3 pt-8"
            : "h-[56px] px-4 pb-2 pt-7"
        } ${focused ? "border-cyan-400 shadow-[0_0_0_3px_rgba(34,211,238,0.1)]" : filled ? "border-slate-700" : "border-slate-800"}`}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-b-xl bg-gradient-to-r from-cyan-400 to-teal-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.22 }}
      />
    </motion.div>
  );
}

function SocialLink({ href, icon: Icon, label, sublabel, delay }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-4 text-slate-300 transition-colors hover:text-white"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 transition-all group-hover:border-cyan-400/50 group-hover:bg-cyan-400/[0.08]">
        <Icon
          size={17}
          className="text-slate-500 transition-colors group-hover:text-cyan-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="mb-0.5 font-mono text-[10px] uppercase tracking-widest text-slate-600">
          {sublabel}
        </p>
        <p className="truncate text-sm font-medium">{label}</p>
      </div>
      <ArrowUpRight
        size={13}
        className="shrink-0 text-slate-700 opacity-0 transition-all group-hover:opacity-100 group-hover:text-cyan-300"
      />
    </motion.a>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      const sub = encodeURIComponent(`Contact from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.number}\nMessage: ${form.message}`,
      );
      window.open(
        `mailto:mdfaijancoder@gmail.com?subject=${sub}&body=${body}`,
        "_blank",
      );
      const wa = encodeURIComponent(
        `Hi, I am ${form.name}. Email: ${form.email}. Message: ${form.message}`,
      );
      window.open(
        `https://wa.me/${form.number.replace(/\D/g, "")}?text=${wa}`,
        "_blank",
      );
      setStatus("sent");
    }, 1100);
  };

  return (
    <section
      id="contact"
      className="relative bg-transparent px-4 py-28 font-sans sm:px-6 lg:px-8"
    >
      <div className="relative mx-auto w-full max-w-5xl">
        <div className="mb-14 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            Available for new projects
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl font-bold tracking-tight text-white md:text-5xl"
          >
            Let&apos;s Build{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent">
              Something Remarkable.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-4 max-w-xl text-slate-400"
          >
            Available for product builds, architecture consulting, and
            performance-focused web experiences.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#07111f]/80 shadow-2xl backdrop-blur-xl"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] shadow-[0_0_5px_rgba(255,95,86,0.5)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <Terminal size={11} className="text-cyan-400" />
              <span className="text-cyan-300/70">~/</span>faijan/contact.ts
              <span className="ml-1 rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-400">
                ● live
              </span>
            </div>
            <div className="w-16" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
            <div className="border-b border-white/[0.06] p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="mb-7 space-y-1.5 font-mono text-[13px]">
                {[
                  {
                    key: "status",
                    val: '"Open to work"',
                    color: "text-emerald-300",
                  },
                  {
                    key: "response",
                    val: '"< 24 hours"',
                    color: "text-sky-300",
                  },
                  {
                    key: "timezone",
                    val: '"IST (UTC+5:30)"',
                    color: "text-violet-300",
                  },
                ].map(({ key, val, color }, i) => (
                  <motion.p
                    key={key}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + i * 0.08 }}
                    className="text-slate-300"
                  >
                    <span className="text-violet-400">const </span>
                    <span className="text-cyan-300">{key}</span>
                    <span className="text-slate-600"> = </span>
                    <span className={color}>{val}</span>
                    <span className="text-slate-700">;</span>
                  </motion.p>
                ))}
              </div>
              <div className="mb-7 rounded-xl border border-cyan-300/12 bg-cyan-300/[0.05] p-4">
                <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">
                  <Clock3 size={11} /> Response SLA
                </div>
                <p className="text-sm leading-relaxed text-slate-400">
                  I prioritise project-fit messages and usually reply within the
                  same business day.
                </p>
              </div>
              <div className="space-y-5">
                <SocialLink
                  href="mailto:mdfaijancoder@gmail.com"
                  icon={Mail}
                  label="mdfaijancoder@gmail.com"
                  sublabel="Email"
                  delay={0.1}
                />
                <SocialLink
                  href="https://linkedin.com/in/md-faijan-b29052294/"
                  icon={Linkedin}
                  label="LinkedIn Profile"
                  sublabel="Network"
                  delay={0.17}
                />
                <SocialLink
                  href="https://github.com/Mdfaijan2003"
                  icon={Github}
                  label="GitHub Repository"
                  sublabel="Code"
                  delay={0.24}
                />
              </div>
            </div>

            <div className="p-8 lg:p-10">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full flex-col items-center justify-center gap-5 py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 14,
                      }}
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/[0.08]"
                    >
                      <CheckCircle2 size={32} className="text-emerald-400" />
                    </motion.div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-white">
                        Message sent!
                      </h3>
                      <p className="text-sm text-slate-400">
                        Your email client and WhatsApp have been opened.
                        <br />
                        I&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setForm({
                          name: "",
                          email: "",
                          number: "",
                          message: "",
                        });
                        setStatus("idle");
                      }}
                      className="rounded-xl border border-slate-700 px-5 py-2 text-sm text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field
                        num={1}
                        label="Name"
                        id="name"
                        value={form.name}
                        onChange={onChange}
                      />
                      <Field
                        num={2}
                        label="Email"
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                      />
                    </div>
                    <Field
                      num={3}
                      label="Phone Number"
                      id="number"
                      type="tel"
                      value={form.number}
                      onChange={onChange}
                    />
                    <Field
                      num={4}
                      label="Message"
                      id="message"
                      as="textarea"
                      rows={5}
                      value={form.message}
                      onChange={onChange}
                    />
                    <div className="flex justify-end">
                      <span
                        className={`font-mono text-[11px] tabular-nums ${form.message.length > 420 ? "text-amber-400" : "text-slate-700"}`}
                      >
                        {form.message.length} / 500
                      </span>
                    </div>
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{
                        y: -2,
                        boxShadow: "0 8px 28px -4px rgba(34,211,238,0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="relative mt-2 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-300 to-teal-300 px-6 py-3.5 font-semibold text-slate-950 transition-all disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={17} className="animate-spin" /> Opening
                          channels...
                        </>
                      ) : (
                        <>
                          <Send size={17} /> Send Message
                        </>
                      )}
                      <span
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        style={{ animation: "shimmer 2.5s infinite" }}
                      />
                    </motion.button>
                    <p className="text-center font-mono text-[11px] text-slate-700">
                      Opens email client &amp; WhatsApp automatically.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
      <style>{`@keyframes shimmer { to { transform: translateX(200%); } }`}</style>
    </section>
  );
}
