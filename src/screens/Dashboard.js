import React, { useRef, useEffect, useState, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { APIURL } from "../Common/Global";
import { networkServiceCall } from "../Common/NetworkServiceCall";
import { WrappedComponent } from "../Navigation/WrappedComponent";
import "./Dashboard.css";

const Dashboard = () => {
    const sectionsRef = useRef([]);
    const [activeSection, setActiveSection] = useState(0);
    const [sectionsData, setSectionsData] = useState([]);
    const [loadingAnimation, setLoadingAnimation] = useState(null);

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

    /* Load Backend Data */
    useEffect(() => {
        Promise.all([
            networkServiceCall(`${APIURL}json/loading.json`),
            networkServiceCall(`${APIURL}json/Navbar.json`),
        ])
            .then(([loadingData, appData]) => {
                setLoadingAnimation(loadingData);
                setSectionsData(appData.sections || []);
            })
            .catch(console.error);
    }, []);
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
                loadingAnimation={loadingAnimation}
            />
            <Footer />
        </div>
    )
}

export default Dashboard