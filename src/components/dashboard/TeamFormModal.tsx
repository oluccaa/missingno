import React, { useState, useEffect, useRef } from 'react';
import { useTeam, TeamMember } from '../../context/TeamContext';

interface TeamFormModalProps {
    item: TeamMember | null;
    onClose: () => void;
}

type FormData = Omit<TeamMember, 'id' | 'socials'> & {
    linkedin: string;
    twitter: string;
    github: string;
};

const TeamFormModal: React.FC<TeamFormModalProps> = ({ item, onClose }) => {
    const { addTeamMember, updateTeamMember } = useTeam();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        role: '',
        imageUrl: '',
        bio: '',
        linkedin: '',
        twitter: '',
        github: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                role: item.role,
                imageUrl: item.imageUrl,
                bio: item.bio,
                linkedin: item.socials.linkedin || '',
                twitter: item.socials.twitter || '',
                github: item.socials.github || '',
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
        const newErrors: Partial<FormData> = {};
        if (!formData.name.trim()) newErrors.name = 'O nome é obrigatório.';
        if (!formData.role.trim()) newErrors.role = 'O cargo é obrigatório.';
        if (!formData.imageUrl.trim()) newErrors.imageUrl = 'A URL da imagem é obrigatória.';
        if (!formData.bio.trim()) newErrors.bio = 'A bio é obrigatória.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        
        const memberData: Omit<TeamMember, 'id'> = {
            name: formData.name,
            role: formData.role,
            imageUrl: formData.imageUrl,
            bio: formData.bio,
            socials: {
                linkedin: formData.linkedin,
                twitter: formData.twitter,
                github: formData.github,
            }
        };

        if (item) {
            updateTeamMember({ ...item, ...memberData });
        } else {
            addTeamMember(memberData);
        }
        onClose();
    };

    const InputField: React.FC<{ name: keyof FormData; label: string; placeholder?: string; required?: boolean }> = ({ name, label, placeholder, required }) => (
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

    return (
        <div
            ref={modalRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in-up"
        >
            <div className="bg-secondary rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-primary">
                    <h2 className="text-xl font-bold text-text-primary">{item ? 'Editar Membro' : 'Adicionar Novo Membro'}</h2>
                    <button onClick={onClose} className="p-2 -mr-2 rounded-full text-text-muted hover:bg-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField name="name" label="Nome Completo" placeholder="Ex: Ana Silva" required />
                        <InputField name="role" label="Cargo" placeholder="Ex: Líder de Produto" required />
                    </div>
                    <InputField name="imageUrl" label="URL da Imagem" placeholder="https://images.unsplash.com/..." required />
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-text-muted mb-2">Bio<span className="text-red-500">*</span></label>
                        <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={3} placeholder="Uma breve descrição sobre o membro da equipe..." className={`w-full bg-primary border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 transition-colors ${errors.bio ? 'border-red-500 focus:ring-red-500' : 'border-primary focus:ring-accent'}`} />
                        {errors.bio && <p className="mt-1.5 text-xs text-red-500">{errors.bio}</p>}
                    </div>
                     <h3 className="text-lg font-semibold text-text-primary pt-2 border-t border-primary">Redes Sociais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField name="linkedin" label="LinkedIn URL" placeholder="https://linkedin.com/in/..." />
                        <InputField name="twitter" label="Twitter URL" placeholder="https://twitter.com/..." />
                        <InputField name="github" label="GitHub URL" placeholder="https://github.com/..." />
                    </div>
                </form>

                <div className="p-6 mt-auto border-t border-primary flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="bg-primary hover:bg-primary/80 text-text-primary font-semibold py-2 px-6 rounded-lg transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" onClick={handleSubmit} className="bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        {item ? 'Salvar Alterações' : 'Adicionar Membro'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamFormModal;
