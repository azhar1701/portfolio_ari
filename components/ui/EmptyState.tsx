
import React from 'react';
import Button from './Button';

interface EmptyStateProps {
    title: string;
    description: string;
    icon: string;
    onAction?: () => void;
    actionLabel?: string;
    className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    icon,
    onAction,
    actionLabel = 'Add Item',
    className = '',
}) => {
    return (
        <div className={`p-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center text-center ${className}`}>
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
                <i className={`fas ${icon} text-2xl`}></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2">{title}</h3>
            <p className="text-sm text-slate-500 max-w-sm mb-8 leading-relaxed">
                {description}
            </p>
            {onAction && (
                <Button
                    variant="outline"
                    onClick={onAction}
                    icon={<i className="fas fa-plus text-xs"></i>}
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
