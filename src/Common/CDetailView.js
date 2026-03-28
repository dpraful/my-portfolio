import { APIURL } from "./Global";

const CDetailView = (props) => {
    return (
        <div className="sections">
            <div
                className="section"
                style={{
                    backgroundImage:`url(${APIURL}files/hero.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                {props.children}
            </div>
        </div>
    );
};



export default CDetailView;