import React, { useState, useEffect, useRef } from "react";
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
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import emailjs from "@emailjs/browser";

// ── Floating cursor glow ──────────────────────────────────────────────
const CursorGlow = () => {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0"
      style={{
        left: springX,
        top: springY,
        x: "-50%",
        y: "-50%",
        width: 480,
        height: 480,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
      }}
    />
  );
};

// ── Typewriter hook ───────────────────────────────────────────────────
const useTypewriter = (text, speed = 55, startDelay = 400) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return displayed;
};

// ── Field ─────────────────────────────────────────────────────────────
const Field = ({
  num,
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  as = "input",
  rows,
}) => {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const Tag = as;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: num * 0.07 }}
      className="relative"
    >
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 font-mono text-xs select-none ${
          focused || filled
            ? "top-2 text-[10px] text-cyan-400"
            : "top-[14px] text-slate-500"
        }`}
      >
        <span className="text-cyan-300 mr-1">
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
        placeholder=""
        className={`w-full rounded-xl border bg-[#080f1f] text-slate-100 transition-all duration-200 resize-none focus:outline-none ${
          as === "textarea"
            ? "pt-7 pb-3 px-4 min-h-[110px]"
            : "h-[56px] pt-5 pb-1 px-4"
        } ${
          focused
            ? "border-cyan-400 shadow-[0_0_0_3px_rgba(34,211,238,0.12)]"
            : filled
              ? "border-slate-600"
              : "border-slate-700/60"
        }`}
      />

      {/* bottom progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-b-xl bg-gradient-to-r from-cyan-400 to-teal-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.25 }}
      />
    </motion.div>
  );
};

// ── Social link ───────────────────────────────────────────────────────
const SocialLink = ({ href, icon: Icon, label, sublabel, delay }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    initial={{ opacity: 0, x: -14 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ x: 4 }}
    className="group flex items-center gap-4 text-slate-300 transition-colors hover:text-white"
  >
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/50 transition-all duration-300 group-hover:border-cyan-400/60 group-hover:bg-cyan-400/10">
      <Icon
        size={18}
        className="text-slate-400 transition-colors group-hover:text-cyan-300"
      />
    </div>
    <div className="flex-1 min-w-0">
      <div className="mb-0.5 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
        {sublabel}
      </div>
      <div className="font-medium truncate">{label}</div>
    </div>
    <ArrowUpRight
      size={14}
      className="shrink-0 text-slate-600 opacity-0 transition-all group-hover:opacity-100 group-hover:text-cyan-300"
    />
  </motion.a>
);

// ── Main component ────────────────────────────────────────────────────
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const headline = useTypewriter("Let's Build Something", 60, 300);
  const sectionRef = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      console.log("Sending email...");

      const userConfirmationPayload = {
        to_email: formData.email,
        user_name: formData.name,
        user_message: formData.message,
      };

      const ownerNotificationPayload = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.number,
        message: formData.message,
      };

      // 🔹 Send user confirmation
      const userRes = await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID_USER_CONFIRMATION,
        userConfirmationPayload,
        import.meta.env.VITE_PUBLIC_KEY,
      );

      console.log("User email sent:", userRes);

      // 🔹 Send owner notification
      const ownerRes = await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID_OWNER_NOTIFICATION,
        ownerNotificationPayload,
        import.meta.env.VITE_PUBLIC_KEY,
      );

      console.log("Owner email sent:", ownerRes);

      // 🔹 WhatsApp redirect
      const ownerPhone = import.meta.env.VITE_OWNER_PHONE;
      const whatsappMessage = `Hi Md Faijan, I am ${formData.name}. My email is ${formData.email} and my phone is ${formData.number}. Message: ${formData.message}`;

      const whatsappLink = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(whatsappMessage)}`;

      const whatsapp_response = window.open(whatsappLink, "_blank");
      console.log("WhatsApp window opened:", whatsapp_response);

      setStatus("sent");
    } catch (error) {
      console.error("FULL ERROR:", error);

      if (error?.text) {
        console.error("EmailJS Error Text:", error.text);
      }

      if (error?.status) {
        console.error(" Status Code:", error.status);
      }

      alert(
        "Something went wrong while sending the message.\nCheck console for details.",
      );

      setStatus("idle");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", number: "", message: "" });
    setStatus("idle");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-4 py-24 font-sans sm:px-6 lg:px-8"
    >
      <CursorGlow />

      {/* ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-cyan-500/[0.06] blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-teal-500/[0.06] blur-3xl" />
        <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
      </div>

      {/* dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,215,255,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* ── Header ── */}
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-cyan-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            Available for new projects
          </motion.div>

          <h2 className="mb-5 text-5xl font-bold tracking-tight text-white md:text-6xl">
            <span className="font-mono">{headline}</span>
            {headline.length < "Let's Build Something".length ? (
              <span className="animate-pulse text-cyan-300">|</span>
            ) : (
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Remarkable.
              </motion.span>
            )}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-xl text-slate-400 leading-relaxed"
          >
            Available for product builds, architecture consulting, and
            performance-focused web experiences. Let&apos;s make something worth
            talking about.
          </motion.p>
        </div>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07111f]/95 shadow-2xl backdrop-blur-xl"
        >
          {/* top glow line */}
          <div className="absolute left-1/2 top-0 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

          {/* terminal titlebar */}
          <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#0a1628] px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-[0_0_6px_rgba(255,95,86,0.5)]" />
              <div className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_rgba(255,189,46,0.5)]" />
              <div className="h-3 w-3 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.5)]" />
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <Terminal size={12} className="text-cyan-400" />
              <span className="text-cyan-300">~/</span>faijan
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">contact.ts</span>
              <span className="ml-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] text-emerald-300">
                ● live
              </span>
            </div>
            <div className="w-20" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
            {/* ── Left panel ── */}
            <div className="relative border-b border-white/[0.06] p-8 lg:border-b-0 lg:border-r lg:p-10">
              {/* subtle side noise */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />

              {/* code snippet */}
              <div className="mb-8 space-y-1.5 font-mono text-[13px] leading-relaxed">
                {[
                  {
                    prefix: "const",
                    key: "status",
                    value: '"Open to work"',
                    color: "text-emerald-300",
                  },
                  {
                    prefix: "const",
                    key: "response",
                    value: '"< 24 hours"',
                    color: "text-sky-300",
                  },
                  {
                    prefix: "const",
                    key: "timezone",
                    value: '"IST (UTC+5:30)"',
                    color: "text-violet-300",
                  },
                ].map(({ prefix, key, value, color }, i) => (
                  <motion.p
                    key={key}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="text-slate-300"
                  >
                    <span className="text-purple-400">{prefix} </span>
                    <span className="text-cyan-300">{key}</span>
                    <span className="text-slate-500"> = </span>
                    <span className={color}>{value}</span>
                    <span className="text-slate-600">;</span>
                  </motion.p>
                ))}
              </div>

              {/* SLA card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="mb-8 rounded-xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.06] to-teal-300/[0.03] p-4"
              >
                <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cyan-300">
                  <Clock3 size={12} />
                  <span>Response SLA</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-400">
                  I prioritize project-fit messages and usually reply within the
                  same business day. Serious inquiries only, please.
                </p>
              </motion.div>

              {/* socials */}
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
                  delay={0.18}
                />
                <SocialLink
                  href="https://github.com/Mdfaijan2003"
                  icon={Github}
                  label="GitHub Repository"
                  sublabel="Code"
                  delay={0.26}
                />
              </div>
            </div>

            {/* ── Right panel (form) ── */}
            <div className="relative p-8 lg:p-10">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full flex-col items-center justify-center gap-5 py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 14,
                      }}
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10"
                    >
                      <CheckCircle2 size={32} className="text-emerald-400" />
                    </motion.div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-white">
                        Message sent!
                      </h3>
                      <p className="text-sm text-slate-400">
                        Your email client and WhatsApp have been opened.
                        <br />
                        I&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="mt-2 rounded-lg border border-slate-700 px-5 py-2 text-sm text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field
                        num={1}
                        label="Name"
                        id="name"
                        placeholder="your-name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <Field
                        num={2}
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <Field
                      num={3}
                      label="Phone Number"
                      id="number"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.number}
                      onChange={handleChange}
                    />

                    <Field
                      num={4}
                      label="Message"
                      id="message"
                      as="textarea"
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                    />

                    {/* character counter */}
                    <div className="flex justify-end">
                      <span
                        className={`font-mono text-[11px] tabular-nums transition-colors ${formData.message.length > 400 ? "text-amber-400" : "text-slate-600"}`}
                      >
                        {formData.message.length} / 500
                      </span>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{
                        y: -2,
                        boxShadow: "0 8px 24px -4px rgba(34,211,238,0.35)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="relative mt-2 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-300 to-teal-300 px-6 py-3.5 font-semibold text-slate-950 transition-all disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Opening channels...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Send Message</span>
                        </>
                      )}
                      {/* shimmer */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </motion.button>

                    <p className="text-center text-[11px] text-slate-600">
                      Opens your email client &amp; WhatsApp automatically.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* shimmer keyframe */}
      <style>{`
        @keyframes shimmer { to { transform: translateX(200%) } }
      `}</style>
    </section>
  );
};

export default ContactSection;
