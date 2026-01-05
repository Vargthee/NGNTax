import { Button } from "@/components/ui/button";
import { TaxResult } from "@/lib/taxUtils";
import { TAX_CONFIG } from "@/lib/taxConfig";
import { Printer, Download } from "lucide-react";

interface ExportButtonsProps {
  result: TaxResult;
  grossSalary: number;
  pensionRate: number;
}

export function ExportButtons({ result, grossSalary, pensionRate }: ExportButtonsProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const rows = [
      ["NGNTax Calculation Summary"],
      ["Generated", new Date().toLocaleDateString("en-NG")],
      ["Based on", `Nigeria Tax Act ${TAX_CONFIG.financeActYear} (Effective ${TAX_CONFIG.effectiveDate})`],
      [""],
      ["Income Details"],
      ["Gross Annual Salary", result.grossAnnualIncome.toString()],
      ["Pension Rate", `${(pensionRate * 100).toFixed(1)}%`],
      [""],
      ["Allowable Deductions"],
      ["Pension Contribution", result.pensionContribution.toString()],
      ["NHF Contribution", result.nhfContribution.toString()],
      ["NHIS Contribution", result.nhisContribution.toString()],
      ["Rent Relief", result.rentRelief.toString()],
      ["Life Insurance", result.lifeInsurance.toString()],
      ["Total Deductions", result.totalDeductions.toString()],
      [""],
      ["Tax Calculation"],
      ["Taxable Income", result.taxableIncome.toString()],
      ["Annual Tax", result.annualTax.toString()],
      ["Monthly Tax", result.monthlyTax.toString()],
      ["Effective Tax Rate", `${result.effectiveRate.toFixed(2)}%`],
      [""],
      ["Net Income"],
      ["Net Annual Income", result.netAnnualIncome.toString()],
      ["Net Monthly Income", result.netMonthlyIncome.toString()],
      [""],
      ["Tax Bands Breakdown"],
      ...result.bandBreakdown.map((band) => [
        band.band,
        `${(band.rate * 100).toFixed(0)}%`,
        band.taxableInBand.toString(),
        band.taxAmount.toString(),
      ]),
    ];

    const csvContent = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `ngntax-calculation-${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-2 no-print">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handlePrint} 
        className="flex-1 gap-2 text-muted-foreground"
      >
        <Printer className="h-3.5 w-3.5" />
        Print
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExportCSV} 
        className="flex-1 gap-2 text-muted-foreground"
      >
        <Download className="h-3.5 w-3.5" />
        Export
      </Button>
    </div>
  );
}