import React, { useEffect, useRef } from 'react';
import { optimizeImageUrl } from '../../lib/imageUtils';

interface Technology {
    name: string;
    icon: string;
}

interface PortfolioItemProps {
    id?: string;
    imageurl: string;
    title: string;
    category: string;
    technologies?: Technology[];
    desafio?: string;
    solucao?: string;
    resultados?: string;
}

interface PortfolioModalProps {
  item: PortfolioItemProps;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && event.target === modalRef.current) onClose();
    };
    
    const placeholderText = "Os detalhes para esta seção ainda não foram adicionados. Volte em breve para saber mais sobre este incrível projeto!";
    const optimizedImageUrl = optimizeImageUrl(item.imageurl, { width: 1200, quality: 85 });

  return (
    <div
        ref={modalRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div 
        className="bg-secondary rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        <div className="relative w-full h-64 sm:h-80 md:h-96 flex-shrink-0">
             <img 
                src={optimizedImageUrl} 
                alt={`Imagem do projeto ${item.title}`} 
                className="w-full h-full object-cover" 
             />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/50 dark:bg-black/50 text-slate-800 dark:text-white rounded-full p-2 hover:bg-white dark:hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Fechar modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
        </div>

        <div className="p-8 sm:p-10 overflow-y-auto">
          <span className="text-sm font-bold text-accent uppercase tracking-wider">{item.category}</span>
          <h2 id="modal-title" className="text-3xl sm:text-4xl font-bold text-text-primary mt-2 mb-6">{item.title}</h2>
          
          <div className="space-y-8 text-text-muted">
            <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">O Desafio</h3>
                <p>{item.desafio || placeholderText}</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">A Solução</h3>
                <p>{item.solucao || placeholderText}</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Resultados</h3>
                <p>{item.resultados || placeholderText}</p>
            </div>
            
            {item.technologies && item.technologies.length > 0 && (
                <div className="border-t border-primary pt-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Tecnologias Utilizadas</h3>
                    <div className="flex flex-wrap gap-4">
                        {item.technologies.map(tech => (
                            <div key={tech.name} className="flex items-center gap-2 bg-primary rounded-full px-4 py-2">
                                <div 
                                    className="flex-shrink-0 h-6 w-6 flex items-center justify-center text-text-muted [&_svg]:w-full [&_svg]:h-full"
                                    dangerouslySetInnerHTML={{ __html: tech.icon || '' }}
                                >
                                </div>
                                <span className="text-sm font-medium text-text-primary">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
