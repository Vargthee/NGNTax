import { Button } from "@/components/ui/button";
import { TaxResult } from "@/lib/taxUtils";
import { Printer } from "lucide-react";

interface ExportButtonsProps {
  result: TaxResult;
  grossSalary: number;
  pensionRate: number;
}

export function ExportButtons({ result, grossSalary, pensionRate }: ExportButtonsProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex gap-2 no-print">
      <Button
        variant="outline"
        onClick={handlePrint}
        className="w-full"
        aria-label="Print tax calculation"
      >
        <Printer className="h-4 w-4 mr-2" />
        Print
      </Button>
    </div>
  );
}
