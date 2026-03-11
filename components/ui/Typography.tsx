
import React from 'react';

interface SubHeadingProps {
    children: React.ReactNode;
    className?: string;
    color?: 'muted' | 'primary' | 'accent';
    icon?: React.ReactNode;
}

export const SubHeading: React.FC<SubHeadingProps> = ({
    children,
    className = '',
    color = 'muted',
    icon,
}) => {
    const colorClasses = {
        muted: 'text-text-muted',
        primary: 'text-text-primary',
        accent: 'text-brand-accent-text',
    };

    return (
        <h4 className={`text-xs font-bold uppercase tracking-[0.2em] flex items-center mb-3 ${colorClasses[color]} ${className}`}>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </h4>
    );
};

interface SectionHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    children,
    className = '',
}) => {
    return (
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary tracking-tight ${className}`}>
            {children}
        </h2>
    );
};
