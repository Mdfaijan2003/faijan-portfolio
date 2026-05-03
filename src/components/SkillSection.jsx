/**
 * SkillSection.jsx — Rebuilt with real skills from resume
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillGroups = [
  {
    title: "Data Structures & Algorithms",
    tag: "algorithms",
    description:
      "Engineering-first problem solving with 200+ LeetCode and 150+ GFG problems solved. Strong foundation in C++ with focus on time/space complexity.",
    badges: [
      "Arrays",
      "Trees",
      "Graphs",
      "Dynamic Programming",
      "Segment Trees",
      "Recursion",
    ],
    proficiency: 85,
  },
  {
    title: "React & Next.js",
    tag: "frontend",
    description:
      "Building premium, responsive interfaces with React.js and Next.js. Experienced with Tailwind CSS, Framer Motion, and performance-first development.",
    badges: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
      "HTML/CSS",
    ],
    proficiency: 88,
  },
  {
    title: "Node.js & Express",
    tag: "backend",
    description:
      "Modular backend architectures with clean service boundaries, JWT authentication, rate-limiting, RESTful APIs, and observability hooks.",
    badges: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "Socket.io",
      "Middleware",
    ],
    proficiency: 82,
  },
  {
    title: "Database",
    tag: "data layer",
    description:
      "Designing performant schemas and access patterns. Comfortable with both document-based and relational stores including MongoDB and PostgreSQL.",
    badges: [
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Mongoose",
      "Indexing",
      "Aggregation",
    ],
    proficiency: 78,
  },
  {
    title: "C++ Development",
    tag: "systems",
    description:
      "Low-level systems programming with C++ including Windows API integration, memory management, and performance-critical application development.",
    badges: [
      "C++",
      "STL",
      "Windows API",
      "OOP",
      "Pointers",
      "System Programming",
    ],
    proficiency: 80,
  },
  {
    title: "Cloud & DevOps",
    tag: "infra",
    description:
      "Shipping and operating production workloads with secure deployment workflows. Experience with AWS, DigitalOcean, Docker, and CI/CD pipelines.",
    badges: ["AWS EC2", "S3", "Docker", "CI/CD", "DigitalOcean", "Git"],
    proficiency: 70,
  },
  {
    title: "Python & Flask",
    tag: "scripting",
    description:
      "Building backend services and RESTful APIs with Flask. Comfortable with Python scripting, database integration, and deployment workflows.",
    badges: [
      "Python",
      "Flask",
      "REST APIs",
      "Database Integration",
      "Scripting",
    ],
    proficiency: 72,
  },
  {
    title: "System Design",
    tag: "architecture",
    description:
      "Translating product requirements into scalable architecture using microservices, caching strategies, load balancing, and message queues.",
    badges: [
      "Microservices",
      "Load Balancing",
      "Caching",
      "CDN",
      "Message Queues",
      "REST",
    ],
    proficiency: 68,
  },
];

const languages = [
  { name: "JavaScript", level: 90 },
  { name: "C++", level: 82 },
  { name: "Python", level: 72 },
  { name: "Java", level: 65 },
];

const tools = [
  "Git & GitHub",
  "Docker",
  "VS Code",
  "Postman",
  "Figma",
  "MongoDB Compass",
  "AWS Console",
  "Linux",
];

function ProficiencyBar({ value }) {
  return (
    <div className="mt-5 space-y-1.5">
      <div className="flex justify-between font-mono text-[10px] text-slate-600">
        <span>proficiency</span>
        <span className="text-cyan-400/80">{value}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [active, setActive] = useState(skillGroups[0]);

  return (
    <section
      id="skills"
      className="relative bg-transparent px-4 py-28 sm:px-6 md:px-8 lg:px-12"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Card shell */}
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#07111f]/70 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="mb-12 text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-200">
                Expertise Matrix
              </p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Skills with a{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  Product Engineering
                </span>{" "}
                Lens
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                Built to deliver premium interfaces, maintainable systems, and
                reliable launches.
              </p>
            </div>

            {/* Two-column: preview + skill grid */}
            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
              {/* LEFT: code preview */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="order-2 md:order-1"
              >
                <div className="overflow-hidden rounded-2xl border border-cyan-200/15 bg-[#030d1a] shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_20px_50px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <span className="font-mono text-[11px] text-slate-500">
                      capability-preview.tsx
                    </span>
                    <span className="rounded bg-cyan-300/10 px-1.5 py-0.5 font-mono text-[10px] text-cyan-400">
                      ● live
                    </span>
                  </div>

                  <div className="min-h-[300px] p-6 md:min-h-[340px] md:p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.26 }}
                      >
                        <p className="mb-4 font-mono text-xs">
                          <span className="text-violet-400">const </span>
                          <span className="text-cyan-300">focusArea</span>
                          <span className="text-slate-500"> = </span>
                          <span className="text-emerald-300">
                            &quot;{active.tag}&quot;
                          </span>
                          <span className="text-slate-600">;</span>
                        </p>
                        <h3 className="text-xl font-bold text-white md:text-2xl">
                          {active.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                          {active.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {active.badges.map((b) => (
                            <span
                              key={b}
                              className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1 font-mono text-[11px] text-cyan-200/80"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                        <ProficiencyBar value={active.proficiency} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="mx-4 h-3 rounded-b-xl border-x border-b border-white/[0.06] bg-white/[0.02]" />
                <div className="mx-auto mt-1 h-1 w-20 rounded-full bg-white/[0.05]" />
              </motion.div>

              {/* RIGHT: skill buttons */}
              <div className="order-1 md:order-2">
                <div className="grid grid-cols-2 gap-2.5">
                  {skillGroups.map((skill, i) => {
                    const isActive = active.title === skill.title;
                    return (
                      <motion.button
                        key={skill.title}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setActive(skill)}
                        onClick={() => setActive(skill)}
                        className={`relative overflow-hidden rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "border-cyan-300/50 bg-cyan-300/[0.1] text-white shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                            : "border-white/[0.07] bg-white/[0.03] text-slate-300 hover:border-cyan-300/25 hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="skill-glow"
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-300/10 to-teal-300/5"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 34,
                            }}
                          />
                        )}
                        <span className="relative z-10 mb-1 block font-mono text-[10px] text-slate-600">
                          {skill.tag}
                        </span>
                        <span className="relative z-10 text-[13px] leading-snug">
                          {skill.title}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Languages bar row */}
            <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/70">
                Languages
              </p>
              <div className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-4">
                {languages.map((lang, i) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div className="mb-1.5 flex justify-between">
                      <span className="font-mono text-xs text-slate-300">
                        {lang.name}
                      </span>
                      <span className="font-mono text-[11px] text-slate-600">
                        {lang.level}%
                      </span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tools grid */}
            <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/70">
                Tools & Platforms
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-slate-400 transition-colors hover:border-cyan-300/25 hover:text-slate-200"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
