import React, {  Suspense } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import HView from "../Common/HView";
import { APIURL } from "../Common/Global";

export function WrappedComponent({
    scrollToSection,
    sectionsRef,
    sectionsData,
    loadingAnimation,
}) {
    return (
        <motion.div className="sections">
            {sectionsData
                .filter((section) => section.enabled !== false)
                .map((section, index) => (
                    <motion.div
                        key={index}
                        ref={(el) => (sectionsRef.current[index] = el)}
                        id={section.name}
                        className="section"
                        style={{
                            background: section.bg
                                ? `url(${APIURL}files/${section.bg}) no-repeat center/cover`
                                : undefined,
                        }}
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Suspense
                            fallback={
                                <div className="loading">
                                    {loadingAnimation && (
                                        <Lottie
                                            loop
                                            animationData={loadingAnimation}
                                            play
                                            style={{ width: 150, height: 150 }}
                                        />
                                    )}
                                    <p>Loading...</p>
                                </div>
                            }
                        >
                            <HView
                                component={section.component}
                                {...section}
                                scrollToSection={scrollToSection}
                            />
                        </Suspense>
                    </motion.div>
                ))}
        </motion.div>
    );
}