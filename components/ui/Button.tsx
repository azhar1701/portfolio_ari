
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    className?: string;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    className = '',
    fullWidth = false,
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 transform min-h-[44px]';

    const variantClasses = {
        primary: 'bg-brand-accent text-white hover:bg-brand-accent-hover shadow-subtle hover:shadow-md focus:ring-brand-accent',
        outline: 'bg-transparent border border-border-subtle text-text-secondary hover:border-brand-accent hover:text-brand-accent focus:ring-brand-accent',
        ghost: 'bg-transparent text-text-muted hover:bg-bg-app hover:text-text-primary focus:ring-border-subtle',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    };

    const sizeClasses = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-2.5 text-sm',
        lg: 'px-8 py-3 text-base',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
            {...props}
        >
            {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </button>
    );
};

export default Button;
