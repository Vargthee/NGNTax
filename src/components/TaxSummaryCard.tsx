import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TaxResult, formatNaira, formatPercent } from "@/lib/taxUtils";
import { TrendingDown, Wallet, Receipt, PiggyBank } from "lucide-react";

interface TaxSummaryCardProps {
  result: TaxResult;
}

export function TaxSummaryCard({ result }: TaxSummaryCardProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          Tax Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Gross Income */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Gross Annual Income</span>
          </div>
          <span className="font-semibold">{formatNaira(result.grossAnnualIncome)}</span>
        </div>

        <Separator />

        {/* Reliefs Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TrendingDown className="h-4 w-4 text-primary" />
            <span>Total Reliefs</span>
          </div>
          <div className="ml-6 space-y-1 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>CRA (Consolidated Relief)</span>
              <span>{formatNaira(result.cra)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Pension Contribution</span>
              <span>{formatNaira(result.pensionContribution)}</span>
            </div>
            {result.nhfContribution > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>NHF Contribution</span>
                <span>{formatNaira(result.nhfContribution)}</span>
              </div>
            )}
            {result.lifeInsurance > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Life Insurance</span>
                <span>{formatNaira(result.lifeInsurance)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium pt-1 border-t border-dashed">
              <span>Total</span>
              <span className="text-primary">{formatNaira(result.totalReliefs)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Taxable Income */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Taxable Income</span>
          <span className="font-semibold">{formatNaira(result.taxableIncome)}</span>
        </div>

        <Separator />

        {/* Tax Payable */}
        <div className="rounded-lg bg-primary/10 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-primary" />
            <span className="font-semibold">Tax Payable</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-md bg-background">
              <p className="text-xs text-muted-foreground mb-1">Monthly</p>
              <p className="text-lg font-bold text-primary">{formatNaira(result.monthlyTax)}</p>
            </div>
            <div className="text-center p-3 rounded-md bg-background">
              <p className="text-xs text-muted-foreground mb-1">Yearly</p>
              <p className="text-lg font-bold text-primary">{formatNaira(result.annualTax)}</p>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Effective Tax Rate: <span className="font-medium text-foreground">{formatPercent(result.effectiveRate)}</span>
          </div>
        </div>

        {/* Tax Bands Breakdown */}
        {result.bandBreakdown.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Tax Band Breakdown</p>
              <div className="space-y-1">
                {result.bandBreakdown.map((band, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      {band.band} @ {(band.rate * 100).toFixed(0)}%
                    </span>
                    <span>{formatNaira(band.taxAmount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
