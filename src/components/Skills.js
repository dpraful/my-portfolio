import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Skills.css";
import {APIURL} from "../Common/Global";
import Icons from "../Common/Icons"
import { networkServiceCall } from "../Common/NetworkServiceCall";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(false);

 useEffect(() => {
  networkServiceCall(`${APIURL}json/Skills.json`)
    .then(setSkills)
    .catch(err => {
      console.error("Skills fetch error:", err);
      setError(true);
    });
}, []);


  if (error) return null;
  if (!skills.length) return null;

  return (
    <section className="skills">
      <h2>My Skills</h2>

      <div className="skills-container">
        {skills.map((skill, index) => {
          const IconComponent = Icons[skill.icon]; // 🔹 Get icon dynamically
          return (
            <motion.div
              key={index}
              className="skill-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.08 }}
            >
              <div className="skill-icon">
                {IconComponent ? <IconComponent style={{ fontSize: "30px", color: skill.color || "#000" }} /> : null}
              </div>

              <p>{skill.name}</p>

              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
