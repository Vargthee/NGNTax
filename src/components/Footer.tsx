import { TAX_CONFIG } from "@/lib/taxConfig";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container px-4 py-4 sm:py-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground px-2">
            Calculations based on Nigeria Tax Act {TAX_CONFIG.financeActYear} (Effective {TAX_CONFIG.effectiveDate}).
          </p>
          <p className="text-xs text-muted-foreground px-2">
            This calculator provides estimates only. Consult a tax professional for official advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
