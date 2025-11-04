import React, { useState } from 'react';
import { usePortfolio, PortfolioItem } from '../../context/PortfolioContext';
import PortfolioFormModal from './PortfolioFormModal';
import ManagementLayout from './ManagementLayout';
import { optimizeImageUrl } from '../../lib/imageUtils';
import { Plus, Edit, Trash2 } from 'lucide-react';

const ManagePortfolio: React.FC = () => {
    const { portfolioItems, deleteItem } = usePortfolio();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
    const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null);

    const openModalForNew = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (item: PortfolioItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingItem(null);
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        if (itemToDelete) {
            deleteItem(itemToDelete.id);
            setItemToDelete(null);
        }
    };

    return (
        <>
            <ManagementLayout
                title="Gerenciar Portfólio"
                actionButton={
                    <button
                        onClick={openModalForNew}
                        className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-5 rounded-lg transition-colors"
                    >
                        <Plus size={18} />
                        <span>Adicionar Projeto</span>
                    </button>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioItems.map(item => (
                        <div key={item.id} className="bg-secondary rounded-lg overflow-hidden border border-primary group">
                            <img
                                src={optimizeImageUrl(item.imageurl, { width: 400, quality: 75 })}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <p className="text-sm text-accent font-semibold">{item.category}</p>
                                <h3 className="font-bold text-text-primary truncate">{item.title}</h3>
                            </div>
                            <div className="p-4 border-t border-primary flex justify-end gap-2">
                                <button onClick={() => openModalForEdit(item)} className="p-2 text-text-muted hover:text-accent transition-colors" title="Editar"><Edit size={18} /></button>
                                <button onClick={() => setItemToDelete(item)} className="p-2 text-text-muted hover:text-red-500 transition-colors" title="Excluir"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </ManagementLayout>

            {isModalOpen && <PortfolioFormModal item={editingItem} onClose={closeModal} />}
            
            {itemToDelete && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-secondary p-8 rounded-2xl shadow-2xl max-w-sm w-full">
                        <h3 className="text-xl font-bold text-text-primary">Confirmar Exclusão</h3>
                        <p className="text-text-muted mt-2">
                            Você tem certeza que deseja excluir o projeto "<strong>{itemToDelete.title}</strong>"? Esta ação não pode ser desfeita.
                        </p>
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setItemToDelete(null)} className="bg-primary hover:bg-primary/80 text-text-primary font-semibold py-2 px-6 rounded-lg">Cancelar</button>
                            <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg">Excluir</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManagePortfolio;
