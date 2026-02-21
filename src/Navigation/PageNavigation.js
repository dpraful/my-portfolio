import { Routes, Route } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import ProjectDetails from "../screens/ProjectDetails";
import Splash from "../screens/Splash"

function PageNavigation() {
  return (
      <Routes>
        <Route path="/" element={<Splash/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/project" element={<ProjectDetails/>} />
      </Routes>
  );
}

export default PageNavigation;
