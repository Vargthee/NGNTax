# NGNTax

**A compliant, offline-first Personal Income Tax (PIT) calculator for the Nigerian Finance Act 2025.**

## 📖 Overview

NGNTax is a specialized calculator designed to help Nigerians and SMEs estimate their tax liability under the new Tax Laws.

Unlike generic calculators, this project specifically handles the **abolition of the Consolidated Relief Allowance (CRA)** and implements the new **6-tier progressive tax band system** (starting with the 0% tax-exempt threshold for the first ₦800,000).

### Key Features

* **2026 Statutory Compliance:** Implements the new 6-band graduated tax scale.
* **Smart Reliefs:** Automatically calculates statutory deductions for Pension (8%), NHF (2.5%), and the new **Rent Relief** (capped at ₦500k).
* **Offline First:** Calculation logic runs entirely client-side; no internet required after initial load.
* **Configurable Logic:** Tax rates and bands are decoupled from the UI, allowing for 48-hour updates via a single config file.

## 🛠 Tech Stack

* **Framework:** React 18 (Vite)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS + Shadcn UI
* **Icons:** Lucide React
* **State/Logic:** Custom React Hooks (`useTaxCalculator`)

## 📂 Architecture

This project follows a feature-first architecture to ensure modularity and testability.

```text
src/
├── config/
│   └── taxRates.ts       # SINGLE SOURCE OF TRUTH. All tax bands/rates defined here.
├── features/
│   └── calculator/       # Core domain logic
│       ├── TaxForm.tsx   # Input UI
│       ├── ResultCard.tsx# Output UI
│       └── logic/        # Pure math functions (testable, no React dependency)
├── components/
│   └── ui/               # Reusable dumb components (Buttons, Cards, Inputs)
├── hooks/
│   └── useTaxCalculator.ts # The controller connecting UI to Logic
└── lib/
    └── utils.ts          # Helper functions

```

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/ngntax.git
cd ngntax

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the development server:**
```bash
npm run dev

```



## ⚙️ Configuration & Updates

**How to update Tax Rates:**
If the Federal Government amends the Finance Act (e.g., changing the VAT rate or tax bands), you do not need to rewrite the component logic.

1. Navigate to `src/config/taxRates.ts`
2. Update the constants:

```typescript
// Example: src/config/taxRates.ts

export const TAX_BANDS = [
  { threshold: 800000, rate: 0 },   // 0% for first 800k
  { threshold: 3000000, rate: 0.15 }, // 15% for next block
  // ... update other bands here
];

export const RELIEFS = {
  PENSION_RATE: 0.08,
  RENT_CAP: 500000, // Update cap if changed
};

```

## 🧪 Running Tests

The calculation engine is isolated from the UI to ensure 100% accuracy. Run the test suite to verify the logic against the 50 standard income scenarios.

```bash
npm run test

```

## 🤝 Contributing

Contributions are welcome, specifically for:

1. Improving accessibility (a11y) for screen readers.
2. Adding support for "Direct Assessment" tax calculation for freelancers.

Please read `CONTRIBUTING.md` before submitting a pull request.

## ⚠️ Disclaimer

This software is provided for **educational and estimation purposes only**. While every effort has been made to align with the Finance Act of 2025, it does not constitute professional financial advice. Users should verify final tax liabilities with the FIRS or a chartered tax consultant.

---

**Built for Nigerians.**
