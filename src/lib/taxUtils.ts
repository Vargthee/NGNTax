/**
 * Nigerian Tax Calculation Utilities
 * ==================================
 * 
 * Pure functions for calculating Nigerian PAYE tax.
 * All business logic is contained here for easy testing.
 */

import { TAX_CONFIG } from "./taxConfig";

export interface TaxInput {
  grossAnnualSalary: number;
  pensionRate: number; // As decimal (e.g., 0.075 for 7.5%)
  nhfContribution: number; // Absolute amount
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
  lifeInsurance: number;
  cra: number;
  totalReliefs: number;
  taxableIncome: number;
  annualTax: number;
  monthlyTax: number;
  effectiveRate: number;
  bandBreakdown: TaxBandBreakdown[];
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
 * Calculate Consolidated Relief Allowance (CRA)
 * CRA = Higher of (₦200,000 or 1% of Gross) + 20% of Gross Income
 */
export function calculateCRA(grossAnnualIncome: number): number {
  const { fixedFloor, percentOfGross, additionalPercent } = TAX_CONFIG.cra;
  
  // Higher of ₦200,000 or 1% of gross
  const baseRelief = Math.max(fixedFloor, grossAnnualIncome * percentOfGross);
  
  // Plus 20% of gross income
  const additionalRelief = grossAnnualIncome * additionalPercent;
  
  return baseRelief + additionalRelief;
}

/**
 * Calculate total reliefs (CRA + Pension + NHF + Life Insurance)
 */
export function calculateTotalReliefs(
  cra: number,
  pensionContribution: number,
  nhfContribution: number,
  lifeInsurance: number
): number {
  return cra + pensionContribution + nhfContribution + lifeInsurance;
}

/**
 * Calculate taxable income (Gross - Total Reliefs)
 */
export function calculateTaxableIncome(
  grossAnnualIncome: number,
  totalReliefs: number
): number {
  return Math.max(0, grossAnnualIncome - totalReliefs);
}

/**
 * Calculate PAYE tax using progressive tax bands
 * Returns the tax amount and breakdown by band
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
 * Calculate minimum tax (1% of gross income)
 * Applied if calculated tax is less than minimum tax
 */
export function calculateMinimumTax(grossAnnualIncome: number): number {
  return grossAnnualIncome * TAX_CONFIG.minimumTaxRate;
}

/**
 * Main calculation function - calculates complete tax breakdown
 */
export function calculateTax(input: TaxInput): TaxResult {
  const { grossAnnualSalary, pensionRate, nhfContribution, lifeInsurance } = input;

  // Calculate pension
  const pensionContribution = calculatePensionContribution(grossAnnualSalary, pensionRate);

  // Calculate CRA
  const cra = calculateCRA(grossAnnualSalary);

  // Calculate total reliefs
  const totalReliefs = calculateTotalReliefs(
    cra,
    pensionContribution,
    nhfContribution,
    lifeInsurance
  );

  // Calculate taxable income
  const taxableIncome = calculateTaxableIncome(grossAnnualSalary, totalReliefs);

  // Calculate PAYE
  const { tax: payeTax, breakdown } = calculatePAYE(taxableIncome);

  // Apply minimum tax rule
  const minimumTax = calculateMinimumTax(grossAnnualSalary);
  const annualTax = Math.max(payeTax, minimumTax);

  // Calculate monthly and effective rate
  const monthlyTax = annualTax / 12;
  const effectiveRate = grossAnnualSalary > 0 ? (annualTax / grossAnnualSalary) * 100 : 0;

  return {
    grossAnnualIncome: grossAnnualSalary,
    pensionContribution,
    nhfContribution,
    lifeInsurance,
    cra,
    totalReliefs,
    taxableIncome,
    annualTax,
    monthlyTax,
    effectiveRate,
    bandBreakdown: breakdown,
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
