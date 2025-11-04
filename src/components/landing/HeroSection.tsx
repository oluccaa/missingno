import React from 'react';
import { Link } from 'react-router-dom';
import { HeroContent } from '../../context/SiteContentContext';

interface HeroSectionProps {
    content: HeroContent;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
    const { h1, h2, buttonText, buttonLink, backgroundImageUrl, blur, brightness, opacity } = content;

    const bgImageStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        filter: `blur(${blur}px) brightness(${brightness}%)`,
    };

    const overlayStyle = {
        backgroundColor: `rgba(0, 0, 0, ${opacity / 100})`,
    };

    return (
        <section id="inicio" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={bgImageStyle}></div>
            <div className="absolute inset-0" style={overlayStyle}></div>
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl animate-fade-in-up">
                <h1 
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                    dangerouslySetInnerHTML={{ __html: h1 }}
                />
                <p className="mt-6 text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto">
                    {h2}
                </p>
                <Link
                    to={buttonLink}
                    className="mt-10 inline-block bg-accent hover:bg-accent-hover text-white font-bold text-lg py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                    {buttonText}
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;