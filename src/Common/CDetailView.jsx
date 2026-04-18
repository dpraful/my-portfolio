import React, { useState } from "react";
import { APIURL } from "./apiConstants";

const CDetailView = ({ src, children }) => {
    const [loaded, setLoaded] = useState(false);

    const fileUrl = `${APIURL}files/${src?.bg}`;
    const videoUrl = `${APIURL}files/${src?.video}`;

    return (
        <div className="sections">
            <div
                className="section"
                style={{
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "black",
                }}
            >
                {/* MEDIA (Image / Video) */}
                {videoUrl? (
                    <video
                        src={videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onCanPlay={() => setLoaded(true)}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            filter: loaded ? "blur(0px)" : "blur(15px)",
                            transform: loaded ? "scale(1)" : "scale(1.1)",
                            transition: "all 0.5s ease",
                        }}
                    />
                ) : (
                    <img
                        src={fileUrl}
                        alt=""
                        loading="lazy"
                        onLoad={() => setLoaded(true)}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            filter: loaded ? "blur(0px)" : "blur(15px)",
                            transform: loaded ? "scale(1)" : "scale(1.1)",
                            transition: "all 0.5s ease",
                        }}
                    />
                )}

                {/* CONTENT */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CDetailView;