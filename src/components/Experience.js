import React, { useEffect, useState } from "react";
import "./Experience.css";
import { FaBriefcase } from "react-icons/fa";

const experiences = [
  {
    title: "Software Developer",
    company: "Jescon Technologies",
    duration: "Nov 2024 - Present",
  },
  {
    title: "AppForms Developer",
    company: "Claysys Technologies",
    duration: "July 2024 - Aug 2024",
  },
  {
    title: "Junior Developer",
    company: "Techolas Technologies",
    duration: "July 2023 - April 2024",
  },
];

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".experience");
      if (section) {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={`experience ${isVisible ? "visible" : ""}`}>
      <h2>Experience</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item" style={{ animationDelay: `${index * 0.3}s` }}>
            <div className="timeline-icon">
              <FaBriefcase />
            </div>
            <div className="timeline-content">
              <h3>{exp.title}</h3>
              <h4>{exp.company}</h4>
              <p>{exp.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
