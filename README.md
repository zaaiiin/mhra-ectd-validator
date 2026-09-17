# MHRA eCTD Validator

A high-performance, browser-based administrative and structural parser designed to validate UK MAA (Marketing Authorisation Application) and Variation eCTD dossiers against regulatory compliance standards. 

This platform empowers regulatory professionals to instantly identify missing critical files, manage QA workflows, and generate print-ready deficiency reports—all without a single byte of confidential data ever leaving their local machine.

## 🌟 Key Features

- **Client-Side Structural Parsing:** Utilizes the WebKit Directory API to instantly parse deep folder structures (Modules 1-5) directly in the browser. 
- **Zero-Data-Leaves-Machine Security:** Strict adherence to data privacy. No files are uploaded to any external server; all validation logic executes locally.
- **Dynamic Deficiency Reporting:** Automatically generates enterprise-grade, print-ready deficiency reports categorized by severity (e.g., "RED Blocker", "AMBER Warning").
- **Integrated QA Workflow:** Differentiates between system-detected missing files and files pending human verification.
- **Built-in Demo Environment:** Includes an integrated mock dossier generator (`pdf-lib`) and a one-click demo mode, allowing stakeholders to test the validation logic without needing a proprietary eCTD sequence.

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript / React
- **Styling:** Tailwind CSS (Implementing GOV.UK Design System principles)
- **Icons:** Lucide React
- **Asset Generation:** `pdf-lib`, `adm-zip` (for Node.js mock data generation)

## 🚀 Getting Started

To run this project locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/zaaiiin/mhra-ectd-validator.git
cd mhra-ectd-validator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🧪 Testing the Application (Demo Mode)

If you do not have a valid eCTD sequence folder to test the upload feature, you can use the built-in Demo Environment:

1. Open the application in your browser.
2. In the **Demo Environment** panel on the bottom left, click **"Download Sample Dossier (.zip)"**.
3. **Unzip** the downloaded folder on your local machine.
4. Set the Configuration dropdowns to:
   - Submission Type: **New MAA (National)**
   - Product Type: **Chemical Entity**
5. Click **"Select Sequence Folder"** and select the unzipped folder to watch the parser validate the structure in real time!

*(Alternatively, simply click "Load Sample Dossier" to instantly populate the dashboard with mock data).*

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
