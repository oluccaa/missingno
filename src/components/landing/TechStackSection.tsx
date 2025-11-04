import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TechStackContent } from '../../context/SiteContentContext';

interface Technology {
    name: string;
    icon: string;
}

interface TechStackSectionProps {
    content: TechStackContent;
}

// Ícones SVG de alta qualidade, padronizados e otimizados para usar currentColor
const technologies: Technology[] = [
    { name: "React", icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 2.247a1 1 0 0 0-.936.649l-5.872 13.56a1 1 0 0 0 .936 1.344h2.483a1 1 0 0 0 .936-.65l.93-2.14h5.03l.93 2.14a1 1 0 0 0 .936.65h2.483a1 1 0 0 0 .936-1.344l-5.872-13.56A1 1 0 0 0 12 2.247zm-1.06 10.124L12 9.248l1.06 3.123h-2.12zM21.12 6.54a1 1 0 0 0-1.25.28l-3.34 5.345a1 1 0 0 0 .832 1.545h.334a1 1 0 0 0 .936-.65l1.9-4.37a1 1 0 0 0-.442-1.15zm-18.24 0a1 1 0 0 0-.442 1.15l1.9 4.37a1 1 0 0 0 .936.65h.334a1 1 0 0 0 .832-1.545L4.13 6.82a1 1 0 0 0-1.25-.28z"/></svg>` },
    { name: "TypeScript", icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M1.5 0h21v21h-21zM0 1.5V24h22.5V1.5H0zM21 22.5H1.5V3h19.5v19.5zM6.33 17.5h2.96V10.2H6.33zm.4-10.23h2.12V9.4H6.73zM12 17.5h2.88v-7h.1l2.84 7h2.78l-4.3-10.1L19.13 5h-2.84l-2.79 6.78h-.1V5h-2.68v12.5z"/></svg>` },
    { name: "Node.js", icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m21.22 9.47-6.2-3.58-2.6-1.5-2.6 1.5-6.2 3.58-2.6 1.5v7.06l2.6 1.5 6.2 3.58 2.6 1.5 2.6-1.5 6.2-3.58 2.6-1.5V11l-2.6-1.53zM12 20.24l-8.8-5.08V8.84L12 3.76l8.8 5.08v6.32l-8.8 5.08z"/></svg>` },
    { name: "Next.js", icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><circle cx="12" cy="12" r="12"/><path d="M15.53 18V6h-1.92v11.16L9.6 6H7.68v12h1.92V6.84L13.61 18z" fill="#fff"/></svg>` },
    { name: "Tailwind CSS", icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 17.625a7.875 7.875 0 1 1 0-15.75 7.875 7.875 0 0 1 0 15.75zM15.435 8.016a.75.75 0 0 0-1.065 0L12 10.36l-2.37-2.344a.75.75 0 0 0-1.065 1.065L10.935 12l-2.344 2.37a.75.75 0 1 0 1.065 1.065L12 13.065l2.37 2.344a.75.75 0 1 0 1.065-1.065L13.065 12l2.37-2.37a.75.75 0 0 0 0-1.065z"/></svg>` },
    { name: "Python", icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M11.5 3.5c-2 0-3.5 1.5-3.5 3.5v2h4v1h-4v2h4v1h-4v2h3.5c2 0 3.5-1.5 3.5-3.5v-5c0-2-1.5-3.5-3.5-3.5zm-1 2h1c.825 0 1.5.675 1.5 1.5s-.675 1.5-1.5 1.5h-1v-3zm-1 8.5c-2 0-3.5 1.5-3.5 3.5s1.5 3.5 3.5 3.5h5c2 0 3.5-1.5 3.5-3.5v-2h-4v-1h4v-2h-4v-1h4v-2h-3.5c-2 0-3.5 1.5-3.5 3.5zm1 2h-1c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5h1v-3z"/></svg>` },
    { name: "Docker", icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M22.12 6.368H1.88a1.88 1.88 0 0 0-1.88 1.88v9.504a1.88 1.88 0 0 0 1.88 1.88h20.24a1.88 1.88 0 0 0 1.88-1.88V8.248a1.88 1.88 0 0 0-1.88-1.88zm-2.82 5.64h-3.76v3.76h-3.76v-3.76H8.02v-3.76h3.76v3.76h3.76v-3.76h3.76v3.76z"/></svg>` },
    { name: "Figma", icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 2.5a3.5 3.5 0 0 0-3.5 3.5v7a3.5 3.5 0 0 0 3.5 3.5h3.5a3.5 3.5 0 0 0 3.5-3.5V9.5h-3.5a3.5 3.5 0 0 1-3.5-3.5V2.5zm0-1a4.5 4.5 0 0 1 4.5 4.5V6h3.5A4.5 4.5 0 0 1 24 10.5v3a4.5 4.5 0 0 1-4.5 4.5H12a4.5 4.5 0 0 1-4.5-4.5V6A4.5 4.5 0 0 1 12 1.5zM8.5 2.5a3.5 3.5 0 0 0-3.5 3.5v3.5a3.5 3.5 0 1 0 0 7V13h3.5a3.5 3.5 0 0 1 3.5 3.5v3.5A3.5 3.5 0 0 0 12 24a3.5 3.5 0 0 0 3.5-3.5v-3.5a3.5 3.5 0 1 0 0-7V13H12a3.5 3.5 0 0 1-3.5-3.5V6a3.5 3.5 0 0 0-3.5-3.5z"/></svg>` },
    { name: "Vercel", icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>` },
    { name: "AWS", icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M4 2h16c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 18h16V4H4v16zm5.5-14a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9a.5.5 0 0 1 .5-.5z"/></svg>` },
];


const TechItem: React.FC<{ name: string; icon: string }> = ({ name, icon }) => (
    <li className="flex flex-col items-center justify-center gap-2 text-center flex-shrink-0">
        <div 
            className="h-16 w-16 text-text-muted transition-colors duration-300 group-hover:text-accent [&_svg]:w-full [&_svg]:h-full"
            dangerouslySetInnerHTML={{ __html: icon }}
        ></div>
        <span className="font-semibold text-text-primary">{name}</span>
    </li>
);

const TechStackSection: React.FC<TechStackSectionProps> = ({ content }) => {
    const [animatedItems, setAnimatedItems] = useState<Technology[]>([]);
    const [isReady, setIsReady] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const measurementListRef = useRef<HTMLUListElement>(null);

    const setupCarousel = useCallback(() => {
        if (technologies.length === 0) return;
        if (measurementListRef.current && containerRef.current) {
            const baseWidth = measurementListRef.current.scrollWidth;
            const containerWidth = containerRef.current.offsetWidth;
            
            if (baseWidth > 0 && containerWidth > 0) {
                let baseChunk = [...technologies];
                // Se a largura base for menor que o contêiner, duplique para preencher
                if (baseWidth < containerWidth) {
                    const repeatFactor = Math.ceil((containerWidth * 1.5) / baseWidth); // Adicione um buffer
                    baseChunk = Array.from({ length: repeatFactor + 1 }).flatMap(() => technologies);
                }
                setAnimatedItems([...baseChunk, ...baseChunk]);
                setIsReady(true);
            }
        }
    }, []);

    useEffect(() => {
        // Um pequeno atraso para garantir que as fontes e os elementos estejam renderizados.
        const timer = setTimeout(() => {
            setupCarousel();
        }, 100);
        window.addEventListener('resize', setupCarousel);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', setupCarousel);
        };
    }, [setupCarousel]);

    return (
        <section id="tecnologias" className="py-20 sm:py-28 bg-primary overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary"
                        dangerouslySetInnerHTML={{ __html: content.title }}
                    />
                    <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                </div>
                
                {/* Lista para medição, fora da tela */}
                <ul ref={measurementListRef} className="flex w-max absolute top-0 -left-[9999px] opacity-0 -z-10 [&_li]:mx-8">
                    {technologies.map((tech, index) => (
                        <TechItem key={`${tech.name}-${index}`} name={tech.name} icon={tech.icon} />
                    ))}
                </ul>

                <div
                    ref={containerRef}
                    className="group w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)]"
                    style={{ minHeight: '108px' }} // Altura mínima para evitar colapso antes do JS
                >
                    {isReady && animatedItems.length > 0 && (
                        <ul className="flex w-max animate-scroll group-hover:[animation-play-state:paused] [&_li]:mx-8">
                            {animatedItems.map((tech, index) => (
                                <TechItem key={`${tech.name}-${index}`} name={tech.name} icon={tech.icon} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TechStackSection;