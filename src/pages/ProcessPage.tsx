import React from 'react';
import { ProcessContent } from '../context/SiteContentContext';
import CtaSection from '../components/shared/CtaSection';
import ProcessStepGraphic from '../components/shared/ProcessStepGraphic';
import { CheckCircle } from 'lucide-react';

interface ProcessPageProps {
    content: ProcessContent;
}

const ProcessPage: React.FC<ProcessPageProps> = ({ content }) => {
    return (
        <div className="bg-primary">
            <section id="processo" className="pt-28 pb-20 sm:pb-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
                            dangerouslySetInnerHTML={{ __html: content.headline }}
                        />
                        <p className="text-lg sm:text-xl text-text-muted">
                            {content.subheadline}
                        </p>
                    </div>

                    <div className="relative">
                        {/* The connecting line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-1 bg-secondary hidden md:block" aria-hidden="true"></div>

                        <div className="space-y-16">
                            {content.steps.map((step, index) => (
                                <div key={index} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                                    {/* Graphic on even, text on odd */}
                                    <div className={`md:w-1/2 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                                        <ProcessStepGraphic stepNumber={index + 1} />
                                    </div>
                                    {/* Text on even, graphic on odd */}
                                    <div className={`md:w-1/2 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                                        <div className="bg-secondary p-8 rounded-2xl border border-primary relative">
                                            <span className="absolute -top-4 -left-4 bg-accent text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">{step.title}</h2>
                                            <p className="text-text-muted mb-6">{step.description}</p>
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="font-semibold text-text-primary mb-2">Entregáveis Chave:</h3>
                                                    <ul className="space-y-1">
                                                        {step.deliverables.map(item => (
                                                            <li key={item} className="flex items-start gap-2 text-text-muted text-sm">
                                                                <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-text-primary mb-2">Ferramentas:</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {step.tools.map(tool => (
                                                            <span key={tool} className="bg-primary text-text-muted text-xs font-semibold px-3 py-1 rounded-full">
                                                                {tool}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <CtaSection />
        </div>
    );
};

export default ProcessPage;