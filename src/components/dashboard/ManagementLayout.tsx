import React from 'react';

interface ManagementLayoutProps {
    title: string;
    children: React.ReactNode;
    actionButton?: React.ReactNode;
}

const ManagementLayout: React.FC<ManagementLayoutProps> = ({ title, children, actionButton }) => {
    return (
        <div className="p-6 sm:p-8 space-y-6 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{title}</h1>
                    <p className="text-text-muted mt-1">Gerencie os itens desta seção aqui.</p>
                </div>
                {actionButton}
            </div>
            <div className="flex-1 overflow-y-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
                {children}
            </div>
        </div>
    );
};

export default ManagementLayout;
