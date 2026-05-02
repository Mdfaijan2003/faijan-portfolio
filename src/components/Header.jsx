import { useState } from "react";
import CommandPalette from "./CommandPalette";
import { Button } from "./ui/button";
import { useRef } from "react";

const sections = ["about", "skills", "projects", "experience", "contact"];

export default function Header() {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (section) => {
    setActive(section);
    window.scrollTo({
      top:
        section === "about"
          ? aboutRef.current.offsetTop
          : section === "skills"
            ? skillsRef.current.offsetTop
            : section === "projects"
              ? projectsRef.current.offsetTop
              : section === "experience"
                ? experienceRef.current.offsetTop
                : contactRef.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="left-0 top-0 z-50 hidden w-full font-mono md:block">
        <div className="flex items-center justify-between pr-10">
          <div className="flex items-center gap-6 bg-[#081826]/70 px-8 py-4 backdrop-blur-md">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <div className="text-sm text-slate-400">
              session: <span className="text-cyan-300">faijan@dev</span>
            </div>
          </div>

          <Button className="rounded-full border border-cyan-300/70 px-4 py-2 text-sm text-cyan-300 transition-all duration-300 hover:bg-cyan-300 hover:text-black">
            Let&apos;s Talk →
          </Button>
        </div>

        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

        <div className="bg-[#09172a]/70 px-10 py-4 backdrop-blur-md">
          <div className="mb-4 text-sm text-slate-400">
            <span className="text-cyan-300">$</span> open{" "}
            <span className="text-white">{active}</span>
            <span className="ml-1 animate-pulse text-cyan-300">▌</span>
          </div>

          <div className="flex gap-8 text-sm">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`transition-all duration-300 ${
                  active === section
                    ? "text-cyan-300"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                {active === section ? `[ ${section} ]` : section}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#081826]/70 font-mono backdrop-blur-md md:hidden">
        <div className="flex h-[60px] items-center justify-between px-6">
          <h1 className="text-lg font-semibold tracking-wide text-cyan-300">
            faijan<span className="text-cyan-300">@dev</span>
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="text-xl text-cyan-300"
            >
              ⌘
            </button>

            <Button
              pulseColor="#67e8f9"
              className="rounded-full border border-cyan-300/70 px-4 py-2 text-sm text-cyan-300 transition-all duration-300 hover:bg-cyan-300 hover:text-black"
              duration="1200"
            >
              Hire Me →
            </Button>
          </div>
        </div>
      </div>

      <CommandPalette open={open} setOpen={setOpen} />
    </>
  );
}
