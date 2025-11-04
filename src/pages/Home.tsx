import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/landing/HeroSection';
import ServicesSection from '../components/landing/ServicesSection';
import PortfolioSection from '../components/landing/PortfolioSection';
import TechStackSection from '../components/landing/TechStackSection';
import ContactSection from '../components/landing/ContactSection';
import { useSiteContent } from '../context/SiteContentContext';
import { useActiveSection } from '../context/ActiveSectionContext';
import AboutTeaserSection from '../components/landing/AboutTeaserSection';
import ProcessTeaserSection from '../components/landing/ProcessTeaserSection';

const sections = [
    { id: 'inicio', component: HeroSection, contentKey: 'hero' },
    { id: 'solucoes', component: ServicesSection },
    { id: 'sobre', component: AboutTeaserSection },
    { id: 'portfolio', component: PortfolioSection },
    { id: 'processo', component: ProcessTeaserSection },
    { id: 'tecnologias', component: TechStackSection, contentKey: 'techStack' },
    { id: 'contato', component: ContactSection },
];

const Home: React.FC = () => {
    const { content } = useSiteContent();
    const { setActiveSection } = useActiveSection();
    const location = useLocation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );

        const elements = sections.map(sec => document.getElementById(sec.id)).filter(el => el);
        elements.forEach(el => observer.observe(el!));

        return () => elements.forEach(el => el && observer.unobserve(el));
    }, [setActiveSection]);
    
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <>
            <HeroSection content={content.hero} />
            <ServicesSection />
            <AboutTeaserSection content={content.about.teaser} />
            <PortfolioSection />
            <ProcessTeaserSection content={content.process.teaser} />
            <TechStackSection content={content.techStack} />
            <ContactSection />
        </>
    );
};

export default Home;