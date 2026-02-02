import React, { useEffect, useState } from "react";
import "./Footer.css";
import { Global } from "../Common/Global";
import Icons from "../Common/Icons";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${Global.jsonUrl}Footer.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load footer data");
        return res.json();
      })
      .then((data) => setFooterData(data))
      .catch((err) => {
        console.error("Footer fetch error:", err);
        setError(true);
      });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error || !footerData) return null;

  const { name, location, email, nav, socials } = footerData;

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>

        {/* Footer Navigation */}
        <nav className="footer-nav">
          {nav.map((item, index) => (
            <a key={index} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="contact-info">
          <p>
            Email: <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p>Location: {location}</p>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          {socials.map((social, index) => {
            const IconComponent =
              Icons[social.icon]

            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.icon}
              >
                <IconComponent
                  size={social.size || 20}
                  color={social.color || "#000"}
                />
              </a>
            );
          })}
        </div>

        {/* Back to Top */}
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          {(() => {
            const IconComponent =
              Icons.FaArrowUp
            return <IconComponent size={18} />;
          })()}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
