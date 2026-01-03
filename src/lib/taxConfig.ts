/**
 * Nigerian Tax Configuration
 * =========================
 * 
 * This file contains all tax rules and rates as a single source of truth.
 * When the government changes any tax law, update ONLY this file.
 * 
 * Last updated: Finance Act 2024
 */

export const TAX_CONFIG = {
  // Reference year for disclaimer
  financeActYear: 2024,
  verifiedBy: "[Placeholder Name]",

  // Consolidated Relief Allowance (CRA) parameters
  cra: {
    // Fixed floor amount (₦200,000 or 1% of gross, whichever is higher)
    fixedFloor: 200_000,
    // Percentage of gross income (alternative to fixed floor)
    percentOfGross: 0.01, // 1%
    // Additional relief as percentage of gross income
    additionalPercent: 0.20, // 20%
  },

  // Default contribution rates
  contributions: {
    pension: {
      defaultRate: 0.075, // 7.5%
      minRate: 0,
      maxRate: 0.20, // 20% max
    },
    nhf: {
      defaultRate: 0.025, // 2.5%
    },
  },

  // PAYE Tax Bands (Progressive tax rates)
  // Each band: { threshold: amount up to which this rate applies, rate: tax rate }
  taxBands: [
    { threshold: 300_000, rate: 0.07, label: "First ₦300,000" },
    { threshold: 300_000, rate: 0.11, label: "Next ₦300,000" },
    { threshold: 500_000, rate: 0.15, label: "Next ₦500,000" },
    { threshold: 500_000, rate: 0.19, label: "Next ₦500,000" },
    { threshold: 1_600_000, rate: 0.21, label: "Next ₦1,600,000" },
    { threshold: Infinity, rate: 0.24, label: "Above ₦3,200,000" },
  ],

  // Minimum tax rate (1% of gross income if taxable income is negligible)
  minimumTaxRate: 0.01,
} as const;

export type TaxConfig = typeof TAX_CONFIG;
export type TaxBand = typeof TAX_CONFIG.taxBands[number];
