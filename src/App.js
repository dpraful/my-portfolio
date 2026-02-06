import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PageNavigation from "./Common/PageNavigation";
import "./App.css";

function App() {
  return (
    <Router basename="/my-portfolio">
      <PageNavigation />
    </Router>
  );
}

export default App;
