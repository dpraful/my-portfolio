import React from "react";
import { motion } from "framer-motion";
import "./Projects.css";
import { FaShoppingCart, FaBriefcase, FaPuzzlePiece } from "react-icons/fa";

const projects = [
  {
    name: "E-commerce Store",
    link: "https://github.com/dpraful/EcommerceStore",
    icon: <FaShoppingCart className="project-icon" />,
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Job Portal",
    link: "https://github.com/dpraful/JobPortal",
    icon: <FaBriefcase className="project-icon" />,
    tags: ["Django", "PostgreSQL", "Bootstrap"],
  },
  {
    name: "Image Puzzle Game",
    link: "https://github.com/dpraful/MagicGame",
    icon: <FaPuzzlePiece className="project-icon" />,
    tags: ["Flutter", "Firebase", "Game Logic"],
  },
];

const Projects = () => {
  return (
    <section className="projects">
      <h2>My Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon-container">{project.icon}</div>
            <div className="project-info">
              <h3>{project.name}</h3>
              <div className="tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
