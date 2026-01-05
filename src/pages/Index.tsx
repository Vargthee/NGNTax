import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TaxCalculatorForm } from "@/components/TaxCalculatorForm";
import { TaxSummaryCard } from "@/components/TaxSummaryCard";
import { TaxBandChart } from "@/components/TaxBandChart";
import { TaxSavingsReport } from "@/components/TaxSavingsReport";
import { ExportButtons } from "@/components/ExportButtons";
import { useTheme } from "@/hooks/useTheme";
import { calculateTax, TaxResult } from "@/lib/taxUtils";
import { TAX_CONFIG } from "@/lib/taxConfig";

const Index = () => {
  const { theme, toggleTheme } = useTheme();

  const [grossSalary, setGrossSalary] = useState(0);
  const [pensionRate, setPensionRate] = useState<number>(TAX_CONFIG.contributions.pension.defaultRate);
  const [nhfContribution, setNhfContribution] = useState(0);
  const [nhisContribution, setNhisContribution] = useState(0);
  const [annualRent, setAnnualRent] = useState(0);
  const [lifeInsurance, setLifeInsurance] = useState(0);
  const [isMonthly, setIsMonthly] = useState(false);

  // Calculate tax in real-time
  const taxResult = useMemo<TaxResult>(() => {
    return calculateTax({
      grossAnnualSalary: grossSalary,
      pensionRate,
      nhfContribution,
      nhisContribution,
      annualRent,
      lifeInsurance,
    });
  }, [grossSalary, pensionRate, nhfContribution, nhisContribution, annualRent, lifeInsurance]);


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex-1 container px-4 py-6 lg:py-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Nigerian PAYE Tax Calculator
            </h2>
            <p className="text-muted-foreground">
              Calculate your income tax based on the Nigeria Tax Act {TAX_CONFIG.financeActYear} (Effective {TAX_CONFIG.effectiveDate})
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - Form */}
            <div className="space-y-4">
              <TaxCalculatorForm
                grossSalary={grossSalary}
                setGrossSalary={setGrossSalary}
                pensionRate={pensionRate}
                setPensionRate={setPensionRate}
                nhfContribution={nhfContribution}
                setNhfContribution={setNhfContribution}
                nhisContribution={nhisContribution}
                setNhisContribution={setNhisContribution}
                annualRent={annualRent}
                setAnnualRent={setAnnualRent}
                lifeInsurance={lifeInsurance}
                setLifeInsurance={setLifeInsurance}
                isMonthly={isMonthly}
                setIsMonthly={setIsMonthly}
              />
            </div>

            {/* Right Column - Summary & Export */}
            <div className="space-y-4">
              <TaxSummaryCard result={taxResult} />
              <TaxBandChart breakdown={taxResult.bandBreakdown} />
              <TaxSavingsReport
                result={taxResult}
                grossSalary={grossSalary}
                pensionRate={pensionRate}
              />
              <ExportButtons
                result={taxResult}
                grossSalary={grossSalary}
                pensionRate={pensionRate}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
