import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, ClipboardCheck, CircleDashed } from 'lucide-react';
import { ChecklistItem as ItemType } from '../types';
import { cn } from '../lib/utils';

interface ChecklistItemProps {
  item: ItemType;
  isChecked: boolean;
  disabled: boolean;
  isQaVerified: boolean;
  hasScanned: boolean;
  onQaToggle: (id: string) => void;
}

export function ChecklistItem({ item, isChecked, disabled, isQaVerified, hasScanned, onQaToggle }: ChecklistItemProps) {
  let Icon = CircleDashed;
  let iconColor = 'text-[var(--govuk-border)]';
  let statusText = 'Awaiting scan.';

  if (hasScanned) {
    Icon = isChecked ? CheckCircle : (item.severity === 'red' ? AlertCircle : AlertTriangle);
    iconColor = isChecked 
      ? 'text-[var(--govuk-green)]' 
      : (item.severity === 'red' ? 'text-[var(--govuk-red)]' : 'text-[var(--govuk-amber)]');
    statusText = isChecked ? "File found in sequence directory." : "Required file not found in sequence directory.";
  }

  return (
    <div 
      className={cn(
        "flex flex-col p-4 border-b border-[var(--govuk-border)] last:border-0",
        disabled && "opacity-50 pointer-events-none grayscale",
        isChecked ? "bg-[var(--govuk-light-grey)]" : "bg-white"
      )}
    >
      <div className="flex items-start">
        <div className="flex-1 pr-4">
          <p className={cn("text-base font-semibold", isChecked && "text-[var(--govuk-dark-grey)]")}>
            {item.title}
          </p>
          <p className="text-sm mt-1 text-[var(--govuk-dark-grey)]">
            {statusText}
          </p>
        </div>
        <div className="flex-shrink-0 ml-auto mt-0.5">
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
      
      {/* QA Expandable Section */}
      {hasScanned && isChecked && item.qaPrompts && item.qaPrompts.length > 0 && (
        <div className="mt-4 p-4 bg-white border border-[var(--govuk-border)] shadow-sm">
          <div className="flex items-center mb-3 text-[var(--govuk-dark-grey)]">
            <ClipboardCheck className="w-5 h-5 mr-2" />
            <span className="font-bold text-sm uppercase tracking-wider">Human QA Required</span>
          </div>
          <ul className="list-disc pl-5 mb-4 text-sm text-[var(--foreground)]">
            {item.qaPrompts.map((prompt, idx) => (
              <li key={idx} className="mb-2 leading-relaxed font-medium">{prompt}</li>
            ))}
          </ul>
          <label className="flex items-center cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={isQaVerified}
              onChange={() => onQaToggle(item.id)}
              className="w-5 h-5 accent-[var(--govuk-blue)] cursor-pointer mr-3"
            />
            <span className={cn("font-bold", isQaVerified ? "text-[var(--govuk-green)]" : "text-[var(--govuk-amber)]")}>
              {isQaVerified ? "Content Verified by Assessor" : "Pending Assessor Sign-off"}
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
