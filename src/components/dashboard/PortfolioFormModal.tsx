import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio, PortfolioItem } from '../../context/PortfolioContext';

interface PortfolioFormModalProps {
    item: PortfolioItem | null;
    onClose: () => void;
}

const PortfolioFormModal: React.FC<PortfolioFormModalProps> = ({ item, onClose }) => {
    const { addItem, updateItem } = usePortfolio();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        imageurl: '',
        desafio: '',
        solucao: '',
        resultados: ''
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title,
                category: item.category,
                imageurl: item.imageurl,
                desafio: item.desafio || '',
                solucao: item.solucao || '',
                resultados: item.resultados || ''
            });
        }
    }, [item]);
    
     useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && event.target === modalRef.current) onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.title.trim()) newErrors.title = 'O título é obrigatório.';
        if (!formData.category.trim()) newErrors.category = 'A categoria é obrigatória.';
        if (!formData.imageurl.trim()) newErrors.imageurl = 'A URL da imagem é obrigatória.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        
        if (item) {
            updateItem({ ...item, ...formData });
        } else {
            addItem(formData);
        }
        onClose();
    };
    
    const InputField: React.FC<{ name: keyof typeof formData; label: string; placeholder?: string; required?: boolean }> = ({ name, label, placeholder, required }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-text-muted mb-2">{label}{required && <span className="text-red-500">*</span>}</label>
            <input
                type="text"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full bg-primary border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 transition-colors ${errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-primary focus:ring-accent'}`}
            />
            {errors[name] && <p className="mt-1.5 text-xs text-red-500">{errors[name]}</p>}
        </div>
    );
    
    const TextareaField: React.FC<{ name: keyof typeof formData; label: string; placeholder?: string; rows?: number }> = ({ name, label, placeholder, rows = 3}) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-text-muted mb-2">{label}</label>
            <textarea
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full bg-primary border border-primary rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
            />
        </div>
    );

    return (
        <div
            ref={modalRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in-up"
        >
            <div className="bg-secondary rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-primary">
                    <h2 className="text-xl font-bold text-text-primary">{item ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</h2>
                    <button onClick={onClose} className="p-2 -mr-2 rounded-full text-text-muted hover:bg-primary">
                        <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <InputField name="title" label="Título do Projeto" placeholder="Ex: Plataforma SaaS de Gestão" required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField name="category" label="Categoria" placeholder="Ex: Aplicação Web" required />
                        <InputField name="imageurl" label="URL da Imagem" placeholder="https://images.unsplash.com/..." required />
                    </div>
                    <TextareaField name="desafio" label="O Desafio" placeholder="Descreva o desafio principal do projeto." />
                    <TextareaField name="solucao" label="A Solução" placeholder="Descreva a solução implementada." />
                    <TextareaField name="resultados" label="Resultados" placeholder="Descreva os resultados alcançados." />
                </form>

                <div className="p-6 mt-auto border-t border-primary flex justify-end gap-4">
                    <button onClick={onClose} className="bg-primary hover:bg-primary/80 text-text-primary font-semibold py-2 px-6 rounded-lg transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} className="bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        {item ? 'Salvar Alterações' : 'Adicionar Projeto'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioFormModal;
