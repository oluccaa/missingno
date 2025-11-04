import React from 'react';
import { useServices } from '../../context/ServicesContext';

const ServiceCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => {
    return (
        <div className="bg-secondary p-8 rounded-xl border border-transparent hover:border-accent transition-all duration-300 transform hover:-translate-y-2 h-full">
            <div 
                className="mb-4 text-accent [&_svg]:h-12 [&_svg]:w-12"
                dangerouslySetInnerHTML={{ __html: icon }}
            />
            <h3 className="text-2xl font-bold text-text-primary mb-2">{title}</h3>
            <p className="text-text-muted">{description}</p>
        </div>
    );
};

const ServicesSection: React.FC = () => {
    const { services } = useServices();

    return (
        <section id="solucoes" className="py-20 sm:py-28 bg-primary overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
                      Nossas Soluções para <span className="text-accent">Impulsionar</span> seu Negócio
                    </h2>
                    <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
                        Oferecemos um leque completo de serviços para garantir a presença digital de sua empresa.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <div key={service.id}>
                            <ServiceCard icon={service.icon} title={service.title} description={service.description} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;