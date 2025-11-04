import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface ServiceItem {
    id: string;
    icon: string;
    title: string;
    description: string;
}

interface ServicesContextType {
    services: ServiceItem[];
    addService: (item: Omit<ServiceItem, 'id'>) => void;
    updateService: (item: ServiceItem) => void;
    deleteService: (id: string) => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

const initialServices: Omit<ServiceItem, 'id'>[] = [
  { 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>`, 
    title: "Desenvolvimento Web", 
    description: "Construímos sites e aplicações web de alta performance, focados na experiência do usuário e otimizados para conversão." 
  },
  { 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>`, 
    title: "Otimização SEO", 
    description: "Colocamos sua marca no topo dos resultados de busca, atraindo tráfego orgânico qualificado e aumentando sua visibilidade." 
  },
  { 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>`, 
    title: "Marketing Digital", 
    description: "Criamos estratégias de marketing digital integradas que geram leads, fortalecem sua marca e impulsionam suas vendas." 
  },
  { 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.622-3.385m-5.043-.025a15.998 15.998 0 01-3.388-1.621m7.702 7.702a15.998 15.998 0 00-3.388 1.622m5.043.025a15.998 15.998 0 01-1.622 3.385m-5.043-.025a15.998 15.998 0 00-1.622 3.385m-3.388-1.62a15.998 15.998 0 001.622 3.385" /></svg>`, 
    title: "Identidade Visual", 
    description: "Desenvolvemos marcas memoráveis, desde o logo até o manual da marca, que comunicam seus valores e se destacam no mercado." 
  }
];

const SERVICES_STORAGE_KEY = 'servicesData';

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [services, setServices] = useState<ServiceItem[]>(() => {
        try {
            const savedData = localStorage.getItem(SERVICES_STORAGE_KEY);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }
            return initialServices.map(service => ({ ...service, id: crypto.randomUUID() }));
        } catch (error) {
            console.error("Failed to parse services data from localStorage", error);
            localStorage.removeItem(SERVICES_STORAGE_KEY);
            return initialServices.map(service => ({ ...service, id: crypto.randomUUID() }));
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
        } catch (error) {
            console.error("Failed to save services data to localStorage", error);
        }
    }, [services]);

    const addService = (item: Omit<ServiceItem, 'id'>) => {
        const newItem = { ...item, id: crypto.randomUUID() };
        setServices(prev => [...prev, newItem]);
    };

    const updateService = (updatedItem: ServiceItem) => {
        setServices(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const deleteService = (id: string) => {
        setServices(prev => prev.filter(item => item.id !== id));
    };

    return (
        <ServicesContext.Provider value={{ services, addService, updateService, deleteService }}>
            {children}
        </ServicesContext.Provider>
    );
};

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (context === undefined) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
};
