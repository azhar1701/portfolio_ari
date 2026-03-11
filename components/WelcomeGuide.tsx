
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

interface WelcomeGuideProps {
    onStartTour: () => void;
}

const WelcomeGuide: React.FC<WelcomeGuideProps> = ({ onStartTour }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenWelcome = localStorage.getItem('ari_portfolio_welcome_seen');
        if (!hasSeenWelcome) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        localStorage.setItem('ari_portfolio_welcome_seen', 'true');
        setIsVisible(false);
    };

    const handleStartTour = () => {
        localStorage.setItem('ari_portfolio_welcome_seen', 'true');
        setIsVisible(false);
        onStartTour();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="fixed bottom-6 right-6 z-[60] max-w-sm w-full mx-4 sm:mx-0"
                >
                    <div className="bg-bg-canvas border border-brand-accent/30 shadow-2xl rounded-2xl p-6 overflow-hidden relative">
                        {/* Decorative background pulse */}
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-accent/10 rounded-full blur-2xl animate-pulse"></div>

                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
                            aria-label="Dismiss"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        <div className="relative">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-brand-accent-soft flex items-center justify-center text-brand-accent border border-brand-accent/20">
                                    <i className="fas fa-hand-sparkles"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary tracking-tight">Welcome!</h3>
                                    <p className="text-xs font-bold text-brand-accent uppercase tracking-widest">Aha moment awaits</p>
                                </div>
                            </div>

                            <p className="text-sm text-text-secondary leading-relaxed mb-6">
                                I'm <strong>Ari</strong>, a Water Resources Engineer & Web Developer. Would you like a 1-minute tour of my key projects and impact?
                            </p>

                            <div className="flex flex-col space-y-3">
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={handleStartTour}
                                    icon={<i className="fas fa-rocket text-xs"></i>}
                                    iconPosition="right"
                                >
                                    Show me around
                                </Button>
                                <Button
                                    variant="ghost"
                                    fullWidth
                                    onClick={handleDismiss}
                                    className="text-xs"
                                >
                                    I'll explore on my own
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeGuide;
