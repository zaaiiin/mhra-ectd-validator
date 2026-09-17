import React from 'react';

interface ReadinessChartProps {
  score: number | null;
  variant?: 'large' | 'small';
}

export function ReadinessChart({ score, variant = 'large' }: ReadinessChartProps) {
  const isNeutral = score === null;
  
  const backgroundStyle = isNeutral 
    ? { background: 'var(--govuk-border)' }
    : { background: `conic-gradient(var(--govuk-green) ${score}%, var(--govuk-border) 0)` };

  if (variant === 'small') {
    return (
      <div className="flex items-center">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center relative transition-all duration-500 mr-3 shrink-0"
          style={backgroundStyle}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center absolute bg-white">
            <span className="text-sm font-bold text-[var(--foreground)]">
              {isNeutral ? '--%' : `${Math.round(score!)}%`}
            </span>
          </div>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--govuk-dark-grey)] leading-tight text-left">
          Readiness<br/>Score
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className="w-32 h-32 rounded-full flex items-center justify-center relative transition-all duration-500"
        style={backgroundStyle}
      >
        <div className="w-24 h-24 rounded-full flex items-center justify-center absolute bg-[var(--govuk-light-grey)]">
          <span className="text-3xl font-bold text-[var(--foreground)]">
            {isNeutral ? '--%' : `${Math.round(score!)}%`}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-[var(--govuk-dark-grey)] uppercase tracking-wider text-center">
        {isNeutral ? 'Waiting for Upload' : 'Readiness Score'}
      </p>
    </div>
  );
}
