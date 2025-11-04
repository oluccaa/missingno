import React from 'react';
import Router from './Router';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SiteContentProvider } from './context/SiteContentContext';
import { ActiveSectionProvider } from './context/ActiveSectionContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ServicesProvider } from './context/ServicesContext';
import { TeamProvider } from './context/TeamContext';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import DynamicStyles from './components/core/DynamicStyles';
import SpotlightEffect from './components/core/SpotlightEffect';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SiteSettingsProvider>
          <SiteContentProvider>
            <PortfolioProvider>
              <ServicesProvider>
                <TeamProvider>
                  <ActiveSectionProvider>
                    <DynamicStyles />
                    <SpotlightEffect />
                    <Router />
                  </ActiveSectionProvider>
                </TeamProvider>
              </ServicesProvider>
            </PortfolioProvider>
          </SiteContentProvider>
        </SiteSettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;