import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { APIURL } from "../Common//apiConstants";
import { networkServiceCall } from "../Common/NetworkServiceCall";
import { WrappedComponent } from "../Navigation/WrappedComponent";
import "./Dashboard.css";
import HView from "../Common/HView";
import CDetailView from "../Common/CDetailView";
import { useDataContext } from "../Handlers/portfolioContext";

const Dashboard = () => {
    const sectionsRef = useRef([]);
    const { activeSection, setActiveSection, sectionsData, setSectionsData, isAppReady, setIsAppReady } = useDataContext();
    const touchStartYRef = useRef(null);

    const preloadImage = (url) =>
        new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = img.onerror = () => resolve();
        });

    /* Scroll to Section */
    const scrollToSection = (index) => {
        setActiveSection(index);
    };

    /* Switch active section on wheel scroll */
    useEffect(() => {
        const enabledSections = sectionsData.filter((section) => section.enabled !== false);
        let isThrottled = false;

        const handleWheel = (event) => {
            if (isThrottled || enabledSections.length <= 1) {
                return;
            }

            const delta = event.deltaY;
            if (Math.abs(delta) < 30) {
                return;
            }

            setActiveSection((prevIndex) => {
                const nextIndex = delta > 0 ? prevIndex + 1 : prevIndex - 1;
                return Math.max(0, Math.min(nextIndex, enabledSections.length - 1));
            });

            isThrottled = true;
            window.setTimeout(() => {
                isThrottled = false;
            }, 600);
        };

        const handleTouchStart = (event) => {
            touchStartYRef.current = event.touches[0]?.clientY;
        };

        const handleTouchMove = (event) => {
            if (isThrottled || enabledSections.length <= 1 || touchStartYRef.current === null) {
                return;
            }

            const currentY = event.touches[0]?.clientY;
            const delta = touchStartYRef.current - currentY;
            if (Math.abs(delta) < 60) {
                return;
            }

            setActiveSection((prevIndex) => {
                const nextIndex = delta > 0 ? prevIndex + 1 : prevIndex - 1;
                return Math.max(0, Math.min(nextIndex, enabledSections.length - 1));
            });

            isThrottled = true;
            touchStartYRef.current = currentY;
            window.setTimeout(() => {
                isThrottled = false;
            }, 600);
        };

        const handleTouchEnd = () => {
            touchStartYRef.current = null;
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [sectionsData]);

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
            <CDetailView src={sectionsData[activeSection]}>
                <WrappedComponent
                    scrollToSection={scrollToSection}
                    activeSection={activeSection}
                    sectionsRef={sectionsRef}
                    sectionsData={sectionsData}
                />
            </CDetailView>
        </div>
    );
};

export default Dashboard