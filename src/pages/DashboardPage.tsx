import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import Overview from '../components/dashboard/Overview';
import ManagePortfolio from '../components/dashboard/ManagePortfolio';
import ManageServices from '../components/dashboard/ManageServices';
import ManageTeam from '../components/dashboard/ManageTeam';
import SectionEditor from '../components/dashboard/SectionEditor';
import SiteSettingsEditor from '../components/dashboard/SiteSettingsEditor';
import { Menu, X, LogOut } from 'lucide-react';

export type DashboardView =
    | 'overview'
    | 'edit-hero'
    | 'edit-techStack'
    | 'edit-about'
    | 'edit-process'
    | 'manage-portfolio'
    | 'manage-services'
    | 'manage-team'
    | 'site-settings';

const DashboardPage: React.FC = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [currentView, setCurrentView] = useState<DashboardView>('overview');

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    const renderCurrentView = () => {
        switch (currentView) {
            case 'overview':
                return <Overview />;
            case 'manage-portfolio':
                return <ManagePortfolio />;
            case 'manage-services':
                return <ManageServices />;
            case 'manage-team':
                return <ManageTeam />;
            case 'edit-hero':
                return <SectionEditor sectionId="hero" />;
            case 'edit-techStack':
                 return <SectionEditor sectionId="techStack" />;
            case 'edit-about':
                 return <SectionEditor sectionId="about" />;
            case 'edit-process':
                 return <SectionEditor sectionId="process" />;
            case 'site-settings':
                return <SiteSettingsEditor />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="flex h-screen bg-primary text-text-primary overflow-hidden">
            <DashboardSidebar 
                isSidebarOpen={isSidebarOpen} 
                currentView={currentView}
                setCurrentView={setCurrentView}
            />
            <div className="flex-1 flex flex-col">
                <header className="h-20 bg-secondary border-b border-primary flex-shrink-0 flex items-center justify-between px-6">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-full text-text-muted hover:bg-primary"
                        title={isSidebarOpen ? 'Fechar menu' : 'Abrir menu'}
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                           <p className="font-semibold text-sm text-text-primary">{user?.email}</p>
                           <p className="text-xs text-text-muted capitalize">{user?.role}</p>
                        </div>
                        <button 
                           onClick={handleLogout}
                           className="p-2 rounded-full text-text-muted hover:bg-primary"
                           title="Sair"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto">
                    {renderCurrentView()}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
