import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import "./About.css";
import profilePic from "../assets/images/profile.jpg";

const About = ({ scrollToSection }) => {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  return (
    <section className="about">
      <div className="overlay">
        <div className="container">
          {/* Profile Image with Floating Effect */}
          <motion.div
            className="about-image"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <img src={profilePic} alt="Profile" />
          </motion.div>

          {/* About Text with Slide Animation */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2>About Me</h2>
            <p>
              I am a passionate <span>Software Developer</span> with
              <b data-aos="fade-up"> 1+ years</b> of experience in
              designing and developing scalable applications.
            </p>

            {/* Animated Buttons */}
            <motion.div
              className="buttons"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button onClick={() => scrollToSection(4)} className="btn">
                View My Work
              </button>
              <a
                href="https://www.linkedin.com/in/prafuldasmm"
                target="_blank"
                className="btn btn-secondary"
              >
                Let's Connect
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
