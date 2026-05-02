import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVG as React Component
import PythonIcon from "../assets/udemy courses moocs.svg";
import Business from "../assets/udemy 3.5.svg";
import QuickBooks from "../assets/UC-180.5hr.svg";
import Critical from "../assets/Critical thinking udemy.svg";
import Finance from "../assets/certificate introduction to basics of finanace.svg";

// (Optional) Example image import (recommended instead of /public path)
// import btechImg from "../assets/certificates/btech.jpg";

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
        "Database Management Systems",
        "Full Stack Development",
        "C++ Development",
        "Windows Development",
      ],
      image: "/certificates/btech.jpg", // or use imported image
    },
    {
      id: "Class X",
      label: "Class X",
      title: "Secondary Education",
      institution: "St. Soldier Convent High School",
      year: "2019 – 2020",
      score: "Percentage: 70%",

      details: ["Science", "Maths", "English", "Bengali"],
      image: "/certificates/btech.jpg", // or use imported image
    },
    {
      id: "Class XII",
      label: "Class XII",
      title: "Higher Secondary Education",
      institution: "St. Soldier Convent High School",
      year: "2020 – 2022",
      score: "Percentage: 80%",

      details: ["Science", "Maths", "English"],
      image: "/certificates/btech.jpg", // or use imported image
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
      image: PythonIcon, // ✅ FIXED
    },
    {
      id: "webdev",
      label: "Web Dev",
      title: "Full Stack Web Development",
      institution: "UDEMY",
      year: "2025",
      score: "Advanced",
      details: [
        "React & Tailwind CSS",
        "Node.js Backend",
        "Web Performance",
        "HTML",
        "CSS",
        "TailwindCSS",
        "MongoDB",
        "NEXT.js",
      ],
      image: Business,
    },
    {
      id: "QuickBooks",
      label: "QuickBooks",
      title: "QuickBooks : A Comprehensive Guide",
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
      id: "Critical Thinking",
      label: "Critical Thinking",
      title: "Critical Thinking Masterclass: Boost Your Problem-Solving Skills",
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
      id: "Entrepreneurship",
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

export default function EducationSection() {
  const categories = Object.keys(educationData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeItemId, setActiveItemId] = useState(
    educationData[categories[0]][0].id,
  );

  const activeItem = educationData[activeCategory].find(
    (item) => item.id === activeItemId,
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveItemId(educationData[cat][0].id);
  };

  const bgGradients = {
    Academic:
      "bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.15),transparent_60%)]",
    Technical:
      "bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.15),transparent_60%)]",
    Business:
      "bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.15),transparent_60%)]",
  };

  const accentColors = {
    Academic: "text-cyan-400",
    Technical: "text-sky-400",
    Business: "text-indigo-400",
  };

  const borderColors = {
    Academic: "border-cyan-400/30 hover:border-cyan-400/60",
    Technical: "border-sky-400/30 hover:border-sky-400/60",
    Business: "border-indigo-400/30 hover:border-indigo-400/60",
  };

  return (
    <section
      className={`relative bg-[#030814] py-16 md:py-24 px-4 md:px-8 lg:px-24 overflow-hidden transition-colors duration-700 ${bgGradients[activeCategory]}`}
    >
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`absolute inset-0 pointer-events-none ${bgGradients[activeCategory]}`}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs tracking-[0.3em] text-slate-500 uppercase mb-4">
            Knowledge Architecture
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Structured Learning &{" "}
            <motion.span
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={accentColors[activeCategory]}
            >
              Professional Credentials
            </motion.span>
          </h2>
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-12">
          {/* LEFT */}
          <div className="space-y-8">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;

              return (
                <div key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-left w-full ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  >
                    {cat}
                  </button>

                  {isActive && (
                    <div className="mt-4 ml-4 space-y-2">
                      {educationData[cat].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveItemId(item.id)}
                          className={`block ${
                            activeItemId === item.id
                              ? "text-white"
                              : "text-slate-400"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT */}
          <div>
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white">
                    {activeItem.title}
                  </h3>

                  <p className={accentColors[activeCategory]}>
                    {activeItem.institution}
                  </p>

                  <p className="text-slate-400">
                    {activeItem.year} • {activeItem.score}
                  </p>

                  {/* IMAGE / SVG */}
                  <div
                    className={`border-2 rounded-xl p-4 ${borderColors[activeCategory]}`}
                  >
                    {typeof activeItem.image === "string" ? (
                      <img
                        src={activeItem.image}
                        alt={activeItem.title}
                        className="w-full"
                      />
                    ) : (
                      <activeItem.image className="w-20 h-20 mx-auto" />
                    )}
                  </div>

                  {/* DETAILS */}
                  <ul className="space-y-2">
                    {activeItem.details.map((d, i) => (
                      <li key={i} className="text-slate-400">
                        • {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
