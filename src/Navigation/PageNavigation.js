import { Routes, Route } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import Details from "../screens/Details";

function PageNavigation() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/details" element={<Details/>} />
      </Routes>
  );
}

export default PageNavigation;
