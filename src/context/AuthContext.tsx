import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Role = 'superadmin' | 'admin' | 'editor' | 'author';

interface User {
    email: string;
    role: Role;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: { [email: string]: { role: Role } } = {
    'superadmin@example.com': { role: 'superadmin' },
    'admin@example.com': { role: 'admin' },
    'editor@example.com': { role: 'editor' },
    'author@example.com': { role: 'author' }
};


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for saved user in localStorage on initial load
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, pass: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const foundUser = MOCK_USERS[email.toLowerCase()];
                if (foundUser) {
                    const userData: User = { email, role: foundUser.role };
                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);
                    resolve();
                } else {
                    reject(new Error('Credenciais inválidas. Tente novamente.'));
                }
            }, 1000);
        });
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};