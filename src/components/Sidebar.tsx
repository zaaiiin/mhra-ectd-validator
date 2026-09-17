import React, { useRef } from 'react';
import { SubmissionType, ProductType } from '../types';
import { SUBMISSION_TYPES } from '../data/checklist';
import { ReadinessChart } from './ReadinessChart';
import { UploadCloud, ShieldCheck, FolderTree, RotateCcw } from 'lucide-react';

interface SidebarProps {
  submissionType: SubmissionType;
  setSubmissionType: (type: SubmissionType) => void;
  productType: ProductType;
  setProductType: (type: ProductType) => void;
  readinessScore: number | null;
  onFilesSelected: (files: FileList) => void;
  selectedFolderName: string | null;
  onLoadDemo: () => void;
  onReset: () => void;
  rawPaths: string[];
}

export function Sidebar({
  submissionType,
  setSubmissionType,
  productType,
  setProductType,
  readinessScore,
  onFilesSelected,
  selectedFolderName,
  onLoadDemo,
  onReset,
  rawPaths
}: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  const handleResetClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onReset();
  };

  const hasScanned = selectedFolderName !== null;

  return (
    <aside className="w-80 border-r border-[var(--govuk-border)] h-screen flex flex-col no-print shadow-sm bg-white overflow-hidden shrink-0">
      <div className="p-6 border-b border-[var(--govuk-border)] bg-[var(--govuk-blue)] text-white shrink-0">
        <h1 className="text-2xl font-bold leading-tight">MHRA eCTD Validator</h1>
        <p className="text-sm mt-2 opacity-90">Structural Compliance & Quality Assurance</p>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="p-6 shrink-0">
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded flex items-start">
            <ShieldCheck className="w-5 h-5 text-green-700 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-900 leading-tight font-semibold">
              Zero data leaves your machine. <span className="font-normal block mt-1">This tool runs locally and parses directory structures in your browser.</span>
            </p>
          </div>

          <h2 className="text-lg font-bold mb-4">Configuration</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Submission Type</label>
            <select 
              className="w-full border-2 border-[var(--foreground)] p-2 rounded-none focus:outline-none focus:ring-4 focus:ring-[var(--govuk-yellow)] bg-white"
              value={submissionType}
              onChange={(e) => setSubmissionType(e.target.value as SubmissionType)}
            >
              {SUBMISSION_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold mb-2">Product Type</label>
            <select 
              className="w-full border-2 border-[var(--foreground)] p-2 rounded-none focus:outline-none focus:ring-4 focus:ring-[var(--govuk-yellow)] bg-white"
              value={productType}
              onChange={(e) => setProductType(e.target.value as ProductType)}
            >
              <option value="Chemical Entity">Chemical Entity</option>
              <option value="Biological">Biological</option>
            </select>
          </div>

          <h2 className="text-lg font-bold mb-4">Sequence Upload</h2>
          <div className="mb-6">
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              // @ts-expect-error webkitdirectory is supported
              webkitdirectory=""
              directory=""
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center p-3 border-2 border-dashed border-[var(--govuk-border)] bg-[var(--govuk-light-grey)] hover:bg-[#e5e5e5] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--govuk-yellow)] cursor-pointer"
            >
              <UploadCloud className="w-6 h-6 text-[var(--govuk-dark-grey)] mb-1" />
              <span className="font-bold text-center text-sm">Select Sequence Folder</span>
              <span className="text-xs mt-1 text-[var(--govuk-dark-grey)]">e.g. 0000</span>
            </button>

            {selectedFolderName && (
              <div className="mt-4 p-3 bg-green-50 border border-green-300 text-sm break-all">
                <span className="font-bold text-green-900">Loaded:</span> <span className="text-green-800">{selectedFolderName} <span className="opacity-80">({submissionType}, {productType})</span></span>
              </div>
            )}

            <div className="mt-6 bg-blue-50 border border-blue-200 p-4 text-xs">
              <div className="text-center mb-3">
                <a 
                  href="/sample-sequence-0000.zip" 
                  download 
                  className="text-blue-800 hover:text-blue-950 underline font-bold"
                >
                  Download Sample eCTD Sequence (.zip)
                </a>
              </div>
              <div className="text-blue-900">
                <p className="font-bold mb-2">How to test this sample:</p>
                <ol className="list-decimal list-inside space-y-1.5 ml-1 opacity-90">
                  <li><strong>Unzip</strong> the downloaded folder.</li>
                  <li>Set Submission Type to <strong>New MAA (National)</strong>.</li>
                  <li>Set Product Type to <strong>Chemical Entity</strong>.</li>
                  <li>Click "Select Sequence Folder" and choose the unzipped folder.</li>
                </ol>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {!hasScanned && (
                <div className="text-xs text-[var(--govuk-dark-grey)] mb-1 uppercase tracking-wider font-bold text-center">- OR -</div>
              )}
              <button
                onClick={onLoadDemo}
                className="w-full bg-[var(--govuk-dark-grey)] hover:bg-[#3b4347] text-white px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[var(--govuk-yellow)] transition-colors text-sm shadow-sm"
              >
                Load Sample Dossier (Demo Mode)
              </button>

              {hasScanned && (
                <button
                  onClick={handleResetClick}
                  className="w-full flex items-center justify-center bg-transparent border-2 border-[var(--govuk-border)] hover:bg-[var(--govuk-light-grey)] text-[var(--govuk-dark-grey)] hover:text-black px-4 py-2 font-bold focus:outline-none focus:ring-4 focus:ring-[var(--govuk-yellow)] transition-colors text-sm shadow-sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear Sequence
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-b border-[var(--govuk-border)] bg-[var(--govuk-light-grey)] shrink-0">
          <ReadinessChart score={readinessScore} />
        </div>

        {/* Virtual File Explorer */}
        {rawPaths.length > 0 && (
          <div className="p-6 bg-white shrink-0">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center text-[var(--govuk-dark-grey)]">
              <FolderTree className="w-5 h-5 mr-2" />
              Ingested Sequence Files
            </h2>
            <div className="bg-[#f3f2f1] p-4 border border-[var(--govuk-border)] text-xs font-mono text-gray-700 space-y-2 max-h-64 overflow-y-auto">
              {rawPaths.map((path, idx) => (
                <div key={idx} className="break-all border-l-2 border-gray-400 pl-2">
                  {path}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
