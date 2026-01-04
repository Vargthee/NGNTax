/**
 * Nigerian Tax Configuration - Nigeria Tax Act 2025
 * ==================================================
 * 
 * This file contains all tax rules and rates as a single source of truth.
 * When the government changes any tax law, update ONLY this file.
 * 
 * Last updated: Nigeria Tax Act 2025 (Effective January 1, 2026)
 * 
 * Key Changes from 2024:
 * - CRA (Consolidated Relief Allowance) is ABOLISHED
 * - New progressive tax bands with 0% for first ₦800,000
 * - Pension contribution rate changed to 8%
 * - New Rent Relief: 20% of annual rent, capped at ₦500,000
 */

export const TAX_CONFIG = {
  // Reference year for disclaimer
  financeActYear: 2025,
  effectiveDate: "January 1, 2026",
  verifiedBy: "[Placeholder Name]",

  // Default contribution rates
  contributions: {
    pension: {
      defaultRate: 0.08, // 8% (updated from 7.5%)
      minRate: 0,
      maxRate: 0.20, // 20% max
    },
    nhf: {
      defaultRate: 0.025, // 2.5%
    },
  },

  // Rent Relief parameters
  rentRelief: {
    percentOfRent: 0.20, // 20% of annual rent
    maxAmount: 500_000, // Capped at ₦500,000
  },

  // PAYE Tax Bands (Progressive tax rates) - Nigeria Tax Act 2025
  // Each band: { threshold: amount for this band, rate: tax rate, cumulative: cumulative threshold }
  taxBands: [
    { threshold: 800_000, rate: 0.00, label: "First ₦800,000", cumulative: 800_000 },
    { threshold: 2_200_000, rate: 0.15, label: "Next ₦2,200,000", cumulative: 3_000_000 },
    { threshold: 9_000_000, rate: 0.18, label: "Next ₦9,000,000", cumulative: 12_000_000 },
    { threshold: 13_000_000, rate: 0.21, label: "Next ₦13,000,000", cumulative: 25_000_000 },
    { threshold: 25_000_000, rate: 0.23, label: "Next ₦25,000,000", cumulative: 50_000_000 },
    { threshold: Infinity, rate: 0.25, label: "Above ₦50,000,000", cumulative: Infinity },
  ],

  // Minimum wage exemption (national minimum wage earners are tax-exempt)
  minimumWageAnnual: 420_000, // ₦35,000/month × 12

  // Employment compensation exemption limit
  compensationExemptionLimit: 50_000_000,
} as const;

export type TaxConfig = typeof TAX_CONFIG;
export type TaxBand = typeof TAX_CONFIG.taxBands[number];
