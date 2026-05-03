/**
 * EducationSection.jsx — Enhanced
 * Tabbed explorer UI, matching the unified dark-navy theme.
 * bg-transparent — Layout provides the base.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

// ── keep your original SVG / image imports ──────────────────────────
import PythonIcon from "../assets/udemy courses moocs.svg";
import Business from "../assets/udemy 3.5.svg";
import QuickBooks from "../assets/UC-180.5hr.svg";
import Critical from "../assets/Critical thinking udemy.svg";
import Finance from "../assets/certificate introduction to basics of finanace.svg";

const educationData = {
  Academic: [
    {
      id: "btech",
      label: "B.Tech",
      title: "B.Tech in Computer Science",
      institution: "Netaji Subhash Engineering College",
      year: "2023 – Present",
      score: "CGPA: 8.5",
      details: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "DBMS",
        "Full Stack Development",
        "C++ Development",
      ],
      image: "/certificates/btech.jpg",
    },
    {
      id: "class10",
      label: "Class X",
      title: "Secondary Education",
      institution: "St. Soldier Convent High School",
      year: "2019 – 2020",
      score: "Percentage: 70%",
      details: ["Science", "Mathematics", "English", "Bengali"],
      image: "/certificates/btech.jpg",
    },
    {
      id: "class12",
      label: "Class XII",
      title: "Higher Secondary Education",
      institution: "St. Soldier Convent High School",
      year: "2020 – 2022",
      score: "Percentage: 80%",
      details: ["Science", "Mathematics", "English"],
      image: "/certificates/btech.jpg",
    },
  ],
  Technical: [
    {
      id: "python",
      label: "Python",
      title: "Python & Flask Certification",
      institution: "Udemy Online Certification",
      year: "2024",
      score: "9.5 Hours",
      details: [
        "Flask Web Framework",
        "RESTful APIs",
        "Database Integration",
        "Deployment",
      ],
      image: PythonIcon,
    },
    {
      id: "webdev",
      label: "Web Dev",
      title: "Full Stack Web Development",
      institution: "Udemy",
      year: "2025",
      score: "Advanced",
      details: [
        "React & Tailwind CSS",
        "Node.js Backend",
        "MongoDB",
        "NEXT.js",
        "HTML/CSS",
      ],
      image: Business,
    },
    {
      id: "quickbooks",
      label: "QuickBooks",
      title: "QuickBooks: A Comprehensive Guide",
      institution: "Udemy",
      year: "2025",
      score: "Advanced",
      details: [
        "Financial Management",
        "Bookkeeping",
        "Invoicing & Payments",
        "Tax Preparation",
      ],
      image: QuickBooks,
    },
    {
      id: "critical",
      label: "Critical Thinking",
      title: "Critical Thinking Masterclass",
      institution: "Udemy",
      year: "2024",
      score: "Advanced",
      details: [
        "Logical Reasoning",
        "Analytical Thinking",
        "Creative Problem Solving",
        "Decision Making",
      ],
      image: Critical,
    },
  ],
  Business: [
    {
      id: "finance",
      label: "Finance",
      title: "Introduction to Basics of Finance",
      institution: "Professional Certification",
      year: "2024",
      score: "Completed",
      details: [
        "Financial Statements",
        "Budgeting & Planning",
        "Investment Analysis",
        "Risk Management",
      ],
      image: Finance,
    },
    {
      id: "entrepreneurship",
      label: "Entrepreneurship",
      title: "Introduction to Entrepreneurship",
      institution: "Professional Certification",
      year: "2024",
      score: "Completed",
      details: [
        "Business Planning",
        "Market Research",
        "Funding & Finance",
        "Growth Strategies",
      ],
      image: Business,
    },
  ],
};

const categoryAccent = {
  Academic: {
    text: "text-cyan-300",
    border: "border-cyan-300/40",
    bg: "bg-cyan-300/[0.07]",
    dot: "bg-cyan-400",
  },
  Technical: {
    text: "text-sky-300",
    border: "border-sky-300/40",
    bg: "bg-sky-300/[0.07]",
    dot: "bg-sky-400",
  },
  Business: {
    text: "text-violet-300",
    border: "border-violet-300/40",
    bg: "bg-violet-300/[0.07]",
    dot: "bg-violet-400",
  },
};

export default function EducationSection() {
  const categories = Object.keys(educationData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeItemId, setActiveItemId] = useState(
    educationData[categories[0]][0].id,
  );

  const activeItem = educationData[activeCategory].find(
    (i) => i.id === activeItemId,
  );
  const accent = categoryAccent[activeCategory];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveItemId(educationData[cat][0].id);
  };

  return (
    <section
      id="education"
      className="relative bg-transparent px-4 py-28 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.28em] text-slate-600"
          >
            Knowledge Architecture
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="mt-4 text-3xl font-bold text-white md:text-5xl"
          >
            Structured Learning &{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={accent.text}
              >
                Professional Credentials
              </motion.span>
            </AnimatePresence>
          </motion.h2>
        </div>

        {/* Main panel */}
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#07111f]/70 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          {/* Top glow */}
          <div
            className={`h-px w-full bg-gradient-to-r from-transparent ${accent.border} to-transparent transition-all duration-500`}
          />

          <div className="grid md:grid-cols-[240px_1fr]">
            {/* LEFT: category + item nav */}
            <div className="border-b border-white/[0.06] p-6 md:border-b-0 md:border-r md:p-8">
              <div className="space-y-6">
                {categories.map((cat) => {
                  const ca = categoryAccent[cat];
                  const isActiveCat = activeCategory === cat;
                  return (
                    <div key={cat}>
                      <button
                        onClick={() => handleCategoryChange(cat)}
                        className={`flex items-center gap-2.5 text-sm font-medium transition-colors ${
                          isActiveCat
                            ? "text-white"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            isActiveCat ? ca.dot : "bg-slate-700"
                          }`}
                        />
                        {cat}
                      </button>

                      <AnimatePresence>
                        {isActiveCat && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 ml-4 space-y-1.5 overflow-hidden"
                          >
                            {educationData[cat].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => setActiveItemId(item.id)}
                                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-all ${
                                  activeItemId === item.id
                                    ? `${ca.bg} ${ca.text} border ${ca.border}`
                                    : "text-slate-500 hover:text-slate-300"
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: item detail */}
            <div className="p-7 md:p-10">
              <AnimatePresence mode="wait">
                {activeItem && (
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.32 }}
                    className="space-y-6"
                  >
                    <div>
                      <p
                        className={`font-mono text-[11px] uppercase tracking-widest ${accent.text}`}
                      >
                        {activeCategory}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-white">
                        {activeItem.title}
                      </h3>
                      <p className="mt-1 text-slate-400">
                        {activeItem.institution}
                      </p>
                      <p className="mt-1 font-mono text-sm text-slate-500">
                        {activeItem.year} · {activeItem.score}
                      </p>
                    </div>

                    {/* Certificate image */}
                    <div
                      className={`overflow-hidden rounded-2xl border-2 ${accent.border} bg-white/[0.02]`}
                    >
                      {typeof activeItem.image === "string" ? (
                        <img
                          src={activeItem.image}
                          alt={activeItem.title}
                          className="w-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center p-8">
                          <activeItem.image className="h-24 w-24 opacity-80" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div>
                      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-600">
                        Covered Topics
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeItem.details.map((d) => (
                          <span
                            key={d}
                            className={`rounded-full border px-3 py-1 font-mono text-[11px] ${accent.bg} ${accent.border} ${accent.text}`}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
