import React from "react";
import { HashRouter as Router } from "react-router-dom";
import PageNavigation from "./Common/PageNavigation";
import "./App.css";

function App() {
  return (
    <Router>
      <PageNavigation />
    </Router>
  );
}

export default App;
