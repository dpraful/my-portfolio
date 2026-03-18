import HView from "../Common/HView";
import { APIURL } from "../Common/Global";

export function WrappedComponent({
    scrollToSection,
    sectionsRef,
    sectionsData,
}) {
    return (
        <div className="sections">
            {sectionsData
                .filter((section) => section.enabled !== false)
                .map((section, index) => (
                    <div
                        key={index}
                        ref={(el) => (sectionsRef.current[index] = el)}
                        id={section.name}
                        className="section"
                        style={{
                            backgroundImage: section.bg
                                ? `url(${APIURL}files/${section.bg})`
                                : "none",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    >
                        <HView
                            component={section.component}
                            {...section}
                            scrollToSection={scrollToSection}
                        />
                    </div>
                ))}
        </div>
    );
}