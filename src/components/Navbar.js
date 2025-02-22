import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

function Navbar({ scrollToSection, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">MyPortfolio</div>
      
      {/* Desktop Navigation */}
      <div className="nav-items">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`nav-button ${activeSection === index ? "active" : ""}`}
            whileHover={{ scale: 1.1 }}
          >
            {item}
          </button>
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
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    scrollToSection(index);
                    setTimeout(() => setMenuOpen(false), 500);
                  }}
                  className={`mobile-menu-item ${activeSection === index ? "active" : ""}`}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
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
