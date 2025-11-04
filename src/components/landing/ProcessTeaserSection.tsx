import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PenTool, Code, Rocket, CheckCircle } from 'lucide-react';
import { ProcessContent } from '../../context/SiteContentContext';

const steps = [
    { icon: <Search size={24} />, title: "Descoberta" },
    { icon: <PenTool size={24} />, title: "Design UX/UI" },
    { icon: <Code size={24} />, title: "Desenvolvimento" },
    { icon: <CheckCircle size={24} />, title: "Testes" },
    { icon: <Rocket size={24} />, title: "Lançamento" },
];

interface ProcessTeaserProps {
  content: ProcessContent['teaser'];
}

const ProcessTeaserSection: React.FC<ProcessTeaserProps> = ({ content }) => {
    return (
        <section id="processo" className="py-20 sm:py-28 bg-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary"
                      dangerouslySetInnerHTML={{ __html: content.headline }}
                    />
                    <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
                        {content.p1}
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-secondary -translate-y-1/2" aria-hidden="true"></div>
                    <div className="relative flex justify-between">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center gap-4 text-center">
                                <div className="relative z-10 w-16 h-16 flex items-center justify-center bg-accent text-white rounded-full border-4 border-primary shadow-lg">
                                    {step.icon}
                                </div>
                                <h3 className="font-bold text-text-primary mt-2">{step.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-16">
                    <Link
                        to="/nosso-processo"
                        className="inline-block bg-secondary hover:bg-primary text-text-primary font-bold py-3 px-8 rounded-lg transition-all duration-300 border border-primary hover:border-accent"
                    >
                        {content.buttonText}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProcessTeaserSection;