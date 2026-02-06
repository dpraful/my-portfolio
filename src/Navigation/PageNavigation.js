import { Routes, Route } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import ProjectDetails from "../screens/ProjectDetails";

function PageNavigation() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/project" element={<ProjectDetails/>} />
      </Routes>
  );
}

export default PageNavigation;
