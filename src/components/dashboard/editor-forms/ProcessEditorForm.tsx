import React from 'react';
import { ProcessContent, ProcessStep } from '../../../context/SiteContentContext';
import { Plus, Trash2 } from 'lucide-react';

interface ProcessEditorFormProps {
    content: ProcessContent;
    onContentChange: (newContent: ProcessContent) => void;
}

const ProcessEditorForm: React.FC<ProcessEditorFormProps> = ({ content, onContentChange }) => {
    
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onContentChange({ ...content, [name]: value });
    };

    const handleNestedTextChange = (section: 'teaser', e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onContentChange({
            ...content,
            [section]: {
                ...content[section],
                [name]: value
            }
        });
    };

    const handleStepChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newSteps = [...content.steps];
        
        if (name === 'deliverables' || name === 'tools') {
            newSteps[index] = { ...newSteps[index], [name]: value.split(',').map(s => s.trim()) };
        } else {
            newSteps[index] = { ...newSteps[index], [name]: value } as ProcessStep;
        }
        
        onContentChange({ ...content, steps: newSteps });
    };

    const addStep = () => {
        const newSteps = [...content.steps, { title: '', description: '', deliverables: [], tools: [] }];
        onContentChange({ ...content, steps: newSteps });
    };

    const removeStep = (index: number) => {
        const newSteps = content.steps.filter((_, i) => i !== index);
        onContentChange({ ...content, steps: newSteps });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary border-b border-primary pb-2">Conteúdo da Página "Processo"</h3>
            
            <div>
                <label htmlFor="headline" className="block text-sm font-medium text-text-muted mb-2">Título Principal</label>
                <textarea id="headline" name="headline" value={content.headline} onChange={handleTextChange} rows={3} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                 <p className="text-xs text-text-muted mt-1">Use <code>&lt;span class="text-accent"&gt;texto&lt;/span&gt;</code> para destacar.</p>
            </div>

            <div>
                <label htmlFor="subheadline" className="block text-sm font-medium text-text-muted mb-2">Subtítulo</label>
                <textarea id="subheadline" name="subheadline" value={content.subheadline} onChange={handleTextChange} rows={3} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>

            <div className="space-y-4 pt-4 border-t border-primary">
                 <h4 className="font-semibold text-text-primary mb-2">Etapas do Processo</h4>
                {content.steps.map((step, index) => (
                    <div key={index} className="space-y-3 p-4 bg-primary rounded-lg border border-primary/50 relative">
                        <button onClick={() => removeStep(index)} className="absolute top-2 right-2 p-1.5 text-text-muted hover:text-red-500 hover:bg-secondary rounded-full" title="Remover Etapa">
                            <Trash2 size={16} />
                        </button>
                        <div>
                            <label className="block text-xs font-medium text-text-muted mb-1">Título da Etapa</label>
                            <input type="text" name="title" value={step.title} onChange={(e) => handleStepChange(index, e)} className="w-full bg-secondary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-muted mb-1">Descrição</label>
                            <textarea name="description" value={step.description} onChange={(e) => handleStepChange(index, e)} rows={3} className="w-full bg-secondary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-muted mb-1">Entregáveis (separados por vírgula)</label>
                            <input type="text" name="deliverables" value={step.deliverables.join(', ')} onChange={(e) => handleStepChange(index, e)} className="w-full bg-secondary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                         <div>
                            <label className="block text-xs font-medium text-text-muted mb-1">Ferramentas (separadas por vírgula)</label>
                            <input type="text" name="tools" value={step.tools.join(', ')} onChange={(e) => handleStepChange(index, e)} className="w-full bg-secondary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                    </div>
                ))}
                <button onClick={addStep} className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover">
                    <Plus size={16} /> Adicionar Etapa
                </button>
            </div>

             <div className="space-y-4 pt-4 border-t border-primary">
                 <h4 className="font-semibold text-text-primary">Resumo da Página (Home)</h4>
                 <textarea name="headline" placeholder="Título do Resumo" value={content.teaser.headline} onChange={(e) => handleNestedTextChange('teaser', e)} rows={2} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                 <textarea name="p1" placeholder="Parágrafo 1" value={content.teaser.p1} onChange={(e) => handleNestedTextChange('teaser', e)} rows={3} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                 <input type="text" name="buttonText" placeholder="Texto do Botão" value={content.teaser.buttonText} onChange={(e) => handleNestedTextChange('teaser', e)} className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
        </div>
    );
};

export default ProcessEditorForm;