import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface HeroContent {
    h1: string;
    h2: string;
    buttonText: string;
    buttonLink: string;
    backgroundImageUrl: string;
    blur: number;
    brightness: number;
    opacity: number;
}

export interface TechStackContent {
    title: string;
    subtitle: string;
}

export interface AboutContent {
    headline: string;
    subheadline: string;
    mainText: string;
    mission: { title: string; text: string; };
    vision: { title: string; text: string; };
    values: { title: string; description: string; }[];
    teaser: { headline: string; p1: string; p2: string; buttonText: string; };
}

export interface ProcessStep {
    title: string;
    description: string;
    deliverables: string[];
    tools: string[];
}

export interface ProcessContent {
    headline: string;
    subheadline: string;
    steps: ProcessStep[];
    teaser: { headline: string; p1: string; buttonText: string; };
}

export interface SiteContent {
    hero: HeroContent;
    techStack: TechStackContent;
    about: AboutContent;
    process: ProcessContent;
}


interface SiteContentContextType {
    content: SiteContent;
    saveSectionContent: (sectionId: keyof SiteContent, newContent: any) => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const initialContent: SiteContent = {
    hero: {
        h1: 'Transformamos Ideias em <span class="text-accent">Soluções Digitais</span> de Impacto',
        h2: 'Somos especialistas em criar experiências web e mobile que impulsionam o crescimento do seu negócio. Do design à implementação, cuidamos de tudo para você.',
        buttonText: 'Conheça Nossas Soluções',
        buttonLink: '/#solucoes',
        backgroundImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
        blur: 4,
        brightness: 70,
        opacity: 50
    },
    techStack: {
        title: 'Nossa <span class="text-accent">Caixa de Ferramentas</span> Tecnológicas',
        subtitle: 'Utilizamos as tecnologias mais modernas e robustas do mercado para construir soluções eficientes, escaláveis e seguras.'
    },
    about: {
        headline: 'Somos mais que uma agência, somos seu <span class="text-accent">parceiro estratégico</span> em tecnologia.',
        subheadline: 'Nascemos da paixão por inovação e do desejo de ajudar empresas a prosperar no mundo digital. Nossa jornada é marcada pela busca incessante por excelência e por resultados que fazem a diferença.',
        mainText: 'Na DevFlow, acreditamos que a tecnologia é uma ferramenta poderosa para transformar negócios. Combinamos design centrado no usuário, engenharia de software de ponta e uma abordagem consultiva para entregar produtos digitais que não apenas atendem, mas superam as expectativas. Nossa cultura é de colaboração, aprendizado contínuo e compromisso total com o sucesso de nossos clientes.',
        mission: { title: "Nossa Missão", text: "Empoderar empresas através de soluções digitais inovadoras, intuitivas e de alta performance, impulsionando seu crescimento e competitividade no mercado." },
        vision: { title: "Nossa Visão", text: "Ser referência em desenvolvimento de software e consultoria digital, reconhecida pela excelência técnica, criatividade e pela construção de parcerias duradouras." },
        values: [
            { title: "Inovação", description: "Buscamos constantemente novas tecnologias e abordagens para resolver problemas complexos." },
            { title: "Qualidade", description: "Nosso compromisso é com a entrega de produtos robustos, seguros e com acabamento impecável." },
            { title: "Parceria", description: "Trabalhamos lado a lado com nossos clientes, entendendo suas dores e celebrando suas vitórias." },
            { title: "Transparência", description: "Comunicação clara e honesta é a base de todos os nossos relacionamentos." }
        ],
        teaser: {
            headline: 'Uma Agência com <span class="text-accent">Propósito</span>',
            p1: 'Na DevFlow, unimos criatividade e expertise técnica para criar soluções que não apenas funcionam, mas também encantam.',
            p2: 'Somos movidos pelo desafio de transformar ideias complexas em produtos digitais simples, elegantes e eficazes.',
            buttonText: 'Conheça Nossa História'
        }
    },
    process: {
        headline: 'Nosso Caminho para o <span class="text-accent">Sucesso</span> do seu Projeto',
        subheadline: 'Seguimos um processo bem definido e transparente, garantindo que cada etapa do desenvolvimento seja executada com precisão, alinhada aos seus objetivos e com entregas de valor contínuas.',
        steps: [
            { title: "Descoberta e Planejamento", description: "Mergulhamos no seu negócio para entender seus objetivos, desafios e público. Mapeamos requisitos e definimos a estratégia e o escopo do projeto.", deliverables: ["Documento de Visão do Produto", "Mapa de Jornada do Usuário", "Backlog Priorizado"], tools: ["Figma", "Miro", "Jira"] },
            { title: "Design UX/UI", description: "Criamos a arquitetura da informação, fluxos de navegação e projetamos interfaces intuitivas e visualmente atraentes, focadas na melhor experiência para o usuário.", deliverables: ["Wireframes e Protótipos Interativos", "Guia de Estilo Visual", "Design System"], tools: ["Figma", "Adobe XD", "Sketch"] },
            { title: "Desenvolvimento Ágil", description: "Com sprints quinzenais, nosso time de desenvolvimento transforma o design em código limpo, escalável e testável, com revisões e feedback contínuos.", deliverables: ["Código-fonte em Repositório", "Builds para Testes (Staging)", "Relatórios de Sprint"], tools: ["React", "Node.js", "Docker", "GitHub"] },
            { title: "Testes e Qualidade", description: "Realizamos uma bateria de testes rigorosos – funcionais, de usabilidade, performance e segurança – para garantir um produto final robusto e livre de falhas.", deliverables: ["Plano de Testes", "Relatório de Bugs", "Certificado de Qualidade"], tools: ["Jest", "Cypress", "Postman"] },
            { title: "Lançamento e Evolução", description: "Cuidamos de todo o processo de deploy em ambiente de produção. Após o lançamento, monitoramos a performance e oferecemos suporte e planos de evolução contínua.", deliverables: ["Aplicação em Produção", "Documentação Técnica", "Dashboard de Monitoramento"], tools: ["Vercel", "AWS", "Datadog"] }
        ],
        teaser: {
            headline: 'Processo <span class="text-accent">Transparente</span>, Resultados <span class="text-accent">Concretos</span>',
            p1: 'Da ideia inicial ao lançamento e além, nosso processo é estruturado para garantir qualidade, previsibilidade e o máximo de valor para o seu investimento.',
            buttonText: 'Veja Todas as Etapas'
        }
    }
};

const CONTENT_STORAGE_KEY = 'siteContent';

export const SiteContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<SiteContent>(() => {
        try {
            const savedData = localStorage.getItem(CONTENT_STORAGE_KEY);
            // Deep merge to ensure new properties from initialContent are added if they don't exist in saved data
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                // A simple merge to avoid breaking the site if new keys are added to initialContent
                return {
                    hero: { ...initialContent.hero, ...parsedData.hero },
                    techStack: { ...initialContent.techStack, ...parsedData.techStack },
                    about: { ...initialContent.about, ...parsedData.about },
                    process: { ...initialContent.process, ...parsedData.process },
                };
            }
            return initialContent;
        } catch (error) {
            console.error("Failed to parse site content from localStorage", error);
            localStorage.removeItem(CONTENT_STORAGE_KEY);
            return initialContent;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
        } catch (error) {
            console.error("Failed to save site content to localStorage", error);
        }
    }, [content]);

    const saveSectionContent = (sectionId: keyof SiteContent, newContent: any) => {
        setContent(prevContent => ({
            ...prevContent,
            [sectionId]: newContent
        }));
    };

    return (
        <SiteContentContext.Provider value={{ content, saveSectionContent }}>
            {children}
        </SiteContentContext.Provider>
    );
};

export const useSiteContent = () => {
    const context = useContext(SiteContentContext);
    if (context === undefined) {
        throw new Error('useSiteContent must be used within a SiteContentProvider');
    }
    return context;
};
