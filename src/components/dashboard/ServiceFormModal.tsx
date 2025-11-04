import React, { useState, useEffect, useRef } from 'react';
import { useServices, ServiceItem } from '../../context/ServicesContext';

interface ServiceFormModalProps {
    item: ServiceItem | null;
    onClose: () => void;
}

const ServiceFormModal: React.FC<ServiceFormModalProps> = ({ item, onClose }) => {
    const { addService, updateService } = useServices();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '<svg></svg>',
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title,
                description: item.description,
                icon: item.icon,
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
        if (!formData.description.trim()) newErrors.description = 'A descrição é obrigatória.';
        if (!formData.icon.trim().startsWith('<svg') || !formData.icon.trim().endsWith('</svg>')) {
            newErrors.icon = 'O ícone deve ser um código SVG válido.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        
        if (item) {
            updateService({ ...item, ...formData });
        } else {
            addService(formData);
        }
        onClose();
    };

    return (
        <div
            ref={modalRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in-up"
        >
            <div className="bg-secondary rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-primary">
                    <h2 className="text-xl font-bold text-text-primary">{item ? 'Editar Serviço' : 'Adicionar Novo Serviço'}</h2>
                    <button onClick={onClose} className="p-2 -mr-2 rounded-full text-text-muted hover:bg-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-text-muted mb-2">Título do Serviço<span className="text-red-500">*</span></label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className={`w-full bg-primary border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 transition-colors ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-primary focus:ring-accent'}`} />
                        {errors.title && <p className="mt-1.5 text-xs text-red-500">{errors.title}</p>}
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-text-muted mb-2">Descrição<span className="text-red-500">*</span></label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className={`w-full bg-primary border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 transition-colors ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-primary focus:ring-accent'}`} />
                        {errors.description && <p className="mt-1.5 text-xs text-red-500">{errors.description}</p>}
                    </div>
                    <div>
                        <label htmlFor="icon" className="block text-sm font-medium text-text-muted mb-2">Código SVG do Ícone<span className="text-red-500">*</span></label>
                        <textarea id="icon" name="icon" value={formData.icon} onChange={handleChange} rows={4} className={`w-full bg-primary border rounded-lg px-4 py-3 text-text-primary font-mono text-xs placeholder-text-muted focus:outline-none focus:ring-2 transition-colors ${errors.icon ? 'border-red-500 focus:ring-red-500' : 'border-primary focus:ring-accent'}`} />
                        {errors.icon && <p className="mt-1.5 text-xs text-red-500">{errors.icon}</p>}
                    </div>
                </form>

                <div className="p-6 mt-auto border-t border-primary flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="bg-primary hover:bg-primary/80 text-text-primary font-semibold py-2 px-6 rounded-lg transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" onClick={handleSubmit} className="bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        {item ? 'Salvar Alterações' : 'Adicionar Serviço'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceFormModal;
