import React, { useState } from 'react';
import { useServices, ServiceItem } from '../../context/ServicesContext';
import ServiceFormModal from './ServiceFormModal';
import ManagementLayout from './ManagementLayout';
import { Plus, Edit, Trash2 } from 'lucide-react';

const ManageServices: React.FC = () => {
    const { services, deleteService } = useServices();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
    const [itemToDelete, setItemToDelete] = useState<ServiceItem | null>(null);

    const openModalForNew = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (item: ServiceItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setEditingItem(null);
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        if (itemToDelete) {
            deleteService(itemToDelete.id);
            setItemToDelete(null);
        }
    };

    return (
        <>
            <ManagementLayout
                title="Gerenciar Serviços"
                actionButton={
                    <button
                        onClick={openModalForNew}
                        className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-5 rounded-lg transition-colors"
                    >
                        <Plus size={18} />
                        <span>Adicionar Serviço</span>
                    </button>
                }
            >
                <div className="space-y-4">
                    {services.map(item => (
                        <div key={item.id} className="bg-secondary rounded-lg border border-primary flex items-center p-4 gap-4">
                            <div 
                                className="w-12 h-12 flex-shrink-0 bg-primary rounded-md flex items-center justify-center text-accent [&_svg]:w-7 [&_svg]:h-7"
                                dangerouslySetInnerHTML={{ __html: item.icon }}
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-text-primary">{item.title}</h3>
                                <p className="text-sm text-text-muted line-clamp-2">{item.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => openModalForEdit(item)} className="p-2 text-text-muted hover:text-accent transition-colors" title="Editar"><Edit size={18} /></button>
                                <button onClick={() => setItemToDelete(item)} className="p-2 text-text-muted hover:text-red-500 transition-colors" title="Excluir"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </ManagementLayout>
            
            {isModalOpen && <ServiceFormModal item={editingItem} onClose={closeModal} />}

            {itemToDelete && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-secondary p-8 rounded-2xl shadow-2xl max-w-sm w-full">
                        <h3 className="text-xl font-bold text-text-primary">Confirmar Exclusão</h3>
                        <p className="text-text-muted mt-2">
                            Você tem certeza que deseja excluir o serviço "<strong>{itemToDelete.title}</strong>"? Esta ação não pode ser desfeita.
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

export default ManageServices;
