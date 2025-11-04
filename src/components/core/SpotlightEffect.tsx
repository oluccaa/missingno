import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const SpotlightEffect: React.FC = () => {
    const { theme } = useTheme();
    const [position, setPosition] = useState({ x: -1000, y: -1000 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        document.body.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.body.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    if (theme !== 'dark') {
        return null;
    }

    return (
        <div 
            className={`pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsla(var(--color-accent-hsl), 0.1), transparent 80%)`,
            }}
        />
    );
};

export default SpotlightEffect;