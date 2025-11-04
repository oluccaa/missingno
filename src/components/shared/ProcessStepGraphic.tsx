import React from 'react';

interface ProcessStepGraphicProps {
    stepNumber: number;
}

const ProcessStepGraphic: React.FC<ProcessStepGraphicProps> = ({ stepNumber }) => {
    return (
        <div className="relative w-full aspect-square max-w-sm mx-auto flex items-center justify-center">
            {/* Background circles */}
            <div className="absolute inset-0 bg-secondary/30 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-secondary/50 rounded-full animate-pulse [animation-delay:500ms]"></div>
            <div className="absolute inset-8 bg-secondary rounded-full"></div>

            {/* Main circle with number */}
            <div className="relative z-10 w-48 h-48 bg-primary rounded-full flex items-center justify-center shadow-2xl border-4 border-secondary">
                <span className="text-6xl font-black text-accent opacity-50 select-none">
                    {String(stepNumber).padStart(2, '0')}
                </span>
            </div>
        </div>
    );
};

export default ProcessStepGraphic;
