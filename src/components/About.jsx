import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import "./styles/About.css";
import { APIURL } from "../Common//apiConstants";
import { networkServiceCall } from "../Common/NetworkServiceCall";
import Icons from "../Common/Icons";
import Model3D from "../Common/3Dmodel";
import { Loader } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

const About = (props) => {
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });

    networkServiceCall(`${APIURL}json/About.json`)
      .then(setAboutData)
      .catch((err) => {
        console.error("About fetch error:", err);
        setError(true);
      });
  }, []);

  // Loading
  if (!aboutData && !error) {
    return <Loader size={50} className="hero-loader" />;
  }

  // Error
  if (error) {
    return (
      <section className="about">
        <div className="overlay">
          <h2>⚠ Failed to load data</h2>
        </div>
      </section>
    );
  }

  const {
    name,
    roles,
    resume,
    resumeButton,
    ["3Dmodels"]: modelData,
    title,
    subtitle,
    highlight,
    experience,
    profileImage,
    socials,
  } = aboutData;

  const ResumeIcon = Icons[resumeButton.icon];

  // Safe split
  const [beforeHighlight, afterHighlight] = subtitle.split(highlight);

  return (
    <section className="about">
      <div className="overlay">
        {/* 3D Model */}
        <div className="model-container">
          {modelData && <Model3D Data={modelData} />}
        </div>
        {/* Hero Title */}
        <h1 className="title">
          Hi, I'm <span className="highlight">{name}</span>
        </h1>

        {/* Typing Animation */}
        <p className="subtitle">
          <Typewriter
            words={roles}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1200}
          />
        </p>

        <div className="container">
          {/* Profile Image */}
          <motion.div
            className="about-image"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <img src={`${APIURL}files/${profileImage}`} alt="Profile" />
          </motion.div>

          {/* Text */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>{title}</h2>

            <p>
              {beforeHighlight}
              <span>{highlight}</span>
              {afterHighlight}
              <b data-aos="fade-up">{experience}</b>
            </p>

            {/* Buttons */}
            <div className="buttons">
              {socials.map((social, index) => {
                const IconComponent = Icons[social.icon];

                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.icon}
                    className="social-btn"
                    data-platform={social.icon.toLowerCase()}
                  >
                    <IconComponent
                      size={social.size || 20}
                      color={social.color || "#000"}
                    />
                  </a>
                );
              })}
              {/* Resume Button */}
              <a
                href={`${APIURL}files/${resume}`}
                download="Prafuldas.pdf"
                className="btn primary"
              >
                <ResumeIcon size={18} />
                {resumeButton.label}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;