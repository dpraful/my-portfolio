import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import "./Hero.css";
import { Global } from "../Common/Global";
import Icons from "../Common/Icons";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${Global.jsonUrl}Hero.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Hero data");
        return res.json();
      })
      .then((data) => setHeroData(data))
      .catch((err) => {
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
  } = heroData;

  const ResumeIcon =
    Icons[resumeButton.icon]

  const ScrollIcon =
    Icons[scrollDown.icon]

  return (
    <section className="hero">
      <div className="overlay">
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
          href={`${Global.fileUrl}${resume}`}
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

        {/* Scroll Down */}
        <a href={scrollDown.href} className="scroll-down">
          <ScrollIcon
            size={scrollDown.size || 18}
            color={scrollDown.color || "#fff"}
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
