import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface TeamMember {
    id: string;
    imageUrl: string;
    name: string;
    role: string;
    bio: string;
    socials: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
}

interface TeamContextType {
    teamMembers: TeamMember[];
    addTeamMember: (item: Omit<TeamMember, 'id'>) => void;
    updateTeamMember: (item: TeamMember) => void;
    deleteTeamMember: (id: string) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

const initialTeamMembers: Omit<TeamMember, 'id'>[] = [
    { 
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=75&auto=format&fit=crop', 
        name: "Ana Silva", 
        role: "Líder de Produto",
        bio: "Apaixonada por criar produtos que os usuários amam, unindo visão de negócio com as necessidades do cliente.",
        socials: { linkedin: '#', twitter: '#' }
    },
    { 
        imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&q=75&auto=format&fit=crop', 
        name: "Carlos Oliveira", 
        role: "Arquiteto de Software",
        bio: "Especialista em construir sistemas escaláveis e robustos, garantindo a performance e segurança das aplicações.",
        socials: { linkedin: '#', github: '#' }
    },
    { 
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=75&auto=format&fit=crop', 
        name: "Juliana Pereira", 
        role: "Designer UX/UI",
        bio: "Focada em criar interfaces intuitivas e experiências memoráveis que encantam e engajam os usuários.",
        socials: { linkedin: '#', twitter: '#' }
    },
];

const TEAM_STORAGE_KEY = 'teamData';

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
        try {
            const savedData = localStorage.getItem(TEAM_STORAGE_KEY);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }
            return initialTeamMembers.map(member => ({ ...member, id: crypto.randomUUID() }));
        } catch (error) {
            console.error("Failed to parse team data from localStorage", error);
            localStorage.removeItem(TEAM_STORAGE_KEY);
            return initialTeamMembers.map(member => ({ ...member, id: crypto.randomUUID() }));
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teamMembers));
        } catch (error) {
            console.error("Failed to save team data to localStorage", error);
        }
    }, [teamMembers]);

    const addTeamMember = (item: Omit<TeamMember, 'id'>) => {
        const newItem = { ...item, id: crypto.randomUUID() };
        setTeamMembers(prev => [...prev, newItem]);
    };

    const updateTeamMember = (updatedItem: TeamMember) => {
        setTeamMembers(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const deleteTeamMember = (id: string) => {
        setTeamMembers(prev => prev.filter(item => item.id !== id));
    };

    return (
        <TeamContext.Provider value={{ teamMembers, addTeamMember, updateTeamMember, deleteTeamMember }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeam = () => {
    const context = useContext(TeamContext);
    if (context === undefined) {
        throw new Error('useTeam must be used within a TeamProvider');
    }
    return context;
};
