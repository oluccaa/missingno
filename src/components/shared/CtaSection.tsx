import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection: React.FC = () => {
    return (
        <section className="py-20 sm:py-28 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
                        Pronto para Transformar sua Ideia em Realidade?
                    </h2>
                    <p className="mt-6 text-lg text-text-muted">
                        Não deixe sua visão no papel. Nossa equipe de especialistas está pronta para ouvir seus desafios e criar uma solução digital sob medida que impulsione seu negócio.
                    </p>
                    <div className="mt-10">
                         <Link
                            to="/#contato"
                            className="inline-block bg-accent hover:bg-accent-hover text-white font-bold text-lg py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
                         >
                            Vamos Conversar
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
