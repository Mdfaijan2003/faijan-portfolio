import { Suspense, lazy, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionLoader from "./components/SectionLoader";
import AboutSection from "./components/AboutSection";
import Layout from "./layout/MainLayout";

const Hero = lazy(() => import("./components/Hero"));
const Project = lazy(() => import("./components/Project"));
const SkillsSection = lazy(() => import("./components/SkillSection"));
const EducationSection = lazy(() => import("./components/EducationSection"));
const ContactSection = lazy(() => import("./components/ContactSection"));

export default function App() {
  /* ── Click ripple effect ── */
  useEffect(() => {
    const handleClick = (e) => {
      const ripple = document.createElement("span");
      ripple.className = "fluid-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1200);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <Layout>
      <Header />

      <main className="relative z-10 pt-[90px] md:pt-[100px]">
        <Suspense fallback={<SectionLoader label="Loading hero" />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<SectionLoader label="Loading about" />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionLoader label="Loading projects" />}>
          <Project />
        </Suspense>

        <Suspense fallback={<SectionLoader label="Loading skills" />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader label="Loading education" />}>
          <EducationSection />
        </Suspense>

        <Suspense fallback={<SectionLoader label="Loading contact" />}>
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </Layout>
  );
}
