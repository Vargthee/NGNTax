/**
 * Nigerian Tax Calculation Utilities - Nigeria Tax Act 2025
 * ==========================================================
 * 
 * Pure functions for calculating Nigerian PAYE tax.
 * All business logic is contained here for easy testing.
 * 
 * Key changes from 2024:
 * - CRA is abolished (no more 200k + 20% formula)
 * - New tax bands starting with 0% for first ₦800,000
 * - Allowable deductions: Pension, NHF, NHIS, Rent Relief, Life Insurance
 */

import { TAX_CONFIG } from "./taxConfig";

export interface TaxInput {
  grossAnnualSalary: number;
  pensionRate: number; // As decimal (e.g., 0.08 for 8%)
  nhfContribution: number; // Absolute amount
  nhisContribution: number; // Absolute amount (new)
  annualRent: number; // Annual rent paid (new - for rent relief calculation)
  lifeInsurance: number; // Absolute amount
}

export interface TaxBandBreakdown {
  band: string;
  rate: number;
  taxableInBand: number;
  taxAmount: number;
}

export interface TaxResult {
  grossAnnualIncome: number;
  pensionContribution: number;
  nhfContribution: number;
  nhisContribution: number;
  rentRelief: number;
  lifeInsurance: number;
  totalDeductions: number;
  taxableIncome: number;
  annualTax: number;
  monthlyTax: number;
  effectiveRate: number;
  bandBreakdown: TaxBandBreakdown[];
  netAnnualIncome: number;
  netMonthlyIncome: number;
}

/**
 * Calculate pension contribution based on gross salary and rate
 */
export function calculatePensionContribution(
  grossAnnualSalary: number,
  pensionRate: number
): number {
  return grossAnnualSalary * pensionRate;
}

/**
 * Calculate NHF contribution (2.5% of gross if enabled)
 */
export function calculateNHFContribution(grossAnnualSalary: number): number {
  return grossAnnualSalary * TAX_CONFIG.contributions.nhf.defaultRate;
}

/**
 * Calculate Rent Relief
 * 20% of annual rent, capped at ₦500,000
 */
export function calculateRentRelief(annualRent: number): number {
  const { percentOfRent, maxAmount } = TAX_CONFIG.rentRelief;
  const calculatedRelief = annualRent * percentOfRent;
  return Math.min(calculatedRelief, maxAmount);
}

/**
 * Calculate total allowable deductions
 * Under Nigeria Tax Act 2025, the eligible deductions are:
 * 1. Pension contribution
 * 2. NHF contribution
 * 3. NHIS contribution
 * 4. Rent relief (20% of rent, max ₦500k)
 * 5. Life insurance premium
 * (Mortgage interest excluded as it requires separate documentation)
 */
export function calculateTotalDeductions(
  pensionContribution: number,
  nhfContribution: number,
  nhisContribution: number,
  rentRelief: number,
  lifeInsurance: number
): number {
  return pensionContribution + nhfContribution + nhisContribution + rentRelief + lifeInsurance;
}

/**
 * Calculate taxable income (Gross - Total Deductions)
 */
export function calculateTaxableIncome(
  grossAnnualIncome: number,
  totalDeductions: number
): number {
  return Math.max(0, grossAnnualIncome - totalDeductions);
}

/**
 * Calculate PAYE tax using new progressive tax bands (Nigeria Tax Act 2025)
 * Returns the tax amount and breakdown by band
 * 
 * Bands:
 * - ₦0 - ₦800,000: 0%
 * - ₦800,001 - ₦3,000,000: 15%
 * - ₦3,000,001 - ₦12,000,000: 18%
 * - ₦12,000,001 - ₦25,000,000: 21%
 * - ₦25,000,001 - ₦50,000,000: 23%
 * - Above ₦50,000,000: 25%
 */
export function calculatePAYE(taxableIncome: number): {
  tax: number;
  breakdown: TaxBandBreakdown[];
} {
  let remainingIncome = taxableIncome;
  let totalTax = 0;
  const breakdown: TaxBandBreakdown[] = [];

  for (const band of TAX_CONFIG.taxBands) {
    if (remainingIncome <= 0) break;

    const taxableInBand = Math.min(remainingIncome, band.threshold);
    const taxAmount = taxableInBand * band.rate;

    if (taxableInBand > 0) {
      breakdown.push({
        band: band.label,
        rate: band.rate,
        taxableInBand,
        taxAmount,
      });
    }

    totalTax += taxAmount;
    remainingIncome -= taxableInBand;
  }

  return { tax: totalTax, breakdown };
}

/**
 * Main calculation function - calculates complete tax breakdown
 * Based on Nigeria Tax Act 2025 (effective January 1, 2026)
 */
export function calculateTax(input: TaxInput): TaxResult {
  const { 
    grossAnnualSalary, 
    pensionRate, 
    nhfContribution, 
    nhisContribution,
    annualRent,
    lifeInsurance 
  } = input;

  // Calculate pension
  const pensionContribution = calculatePensionContribution(grossAnnualSalary, pensionRate);

  // Calculate rent relief (20% of rent, max ₦500k)
  const rentRelief = calculateRentRelief(annualRent);

  // Calculate total deductions
  const totalDeductions = calculateTotalDeductions(
    pensionContribution,
    nhfContribution,
    nhisContribution,
    rentRelief,
    lifeInsurance
  );

  // Calculate taxable income
  const taxableIncome = calculateTaxableIncome(grossAnnualSalary, totalDeductions);

  // Calculate PAYE using new bands
  const { tax: annualTax, breakdown } = calculatePAYE(taxableIncome);

  // Calculate monthly and effective rate
  const monthlyTax = annualTax / 12;
  const effectiveRate = grossAnnualSalary > 0 ? (annualTax / grossAnnualSalary) * 100 : 0;

  // Calculate net income
  const netAnnualIncome = grossAnnualSalary - pensionContribution - nhfContribution - nhisContribution - annualTax;
  const netMonthlyIncome = netAnnualIncome / 12;

  return {
    grossAnnualIncome: grossAnnualSalary,
    pensionContribution,
    nhfContribution,
    nhisContribution,
    rentRelief,
    lifeInsurance,
    totalDeductions,
    taxableIncome,
    annualTax,
    monthlyTax,
    effectiveRate,
    bandBreakdown: breakdown,
    netAnnualIncome,
    netMonthlyIncome,
  };
}

/**
 * Format number as Nigerian Naira
 */
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

/**
 * Parse currency input string to number
 */
export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
}
