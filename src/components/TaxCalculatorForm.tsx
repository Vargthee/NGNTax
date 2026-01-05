import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { TAX_CONFIG } from "@/lib/taxConfig";
import { formatNaira } from "@/lib/taxUtils";

interface TaxCalculatorFormProps {
  grossSalary: number;
  setGrossSalary: (value: number) => void;
  pensionRate: number;
  setPensionRate: (value: number) => void;
  nhfContribution: number;
  setNhfContribution: (value: number) => void;
  nhisContribution: number;
  setNhisContribution: (value: number) => void;
  annualRent: number;
  setAnnualRent: (value: number) => void;
  lifeInsurance: number;
  setLifeInsurance: (value: number) => void;
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
}

export function TaxCalculatorForm({
  grossSalary,
  setGrossSalary,
  pensionRate,
  setPensionRate,
  nhfContribution,
  setNhfContribution,
  nhisContribution,
  setNhisContribution,
  annualRent,
  setAnnualRent,
  lifeInsurance,
  setLifeInsurance,
  isMonthly,
  setIsMonthly,
}: TaxCalculatorFormProps) {
  const [salaryInput, setSalaryInput] = useState("");
  const [nhfInput, setNhfInput] = useState("");
  const [nhisInput, setNhisInput] = useState("");
  const [rentInput, setRentInput] = useState("");
  const [insuranceInput, setInsuranceInput] = useState("");

  // Sync input fields when values change externally (e.g., from history)
  useEffect(() => {
    const displayValue = isMonthly ? grossSalary / 12 : grossSalary;
    if (displayValue > 0) {
      setSalaryInput(displayValue.toLocaleString("en-NG"));
    } else {
      setSalaryInput("");
    }
  }, [grossSalary, isMonthly]);

  useEffect(() => {
    const displayValue = isMonthly ? nhfContribution / 12 : nhfContribution;
    if (displayValue > 0) {
      setNhfInput(displayValue.toLocaleString("en-NG"));
    } else {
      setNhfInput("");
    }
  }, [nhfContribution, isMonthly]);

  useEffect(() => {
    const displayValue = isMonthly ? nhisContribution / 12 : nhisContribution;
    if (displayValue > 0) {
      setNhisInput(displayValue.toLocaleString("en-NG"));
    } else {
      setNhisInput("");
    }
  }, [nhisContribution, isMonthly]);

  useEffect(() => {
    if (annualRent > 0) {
      setRentInput(annualRent.toLocaleString("en-NG"));
    } else {
      setRentInput("");
    }
  }, [annualRent]);

  useEffect(() => {
    const displayValue = isMonthly ? lifeInsurance / 12 : lifeInsurance;
    if (displayValue > 0) {
      setInsuranceInput(displayValue.toLocaleString("en-NG"));
    } else {
      setInsuranceInput("");
    }
  }, [lifeInsurance, isMonthly]);

  const handleSalaryChange = (value: string) => {
    setSalaryInput(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    const annualValue = isMonthly ? numValue * 12 : numValue;
    setGrossSalary(annualValue);
  };

  const handleNhfChange = (value: string) => {
    setNhfInput(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    const annualValue = isMonthly ? numValue * 12 : numValue;
    setNhfContribution(annualValue);
  };

  const handleNhisChange = (value: string) => {
    setNhisInput(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    const annualValue = isMonthly ? numValue * 12 : numValue;
    setNhisContribution(annualValue);
  };

  const handleRentChange = (value: string) => {
    setRentInput(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    setAnnualRent(numValue);
  };

  const handleInsuranceChange = (value: string) => {
    setInsuranceInput(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    const annualValue = isMonthly ? numValue * 12 : numValue;
    setLifeInsurance(annualValue);
  };

  const handleToggleMode = (checked: boolean) => {
    setIsMonthly(checked);
  };

  // Calculate rent relief preview
  const rentReliefPreview = Math.min(
    annualRent * TAX_CONFIG.rentRelief.percentOfRent,
    TAX_CONFIG.rentRelief.maxAmount
  );

  return (
    <div className="space-y-8">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between pb-4 border-b border-border/50">
        <span className="text-sm text-muted-foreground">Input mode</span>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${!isMonthly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Yearly
          </span>
          <Switch
            id="mode-toggle"
            checked={isMonthly}
            onCheckedChange={handleToggleMode}
          />
          <span className={`text-sm ${isMonthly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Monthly
          </span>
        </div>
      </div>

      {/* Gross Salary - Primary input */}
      <div className="space-y-3">
        <Label htmlFor="gross-salary" className="text-sm font-medium">
          Gross {isMonthly ? "monthly" : "annual"} salary
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₦</span>
          <Input
            id="gross-salary"
            type="text"
            placeholder="0"
            value={salaryInput}
            onChange={(e) => handleSalaryChange(e.target.value)}
            className="pl-7 h-11 text-base"
          />
        </div>
        {isMonthly && grossSalary > 0 && (
          <p className="text-xs text-muted-foreground">
            = {formatNaira(grossSalary)}/year
          </p>
        )}
      </div>

      {/* Pension Rate */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="pension-rate" className="text-sm font-medium">
            Pension contribution
          </Label>
          <span className="text-sm tabular-nums text-primary font-medium">
            {(pensionRate * 100).toFixed(1)}%
          </span>
        </div>
        <Slider
          id="pension-rate"
          min={0}
          max={20}
          step={0.5}
          value={[pensionRate * 100]}
          onValueChange={([value]) => setPensionRate(value / 100)}
          className="py-2"
        />
        <p className="text-xs text-muted-foreground">
          Default: {(TAX_CONFIG.contributions.pension.defaultRate * 100)}%
        </p>
      </div>

      {/* Deductions Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Deductions</span>
          <span className="text-xs text-muted-foreground">Optional</span>
        </div>

        {/* NHF */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="nhf" className="text-sm text-muted-foreground">
              NHF {isMonthly ? "(monthly)" : "(annual)"}
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setNhfContribution(grossSalary * 0.025)}
              disabled={grossSalary <= 0}
              className="h-6 px-2 text-xs text-primary hover:text-primary"
            >
              Auto 2.5%
            </Button>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₦</span>
            <Input
              id="nhf"
              type="text"
              placeholder="0"
              value={nhfInput}
              onChange={(e) => handleNhfChange(e.target.value)}
              className="pl-7 h-10"
            />
          </div>
        </div>

        {/* NHIS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="nhis" className="text-sm text-muted-foreground">
              NHIS {isMonthly ? "(monthly)" : "(annual)"}
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setNhisContribution(grossSalary * 0.05)}
              disabled={grossSalary <= 0}
              className="h-6 px-2 text-xs text-primary hover:text-primary"
            >
              Auto 5%
            </Button>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₦</span>
            <Input
              id="nhis"
              type="text"
              placeholder="0"
              value={nhisInput}
              onChange={(e) => handleNhisChange(e.target.value)}
              className="pl-7 h-10"
            />
          </div>
        </div>

        {/* Annual Rent */}
        <div className="space-y-2">
          <Label htmlFor="annual-rent" className="text-sm text-muted-foreground">
            Annual rent paid
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₦</span>
            <Input
              id="annual-rent"
              type="text"
              placeholder="0"
              value={rentInput}
              onChange={(e) => handleRentChange(e.target.value)}
              className="pl-7 h-10"
            />
          </div>
          {annualRent > 0 && (
            <p className="text-xs text-muted-foreground">
              Relief: {formatNaira(rentReliefPreview)} (20%, max ₦500k)
            </p>
          )}
        </div>

        {/* Life Insurance */}
        <div className="space-y-2">
          <Label htmlFor="insurance" className="text-sm text-muted-foreground">
            Life insurance {isMonthly ? "(monthly)" : "(annual)"}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₦</span>
            <Input
              id="insurance"
              type="text"
              placeholder="0"
              value={insuranceInput}
              onChange={(e) => handleInsuranceChange(e.target.value)}
              className="pl-7 h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}