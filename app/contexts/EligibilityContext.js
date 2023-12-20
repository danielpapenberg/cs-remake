// contexts/EligibilityContext.js
import React, { createContext, useState } from 'react';

export const EligibilityContext = createContext();

export const EligibilityProvider = ({ children }) => {
    const [isEligible, setIsEligible] = useState(false);

    // Function to update eligibility
    const updateEligibility = (eligibility) => {
        setIsEligible(eligibility);
    };

    return (
        <EligibilityContext.Provider value={{ isEligible, updateEligibility }}>
            {children}
        </EligibilityContext.Provider>
    );
};
