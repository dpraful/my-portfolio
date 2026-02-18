import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import "./styles/Navbar.css";
import { APIURL } from "../Common/Global";
import { networkServiceCall } from "../Common/NetworkServiceCall";

function Navbar({ scrollToSection, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  // 🔹 Load navbar data from Navbar.json
  useEffect(() => {
    networkServiceCall(`${APIURL}json/Navbar.json`)
      .then((res) => setData(res))
      .catch((err) => {
        console.error("Error loading navbar data:", err);
        setError(true);
      });
  }, []);

  // 🔹 Scroll background effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (error || !data) return null;

  // 🔹 Pre-filter enabled sections
  const enabledSections = data.sections.filter((section) => section.enabled);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <div className="logo">{data.logo}</div>

      {/* Desktop Navigation */}
      <div className="nav-items">
        {enabledSections.map((section, index) => (
          <motion.button
            key={section.name}
            onClick={() => scrollToSection(index)}
            className={`nav-button ${activeSection === index ? "active" : ""
              }`}
            whileHover={{ scale: 1.1 }}
          >
            {section.name}
          </motion.button>
        ))}
      </div>

      {/* Mobile Menu Icon */}
      <div className="mobile-menu-icon">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-content">
              {enabledSections.map((section, index) => (
                <motion.button
                  key={section.name}
                  onClick={() => {
                    scrollToSection(index);
                    setTimeout(() => setMenuOpen(false), 400);
                  }}
                  className={`mobile-menu-item ${activeSection === index ? "active" : ""
                    }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {section.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
