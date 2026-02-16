import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import "./Hero.css";
import { APIURL } from "../Common/Global";
import Icons from "../Common/Icons";
import { networkServiceCall } from "../Common/NetworkServiceCall";
import Model3D from "../Common/3Dmodel";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    networkServiceCall(`${APIURL}json/Hero.json`)
      .then(setHeroData)
      .catch(err => {
        console.error("Error loading hero data:", err);
        setError(true);
      });
  }, []);

  // Loading state
  if (!heroData && !error) {
    return (
      <section className="hero">
        <div className="overlay">
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="hero">
        <div className="overlay">
          <h2>Failed to load hero data</h2>
        </div>
      </section>
    );
  }

  const {
    name,
    roles,
    resume,
    resumeButton,
    scrollDown,
    ["3Dmodels"]: modelUrl
  } = heroData;

  const ResumeIcon = Icons[resumeButton.icon];

  return (
    <section className="hero">

      <div className="overlay">
        {modelUrl && <Model3D modelUrl={modelUrl} />}

        <h2 className="title">
          Hi, I'm <span className="highlight">{name}</span>
        </h2>

        {/* Typing Animation */}
        <p className="subtitle">
          <Typewriter
            words={roles}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>

        {/* Resume Button */}
        <a
          href={`${APIURL}files/${resume}`}
          download="Prafuldas.pdf"
          className="btn"
        >
          <ResumeIcon
            size={resumeButton.size || 18}
            color={resumeButton.color || "#fff"}
            style={{ marginRight: 8 }}
          />
          {resumeButton.label}
        </a>
      </div>

    </section>
  );
};

export default Hero;
