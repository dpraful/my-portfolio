import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { FaDownload, FaArrowDown } from "react-icons/fa";
import "./Hero.css";
import resumeFile from "../assets/resume.pdf";


const Hero = () => {
  return (
    <section className="hero">
      <div className="overlay">
        <h2 className="title">
          Hi, I'm <span className="highlight">PRAFULDAS M M</span>
        </h2>

        {/* Typing Animation for Job Title */}
        <p className="subtitle">
          <Typewriter
            words={["Software Developer", "FullStack Developer", "Tech Explorer", "WEB | MOBILE"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>

        {/* Resume Button */}
        <a href={resumeFile} download="Prafuldas.pdf" className="btn">
          <FaDownload /> Download Resume
        </a>


        {/* Scroll Down Button */}
        <a href="#contact" className="scroll-down">
          <FaArrowDown />
        </a>
      </div>
    </section>
  );
};

export default Hero;
