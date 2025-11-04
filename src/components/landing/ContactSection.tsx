import React, { useState } from 'react';

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const validate = (): boolean => {
        const newErrors = { name: '', email: '', message: '' };
        let isValid = true;
        if (!formData.name.trim()) {
            newErrors.name = 'O nome é obrigatório.';
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'O e-mail é obrigatório.';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Formato de e-mail inválido.';
            isValid = false;
        }
        if (!formData.message.trim()) {
            newErrors.message = 'A mensagem é obrigatória.';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('Enviando...');
        // Mock API call
        await new Promise(res => setTimeout(res, 1500));
        setStatus('Mensagem enviada com sucesso!');
        setFormData({ name: '', email: '', message: '' });
        setErrors({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <section id="contato" className="py-20 sm:py-28 bg-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
                        Vamos Construir Algo <span className="text-accent">Incrível</span> Juntos?
                    </h2>
                    <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
                        Entre em contato e vamos transformar sua ideia em realidade.
                    </p>
                </div>
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div>
                            <label htmlFor="name" className="sr-only">Nome</label>
                            <input
                                type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Seu nome" required
                                className={`w-full bg-secondary border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 transition-colors ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-secondary focus:ring-accent'}`}
                            />
                            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Seu e-mail" required
                                className={`w-full bg-secondary border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-secondary focus:ring-accent'}`}
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="message" className="sr-only">Mensagem</label>
                            <textarea
                                name="message" id="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Sua mensagem" required
                                className={`w-full bg-secondary border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 transition-colors ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-secondary focus:ring-accent'}`}
                            ></textarea>
                            {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-accent hover:bg-accent-hover text-white font-bold text-lg py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                                disabled={status === 'Enviando...'}
                            >
                                <span>{status === 'Enviando...' ? 'Enviando...' : 'Enviar Mensagem'}</span>
                            </button>
                        </div>
                    </form>
                    {status && status !== 'Enviando...' && (
                        <p className={`mt-4 text-center ${status.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>{status}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;