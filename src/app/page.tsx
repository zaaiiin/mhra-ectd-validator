'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ModuleAccordion } from '@/components/ModuleAccordion';
import { DeficiencyReport } from '@/components/DeficiencyReport';
import { ReadinessChart } from '@/components/ReadinessChart';
import { MODULES, isModuleActive } from '@/data/checklist';
import { SubmissionType, ProductType, ReportItem } from '@/types';

export default function Dashboard() {
  const [submissionType, setSubmissionType] = useState<SubmissionType>('New MAA (National)');
  const [productType, setProductType] = useState<ProductType>('Chemical Entity');
  const [selectedFolderName, setSelectedFolderName] = useState<string | null>(null);
  const [rawPaths, setRawPaths] = useState<string[]>([]);
  const [qaVerifiedItems, setQaVerifiedItems] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleReset = () => {
    setSelectedFolderName(null);
    setRawPaths([]);
    setQaVerifiedItems(new Set());
  };

  // Filter items per module based on conditional logic
  const activeModulesData = useMemo(() => {
    return MODULES.map(moduleData => {
      const active = isModuleActive(moduleData.id, submissionType);
      
      const filteredItems = moduleData.items.filter(item => {
        if (!item.conditional) return true;
        if (item.conditional.submissionType && !item.conditional.submissionType.includes(submissionType)) {
          return false;
        }
        if (item.conditional.productType && !item.conditional.productType.includes(productType)) {
          return false;
        }
        return true;
      });

      return {
        ...moduleData,
        items: filteredItems,
        isActive: active
      };
    });
  }, [submissionType, productType]);

  const handleFilesSelected = (files: FileList) => {
    if (files.length === 0) return;
    
    // Extract root folder name
    const firstPath = files[0].webkitRelativePath;
    const folderName = firstPath.split('/')[0];
    setSelectedFolderName(folderName);

    // Extract all file paths
    const paths = Array.from(files).map(f => f.webkitRelativePath);
    setRawPaths(paths);
  };

  const handleLoadDemo = () => {
    setSelectedFolderName("Demo Dossier");
    setRawPaths([
      "0000/m1/eu/10-cover/cover.pdf",
      "0000/m1/eu/12-form/application-form.pdf",
      "0000/m1/eu/13-pi/product-info-uk-only.pdf", // Meets Windsor label
      "0000/m2/23-qos/qos.pdf",
      "0000/m2/24-nonclin-over/nonclin.pdf",
      "0000/m2/26-nonclin-sum/sum.pdf",
      "0000/m3/32-body-data/32s-drug-sub/drug-sub.pdf",
      "0000/m3/32-body-data/32p-drug-prod/drug-prod.pdf",
      "0000/m4/423-tox/tox.pdf",
      // Intentionally omitting 1.6 env-risk and M5 files to show warnings
    ]);
  };

  const handleQaToggleItem = (id: string) => {
    const newQaVerified = new Set(qaVerifiedItems);
    if (newQaVerified.has(id)) {
      newQaVerified.delete(id);
    } else {
      newQaVerified.add(id);
    }
    setQaVerifiedItems(newQaVerified);
  };

  const hasScanned = selectedFolderName !== null;

  // Automatically calculate which items are checked based on raw paths
  const checkedItems = useMemo(() => {
    const checked = new Set<string>();
    
    activeModulesData.forEach(mod => {
      if (mod.isActive) {
        mod.items.forEach(item => {
          const isFound = rawPaths.some(path => item.pathPattern.test(path));
          if (isFound) {
            checked.add(item.id);
          }
        });
      }
    });
    
    return checked;
  }, [activeModulesData, rawPaths]);

  // Calculate Readiness Score and generate Report list
  const { totalActiveItems, totalCheckedActiveItems, reportItems } = useMemo(() => {
    let total = 0;
    let checked = 0;
    const items: ReportItem[] = [];

    activeModulesData.forEach(mod => {
      if (mod.isActive) {
        mod.items.forEach(item => {
          total++;
          const isStructurallyFound = checkedItems.has(item.id);
          
          if (isStructurallyFound) {
            checked++;
            // Check QA requirements
            if (item.qaPrompts && item.qaPrompts.length > 0) {
              if (!qaVerifiedItems.has(item.id)) {
                items.push({ item, status: 'Present (Pending QA)' });
              } else {
                items.push({ item, status: 'QA Verified' });
              }
            } else {
              items.push({ item, status: 'QA Verified' });
            }
          } else {
            items.push({ item, status: 'Missing' });
          }
        });
      }
    });

    return { 
      totalActiveItems: total, 
      totalCheckedActiveItems: checked,
      reportItems: items
    };
  }, [activeModulesData, checkedItems, qaVerifiedItems]);

  const score = !hasScanned ? null : (totalActiveItems === 0 ? 100 : (totalCheckedActiveItems / totalActiveItems) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex">
      <Sidebar 
        submissionType={submissionType}
        setSubmissionType={setSubmissionType}
        productType={productType}
        setProductType={setProductType}
        readinessScore={score}
        onFilesSelected={handleFilesSelected}
        selectedFolderName={selectedFolderName}
        onLoadDemo={handleLoadDemo}
        onReset={handleReset}
        rawPaths={rawPaths}
      />

      <main className="flex-1 flex flex-col no-print h-screen overflow-hidden">
        <header className="bg-white border-b border-[var(--govuk-border)] p-6 flex justify-between items-center shadow-sm z-10 shrink-0">
          <div>
            <h2 className="text-xl font-bold">Structural Parser Results</h2>
            <p className="text-[var(--govuk-dark-grey)] mt-1">Upload an eCTD sequence folder to automatically validate its structure.</p>
          </div>
          <div className="flex items-center gap-6">
            {hasScanned && (
              <ReadinessChart score={score} variant="small" />
            )}
            <button 
              onClick={handlePrint}
              disabled={!isMounted || !hasScanned}
              className="bg-[var(--govuk-green)] hover:bg-[#005a30] text-white px-6 py-2 rounded-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--govuk-yellow)] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Deficiencies Report
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto pb-16">
            {!hasScanned && (
              <div className="mb-8 p-8 border-2 border-dashed border-[var(--govuk-border)] text-center text-[var(--govuk-dark-grey)] bg-white">
                <p className="text-lg font-bold mb-2">No Sequence Loaded</p>
                <p>Use the sidebar to select a local folder or load the Demo Dossier to begin parsing.</p>
              </div>
            )}
            {activeModulesData.map(mod => (
              <ModuleAccordion 
                key={mod.id}
                moduleId={mod.id}
                title={mod.title}
                items={mod.items}
                isActive={mod.isActive}
                checkedItems={checkedItems}
                qaVerifiedItems={qaVerifiedItems}
                hasScanned={hasScanned}
                onQaToggleItem={handleQaToggleItem}
              />
            ))}
          </div>
        </div>
      </main>

      <DeficiencyReport reportItems={reportItems} />
    </div>
  );
}
