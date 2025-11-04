import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Gem } from 'lucide-react';
import { AboutContent } from '../../context/SiteContentContext';

interface AboutTeaserProps {
  content: AboutContent['teaser'];
}

const AboutTeaserSection: React.FC<AboutTeaserProps> = ({ content }) => {
  return (
    <section id="sobre" className="py-20 sm:py-28 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary"
              dangerouslySetInnerHTML={{ __html: content.headline }}
            />
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              {content.p1}
            </p>
            <p className="mt-4 text-lg text-text-muted leading-relaxed">
              {content.p2}
            </p>
            <Link
              to="/sobre-nos"
              className="mt-8 inline-block bg-accent hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {content.buttonText}
            </Link>
          </div>
          <div className="space-y-8">
             <div className="flex items-start gap-4 p-6 bg-primary rounded-xl">
                <div className="mt-1 flex-shrink-0 text-accent"><Target size={28} /></div>
                <div>
                    <h3 className="text-xl font-bold text-text-primary">Missão Clara</h3>
                    <p className="mt-2 text-text-muted">Empoderar negócios com tecnologia inovadora e de alta performance.</p>
                </div>
            </div>
             <div className="flex items-start gap-4 p-6 bg-primary rounded-xl">
                <div className="mt-1 flex-shrink-0 text-accent"><Users size={28} /></div>
                <div>
                    <h3 className="text-xl font-bold text-text-primary">Equipe Especialista</h3>
                    <p className="mt-2 text-text-muted">Profissionais dedicados com vasta experiência de mercado.</p>
                </div>
            </div>
             <div className="flex items-start gap-4 p-6 bg-primary rounded-xl">
                <div className="mt-1 flex-shrink-0 text-accent"><Gem size={28} /></div>
                <div>
                    <h3 className="text-xl font-bold text-text-primary">Valores Sólidos</h3>
                    <p className="mt-2 text-text-muted">Compromisso com qualidade, transparência e parceria.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaserSection;