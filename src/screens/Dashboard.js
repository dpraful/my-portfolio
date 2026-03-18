import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { APIURL } from "../Common/Global";
import { networkServiceCall } from "../Common/NetworkServiceCall";
import { WrappedComponent } from "../Navigation/WrappedComponent";
import "./Dashboard.css";
import HView from "../Common/HView";

const Dashboard = () => {
    const sectionsRef = useRef([]);
    const [activeSection, setActiveSection] = useState(0);
    const [sectionsData, setSectionsData] = useState([]);
    const [isAppReady, setIsAppReady] = useState(false);

    const preloadImage = (url) =>
        new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = img.onerror = () => resolve();
        });

    /* Scroll to Section */
    const scrollToSection = (index) => {
        if (sectionsRef.current[index]) {
            sectionsRef.current[index].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    /* Detect Active Section */
    useEffect(() => {
        const handleScroll = () => {
            let currentIndex = sectionsRef.current.length - 1;

            while (currentIndex >= 0) {
                const section = sectionsRef.current[currentIndex];
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (
                        rect.top <= window.innerHeight / 2 &&
                        rect.bottom >= 0
                    ) {
                        if (activeSection !== currentIndex) {
                            setActiveSection(currentIndex);
                        }
                        break;
                    }
                }
                currentIndex--;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeSection]);

    /* Load Backend Data and preload backgrounds */
    useEffect(() => {
        let cancelled = false;

        Promise.all([
            networkServiceCall(`${APIURL}json/loading.json`),
            networkServiceCall(`${APIURL}json/Navbar.json`),
        ])
            .then(([loadingData, appData]) => {
                if (cancelled) return;
                const sections = appData.sections || [];
                const bgUrls = sections
                    .filter((s) => s.bg)
                    .map((s) => `${APIURL}files/${s.bg}`);

                return Promise.all(bgUrls.map(preloadImage)).then(() => {
                    if (cancelled) return;
                    setSectionsData(sections);
                    setTimeout(() => {
                        setIsAppReady(true);
                    }, 3500);
                });
            })
            .catch((error) => {
                console.error(error);
                if (!cancelled) {
                    setTimeout(() => {
                        setIsAppReady(true);
                    }, 3500);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    if (!isAppReady) {
        return (
            <HView component={'Splash'} />
        );
    }

    return (
        <div className="app">
            <Navbar
                scrollToSection={scrollToSection}
                activeSection={activeSection}
                sections={sectionsData.filter((s) => s.enabled !== false)}
            />
            <WrappedComponent
                scrollToSection={scrollToSection}
                activeSection={activeSection}
                sectionsRef={sectionsRef}
                sectionsData={sectionsData}
            />
            <Footer />
        </div>
    );
};

export default Dashboard