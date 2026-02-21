import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

const Splash = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const title = "PORTFOLIO";

  useEffect(() => {
    let i = 0;

    const typing = setInterval(() => {
      setText(title.slice(0, i + 1));
      i++;
      if (i === title.length) clearInterval(typing);
    }, 120);

    setTimeout(() => {
      navigate("/dashboard");
    }, 3500);
  }, [navigate]);

  return (
    <div className="splash-container">
      <h1>{text}</h1>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Splash;