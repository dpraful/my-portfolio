import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import "./About.css";
import { APIURL } from "../Common/Global";
import { networkServiceCall } from "../Common/NetworkServiceCall";

const About = ({ scrollToSection }) => {
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 1200 });

    networkServiceCall(`${APIURL}json/About.json`)
      .then(setAboutData)
      .catch(err => {
        console.error("About fetch error:", err);
        setError(true);
      });
  }, []);



  if (error || !aboutData) return null;

  const { title, subtitle, highlight, experience, profileImage, buttons } = aboutData;

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
            <img src={`${APIURL}files/${profileImage}`} alt="Profile" />
          </motion.div>

          {/* About Text with Slide Animation */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2>{title}</h2>
            <p>
              {subtitle.split(highlight)[0]}
              <span>{highlight}</span>
              {subtitle.split(highlight)[1]}
              <b data-aos="fade-up"> {experience}</b>
            </p>

            {/* Animated Buttons */}
            <motion.div
              className="buttons"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {buttons.map((btn, index) =>
                btn.type === "scroll" ? (
                  <button
                    key={index}
                    className="btn"
                    onClick={() => scrollToSection(btn.targetSection)}
                  >
                    {btn.label}
                  </button>
                ) : (
                  <a
                    key={index}
                    href={btn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    {btn.label}
                  </a>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
