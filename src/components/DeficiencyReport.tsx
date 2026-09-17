import React from 'react';
import { ReportItem } from '../types';

interface DeficiencyReportProps {
  reportItems: ReportItem[];
}

export function DeficiencyReport({ reportItems }: DeficiencyReportProps) {
  return (
    <div className="hidden print:block p-8 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Deficiency Report</h1>
      <p className="text-lg mb-8 text-[var(--govuk-dark-grey)]">MHRA eCTD Submission Readiness</p>
      
      {reportItems.length === 0 ? (
        <p className="font-bold text-[var(--govuk-green)]">All requirements have been met. The dossier is structurally ready and QA verified.</p>
      ) : (
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-gray-700 border border-gray-300">Module</th>
              <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-gray-700 border border-gray-300">Item</th>
              <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-gray-700 border border-gray-300">Status</th>
              <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-gray-700 border border-gray-300">Severity</th>
            </tr>
          </thead>
          <tbody>
            {reportItems.map(({ item, status }) => {
              let displayStatus = status;
              let displaySeverity = '-';

              if (status === 'Missing') {
                displayStatus = 'Missing';
                displaySeverity = item.severity === 'red' ? 'RED Blocker' : 'AMBER Warning';
              } else if (status === 'Pending QA' || status === 'Present (Pending QA)' as string) {
                displayStatus = 'Present (Pending QA)';
                displaySeverity = '-';
              } else if (status === 'QA Verified' as string) {
                displayStatus = 'QA Verified';
                displaySeverity = '-';
              }
              
              return (
                <tr key={`${item.id}-${status}`}>
                  <td className="border border-[var(--govuk-border)] px-4 py-3 uppercase font-semibold text-left">{item.moduleId}</td>
                  <td className="border border-[var(--govuk-border)] px-4 py-3 text-left">{item.title}</td>
                  <td className="border border-[var(--govuk-border)] px-4 py-3 font-semibold text-left">{displayStatus}</td>
                  <td className="border border-[var(--govuk-border)] px-4 py-3 font-bold text-[var(--govuk-dark-grey)] text-left">
                    {displaySeverity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
