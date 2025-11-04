import React from 'react';
import { TechStackContent } from '../../../context/SiteContentContext';

interface TechStackEditorFormProps {
    content: TechStackContent;
    onContentChange: (newContent: TechStackContent) => void;
}

const TechStackEditorForm: React.FC<TechStackEditorFormProps> = ({ content, onContentChange }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onContentChange({
            ...content,
            [name]: value,
        });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary border-b border-primary pb-2">Conteúdo da Seção</h3>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-text-muted mb-2">Título</label>
                <textarea
                    id="title"
                    name="title"
                    value={content.title}
                    onChange={handleChange}
                    rows={2}
                    className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                />
                 <p className="text-xs text-text-muted mt-1">Use <code>&lt;span class="text-accent"&gt;texto&lt;/span&gt;</code> para destacar.</p>
            </div>
             <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-text-muted mb-2">Subtítulo</label>
                <textarea
                    id="subtitle"
                    name="subtitle"
                    value={content.subtitle}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                />
            </div>
        </div>
    );
};

export default TechStackEditorForm;