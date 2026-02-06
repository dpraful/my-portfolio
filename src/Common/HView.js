import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import ProjectDetails from '../screens/ProjectDetails';
import Education from '../components/Education';
import Achievements from '../components/Achievements';

function HView(props) {
    const components = {
        Hero: Hero,
        About: About,
        Skills: Skills,
        Experience: Experience,
        Projects: Projects,
        Contact: Contact,
        Education: Education,
        Achievements: Achievements,
        ProjectDetails: ProjectDetails,
    };

    const ViewHOCComponent = typeof components[props.component] !== "undefined" ? components[props.component] : null;

    return (
        ViewHOCComponent != null ?
            <ViewHOCComponent
                {...props}
            /> : null
    );
}
export default HView;