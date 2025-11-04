import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface PortfolioItem {
    id: string;
    imageurl: string;
    title: string;
    category: string;
    desafio?: string;
    solucao?: string;
    resultados?: string;
}

interface PortfolioContextType {
    portfolioItems: PortfolioItem[];
    addItem: (item: Omit<PortfolioItem, 'id'>) => void;
    updateItem: (item: PortfolioItem) => void;
    deleteItem: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const initialPortfolioItems: PortfolioItem[] = [
  { id: "1", title: "Plataforma SaaS de Gestão", category: "Aplicação Web", imageurl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop", desafio: "Centralizar operações empresariais complexas em uma interface intuitiva.", solucao: "Desenvolvemos um dashboard interativo com design modular, permitindo customização e integração com APIs de terceiros.", resultados: "Aumento de 30% na eficiência operacional dos clientes e redução de 50% no tempo gasto em tarefas manuais." },
  { id: "2", title: "E-commerce de Moda", category: "E-commerce", imageurl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop", desafio: "Criar uma experiência de compra online visualmente atraente e com alta taxa de conversão.", solucao: "Implementamos um design limpo, navegação por filtros avançados e um checkout otimizado em uma única página.", resultados: "Aumento de 150% nas vendas online no primeiro trimestre após o lançamento." },
  { id: "3", title: "App de Delivery", category: "Aplicação Mobile", imageurl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=800&auto=format&fit=crop", desafio: "Oferecer rastreamento de pedidos preciso e uma interface amigável para usuários e entregadores.", solucao: "Utilizamos geolocalização em tempo real via WebSockets e criamos duas interfaces distintas no mesmo app.", resultados: "Nota média de 4.8 nas lojas de aplicativos e mais de 50.000 downloads no primeiro mês." },
  { id: "4", title: "Portal de Educação", category: "Aplicação Web", imageurl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop", desafio: "Construir uma plataforma EAD robusta para suportar milhares de alunos simultâneos.", solucao: "Arquitetura baseada em microserviços na AWS para escalabilidade e streaming de vídeo otimizado.", resultados: "Capacidade de suportar 10.000 alunos concorrentes sem degradação de performance." },
];

const PORTFOLIO_STORAGE_KEY = 'portfolioData';

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
        try {
            const savedData = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                // Ensure the loaded data is an array to prevent crashes.
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }
            return initialPortfolioItems;
        } catch (error) {
            console.error("Failed to parse portfolio data from localStorage", error);
            localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
            return initialPortfolioItems;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolioItems));
        } catch (error) {
            console.error("Failed to save portfolio data to localStorage", error);
        }
    }, [portfolioItems]);

    const addItem = (item: Omit<PortfolioItem, 'id'>) => {
        const newItem = { ...item, id: Date.now().toString() };
        setPortfolioItems(prev => [...prev, newItem]);
    };

    const updateItem = (updatedItem: PortfolioItem) => {
        setPortfolioItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const deleteItem = (id: string) => {
        setPortfolioItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <PortfolioContext.Provider value={{ portfolioItems, addItem, updateItem, deleteItem }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};
