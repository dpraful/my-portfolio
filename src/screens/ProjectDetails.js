import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icons from "../Common/Icons";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  const BackIcon = Icons["FaArrowLeft"];
  const CloseIcon = Icons["FaTimes"];

  useEffect(() => {
    if (!state?.jsonUrl) return;

    fetch(state.jsonUrl)
      .then((res) => res.json())
      .then((data) => setScreens(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [state]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!state) return null;

  return (
    <section className="project-details">
      {/* Header */}
      <div className="project-header">
        <h2 style={{ color: state.color }}>{state.name}</h2>

        <button className="back-btn" onClick={() => navigate(-1)}>
          {BackIcon && <BackIcon />}
          <span>Back</span>
        </button>
      </div>

      {loading && <p className="loading-text">Loading screens...</p>}

      {/* Screens */}
      <div className="screens-container">
        {screens.map((item, index) => {
          const IconComponent = Icons[item.icon];

          return (
            <motion.div
              key={index}
              className="screen-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
            >
              <div
                className="image-wrapper"
                onClick={() => setPreviewImage(item.url)}
              >
                <img src={item.url} alt={item.title} />
              </div>

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
  );
};

export default ProjectDetails;
