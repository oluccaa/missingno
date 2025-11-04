import React, { useState, useMemo } from 'react';
import PortfolioModal from './PortfolioModal';
import { optimizeImageUrl } from '../../lib/imageUtils';
import { usePortfolio, PortfolioItem as PortfolioItemProps } from '../../context/PortfolioContext';


const PortfolioItem: React.FC<PortfolioItemProps & { onClick: () => void }> = ({ imageurl, title, category, onClick }) => {
    const optimizedImageUrl = optimizeImageUrl(imageurl, { width: 800, quality: 80 });
    return (
        <button 
            onClick={onClick}
            className="group relative overflow-hidden rounded-lg shadow-lg h-full w-full text-left focus:outline-none focus:ring-4 focus:ring-accent/50 focus:ring-offset-4 focus:ring-offset-primary"
            aria-label={`Ver detalhes do projeto: ${title}`}
        >
            <img src={optimizedImageUrl} alt={title} className="w-full h-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>
            <div className="absolute bottom-0 left-0 p-6">
                <span className="text-sm text-accent font-semibold">{category}</span>
                <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-bold border-2 border-white rounded-full px-4 py-2">Ver Detalhes</span>
            </div>
        </button>
    );
};


const PortfolioSection: React.FC = () => {
    const { portfolioItems } = usePortfolio();
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedItem, setSelectedItem] = useState<PortfolioItemProps | null>(null);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(portfolioItems.map(item => item.category).filter(Boolean));
        return ['Todos', ...Array.from(uniqueCategories)];
    }, [portfolioItems]);

    const filteredItems = useMemo(() => {
        if (selectedCategory === 'Todos') {
            return portfolioItems;
        }
        return portfolioItems.filter(item => item.category === selectedCategory);
    }, [portfolioItems, selectedCategory]);
    
    const openModal = (item: PortfolioItemProps) => {
      document.body.style.overflow = 'hidden';
      setSelectedItem(item);
    };

    const closeModal = () => {
      document.body.style.overflow = '';
      setSelectedItem(null);
    };

    return (
        <>
            <section id="portfolio" className="py-20 sm:py-28 bg-primary">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
                            Projetos que <span className="text-accent">Falam por Si</span>
                        </h2>
                        <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
                            Confira alguns dos trabalhos que nos enchem de orgulho.
                        </p>
                    </div>

                    <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-primary ${
                                    selectedCategory === category
                                        ? 'bg-accent text-white shadow-lg'
                                        : 'bg-secondary text-text-muted hover:bg-primary hover:text-text-primary'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item) => (
                            <div key={item.id}>
                                <PortfolioItem {...item} onClick={() => openModal(item)} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {selectedItem && (
                <PortfolioModal item={selectedItem} onClose={closeModal} />
            )}
        </>
    );
};

export default PortfolioSection;
