import { useState, useMemo, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TaxCalculatorForm } from "@/components/TaxCalculatorForm";
import { TaxSummaryCard } from "@/components/TaxSummaryCard";
import { TaxBandChart } from "@/components/TaxBandChart";
import { TaxSavingsReport } from "@/components/TaxSavingsReport";
import { HistoryPanel } from "@/components/HistoryPanel";
import { ExportButtons } from "@/components/ExportButtons";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useCalculationHistory, HistoryEntry } from "@/hooks/useCalculationHistory";
import { calculateTax, TaxResult } from "@/lib/taxUtils";
import { TAX_CONFIG } from "@/lib/taxConfig";
import { Save, History } from "lucide-react";

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  const { history, addEntry, removeEntry, clearHistory } = useCalculationHistory();

  // Form state
  const [grossSalary, setGrossSalary] = useState(0);
  const [pensionRate, setPensionRate] = useState<number>(TAX_CONFIG.contributions.pension.defaultRate);
  const [nhfContribution, setNhfContribution] = useState(0);
  const [nhisContribution, setNhisContribution] = useState(0);
  const [annualRent, setAnnualRent] = useState(0);
  const [lifeInsurance, setLifeInsurance] = useState(0);
  const [isMonthly, setIsMonthly] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

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

  // Save to history
  const handleSaveToHistory = useCallback(() => {
    if (grossSalary > 0) {
      addEntry(grossSalary, pensionRate, nhfContribution, nhisContribution, annualRent, lifeInsurance, taxResult);
    }
  }, [grossSalary, pensionRate, nhfContribution, nhisContribution, annualRent, lifeInsurance, taxResult, addEntry]);

  // Load from history
  const handleLoadEntry = useCallback((entry: HistoryEntry) => {
    setGrossSalary(entry.grossSalary);
    setPensionRate(entry.pensionRate);
    setNhfContribution(entry.nhfContribution);
    setNhisContribution(entry.nhisContribution || 0);
    setAnnualRent(entry.annualRent || 0);
    setLifeInsurance(entry.lifeInsurance);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex-1 container px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section - minimal, clear */}
          <div className="mb-10 md:mb-14">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
              Calculate your Nigerian PAYE tax
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Updated for {TAX_CONFIG.financeActYear}. Enter your income to see your tax breakdown.
            </p>
          </div>

          {/* Main Content - stacked on mobile, side-by-side on desktop */}
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr,380px]">
            {/* Left Column - Form & Actions */}
            <div className="space-y-6">
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

              {/* Action bar */}
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveToHistory}
                  disabled={grossSalary <= 0}
                  size="sm"
                  className="gap-2"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                  className="gap-2 lg:hidden"
                >
                  <History className="h-3.5 w-3.5" />
                  History ({history.length})
                </Button>
              </div>

              {/* Mobile History */}
              {showHistory && (
                <div className="lg:hidden">
                  <HistoryPanel
                    history={history}
                    onLoadEntry={handleLoadEntry}
                    onRemoveEntry={removeEntry}
                    onClearHistory={clearHistory}
                  />
                </div>
              )}

              {/* Charts & Reports - below form on mobile, beside on desktop */}
              <div className="space-y-6 lg:hidden">
                <TaxBandChart breakdown={taxResult.bandBreakdown} />
                <TaxSavingsReport 
                  result={taxResult} 
                  grossSalary={grossSalary} 
                  pensionRate={pensionRate} 
                />
              </div>
            </div>

            {/* Right Column - Summary & Details */}
            <div className="space-y-6">
              <TaxSummaryCard result={taxResult} />
              
              {/* Desktop Charts */}
              <div className="hidden lg:block space-y-6">
                <TaxBandChart breakdown={taxResult.bandBreakdown} />
                <TaxSavingsReport 
                  result={taxResult} 
                  grossSalary={grossSalary} 
                  pensionRate={pensionRate} 
                />
              </div>

              <ExportButtons
                result={taxResult}
                grossSalary={grossSalary}
                pensionRate={pensionRate}
              />

              {/* Desktop History */}
              <div className="hidden lg:block">
                <HistoryPanel
                  history={history}
                  onLoadEntry={handleLoadEntry}
                  onRemoveEntry={removeEntry}
                  onClearHistory={clearHistory}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;