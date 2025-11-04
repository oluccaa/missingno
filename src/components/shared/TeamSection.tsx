import React from 'react';
import { useTeam } from '../../context/TeamContext';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { optimizeImageUrl } from '../../lib/imageUtils';

const TeamMemberCard: React.FC<{ member: ReturnType<typeof useTeam>['teamMembers'][0] }> = ({ member }) => {
    const optimizedImageUrl = optimizeImageUrl(member.imageUrl, { width: 400, quality: 75 });
    
    const socialLinks = [
        { href: member.socials.linkedin, icon: <Linkedin size={20} />, name: 'LinkedIn' },
        { href: member.socials.twitter, icon: <Twitter size={20} />, name: 'Twitter' },
        { href: member.socials.github, icon: <Github size={20} />, name: 'GitHub' },
    ].filter(link => link.href && link.href !== '#');

    return (
        <div className="bg-secondary p-6 rounded-2xl border border-primary text-center group">
            <div className="relative w-32 h-32 mx-auto mb-6">
                <img 
                    src={optimizedImageUrl}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <h3 className="text-xl font-bold text-text-primary">{member.name}</h3>
            <p className="text-accent font-semibold mb-3">{member.role}</p>
            <p className="text-text-muted text-sm mb-4">{member.bio}</p>
            {socialLinks.length > 0 && (
                <div className="flex justify-center items-center gap-4">
                    {socialLinks.map(social => (
                        <a 
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${social.name} de ${member.name}`}
                            className="text-text-muted hover:text-accent transition-colors"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};


const TeamSection: React.FC = () => {
    const { teamMembers } = useTeam();

    return (
        <section className="py-20 sm:py-28 bg-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
                        Conheça Nossa <span className="text-accent">Equipe</span>
                    </h2>
                    <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
                        Os especialistas apaixonados por tecnologia que transformam suas ideias em realidade.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map(member => (
                        <TeamMemberCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
