import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./styles/Skills.css";
import { APIURL } from "../Common//apiConstants";
import Icons from "../Common/Icons";
import { networkServiceCall } from "../Common/NetworkServiceCall";
import { useNavigate } from "react-router-dom";

const Skills = (props) => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // 🔹 Fetch skills data
  useEffect(() => {
    networkServiceCall(`${APIURL}json/${props.name}.json`)
      .then(setSkills)
      .catch((err) => {
        console.error("Skills fetch error:", err);
        setError(true);
      });
  }, [props.name]);

  // 🔹 Redirect handler
  const handleRedirect = (skill) => {
    if (skill?.detail) {
      navigate("/details", {
        state: {
          ...skill,
          jsonUrl: skill.url,
        },
      })
    }
    else {
      window.open(skill.url, "_blank");
    }
  };

  if (error || !skills.length) return null;

  return (
    <section className="skills">
      <h2>My {props.name}</h2>

      <div className="skills-container">
        {skills.map((skill, index) => {
          const IconComponent = Icons[skill.icon];

          return (
            <motion.div
              key={index}
              className="skill-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.08 }}
              onClick={() => handleRedirect(skill)}
              style={{ cursor: "pointer" }}
            >
              <div className="skill-icon">
                {IconComponent && (
                  <IconComponent
                    style={{
                      fontSize: "30px",
                      color: skill.color || "#000",
                    }}
                  />
                )}
              </div>

              <p>{skill.name}</p>
              <div className="tags">
                {skill?.tags?.map(tag => (
                  <span className="tag" key={tag.id}>
                    {tag?.tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
