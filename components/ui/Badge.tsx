
import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'accent' | 'primary' | 'soft' | 'outline';
    size?: 'xs' | 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({
    children,
    className = '',
    variant = 'accent',
    size = 'sm',
}) => {
    const sizeClasses = {
        xs: 'px-2 py-0.5 text-[9px]',
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-xs',
    };

    const variantClasses = {
        primary: 'bg-brand-accent text-white border-transparent',
        accent: 'bg-brand-accent-soft text-brand-accent-text border-brand-accent/20',
        soft: 'bg-bg-app text-text-secondary border-border-subtle/50',
        outline: 'bg-transparent text-text-secondary border-border-subtle',
    };

    return (
        <span
            className={`inline-flex items-center font-mono font-bold uppercase tracking-widest rounded-md border transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        >
            {children}
        </span>
    );
};

export default Badge;
