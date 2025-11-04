import React from 'react';
import { HeroContent } from '../../../context/SiteContentContext';

interface HeroEditorFormProps {
    content: HeroContent;
    onContentChange: (newContent: HeroContent) => void;
}

const HeroEditorForm: React.FC<HeroEditorFormProps> = ({ content, onContentChange }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        onContentChange({
            ...content,
            [name]: type === 'number' ? parseFloat(value) : value,
        });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary border-b border-primary pb-2">Conteúdo Principal</h3>
            <div>
                <label htmlFor="h1" className="block text-sm font-medium text-text-muted mb-2">Título Principal (H1)</label>
                <textarea
                    id="h1"
                    name="h1"
                    value={content.h1}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                />
                <p className="text-xs text-text-muted mt-1">Use <code>&lt;span class="text-accent"&gt;texto&lt;/span&gt;</code> para destacar.</p>
            </div>
             <div>
                <label htmlFor="h2" className="block text-sm font-medium text-text-muted mb-2">Subtítulo (H2)</label>
                <textarea
                    id="h2"
                    name="h2"
                    value={content.h2}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                />
            </div>
             <div>
                <label htmlFor="buttonText" className="block text-sm font-medium text-text-muted mb-2">Texto do Botão</label>
                <input
                    type="text"
                    id="buttonText"
                    name="buttonText"
                    value={content.buttonText}
                    onChange={handleChange}
                    className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                />
            </div>
             <div>
                <label htmlFor="buttonLink" className="block text-sm font-medium text-text-muted mb-2">Link do Botão</label>
                <input
                    type="text"
                    id="buttonLink"
                    name="buttonLink"
                    value={content.buttonLink}
                    onChange={handleChange}
                    className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                />
            </div>

            <h3 className="text-xl font-semibold text-text-primary border-b border-primary pb-2 pt-4">Imagem de Fundo</h3>
             <div>
                <label htmlFor="backgroundImageUrl" className="block text-sm font-medium text-text-muted mb-2">URL da Imagem</label>
                <input
                    type="text"
                    id="backgroundImageUrl"
                    name="backgroundImageUrl"
                    value={content.backgroundImageUrl}
                    onChange={handleChange}
                    className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                />
            </div>

             <div>
                <label htmlFor="blur" className="block text-sm font-medium text-text-muted mb-2">Nível de Desfoque (Blur): {content.blur}px</label>
                <input
                    type="range"
                    id="blur"
                    name="blur"
                    min="0"
                    max="20"
                    step="1"
                    value={content.blur}
                    onChange={handleChange}
                    className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-accent"
                />
            </div>
             <div>
                <label htmlFor="brightness" className="block text-sm font-medium text-text-muted mb-2">Brilho: {content.brightness}%</label>
                <input
                    type="range"
                    id="brightness"
                    name="brightness"
                    min="0"
                    max="200"
                    step="5"
                    value={content.brightness}
                    onChange={handleChange}
                    className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-accent"
                />
            </div>
            <div>
                <label htmlFor="opacity" className="block text-sm font-medium text-text-muted mb-2">Opacidade: {content.opacity}%</label>
                <input
                    type="range"
                    id="opacity"
                    name="opacity"
                    min="0"
                    max="100"
                    step="5"
                    value={content.opacity}
                    onChange={handleChange}
                    className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-accent"
                />
            </div>
        </div>
    );
};

export default HeroEditorForm;