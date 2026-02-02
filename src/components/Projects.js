import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Projects.css";
import Icons from "../Common/Icons"
import { APIURL } from "../Common/Global";
import { networkServiceCall } from "../Common/NetworkServiceCall";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);

useEffect(() => {
  networkServiceCall(`${APIURL}json/Projects.json`)
    .then(setProjects)
    .catch(err => {
      console.error("Projects fetch error:", err);
      setError(true);
    });
}, []);


  if (error) return null;
  if (!projects.length) return null;

  return (
    <section className="projects">
      <h2>My Projects</h2>

      <div className="projects-container">
        {projects.map((project, index) => {
          const IconComponent = Icons[project.icon];
          return (
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
              <div className="icon-container">
                {IconComponent ? (
                  <IconComponent style={{ fontSize: "30px", color: project.color || "#000" }} />
                ) : null}
              </div>

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
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
