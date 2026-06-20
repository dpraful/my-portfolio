import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icons from "../Common/Icons";
import "./Details.css";
import { networkServiceCall } from "../Common/NetworkServiceCall";
import CDetailView from "../Common/CDetailView";
import { useDataContext } from "../Handlers/portfolioContext";

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
  const { pathname, search, state: locationState } = useLocation();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  const BackIcon = Icons["FaArrowLeft"];
  const OnlineIcon = Icons["FaGlobe"];
  const GitHubIcon = Icons["FaGithub"];
  const DemoIcon = Icons["FaExternalLinkAlt"];
  const CloseIcon = Icons["FaTimes"];
  const { activeSection, sectionsData } = useDataContext();

  // Extract JSON URL from pathname - memoized to prevent infinite loop
  const stateData = useMemo(() => {
    if (locationState) {
      return locationState;
    }

    const pathMatch = pathname.match(/\/details\/(.+)/);

    if (pathMatch) {
      const jsonUrl = decodeURIComponent(pathMatch[1]);

      const projectName =
        jsonUrl.split("/").pop()?.replace(".json", "").toUpperCase() ||
        "PROJECT";

      return {
        name: projectName,
        color: "white",
        jsonUrl,
      };
    }

    return null;
  }, [pathname, locationState]);

  // 🔹 Fetch project data
  useEffect(() => {
    if (!stateData?.jsonUrl) return;

    setLoading(true);

    networkServiceCall(stateData.jsonUrl)
      .then(setProject)
      .catch((err) =>
        console.error("Error loading project data:", err)
      )
      .finally(() => setLoading(false));
  }, [stateData]);

  // 🔹 Close preview on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!stateData) return null;

  return (
    <CDetailView src={sectionsData[activeSection]}>
      <div className="details-scroll">
        <section className="project-details">
          {/* Header */}
          <div className="project-header">
            <h2 style={{ color: stateData.color }}>{stateData.name}</h2>

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
                    state={stateData}
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
      </div>
    </CDetailView>
  );
};

export default Details;