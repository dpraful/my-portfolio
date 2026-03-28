import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icons from "../Common/Icons";
import "./Details.css";
import { networkServiceCall } from "../Common/NetworkServiceCall";
import CDetailView from "../Common/CDetailView";

const ImageWithFallback = ({ item, setPreviewImage, state }) => {
  const [error, setError] = useState(false);

  const LinkIcon = Icons[state.icon];
  return (
    <div className="image-wrapper">
      {!error ? (
        <img
          src={item.url}
          alt={item.title}
          onClick={() => setPreviewImage(item.url)}
          onError={() => setError(true)}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <div
          className="fallback-icon"
          onClick={() => window.open(item.url, "_blank")}
        >
          {LinkIcon && <LinkIcon size={60} color={state.color} />}
          <p>Open Link</p>
        </div>
      )}
    </div>
  );
};

const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  const BackIcon = Icons["FaArrowLeft"];
  const OnlineIcon = Icons["FaGlobe"];
  const GitHubIcon = Icons["FaGithub"];
  const DemoIcon = Icons["FaExternalLinkAlt"];
  const CloseIcon = Icons["FaTimes"];

  // 🔹 Fetch project data
  useEffect(() => {
    if (!state?.jsonUrl) return;

    setLoading(true);

    networkServiceCall(state.jsonUrl)
      .then(setProject)
      .catch((err) =>
        console.error("Error loading project data:", err)
      )
      .finally(() => setLoading(false));
  }, [state]);

  // 🔹 Close preview on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!state) return null;

  return (
    <CDetailView>
      <section className="project-details">
        {/* Header */}
        <div className="project-header">
          <h2 style={{ color: state.color }}>{state.name}</h2>

          <button className="back-btn" onClick={() => navigate(-1)}>
            {BackIcon && <BackIcon />}
            <span>Back</span>
          </button>
        </div>

        {loading && <p className="loading-text">Loading project...</p>}

        {/* Project Meta */}
        {project && (
          <div className="project-meta">
            <p className="project-description">
              {project.description}
            </p>

            <div className="project-actions">
              <span className="project-status">
                {OnlineIcon && <OnlineIcon />} {project.status}
              </span>

              <div className="project-links">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {DemoIcon && <DemoIcon />} Demo
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {GitHubIcon && <GitHubIcon />} GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Screens */}
        <div className="screens-container">
          {project?.imageurl?.map((item, index) => {
            const IconComponent = Icons[item.icon];

            return (
              <motion.div
                key={index}
                className="screen-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
              >
                <ImageWithFallback
                  item={item}
                  setPreviewImage={setPreviewImage}
                  state={state}
                />

                <div className="screen-info">
                  <h3>
                    {IconComponent && <IconComponent />}
                    {item.title}
                  </h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full Image Preview */}
        <AnimatePresence>
          {previewImage && (
            <motion.div
              className="image-preview-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImage(null)}
            >
              <motion.div
                className="image-preview-content"
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-btn"
                  onClick={() => setPreviewImage(null)}
                >
                  {CloseIcon && <CloseIcon />}
                </button>

                <img src={previewImage} alt="Preview" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </CDetailView>
  );
};

export default Details;