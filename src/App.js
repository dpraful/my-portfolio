import React, { useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Global } from "./Common/Global";
import "./App.css";

// Lazy Loaded Components
const componentMap = {
  Hero: lazy(() => import("./components/Hero")),
  About: lazy(() => import("./components/About")),
  Skills: lazy(() => import("./components/Skills")),
  Experience: lazy(() => import("./components/Experience")),
  Projects: lazy(() => import("./components/Projects")),
  Contact: lazy(() => import("./components/Contact")),
};

function App() {
  const sectionsRef = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const [sectionsData, setSectionsData] = useState([]);
  const [loadingAnimation, setLoadingAnimation] = useState(null);

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

  // Fetch Sections Data from GitHub
  useEffect(() => {
    fetch(`${Global.jsonUrl}App.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load App data");
        return res.json();
      })
      .then((data) => setSectionsData(data.sections))
      .catch((err) => console.error("App fetch error:", err));
  }, []);

  // Fetch Loading Animation JSON from GitHub
  useEffect(() => {
    fetch(`${Global.jsonUrl}loading.json`)
      .then((res) => res.json())
      .then((data) => setLoadingAnimation(data))
      .catch((err) => console.error("Failed to load loading animation:", err));
  }, []);

  return (
    <div className="app">
      <Navbar scrollToSection={scrollToSection} activeSection={activeSection} />

      <motion.div className="sections">
        {sectionsData.map((section, index) => {
          const Component = componentMap[section.name];
          if (!Component) return null;

          return (
            <motion.div
              key={index}
              ref={(el) => (sectionsRef.current[index] = el)}
              className={`section`}
              style={{
                background: `url(${Global.fileUrl}${section.bg}) no-repeat center center/cover`,
              }}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Suspense
                fallback={
                  <div className="loading">
                    {loadingAnimation && (
                      <Lottie
                        loop
                        animationData={loadingAnimation}
                        play
                        style={{ width: 150, height: 150 }}
                      />
                    )}
                    <p>Loading...</p>
                  </div>
                }
              >
                <Component scrollToSection={scrollToSection} />
              </Suspense>
            </motion.div>
          );
        })}
      </motion.div>

      <Footer />
    </div>
  );
}

export default App;
