import React from "react";
import { motion } from "framer-motion";
import "./Skills.css";
import { FaPython, FaJs, FaReact, FaDatabase ,FaFileAlt} from "react-icons/fa";
import { DiDjango } from "react-icons/di";
import { SiFlask, SiMongodb} from "react-icons/si"; // Additional icons

const skills = [
  { name: "Python", icon: <FaPython className="text-yellow-500" />, level: 100 },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" />, level: 100 },
  { name: "React", icon: <FaReact className="text-cyan-500" />, level: 100 },
  { name: "Django", icon: <DiDjango className="text-green-700" />, level: 100 },
  { name: "Flask", icon: <SiFlask className="text-gray-600" />, level: 100 },
  { name: "MSSQL", icon: <FaDatabase className="text-blue-600" />, level: 100 },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-600" />,
    level: 100,
  },
  {
    name: "JasperSoft",
    icon: <FaFileAlt className="text-purple-700" />,
    level: 100,
  },
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
