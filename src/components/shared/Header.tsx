import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { useActiveSection } from '../../context/ActiveSectionContext';
import Logo from './Logo';
import ThemeToggleButton from '../ui/ThemeToggleButton';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { to: '/#inicio', label: 'Início', sectionId: 'inicio' },
    { to: '/#solucoes', label: 'Soluções', sectionId: 'solucoes' },
    { to: '/#sobre', label: 'Sobre', sectionId: 'sobre' },
    { to: '/#portfolio', label: 'Portfólio', sectionId: 'portfolio' },
    { to: '/#processo', label: 'Processo', sectionId: 'processo' },
    { to: '/#contato', label: 'Contato', sectionId: 'contato' },
];

const Header: React.FC = () => {
    const { settings } = useSiteSettings();
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { activeSection } = useActiveSection();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center gap-2">
                        <Logo className="w-8 h-8 text-accent" />
                        <span className="text-xl font-bold text-text-primary">{settings.siteName}</span>
                    </Link>
                    
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => {
                            const isActive = activeSection === link.sectionId;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`font-medium transition-colors duration-300 cursor-pointer ${isActive ? 'text-accent' : 'text-text-muted hover:text-accent'}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                        <Link 
                            to="/#contato"
                            className="hidden lg:inline-block bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-5 rounded-lg transition-colors"
                        >
                           Pedir Orçamento
                        </Link>
                        <button
                            className="md:hidden p-2 rounded-full text-text-muted hover:bg-secondary focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            
            <div className={`md:hidden absolute top-20 left-0 right-0 bg-secondary shadow-lg transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <nav className="flex flex-col p-6 space-y-4">
                     {navLinks.map(link => (
                         <Link
                            key={link.to}
                            to={link.to}
                            className={`font-medium transition-colors duration-300 cursor-pointer ${activeSection === link.sectionId ? 'text-accent' : 'text-text-muted hover:text-accent'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link 
                        to="/#contato"
                        className="bg-accent hover:bg-accent-hover text-white text-center font-semibold py-2 px-5 rounded-lg transition-colors mt-4"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Pedir Orçamento
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;