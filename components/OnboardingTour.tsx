
import React, { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS, ACTIONS } from 'react-joyride';

interface OnboardingTourProps {
    run: boolean;
    onFinish: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ run, onFinish }) => {
    const [steps] = useState<Step[]>([
        {
            target: '#summary',
            content: (
                <div className="text-left">
                    <h4 className="font-bold text-brand-accent uppercase tracking-widest text-xs mb-2">My Mission</h4>
                    <p className="text-sm leading-relaxed text-slate-700">A quick intro — what I do in <strong>water resources</strong> and <strong>GIS</strong>, and what I'm working on now.</p>
                </div>
            ),
            disableBeacon: true,
            placement: 'bottom',
        },
        {
            target: '#experience',
            content: (
                <div className="text-left">
                    <h4 className="font-bold text-brand-accent-text uppercase tracking-widest text-xs mb-2">Career Timeline</h4>
                    <p className="text-sm leading-relaxed text-slate-700">My work history — from managing irrigation projects to building digital field-tracking tools.</p>
                </div>
            ),
        },
        {
            target: '#projects',
            content: (
                <div className="text-left">
                    <h4 className="font-bold text-brand-accent-text uppercase tracking-widest text-xs mb-2">Featured Projects</h4>
                    <p className="text-sm leading-relaxed text-slate-700">Detailed case studies of my technical solutions. Click any project to see the challenge and the result.</p>
                </div>
            ),
        },
        {
            target: '#resume',
            content: (
                <div className="text-left">
                    <h4 className="font-bold text-brand-accent uppercase tracking-widest text-xs mb-2">Ready for Hire</h4>
                    <p className="text-sm leading-relaxed text-slate-700">Need a hard copy? You can download my structured resume as a <strong>PDF</strong> or raw <strong>JSON</strong> data right here.</p>
                </div>
            ),
        },
    ]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, action } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
            onFinish();
        }
    };

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showProgress
            showSkipButton
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    zIndex: 10000,
                    primaryColor: 'var(--color-brand-accent)',
                    textColor: 'var(--color-text-primary)',
                    backgroundColor: 'var(--color-bg-canvas)',
                    arrowColor: 'var(--color-bg-canvas)',
                },
                tooltipContainer: {
                    textAlign: 'left',
                    borderRadius: '12px',
                    padding: '12px',
                },
                buttonNext: {
                    borderRadius: '8px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '12px',
                    padding: '10px 20px',
                },
                buttonBack: {
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                },
                buttonSkip: {
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                }
            }}
        />
    );
};

export default OnboardingTour;
