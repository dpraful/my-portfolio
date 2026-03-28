import HView from "../Common/HView";

export function WrappedComponent({
    scrollToSection,
    sectionsRef,
    sectionsData,
    activeSection,
}) {
    const visibleSections = sectionsData.filter((section) => section.enabled !== false);
    const section = visibleSections[activeSection] || visibleSections[0];

    if (!section) {
        return null;
    }

    return (
        <div className="sections">
            <div
                ref={(el) => (sectionsRef.current[activeSection] = el)}
                id={section.name}
                className="section"
            >
                <HView
                    component={section.component}
                    {...section}
                    scrollToSection={scrollToSection}
                />
            </div>
        </div>
    );
}