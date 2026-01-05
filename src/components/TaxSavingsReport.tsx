import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaxResult, formatNaira, calculateTax } from "@/lib/taxUtils";
import { TrendingDown, Lightbulb, PiggyBank, Home, Shield, Heart } from "lucide-react";

interface TaxSavingsReportProps {
  result: TaxResult;
  grossSalary: number;
  pensionRate: number;
}

interface SavingsItem {
  label: string;
  icon: React.ReactNode;
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
      annualRent: excludeRent ? 0 : (result.rentRelief / 0.2), // Reverse calculate rent
      lifeInsurance: excludeInsurance ? 0 : result.lifeInsurance,
    }).annualTax;
    return taxWith;
  };

  // Calculate individual savings by comparing "with all" vs "without this one"
  const taxWithoutPension = calculateSavings(true, false, false, false, false);
  const taxWithoutNhf = calculateSavings(false, true, false, false, false);
  const taxWithoutNhis = calculateSavings(false, false, true, false, false);
  const taxWithoutRent = calculateSavings(false, false, false, true, false);
  const taxWithoutInsurance = calculateSavings(false, false, false, false, true);

  const savingsItems: SavingsItem[] = [];

  if (result.pensionContribution > 0) {
    savingsItems.push({
      label: "Pension Contribution",
      icon: <PiggyBank className="h-4 w-4 text-primary" />,
      deductionAmount: result.pensionContribution,
      taxSaved: taxWithoutPension - result.annualTax,
    });
  }

  if (result.nhfContribution > 0) {
    savingsItems.push({
      label: "NHF Contribution",
      icon: <Home className="h-4 w-4 text-blue-500" />,
      deductionAmount: result.nhfContribution,
      taxSaved: taxWithoutNhf - result.annualTax,
    });
  }

  if (result.nhisContribution > 0) {
    savingsItems.push({
      label: "NHIS Contribution",
      icon: <Shield className="h-4 w-4 text-green-500" />,
      deductionAmount: result.nhisContribution,
      taxSaved: taxWithoutNhis - result.annualTax,
    });
  }

  if (result.rentRelief > 0) {
    savingsItems.push({
      label: "Rent Relief",
      icon: <Home className="h-4 w-4 text-orange-500" />,
      deductionAmount: result.rentRelief,
      taxSaved: taxWithoutRent - result.annualTax,
    });
  }

  if (result.lifeInsurance > 0) {
    savingsItems.push({
      label: "Life Insurance",
      icon: <Heart className="h-4 w-4 text-red-500" />,
      deductionAmount: result.lifeInsurance,
      taxSaved: taxWithoutInsurance - result.annualTax,
    });
  }

  const totalSavings = baselineTax - result.annualTax;

  if (savingsItems.length === 0 || totalSavings <= 0) {
    return null;
  }

  return (
    <Card className="border-green-500/20 bg-green-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Tax Savings Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="rounded-lg bg-green-500/10 p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Tax Saved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatNaira(totalSavings)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            vs. no deductions ({formatNaira(baselineTax)} → {formatNaira(result.annualTax)})
          </p>
        </div>

        {/* Breakdown by deduction */}
        <div className="space-y-3">
          <p className="text-sm font-medium flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-primary" />
            Savings by Deduction
          </p>
          <div className="space-y-2">
            {savingsItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-background border"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">
                      Deduction: {formatNaira(item.deductionAmount)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    -{formatNaira(item.taxSaved)}
                  </p>
                  <p className="text-xs text-muted-foreground">tax saved</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">💡 Maximize your savings:</p>
          <p>
            Ensure you're claiming all eligible deductions including pension, NHF, NHIS, 
            rent relief (up to ₦500k), and life insurance to reduce your tax burden.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
