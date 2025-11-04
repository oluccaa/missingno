import React from 'react';
import { Briefcase, Wrench, Users, BarChart2 } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-secondary p-6 rounded-xl border border-primary flex items-center gap-6">
        <div className="bg-primary p-4 rounded-lg text-accent">
            {icon}
        </div>
        <div>
            <p className="text-sm text-text-muted font-medium">{title}</p>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
        </div>
    </div>
);


const Overview: React.FC = () => {
    return (
        <div className="p-6 sm:p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-primary">Visão Geral</h1>
                <p className="text-text-muted mt-1">Bem-vindo ao painel de controle do seu site.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Projetos no Portfólio" value="4" icon={<Briefcase size={28} />} />
                <StatCard title="Serviços Oferecidos" value="4" icon={<Wrench size={28} />} />
                <StatCard title="Membros da Equipe" value="3" icon={<Users size={28} />} />
                <StatCard title="Visitantes (Mês)" value="1,234" icon={<BarChart2 size={28} />} />
            </div>

            <div className="bg-secondary p-8 rounded-2xl border border-primary">
                <h2 className="text-2xl font-bold text-text-primary">Acesso Rápido</h2>
                <p className="text-text-muted mt-2 mb-6">Comece a editar o conteúdo do seu site selecionando uma das seções abaixo.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button className="p-6 bg-primary rounded-lg text-left hover:ring-2 ring-accent transition-all">
                        <h3 className="font-bold text-text-primary">Editar Seção Hero</h3>
                        <p className="text-sm text-text-muted mt-1">Altere a imagem de fundo, títulos e botões principais.</p>
                    </button>
                    <button className="p-6 bg-primary rounded-lg text-left hover:ring-2 ring-accent transition-all">
                        <h3 className="font-bold text-text-primary">Gerenciar Portfólio</h3>
                        <p className="text-sm text-text-muted mt-1">Adicione, edite ou remova projetos do seu portfólio.</p>
                    </button>
                     <button className="p-6 bg-primary rounded-lg text-left hover:ring-2 ring-accent transition-all">
                        <h3 className="font-bold text-text-primary">Atualizar Equipe</h3>
                        <p className="text-sm text-text-muted mt-1">Gerencie os membros e as informações da sua equipe.</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Overview;