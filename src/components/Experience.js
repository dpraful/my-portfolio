import React, { useEffect, useState } from "react";
import "./Experience.css";
import Icons from "../Common/Icons";
import { Global } from "../Common/Global";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [experiences, setExperiences] = useState([]);

  // 🔹 Fetch experience data from JSON
  useEffect(() => {
    fetch(`${Global.jsonUrl}Experience.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load experience data");
        return res.json();
      })
      .then((data) => setExperiences(data))
      .catch((err) =>
        console.error("Error loading experience data:", err)
      );
  }, []);

  // 🔹 Scroll animation logic
  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".experience");
      if (!section) return;

      const top = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top < windowHeight - 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger once on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={`experience ${isVisible ? "visible" : ""}`}>
      <h2>Experience</h2>

      <div className="timeline">
        {experiences.map((exp, index) => {
          const IconComponent = Icons[exp.icon]
          return (
            <div
              key={index}
              className="timeline-item"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="timeline-icon">
                <IconComponent
                  size={20}
                  color={exp.iconColor || "#333"}
                />
              </div>

              <div className="timeline-content">
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <p>{exp.duration}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
