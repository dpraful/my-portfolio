import { BrowserRouter as Router } from "react-router-dom";
import PageNavigation from "./Navigation/PageNavigation";
import { PortfolioContextProvider } from "./Handlers/portfolioContext";

function App() {
  return (
    <PortfolioContextProvider>
      <Router basename="/my-portfolio/">
        <PageNavigation />
      </Router>
    </PortfolioContextProvider>
  );
}

export default App;
