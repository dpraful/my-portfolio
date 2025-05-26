import React, { useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Lottie from "react-lottie-player";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import loadingAnimation from "./assets/loading.json"; // Example Lottie file
import "./App.css";

// Lazy Loaded Components
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  const sectionsRef = useRef([]);
  const [activeSection, setActiveSection] = useState(0);

  // Scroll to Section Function
  const scrollToSection = (index) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Detect Scroll to Highlight Active Section
  useEffect(() => {
    const handleScroll = () => {
      let currentIndex = sectionsRef.current.length - 1;
      while (currentIndex >= 0) {
        const section = sectionsRef.current[currentIndex];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            if (activeSection !== currentIndex) setActiveSection(currentIndex);
            break;
          }
        }
        currentIndex--;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div className="app">
      <Navbar scrollToSection={scrollToSection} activeSection={activeSection} />

      <motion.div className="sections">
        {[
          { component: <Hero />, bg: "bg-hero-pattern" },
          { component: <About />, bg: "bg-about-pattern" },
          { component: <Skills />, bg: "bg-skills-pattern" },
          { component: <Experience />, bg: "bg-experience-pattern" },
          { component: <Projects />, bg: "bg-projects-pattern" },
          { component: <Contact />, bg: "bg-contact-pattern" },
        ].map((section, index) => (
          <motion.div
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            className={`section ${section.bg}`}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Suspense
              fallback={
                <div className="loading">
                  <Lottie loop animationData={loadingAnimation} play style={{ width: 150, height: 150 }} />
                  <p>Loading...</p>
                </div>
              }
            >
              {React.cloneElement(section.component, { scrollToSection })}
            </Suspense>
          </motion.div>
        ))}
      </motion.div>

      <Footer />
    </div>
  );
}

export default App;