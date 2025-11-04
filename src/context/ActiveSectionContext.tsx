import React, { createContext, useState, useContext } from 'react';

interface ActiveSectionContextType {
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export const ActiveSectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeSection, setActiveSection] = useState('');

    return (
        <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </ActiveSectionContext.Provider>
    );
};

export const useActiveSection = () => {
    const context = useContext(ActiveSectionContext);
    if (context === undefined) {
        throw new Error('useActiveSection must be used within an ActiveSectionProvider');
    }
    return context;
};
