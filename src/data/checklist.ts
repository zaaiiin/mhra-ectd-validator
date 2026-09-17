import { ChecklistItem, ModuleData, SubmissionType } from '../types';

export const SUBMISSION_TYPES: SubmissionType[] = [
  'New MAA (National)',
  'New MAA (IRP)',
  'Type II Variation (CMC / Quality)',
  'Type II Variation (Clinical)'
];

export const MODULES: ModuleData[] = [
  {
    id: 'm1',
    title: 'Module 1: Administrative Information and Prescribing Information',
    items: [
      { id: 'm1-0', moduleId: 'm1', title: '1.0 Cover Letter', severity: 'red', pathPattern: /m1\/.*(10-cover|cover)/i, qaPrompts: ["Verify submission type, legal basis, and product details match the Application Form.", "Ensure explicit reference to the Windsor Framework or IRP pathway, if applicable."] },
      { id: 'm1-2', moduleId: 'm1', title: '1.2 Application Form', severity: 'red', pathPattern: /m1\/.*(12-form|application-form)/i, qaPrompts: ["Verify all applicant signatures are present, dated (wet or valid e-signature).", "Check that the PL numbers and National/IRP legal basis match exactly with MHRA systems."] },
      { id: 'm1-3', moduleId: 'm1', title: '1.3 Product Information (SmPC, PIL, Labelling Mock-ups)', severity: 'red', pathPattern: /m1\/.*(13-pi|product-info)/i, qaPrompts: ["Verify the 'UK Only' label is explicitly visible on the packaging mock-ups (Windsor Framework mandate).", "Ensure SmPC formatting aligns exactly with current MHRA QRD templates."] },
      { id: 'm1-4', moduleId: 'm1', title: '1.4 Information about the Experts', severity: 'amber', pathPattern: /m1\/.*(14-expert)/i, qaPrompts: ["Ensure the expert's signature is dated and their CV is attached."] },
      { id: 'm1-5', moduleId: 'm1', title: '1.5 Specific Requirements for Different Types of Applications', severity: 'amber', pathPattern: /m1\/.*(15-specific)/i, qaPrompts: ["For pediatric data, verify compliance with the agreed PIP or valid deferral/waiver."] },
      { id: 'm1-6', moduleId: 'm1', title: '1.6 Environmental Risk Assessment', severity: 'amber', pathPattern: /m1\/.*(16-env-risk)/i, qaPrompts: ["Verify phase 1 calculation (PEC) is present, and phase 2 data is supplied if the threshold is exceeded."] },
      // Conditional items:
      {
        id: 'm1-irp',
        moduleId: 'm1',
        title: 'Reference Regulator (RR) assessment reports in m1-additional-data',
        severity: 'red',
        pathPattern: /m1\/.*(additional-data|irp)/i,
        qaPrompts: ["Verify the Reference Regulator (RR) assessment reports are completely unredacted.", "Ensure all RR questions and applicant responses during the original procedure are included."],
        conditional: { submissionType: ['New MAA (IRP)'] }
      },
      {
        id: 'm1-windsor',
        moduleId: 'm1',
        title: 'Windsor Framework mandate: Packaging mock-ups include mandatory "UK Only" label',
        severity: 'red',
        pathPattern: /m1\/.*(13-pi|product-info).*(uk-only|windsor)/i,
        qaPrompts: ["Double-check that joint EU/UK packs have been fully decommissioned in favor of 'UK Only'."],
        conditional: { submissionType: ['New MAA (National)'] }
      },
      {
        id: 'm1-bio',
        moduleId: 'm1',
        title: 'Biological Specific: Batch traceability and Risk Management Plan (RMP) annexes',
        severity: 'red',
        pathPattern: /m1\/.*(18-rmp|risk-management|batch-traceability)/i,
        qaPrompts: ["Verify batch traceability records span the correct timeframe required for biologicals.", "Ensure the RMP annexes specifically address UK-specific pharmacovigilance measures."],
        conditional: { productType: ['Biological'] }
      }
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: Common Technical Document Summaries',
    items: [
      { id: 'm2-3', moduleId: 'm2', title: '2.3 Quality Overall Summary (QOS)', severity: 'red', pathPattern: /m2\/.*(23-qos)/i, qaPrompts: ["Verify that all critical QOS parameters cross-reference correctly to the detailed data in Module 3."] },
      { id: 'm2-4', moduleId: 'm2', title: '2.4 Nonclinical Overview', severity: 'amber', pathPattern: /m2\/.*(24-nonclin-over)/i, qaPrompts: ["Ensure the overview explicitly discusses the relevance of animal findings to human safety."] },
      { id: 'm2-5', moduleId: 'm2', title: '2.5 Clinical Overview', severity: 'red', pathPattern: /m2\/.*(25-clin-over)/i, qaPrompts: ["Verify that the risk-benefit analysis justifies any deviations from standard treatment pathways."] },
      { id: 'm2-6', moduleId: 'm2', title: '2.6 Nonclinical Written and Tabulated Summaries', severity: 'amber', pathPattern: /m2\/.*(26-nonclin-sum)/i, qaPrompts: ["Check that tabulated summaries accurately reflect the raw data in Module 4."] },
      { id: 'm2-7', moduleId: 'm2', title: '2.7 Clinical Summary', severity: 'red', pathPattern: /m2\/.*(27-clin-sum)/i, qaPrompts: ["Ensure safety and efficacy data cross-references match exactly with the CSRs in Module 5."] }
    ]
  },
  {
    id: 'm3',
    title: 'Module 3: Quality',
    items: [
      { id: 'm3-2-s', moduleId: 'm3', title: '3.2.S Drug Substance (Nomenclature, Manufacture, Characterisation, Control)', severity: 'red', pathPattern: /m3\/.*(32-body-data\/32s-drug-sub|32s-drug-sub)/i, qaPrompts: ["Verify GMP certificates for all active substance manufacturing sites are currently valid.", "Ensure impurity profiles are fully justified against ICH Q3A/Q3B guidelines."] },
      { id: 'm3-2-p', moduleId: 'm3', title: '3.2.P Drug Product (Description, Pharmaceutical Development, Manufacture, Control of Excipients)', severity: 'red', pathPattern: /m3\/.*(32-body-data\/32p-drug-prod|32p-drug-prod)/i, qaPrompts: ["Verify specification limits align with the latest pharmacopoeial monographs.", "Check that batch analysis data matches the proposed release specifications."] },
      { id: 'm3-2-a', moduleId: 'm3', title: '3.2.A Appendices (Facilities and Equipment, Adventitious Agents Safety Evaluation)', severity: 'amber', pathPattern: /m3\/.*(32-body-data\/32a-app|32a-app)/i, qaPrompts: ["Ensure viral safety evaluations or TSE/BSE certificates are up to date (for biologicals/animal-derived materials)."] },
      { id: 'm3-3', moduleId: 'm3', title: '3.3 Literature References', severity: 'amber', pathPattern: /m3\/.*(33-lit-ref)/i, qaPrompts: ["Check that all referenced quality literature is provided in English or has certified translations."] }
    ]
  },
  {
    id: 'm4',
    title: 'Module 4: Nonclinical Study Reports',
    items: [
      { id: 'm4-2-1', moduleId: 'm4', title: '4.2.1 Pharmacology', severity: 'amber', pathPattern: /m4\/.*(421-pharmacol)/i, qaPrompts: ["Verify presence of GLP compliance statements for all pivotal safety pharmacology studies."] },
      { id: 'm4-2-2', moduleId: 'm4', title: '4.2.2 Pharmacokinetics', severity: 'amber', pathPattern: /m4\/.*(422-pharmaco-kin)/i, qaPrompts: ["Ensure toxicokinetic data adequately supports the exposure margins calculated in the overview."] },
      { id: 'm4-2-3', moduleId: 'm4', title: '4.2.3 Toxicology (Single-dose, Repeat-dose, Genotoxicity, Carcinogenicity)', severity: 'red', pathPattern: /m4\/.*(423-tox)/i, qaPrompts: ["Verify the duration of repeat-dose toxicity studies justifies the proposed clinical trial/treatment duration."] },
      { id: 'm4-3', moduleId: 'm4', title: '4.3 Literature References', severity: 'amber', pathPattern: /m4\/.*(43-lit-ref)/i, qaPrompts: ["Ensure copies of all pivotal nonclinical references are fully legible."] }
    ]
  },
  {
    id: 'm5',
    title: 'Module 5: Clinical Study Reports',
    items: [
      { id: 'm5-2', moduleId: 'm5', title: '5.2 Tabular Listing of All Clinical Studies', severity: 'red', pathPattern: /m5\/.*(52-tab-list)/i, qaPrompts: ["Verify the listing includes all completed, ongoing, and aborted clinical studies."] },
      { id: 'm5-3-1', moduleId: 'm5', title: '5.3.1 Reports of Biopharmaceutic Studies', severity: 'amber', pathPattern: /m5\/.*(531-biopharm)/i, qaPrompts: ["Ensure bioequivalence study reports include complete analytical validation reports."] },
      { id: 'm5-3-2', moduleId: 'm5', title: '5.3.2 Reports of Studies Pertinent to Pharmacokinetics', severity: 'amber', pathPattern: /m5\/.*(532-pk)/i, qaPrompts: ["Check that PK data covers special populations (hepatic/renal impairment) if claimed in the SmPC."] },
      { id: 'm5-3-5', moduleId: 'm5', title: '5.3.5 Reports of Efficacy and Safety Studies', severity: 'red', pathPattern: /m5\/.*(535-effic-safety)/i, qaPrompts: ["Verify GCP compliance statements are present and signed for all pivotal Phase III studies.", "Check that primary endpoint analyses strictly follow the pre-specified Statistical Analysis Plan (SAP)."] },
      { id: 'm5-3-6', moduleId: 'm5', title: '5.3.6 Reports of Post-Marketing Experience', severity: 'red', pathPattern: /m5\/.*(536-post-market)/i, qaPrompts: ["Verify Periodic Safety Update Reports (PSURs) reflect current global post-marketing data."] },
      { id: 'm5-4', moduleId: 'm5', title: '5.4 Literature References', severity: 'amber', pathPattern: /m5\/.*(54-lit-ref)/i, qaPrompts: ["Ensure all clinical references cited in the Clinical Overview are included here."] }
    ]
  }
];

export const isModuleActive = (moduleId: string, submissionType: SubmissionType): boolean => {
  if (submissionType === 'New MAA (National)' || submissionType === 'New MAA (IRP)') {
    return true; // All modules active
  }
  if (submissionType === 'Type II Variation (CMC / Quality)') {
    return moduleId === 'm1' || moduleId === 'm3';
  }
  if (submissionType === 'Type II Variation (Clinical)') {
    return moduleId === 'm1' || moduleId === 'm2' || moduleId === 'm5';
  }
  return true;
};
