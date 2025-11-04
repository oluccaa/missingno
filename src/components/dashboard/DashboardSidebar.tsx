import React from 'react';
import Logo from '../shared/Logo';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { 
    LayoutDashboard, Briefcase, Wrench, Users, Settings, 
    FileText, Cog, Info, Workflow 
} from 'lucide-react';
import { DashboardView } from '../../pages/DashboardPage';

const navConfig = [
    {
        title: 'Principal',
        links: [
            { view: 'overview' as DashboardView, label: 'Visão Geral', icon: LayoutDashboard },
        ]
    },
    {
        title: 'Conteúdo do Site',
        links: [
            { view: 'edit-hero' as DashboardView, label: 'Seção Hero', icon: FileText },
            { view: 'edit-techStack' as DashboardView, label: 'Seção Tech', icon: Cog },
            { view: 'edit-about' as DashboardView, label: 'Seção Sobre', icon: Info },
            { view: 'edit-process' as DashboardView, label: 'Seção Processo', icon: Workflow },
        ]
    },
    {
        title: 'Gerenciamento',
        links: [
            { view: 'manage-portfolio' as DashboardView, label: 'Portfólio', icon: Briefcase },
            { view: 'manage-services' as DashboardView, label: 'Serviços', icon: Wrench },
            { view: 'manage-team' as DashboardView, label: 'Equipe', icon: Users },
        ]
    }
];

interface NavLinkProps {
    label: string;
    icon: React.ElementType;
    isSidebarOpen: boolean;
    isActive: boolean;
    onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, icon: Icon, isSidebarOpen, isActive, onClick }) => (
    <button
        onClick={onClick}
        title={!isSidebarOpen ? label : undefined}
        className={`w-full flex items-center gap-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
            isSidebarOpen ? 'px-4' : 'justify-center'
        } ${
            isActive
                ? 'bg-accent text-white shadow-md'
                : 'text-text-muted hover:bg-primary hover:text-text-primary'
        }`}
    >
        <Icon size={20} className="flex-shrink-0" />
        <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 sr-only'}`}>{label}</span>
        {!isSidebarOpen && (
            <div className="absolute left-full ml-4 px-3 py-1.5 bg-primary text-text-primary text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-50">
                {label}
            </div>
        )}
    </button>
);


interface DashboardSidebarProps {
    isSidebarOpen: boolean;
    currentView: DashboardView;
    setCurrentView: (view: DashboardView) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isSidebarOpen, currentView, setCurrentView }) => {
    const { settings } = useSiteSettings();

    return (
        <aside className={`bg-secondary border-r border-primary flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
            <div className="flex items-center gap-3 h-20 border-b border-primary px-6 flex-shrink-0 overflow-hidden">
                <Logo className="w-8 h-8 text-accent flex-shrink-0" />
                <span className={`text-xl font-bold text-text-primary whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                    {settings.siteName}
                </span>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4 space-y-4">
                {navConfig.map(section => (
                    <div key={section.title}>
                        <h3 className={`px-4 pt-2 pb-2 text-xs font-semibold uppercase text-text-muted tracking-wider transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 sr-only'}`}>
                            {isSidebarOpen ? section.title : ''}
                        </h3>
                         <div className="space-y-1">
                            {section.links.map(link => (
                                <NavLink
                                    key={link.view}
                                    label={link.label}
                                    icon={link.icon}
                                    isSidebarOpen={isSidebarOpen}
                                    isActive={currentView === link.view}
                                    onClick={() => setCurrentView(link.view)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-primary flex-shrink-0">
                 <NavLink
                    label="Configurações"
                    icon={Settings}
                    isSidebarOpen={isSidebarOpen}
                    isActive={currentView === 'site-settings'}
                    onClick={() => setCurrentView('site-settings')}
                 />
            </div>
        </aside>
    );
};

export default DashboardSidebar;