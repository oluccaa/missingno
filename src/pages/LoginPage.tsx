import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import Logo from '../components/shared/Logo';
import { Loader2 } from 'lucide-react';

const LoginPage: React.FC = () => {
    const { login, user, isLoading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro desconhecido.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authLoading) return null; // Or a loading spinner
    if (user) return <Navigate to="/dashboard" replace />;

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary text-text-primary p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center items-center gap-3 mb-8">
                    <Logo className="h-10 w-10 text-accent" />
                    <h1 className="text-3xl font-bold">Painel de Controle</h1>
                </div>

                <div className="bg-secondary p-8 rounded-2xl shadow-lg border border-primary">
                    <h2 className="text-2xl font-bold text-center mb-1">Bem-vindo de volta!</h2>
                    <p className="text-text-muted text-center mb-6">Faça login para gerenciar seu site.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-primary border border-primary rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-text-muted mb-2">Senha</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-primary border border-primary rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Entrar'}
                            </button>
                        </div>
                    </form>
                </div>
                 <p className="text-center text-xs text-text-muted mt-6">
                    Emails de teste: superadmin@example.com, admin@example.com, etc. (qualquer senha)
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
