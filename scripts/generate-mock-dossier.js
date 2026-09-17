const AdmZip = require('adm-zip');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const folderName = "0000";

const fileDefinitions = [
  // Module 1
  { path: `${folderName}/m1/uk/10-cover/10-cover-letter.pdf`, isPdf: true },
  { path: `${folderName}/m1/uk/12-form/12-application-form.pdf`, isPdf: true },
  { path: `${folderName}/m1/uk/13-pi/product-info-uk-only.pdf`, isPdf: true },
  // Module 2
  { path: `${folderName}/m2/23-qos/quality-overall-summary.pdf`, isPdf: true },
  { path: `${folderName}/m2/24-nonclin-over/nonclinical-overview.pdf`, isPdf: true },
  { path: `${folderName}/m2/25-clin-over/clinical-overview.pdf`, isPdf: true },
  { path: `${folderName}/m2/26-nonclin-sum/nonclinical-summary.pdf`, isPdf: true },
  { path: `${folderName}/m2/27-clin-sum/clinical-summary.pdf`, isPdf: true },
  // Module 3
  { path: `${folderName}/m3/32-body-data/32s-drug-sub/quality-summary.pdf`, isPdf: true },
  { path: `${folderName}/m3/32-body-data/32p-drug-prod/drug-product.pdf`, isPdf: true },
  // Module 4
  { path: `${folderName}/m4/423-tox/toxicity-report.pdf`, isPdf: true },
  // Module 5
  { path: `${folderName}/m5/535-effic-safety/clinical-study-report.pdf`, isPdf: true },
  // XMLs
  { path: `${folderName}/index.xml`, isPdf: false, content: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE eCTD SYSTEM \"ectd.dtd\">\n<ectd:ectd></ectd:ectd>" },
  { path: `${folderName}/m1/uk/uk-regional.xml`, isPdf: false, content: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE mhra SYSTEM \"mhra.dtd\">\n<mhra:mhra></mhra:mhra>" }
];

async function createValidPdfBuffer(filename) {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 16;
  
  page.drawText(`Mock eCTD Document ${filename}`, {
    x: 50,
    y: height - 100,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  
  page.drawText('Generated for structural validation testing.', {
    x: 50,
    y: height - 130,
    size: 12,
    font: timesRomanFont,
    color: rgb(0.3, 0.3, 0.3),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

async function generateDossier() {
  const zip = new AdmZip();
  
  for (const fileDef of fileDefinitions) {
    if (fileDef.isPdf) {
      const filename = path.basename(fileDef.path);
      const pdfBuffer = await createValidPdfBuffer(filename);
      zip.addFile(fileDef.path, pdfBuffer);
    } else {
      zip.addFile(fileDef.path, Buffer.from(fileDef.content, "utf8"));
    }
  }

  const outPath = path.join(__dirname, '..', 'public', 'sample-sequence-0000.zip');
  zip.writeZip(outPath);
  console.log(`Mock dossier generated at: ${outPath}`);
}

generateDossier().catch(console.error);
