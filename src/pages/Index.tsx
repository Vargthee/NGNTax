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
import { Save, ChevronDown, ChevronUp } from "lucide-react";

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

              {/* Action Buttons */}
              <Button
                onClick={handleSaveToHistory}
                disabled={grossSalary <= 0}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Calculation
              </Button>

              {/* History Toggle for Mobile */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full"
                >
                  {showHistory ? (
                    <ChevronUp className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  )}
                  {showHistory ? "Hide History" : "Show History"} ({history.length})
                </Button>
                {showHistory && (
                  <div className="mt-4">
                    <HistoryPanel
                      history={history}
                      onLoadEntry={handleLoadEntry}
                      onRemoveEntry={removeEntry}
                      onClearHistory={clearHistory}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Summary & History */}
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

              {/* History Panel for Desktop */}
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
