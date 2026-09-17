import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ChecklistItem as ItemType } from '../types';
import { ChecklistItem } from './ChecklistItem';
import { cn } from '../lib/utils';

interface ModuleAccordionProps {
  moduleId: string;
  title: string;
  items: ItemType[];
  isActive: boolean;
  checkedItems: Set<string>;
  qaVerifiedItems: Set<string>;
  hasScanned: boolean;
  onQaToggleItem: (id: string) => void;
}

export function ModuleAccordion({
  title,
  items,
  isActive,
  checkedItems,
  qaVerifiedItems,
  hasScanned,
  onQaToggleItem
}: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(isActive);

  const completedCount = items.filter(i => checkedItems.has(i.id)).length;
  const totalCount = items.length;
  const statusText = hasScanned ? `${completedCount} / ${totalCount} Files Found` : "Awaiting scan";

  return (
    <div className={cn(
      "mb-4 border border-[var(--govuk-border)] bg-white",
      !isActive && "opacity-60 bg-[var(--govuk-light-grey)] grayscale"
    )}>
      <button
        className="w-full flex items-center justify-between p-4 bg-[var(--govuk-light-grey)] hover:bg-[#e5e5e5] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--govuk-yellow)]"
        onClick={() => setIsOpen(!isOpen)}
        disabled={!isActive}
        type="button"
      >
        <div className="flex items-center text-left">
          <span className="font-bold text-lg">{title}</span>
          {!isActive && <span className="ml-4 text-sm bg-[var(--govuk-dark-grey)] text-white px-2 py-1 rounded-sm uppercase font-bold tracking-wider">Not Required</span>}
        </div>
        <div className="flex items-center space-x-4 text-[var(--govuk-dark-grey)]">
          <span className="text-sm font-bold">{statusText}</span>
          {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </div>
      </button>

      {isOpen && isActive && (
        <div className="bg-white border-t border-[var(--govuk-border)]">
          {items.map(item => (
            <ChecklistItem
              key={item.id}
              item={item}
              isChecked={checkedItems.has(item.id)}
              disabled={!isActive}
              isQaVerified={qaVerifiedItems.has(item.id)}
              hasScanned={hasScanned}
              onQaToggle={onQaToggleItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
