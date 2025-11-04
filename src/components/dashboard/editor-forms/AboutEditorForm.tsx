import React from 'react';
import { AboutContent } from '../../../context/SiteContentContext';
import { Plus, Trash2 } from 'lucide-react';

interface AboutEditorFormProps {
    content: AboutContent;
    onContentChange: (newContent: AboutContent) => void;
}

const AboutEditorForm: React.FC<AboutEditorFormProps> = ({ content, onContentChange }) => {
    
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onContentChange({ ...content, [name]: value });
    };

    const handleNestedTextChange = (section: 'mission' | 'vision' | 'teaser', e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onContentChange({
            ...content,
            [section]: {
                ...content[section],
                [name]: value
            }
        });
    };

    const handleValueChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValues = [...content.values];
        newValues[index] = { ...newValues[index], [name]: value };
        onContentChange({ ...content, values: newValues });
    };

    const addValue = () => {
        const newValues = [...content.values, { title: '', description: '' }];
        onContentChange({ ...content, values: newValues });
    };

    const removeValue = (index: number) => {
        const newValues = content.values.filter((_, i) => i !== index);
        onContentChange({ ...content, values: newValues });
    };


    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary border-b border-primary pb-2">Conteúdo da Página "Sobre"</h3>
            
            <div>
                <label htmlFor="headline" className="block text-sm font-medium text-text-muted mb-2">Título Principal</label>
                <textarea id="headline" name="headline" value={content.headline} onChange={handleTextChange} rows={3} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                <p className="text-xs text-text-muted mt-1">Use <code>&lt;span class="text-accent"&gt;texto&lt;/span&gt;</code> para destacar.</p>
            </div>

            <div>
                <label htmlFor="subheadline" className="block text-sm font-medium text-text-muted mb-2">Subtítulo</label>
                <textarea id="subheadline" name="subheadline" value={content.subheadline} onChange={handleTextChange} rows={3} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>

            <div>
                <label htmlFor="mainText" className="block text-sm font-medium text-text-muted mb-2">Texto Principal</label>
                <textarea id="mainText" name="mainText" value={content.mainText} onChange={handleTextChange} rows={5} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>

            <div className="space-y-4 pt-4 border-t border-primary">
                <h4 className="font-semibold text-text-primary">Missão</h4>
                <input type="text" name="title" placeholder="Título da Missão" value={content.mission.title} onChange={(e) => handleNestedTextChange('mission', e)} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                <textarea name="text" placeholder="Texto da Missão" value={content.mission.text} onChange={(e) => handleNestedTextChange('mission', e)} rows={3} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>

            <div className="space-y-4">
                <h4 className="font-semibold text-text-primary">Visão</h4>
                <input type="text" name="title" placeholder="Título da Visão" value={content.vision.title} onChange={(e) => handleNestedTextChange('vision', e)} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                <textarea name="text" placeholder="Texto da Visão" value={content.vision.text} onChange={(e) => handleNestedTextChange('vision', e)} rows={3} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            
            <div className="space-y-4 pt-4 border-t border-primary">
                <h4 className="font-semibold text-text-primary mb-2">Valores</h4>
                {content.values.map((value, index) => (
                    <div key={index} className="space-y-2 p-4 bg-primary rounded-lg border border-primary/50 relative">
                        <input type="text" name="title" placeholder="Título do Valor" value={value.title} onChange={(e) => handleValueChange(index, e)} className="w-full bg-secondary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                        <input type="text" name="description" placeholder="Descrição do Valor" value={value.description} onChange={(e) => handleValueChange(index, e)} className="w-full bg-secondary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                        <button onClick={() => removeValue(index)} className="absolute top-2 right-2 p-1.5 text-text-muted hover:text-red-500 hover:bg-secondary rounded-full" title="Remover Valor">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                <button onClick={addValue} className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover">
                    <Plus size={16} /> Adicionar Valor
                </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary">
                 <h4 className="font-semibold text-text-primary">Resumo da Página (Home)</h4>
                 <textarea name="headline" placeholder="Título do Resumo" value={content.teaser.headline} onChange={(e) => handleNestedTextChange('teaser', e)} rows={2} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                 <textarea name="p1" placeholder="Parágrafo 1" value={content.teaser.p1} onChange={(e) => handleNestedTextChange('teaser', e)} rows={3} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                 <textarea name="p2" placeholder="Parágrafo 2" value={content.teaser.p2} onChange={(e) => handleNestedTextChange('teaser', e)} rows={3} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                 <input type="text" name="buttonText" placeholder="Texto do Botão" value={content.teaser.buttonText} onChange={(e) => handleNestedTextChange('teaser', e)} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>

        </div>
    );
};

export default AboutEditorForm;