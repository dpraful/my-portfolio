import { Routes, Route } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import Details from "../screens/Details";

function PageNavigation() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/skills" element={<Dashboard data={1}/>}/>
        <Route path="/experience" element={<Dashboard data={2}/>}/>
        <Route path="/projects" element={<Dashboard data={3}/>}/>
        <Route path="/education" element={<Dashboard data={4}/>}/>
        <Route path="/achievements" element={<Dashboard data={5}/>}/>
        <Route path="/contact" element={<Dashboard data={6}/>}/>
        <Route path="/details" element={<Details/>} />
      </Routes>
  );
}

export default PageNavigation;
