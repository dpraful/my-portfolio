import React from "react";
import { motion } from "framer-motion";
import "./Skills.css";
import { FaPython, FaJs, FaReact, FaDatabase } from "react-icons/fa";
import { DiDjango } from "react-icons/di";

const skills = [
  { name: "Python", icon: <FaPython />, level: 90 },
  { name: "JavaScript", icon: <FaJs />, level: 85 },
  { name: "React Native", icon: <FaReact />, level: 80 },
  { name: "Django", icon: <DiDjango />, level: 75 },
  { name: "MongoDB", icon: <FaDatabase />, level: 70 },
];

const Skills = () => {
  return (
    <section className="skills">
      <h2>My Skills</h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.08 }}
          >
            <div className="skill-icon">{skill.icon}</div>
            <p>{skill.name}</p>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                style={{ width: `${skill.level}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
