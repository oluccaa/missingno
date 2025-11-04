import React, { useState, useMemo } from 'react';
import { useSiteSettings, SiteSettings } from '../../context/SiteSettingsContext';
import toast, { Toaster } from 'react-hot-toast';
import { Save, RotateCcw } from 'lucide-react';
import ManagementLayout from './ManagementLayout';

const SiteSettingsEditor: React.FC = () => {
    const { settings, saveSettings } = useSiteSettings();
    const [draftSettings, setDraftSettings] = useState<SiteSettings>(settings);

    const hasChanges = useMemo(() => {
        return JSON.stringify(draftSettings) !== JSON.stringify(settings);
    }, [draftSettings, settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDraftSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        saveSettings(draftSettings);
        toast.success('Configurações salvas com sucesso!', {
            position: "bottom-right",
            style: { background: '#333', color: '#fff' },
        });
    };

    const handleReset = () => {
        setDraftSettings(settings);
        toast('Alterações descartadas.', {
            icon: '🔄',
            position: "bottom-right",
            style: { background: '#333', color: '#fff' },
        });
    };

    return (
        <>
            <Toaster />
            <ManagementLayout
                title="Configurações do Site"
                actionButton={
                    <div className="flex items-center gap-4">
                        <button onClick={handleReset} disabled={!hasChanges} className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-text-primary disabled:opacity-50 transition-colors" title="Redefinir">
                            <RotateCcw size={16} />
                            <span>Redefinir</span>
                        </button>
                        <button onClick={handleSave} disabled={!hasChanges} className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-5 rounded-lg transition-colors disabled:opacity-50" title="Salvar">
                            <Save size={16} />
                            <span>Salvar</span>
                        </button>
                    </div>
                }
            >
                <div className="max-w-2xl space-y-6">
                    <div className="p-6 bg-secondary rounded-lg border border-primary">
                        <h3 className="text-lg font-semibold text-text-primary">Geral</h3>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label htmlFor="siteName" className="block text-sm font-medium text-text-muted mb-2">Nome do Site</label>
                                <input
                                    type="text"
                                    id="siteName"
                                    name="siteName"
                                    value={draftSettings.siteName}
                                    onChange={handleChange}
                                    className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                            <div>
                                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-text-muted mb-2">Número do WhatsApp</label>
                                <input
                                    type="text"
                                    id="whatsappNumber"
                                    name="whatsappNumber"
                                    value={draftSettings.whatsappNumber}
                                    onChange={handleChange}
                                    placeholder="5511999999999"
                                    className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                                <p className="text-xs text-text-muted mt-1">Inclua o código do país e DDD, sem espaços ou símbolos.</p>
                            </div>
                        </div>
                    </div>
                     <div className="p-6 bg-secondary rounded-lg border border-primary">
                        <h3 className="text-lg font-semibold text-text-primary">Aparência</h3>
                         <div className="mt-4 space-y-4">
                            <div>
                                <label htmlFor="accentColor" className="block text-sm font-medium text-text-muted mb-2">Cor de Destaque</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        id="accentColor"
                                        name="accentColor"
                                        value={draftSettings.accentColor}
                                        onChange={handleChange}
                                        className="p-1 h-10 w-10 block bg-primary border border-primary cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                                    />
                                    <input
                                        type="text"
                                        value={draftSettings.accentColor}
                                        onChange={handleChange}
                                        name="accentColor"
                                        className="w-full bg-primary border border-primary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                                    />
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </ManagementLayout>
        </>
    );
};

export default SiteSettingsEditor;
