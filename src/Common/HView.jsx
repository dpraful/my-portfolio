import React from 'react';
import About from '../components/About';
import Skills from '../components/Skills';
import Splash from '../components/Splash';
import Contact from '../components/Contact';

function HView(props) {
    const components = {
        About: About,
        Contact: Contact,
        Skills: Skills,
        Splash:Splash,
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