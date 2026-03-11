
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'interactive' | 'soft';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    onClick?: () => void;
    tabIndex?: number;
    role?: string;
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    variant = 'default',
    padding = 'md',
    onClick,
    tabIndex,
    role,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
}) => {
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
    };

    const variantClasses = {
        default: 'bg-bg-canvas border-border-subtle shadow-subtle',
        interactive: 'bg-bg-canvas border-border-subtle shadow-subtle hover:shadow-md hover:border-brand-accent transition-all duration-300',
        soft: 'bg-bg-app border-border-subtle shadow-none',
    };

    const baseClasses = `rounded-3xl border transition-all duration-300 ${paddingClasses[padding]} ${variantClasses[variant]} ${className}`;

    if (onClick) {
        return (
            <div
                className={`${baseClasses} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2`}
                onClick={onClick}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? onClick() : null)}
                tabIndex={tabIndex ?? 0}
                role={role ?? 'button'}
                aria-expanded={ariaExpanded}
                aria-controls={ariaControls}
            >
                {children}
            </div>
        );
    }

    return (
        <div className={baseClasses}>
            {children}
        </div>
    );
};

export default Card;
