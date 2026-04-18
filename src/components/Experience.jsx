import React, { useEffect, useState } from "react";
import "./styles/Experience.css";
import Icons from "../Common/Icons";
import { APIURL } from "../Common//apiConstants";
import { networkServiceCall } from "../Common/NetworkServiceCall";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [experiences, setExperiences] = useState([]);

  // 🔹 Fetch experience data
  useEffect(() => {
    networkServiceCall(`${APIURL}json/Experience.json`)
      .then(setExperiences)
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

  // 🔹 Redirect handler
  const handleRedirect = (url) => {
    if (!url) return;
    window.open(url, "_blank"); // open in new tab
  };

  return (
    <section className={`experience ${isVisible ? "visible" : ""}`}>
      <h2>Experience</h2>

      <div className="timeline">
        {experiences.map((exp, index) => {
          const IconComponent = Icons[exp.icon];

          return (
            <div
              key={index}
              className="timeline-item"
              style={{
                animationDelay: `${index * 0.3}s`,
                cursor: "pointer",
              }}
              onClick={() => handleRedirect(exp.url)}
            >
              <div className="timeline-icon">
                {IconComponent && (
                  <IconComponent
                    size={20}
                    color={exp.color || "#333"}
                  />
                )}
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
