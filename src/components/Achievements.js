import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icons from "../Common/Icons";
import "./styles/Achievements.css";
import { networkServiceCall } from "../Common/NetworkServiceCall";
import { APIURL } from "../Common/Global";

const Achievements = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  const CloseIcon = Icons["FaTimes"];

  // 🔹 Fetch project data
  useEffect(() => {
    setLoading(true);
    networkServiceCall(`${APIURL}json/Achievements.json`)
      .then((data) => setProject(data))
      .catch((err) => console.error("Error loading project data:", err))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Close image preview on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // 🔹 Limit to 5 columns × 3 rows (15 items)
  const displayedAchievements = project?.imageurl?.slice(0, 15) || [];

  return (
    <section className="achievements">
      <h2>Achievements</h2>
      {loading && <p className="loading-text">Loading achievements...</p>}

      {/* 5 columns × 3 rows grid */}
      <div className="achievements-table">
        {displayedAchievements.map((item, index) => {
          const IconComponent = Icons[item.icon];

          return (
            <motion.div
              key={index}
              className="achievement-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div
                className="image-wrapper"
                onClick={() => setPreviewImage(item.url)}
              >
                <img src={item.url} alt={item.title} />
              </div>
              <div className="achievement-info">
                <h5>
                  {IconComponent ? <IconComponent /> : null} {item.title}
                </h5>
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
                {CloseIcon ? <CloseIcon /> : "Close"}
              </button>

              <img src={previewImage} alt="Preview" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
