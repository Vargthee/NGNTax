import { TaxResult, formatNaira, formatPercent } from "@/lib/taxUtils";

interface TaxSummaryCardProps {
  result: TaxResult;
}

export function TaxSummaryCard({ result }: TaxSummaryCardProps) {
  const hasDeductions = result.totalDeductions > 0;

  return (
    <div className="rounded-lg border border-border/50 bg-card p-5 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-1">Tax Summary</h2>
        <p className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground tabular-nums">
          {formatNaira(result.annualTax)}
          <span className="text-sm font-normal text-muted-foreground ml-1">/year</span>
        </p>
      </div>

      {/* Key Figures */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Monthly tax</p>
          <p className="text-lg font-medium tabular-nums">{formatNaira(result.monthlyTax)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Effective rate</p>
          <p className="text-lg font-medium tabular-nums">{formatPercent(result.effectiveRate)}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/50" />

      {/* Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Gross income</span>
          <span className="tabular-nums">{formatNaira(result.grossAnnualIncome)}</span>
        </div>

        {hasDeductions && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Deductions</span>
              <span className="tabular-nums text-muted-foreground">−{formatNaira(result.totalDeductions)}</span>
            </div>

            {/* Deduction details - collapsible feel */}
            <div className="pl-3 border-l-2 border-border/50 space-y-1.5 text-xs">
              {result.pensionContribution > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Pension</span>
                  <span className="tabular-nums">{formatNaira(result.pensionContribution)}</span>
                </div>
              )}
              {result.nhfContribution > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>NHF</span>
                  <span className="tabular-nums">{formatNaira(result.nhfContribution)}</span>
                </div>
              )}
              {result.nhisContribution > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>NHIS</span>
                  <span className="tabular-nums">{formatNaira(result.nhisContribution)}</span>
                </div>
              )}
              {result.rentRelief > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Rent relief</span>
                  <span className="tabular-nums">{formatNaira(result.rentRelief)}</span>
                </div>
              )}
              {result.lifeInsurance > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Life insurance</span>
                  <span className="tabular-nums">{formatNaira(result.lifeInsurance)}</span>
                </div>
              )}
            </div>
          </>
        )}

        <div className="flex justify-between text-sm pt-2 border-t border-dashed border-border/50">
          <span className="text-muted-foreground">Taxable income</span>
          <span className="font-medium tabular-nums">{formatNaira(result.taxableIncome)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/50" />

      {/* Net Income - Highlighted */}
      <div className="rounded-md bg-accent/50 p-4 space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-medium">Net annual income</span>
          <span className="text-xl font-semibold text-primary tabular-nums">
            {formatNaira(result.netAnnualIncome)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Net monthly</span>
          <span className="tabular-nums">{formatNaira(result.netMonthlyIncome)}</span>
        </div>
      </div>

      {/* Tax Bands - Subtle */}
      {result.bandBreakdown.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Tax bands applied</p>
          <div className="space-y-1">
            {result.bandBreakdown.map((band, index) => (
              <div key={index} className="flex justify-between text-xs text-muted-foreground">
                <span>{(band.rate * 100).toFixed(0)}% band</span>
                <span className="tabular-nums">{formatNaira(band.taxAmount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}