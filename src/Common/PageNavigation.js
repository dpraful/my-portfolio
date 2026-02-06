import React, { useRef, useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { APIURL } from "./Global";
import "../App.css";
import { networkServiceCall } from "./NetworkServiceCall";

// Lazy Loaded Components
const componentMap = {
  Hero: lazy(() => import("../components/Hero")),
  About: lazy(() => import("../components/About")),
  Skills: lazy(() => import("../components/Skills")),
  Experience: lazy(() => import("../components/Experience")),
  Projects: lazy(() => import("../components/Projects")),
  Contact: lazy(() => import("../components/Contact")),
};

const ProjectDetails = lazy(() => import("../screens/ProjectDetails"));

function MainPage({ scrollToSection, activeSection, sectionsRef, sectionsData, loadingAnimation }) {
  return (
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
              background: `url(${APIURL}files/${section.bg}) no-repeat center center/cover`,
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
  );
}

function PageNavigation() {
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

  useEffect(() => {
    Promise.all([
      networkServiceCall(`${APIURL}json/loading.json`),
      networkServiceCall(`${APIURL}json/App.json`),
    ])
      .then(([loadingData, appData]) => {
        setLoadingAnimation(loadingData);
        setSectionsData(appData.sections);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <Navbar scrollToSection={scrollToSection} activeSection={activeSection} />

      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              scrollToSection={scrollToSection}
              activeSection={activeSection}
              sectionsRef={sectionsRef}
              sectionsData={sectionsData}
              loadingAnimation={loadingAnimation}
            />
          }
        />
        <Route
          path="/project"
          element={
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
              <ProjectDetails />
            </Suspense>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default PageNavigation;
