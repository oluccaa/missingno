import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface SiteSettings {
    siteName: string;
    whatsappNumber: string;
    accentColor: string;
}

interface SiteSettingsContextType {
    settings: SiteSettings;
    saveSettings: (newSettings: SiteSettings) => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

const initialSettings: SiteSettings = {
    siteName: "DevFlow",
    whatsappNumber: "5511999999999",
    accentColor: "#3b82f6", // tailwind blue-500
};

const SETTINGS_STORAGE_KEY = 'siteSettings';

export const SiteSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<SiteSettings>(() => {
        try {
            const savedData = localStorage.getItem(SETTINGS_STORAGE_KEY);
            return savedData ? { ...initialSettings, ...JSON.parse(savedData) } : initialSettings;
        } catch (error) {
            console.error("Failed to parse site settings from localStorage", error);
            localStorage.removeItem(SETTINGS_STORAGE_KEY);
            return initialSettings;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
        } catch (error) {
            console.error("Failed to save site settings to localStorage", error);
        }
    }, [settings]);

    const saveSettings = (newSettings: SiteSettings) => {
        setSettings(newSettings);
    };

    return (
        <SiteSettingsContext.Provider value={{ settings, saveSettings }}>
            {children}
        </SiteSettingsContext.Provider>
    );
};

export const useSiteSettings = () => {
    const context = useContext(SiteSettingsContext);
    if (context === undefined) {
        throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
    }
    return context;
};
