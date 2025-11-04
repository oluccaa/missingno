import React from 'react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import Logo from './Logo';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
    const { settings } = useSiteSettings();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { href: '#', icon: <Github size={24} />, name: 'GitHub' },
        { href: '#', icon: <Linkedin size={24} />, name: 'LinkedIn' },
        { href: '#', icon: <Twitter size={24} />, name: 'Twitter' },
    ];

    const footerNav = [
        { href: '/', label: 'Início' },
        { href: '/sobre-nos', label: 'Sobre Nós' },
        { href: '/nosso-processo', label: 'Processo' },
    ];

    return (
        <footer className="bg-secondary text-text-muted border-t border-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    {/* Logo and Branding */}
                    <div className="flex flex-col items-center md:items-start">
                        <RouterLink to="/" className="flex items-center gap-3 mb-4">
                            <Logo className="w-10 h-10 text-accent" />
                            <span className="text-2xl font-bold text-text-primary">{settings.siteName}</span>
                        </RouterLink>
                        <p className="max-w-xs">
                            Construindo o futuro da web, um projeto de cada vez.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Navegação</h3>
                        <ul className="space-y-3">
                            {footerNav.map(link => (
                                <li key={link.href}>
                                    <RouterLink to={link.href} className="hover:text-accent transition-colors">
                                        {link.label}
                                    </RouterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Siga-nos</h3>
                        <div className="flex justify-center md:justify-start gap-6">
                            {socialLinks.map(social => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent transition-colors"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-primary py-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                    <p>&copy; {currentYear} {settings.siteName}. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
