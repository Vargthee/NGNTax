import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { TAX_CONFIG } from "@/lib/taxConfig";
import { formatNaira } from "@/lib/taxUtils";

interface TaxCalculatorFormProps {
  grossSalary: number;
  setGrossSalary: (value: number) => void;
  pensionRate: number;
  setPensionRate: (value: number) => void;
  nhfContribution: number;
  setNhfContribution: (value: number) => void;
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
  lifeInsurance,
  setLifeInsurance,
  isMonthly,
  setIsMonthly,
}: TaxCalculatorFormProps) {
  const [salaryInput, setSalaryInput] = useState("");
  const [nhfInput, setNhfInput] = useState("");
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

  const handleInsuranceChange = (value: string) => {
    setInsuranceInput(value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    const annualValue = isMonthly ? numValue * 12 : numValue;
    setLifeInsurance(annualValue);
  };

  const handleToggleMode = (checked: boolean) => {
    setIsMonthly(checked);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Income Details</CardTitle>
            <CardDescription>Enter your salary and deductions</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="mode-toggle" className="text-sm text-muted-foreground">
              Yearly
            </Label>
            <Switch
              id="mode-toggle"
              checked={isMonthly}
              onCheckedChange={handleToggleMode}
            />
            <Label htmlFor="mode-toggle" className="text-sm text-muted-foreground">
              Monthly
            </Label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gross Salary */}
        <div className="space-y-2">
          <Label htmlFor="gross-salary">
            Gross {isMonthly ? "Monthly" : "Annual"} Salary (₦)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
            <Input
              id="gross-salary"
              type="text"
              placeholder="0"
              value={salaryInput}
              onChange={(e) => handleSalaryChange(e.target.value)}
              className="pl-8"
            />
          </div>
          {isMonthly && grossSalary > 0 && (
            <p className="text-xs text-muted-foreground">
              Annual: {formatNaira(grossSalary)}
            </p>
          )}
        </div>

        {/* Pension Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="pension-rate">Pension Contribution</Label>
            <span className="text-sm font-medium text-primary">
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
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span className="text-primary">Default: {(TAX_CONFIG.contributions.pension.defaultRate * 100)}%</span>
            <span>20%</span>
          </div>
        </div>

        {/* NHF Contribution */}
        <div className="space-y-2">
          <Label htmlFor="nhf">
            NHF Contribution {isMonthly ? "(Monthly)" : "(Annual)"} - Optional
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
            <Input
              id="nhf"
              type="text"
              placeholder="0"
              value={nhfInput}
              onChange={(e) => handleNhfChange(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Life Insurance */}
        <div className="space-y-2">
          <Label htmlFor="insurance">
            Life Insurance Premium {isMonthly ? "(Monthly)" : "(Annual)"} - Optional
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
            <Input
              id="insurance"
              type="text"
              placeholder="0"
              value={insuranceInput}
              onChange={(e) => handleInsuranceChange(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
