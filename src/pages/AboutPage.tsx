import React from 'react';
import CtaSection from '../components/shared/CtaSection';
import TeamSection from '../components/shared/TeamSection';
import { AboutContent } from '../context/SiteContentContext';
import { Target, Eye, Gem } from 'lucide-react';

interface AboutPageProps {
    content: AboutContent;
}

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-secondary p-6 rounded-xl border border-transparent hover:border-accent transition-colors duration-300">
        <div className="mb-4 text-accent">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-text-muted">{description}</p>
    </div>
);


const AboutPage: React.FC<AboutPageProps> = ({ content }) => {
    return (
        <div className="bg-primary">
            <section id="sobre" className="pt-28 pb-20 sm:pb-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
                            dangerouslySetInnerHTML={{ __html: content.headline }}
                        />
                        <p className="text-lg sm:text-xl text-text-muted">
                            {content.subheadline}
                        </p>
                    </div>

                    <div className="mt-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-text-muted leading-relaxed">
                                {content.mainText}
                            </p>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0 text-accent"><Target size={28} /></div>
                                <div>
                                    <h2 className="text-2xl font-bold text-text-primary">{content.mission.title}</h2>
                                    <p className="mt-2 text-text-muted">{content.mission.text}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0 text-accent"><Eye size={28} /></div>
                                <div>
                                    <h2 className="text-2xl font-bold text-text-primary">{content.vision.title}</h2>
                                    <p className="mt-2 text-text-muted">{content.vision.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-24">
                         <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-12">Nossos Valores</h2>
                         <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {content.values.map(value => (
                                <ValueCard key={value.title} icon={<Gem size={32} />} title={value.title} description={value.description} />
                            ))}
                         </div>
                    </div>
                </div>
            </section>
            
            <TeamSection />
            <CtaSection />
        </div>
    );
};

export default AboutPage;