import { TaxResult, formatNaira, calculateTax } from "@/lib/taxUtils";

interface TaxSavingsReportProps {
  result: TaxResult;
  grossSalary: number;
  pensionRate: number;
}

interface SavingsItem {
  label: string;
  deductionAmount: number;
  taxSaved: number;
}

export function TaxSavingsReport({ result, grossSalary, pensionRate }: TaxSavingsReportProps) {
  // Calculate tax without any deductions to get the baseline
  const baselineTax = calculateTax({
    grossAnnualSalary: grossSalary,
    pensionRate: 0,
    nhfContribution: 0,
    nhisContribution: 0,
    annualRent: 0,
    lifeInsurance: 0,
  }).annualTax;

  // Calculate tax savings for each deduction type
  const calculateSavings = (
    excludePension: boolean,
    excludeNhf: boolean,
    excludeNhis: boolean,
    excludeRent: boolean,
    excludeInsurance: boolean
  ) => {
    const taxWith = calculateTax({
      grossAnnualSalary: grossSalary,
      pensionRate: excludePension ? 0 : pensionRate,
      nhfContribution: excludeNhf ? 0 : result.nhfContribution,
      nhisContribution: excludeNhis ? 0 : result.nhisContribution,
      annualRent: excludeRent ? 0 : (result.rentRelief / 0.2),
      lifeInsurance: excludeInsurance ? 0 : result.lifeInsurance,
    }).annualTax;
    return taxWith;
  };

  // Calculate individual savings
  const taxWithoutPension = calculateSavings(true, false, false, false, false);
  const taxWithoutNhf = calculateSavings(false, true, false, false, false);
  const taxWithoutNhis = calculateSavings(false, false, true, false, false);
  const taxWithoutRent = calculateSavings(false, false, false, true, false);
  const taxWithoutInsurance = calculateSavings(false, false, false, false, true);

  const savingsItems: SavingsItem[] = [];

  if (result.pensionContribution > 0) {
    savingsItems.push({
      label: "Pension",
      deductionAmount: result.pensionContribution,
      taxSaved: taxWithoutPension - result.annualTax,
    });
  }

  if (result.nhfContribution > 0) {
    savingsItems.push({
      label: "NHF",
      deductionAmount: result.nhfContribution,
      taxSaved: taxWithoutNhf - result.annualTax,
    });
  }

  if (result.nhisContribution > 0) {
    savingsItems.push({
      label: "NHIS",
      deductionAmount: result.nhisContribution,
      taxSaved: taxWithoutNhis - result.annualTax,
    });
  }

  if (result.rentRelief > 0) {
    savingsItems.push({
      label: "Rent relief",
      deductionAmount: result.rentRelief,
      taxSaved: taxWithoutRent - result.annualTax,
    });
  }

  if (result.lifeInsurance > 0) {
    savingsItems.push({
      label: "Life insurance",
      deductionAmount: result.lifeInsurance,
      taxSaved: taxWithoutInsurance - result.annualTax,
    });
  }

  const totalSavings = baselineTax - result.annualTax;

  if (savingsItems.length === 0 || totalSavings <= 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border/50 bg-card p-5 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Tax saved</h3>
        <span className="text-lg font-semibold text-primary tabular-nums">
          {formatNaira(totalSavings)}
        </span>
      </div>

      <div className="space-y-2">
        {savingsItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
          >
            <div>
              <p className="text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground tabular-nums">
                {formatNaira(item.deductionAmount)} deducted
              </p>
            </div>
            <span className="text-sm font-medium text-primary tabular-nums">
              −{formatNaira(item.taxSaved)}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Your deductions reduce your taxable income, saving you {formatNaira(totalSavings)} in taxes annually.
      </p>
    </div>
  );
}