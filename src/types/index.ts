export type SubmissionType = 'New MAA (National)' | 'New MAA (IRP)' | 'Type II Variation (CMC / Quality)' | 'Type II Variation (Clinical)';
export type ProductType = 'Chemical Entity' | 'Biological';

export type Severity = 'red' | 'amber' | 'green';

export interface ChecklistItem {
  id: string;
  moduleId: string;
  title: string;
  severity: Severity;
  pathPattern: RegExp;
  qaPrompts?: string[];
  conditional?: {
    submissionType?: SubmissionType[];
    productType?: ProductType[];
  };
}

export interface ModuleData {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface ReportItem {
  item: ChecklistItem;
  status: 'Missing' | 'Present (Pending QA)' | 'QA Verified';
}
