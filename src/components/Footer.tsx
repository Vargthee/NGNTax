import { TAX_CONFIG } from "@/lib/taxConfig";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container px-4 py-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>
              Calculations based on Nigeria Tax Act {TAX_CONFIG.financeActYear} (Effective {TAX_CONFIG.effectiveDate}). Verified by {TAX_CONFIG.verifiedBy}.
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            This calculator provides estimates only. Consult a tax professional for official advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
