import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icons from "../Common/Icons";
import "./Previewer.css";

const Previewer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);

  const iframeRef = useRef(null);

  const BackIcon = Icons["FaArrowLeft"];

  const fileUrl = useMemo(() => {
    const match = pathname.match(/\/previewer\/(.+)/);

    if (!match) return null;

    return decodeURIComponent(match[1]);
  }, [pathname]);

  useEffect(() => {
    if (!fileUrl) return;

    setLoading(true);

    fetch(fileUrl)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
      })
      .catch((error) => {
        console.error("Error loading HTML:", error);

        setHtmlContent(`
          <html>
            <body style="font-family:sans-serif;padding:20px">
              <h1>Error</h1>
              <p>Unable to load content.</p>
            </body>
          </html>
        `);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fileUrl]);

  useEffect(() => {
    if (!htmlContent || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc =
      iframe.contentDocument ||
      iframe.contentWindow?.document;

    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();
    }
  }, [htmlContent]);

  return (
    <div className="previewer-container">
      <div className="previewer-header">
        <button
          className="previewer-back-btn"
          onClick={() => navigate(-1)}
        >
          {BackIcon && <BackIcon />}
          <span>Back</span>
        </button>

        <h2 className="previewer-title">
          Document Preview
        </h2>
      </div>

      {loading ? (
        <div className="previewer-loading">
          Loading...
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          title="HTML Preview"
          className="previewer-iframe"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      )}
    </div>
  );
};

export default Previewer;