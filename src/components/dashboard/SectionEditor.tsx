import React, { useState, useEffect, useMemo } from 'react';
import { useSiteContent, SiteContent } from '../../context/SiteContentContext';
import HeroSection from '../landing/HeroSection';
import TechStackSection from '../landing/TechStackSection';
import AboutPage from '../../pages/AboutPage';
import ProcessPage from '../../pages/ProcessPage';
import HeroEditorForm from './editor-forms/HeroEditorForm';
import TechStackEditorForm from './editor-forms/TechStackEditorForm';
import AboutEditorForm from './editor-forms/AboutEditorForm';
import ProcessEditorForm from './editor-forms/ProcessEditorForm';
import { ChevronsLeft, ChevronsRight, Save, RotateCcw } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';


interface SectionEditorProps {
    sectionId: keyof SiteContent;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ sectionId }) => {
    const { content, saveSectionContent } = useSiteContent();
    const [draftContent, setDraftContent] = useState(content[sectionId]);
    const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
    
    // Reset draft content when section changes
    useEffect(() => {
        setDraftContent(content[sectionId]);
    }, [sectionId, content]);

    const handleContentChange = (newSectionContent: SiteContent[typeof sectionId]) => {
        setDraftContent(newSectionContent);
    };

    const handleSave = () => {
        saveSectionContent(sectionId, draftContent);
        toast.success('Alterações salvas com sucesso!', {
            position: "bottom-right",
            style: {
                background: '#333',
                color: '#fff',
            },
        });
    };

    const handleReset = () => {
        setDraftContent(content[sectionId]);
        toast('Alterações descartadas.', {
            icon: '🔄',
            position: "bottom-right",
            style: {
                background: '#333',
                color: '#fff',
            },
        });
    };
    
    const hasChanges = useMemo(() => {
        return JSON.stringify(draftContent) !== JSON.stringify(content[sectionId]);
    }, [draftContent, content, sectionId]);

    const renderPreview = () => {
        switch (sectionId) {
            case 'hero':
                return <HeroSection content={draftContent as SiteContent['hero']} />;
            case 'techStack':
                return <TechStackSection content={draftContent as SiteContent['techStack']} />;
            case 'about':
                return <AboutPage content={draftContent as SiteContent['about']} />;
            case 'process':
                return <ProcessPage content={draftContent as SiteContent['process']} />;
            default:
                return <div className="p-8 text-text-muted">Pré-visualização não disponível para esta seção.</div>;
        }
    };
    
    const renderForm = () => {
        switch (sectionId) {
            case 'hero':
                return <HeroEditorForm content={draftContent as SiteContent['hero']} onContentChange={handleContentChange} />;
            case 'techStack':
                 return <TechStackEditorForm content={draftContent as SiteContent['techStack']} onContentChange={handleContentChange} />;
            case 'about':
                return <AboutEditorForm content={draftContent as SiteContent['about']} onContentChange={handleContentChange} />;
            case 'process':
                return <ProcessEditorForm content={draftContent as SiteContent['process']} onContentChange={handleContentChange} />;
            default:
                return <div className="p-8 text-text-muted">Formulário de edição não disponível.</div>;
        }
    };

    return (
        <div className="flex h-full bg-primary">
            <Toaster />
            {/* --- Configuration Panel --- */}
            <div className={`transition-all duration-300 ease-in-out bg-secondary border-r border-primary flex flex-col ${isPanelCollapsed ? 'w-0 opacity-0' : 'w-96'}`}>
                <div className="p-4 border-b border-primary flex-shrink-0">
                    {/* FIX: Cast sectionId to string to ensure .replace is available */}
                    <h2 className="text-lg font-bold text-text-primary capitalize">Editando: Seção {String(sectionId).replace(/([A-Z])/g, ' $1')}</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    {renderForm()}
                </div>
                <div className="p-4 border-t border-primary flex-shrink-0 flex items-center justify-between gap-4 bg-secondary">
                     <button
                        onClick={handleReset}
                        disabled={!hasChanges}
                        className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Redefinir para o último salvo"
                    >
                        <RotateCcw size={16} />
                        <span>Redefinir</span>
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Salvar alterações"
                    >
                         <Save size={16} />
                        <span>Salvar</span>
                    </button>
                </div>
            </div>

            {/* --- Preview Area --- */}
            <div className="flex-1 relative overflow-hidden">
                <button
                    onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                    className="absolute top-1/2 -translate-y-1/2 bg-secondary text-text-primary p-2 rounded-r-lg z-10 border-y border-r border-primary hover:bg-accent hover:text-white transition-all"
                    style={{ left: 0 }}
                    title={isPanelCollapsed ? "Mostrar Painel" : "Ocultar Painel"}
                >
                    {isPanelCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
                </button>
                 <div className="w-full h-full overflow-y-auto bg-gray-900">
                    <div className="w-full" style={{ transform: 'scale(1)', transformOrigin: 'top left' }}>
                        {renderPreview()}
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default SectionEditor;