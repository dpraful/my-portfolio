import React, { useContext, useState, createContext } from 'react';

const portfolioContext = createContext({});
// Exporting Context Provider
export const PortfolioContextProvider = ({ children }) => {
    const [responseJSON, setResponseJSON] = useState({});
    const [activeSection, setActiveSection] = useState(0);
    const [sectionsData, setSectionsData] = useState([]);
    const [isAppReady, setIsAppReady] = useState(false);

    return (
        <portfolioContext.Provider
            value={{
                responseJSON,
                setResponseJSON,
                activeSection,
                setActiveSection,
                sectionsData,
                setSectionsData,
                isAppReady,
                setIsAppReady,
            }}>
            {children}
        </portfolioContext.Provider>
    );
};

export const useDataContext = () => {
    return useContext(portfolioContext);
};

export default portfolioContext;
