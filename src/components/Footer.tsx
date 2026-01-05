import { TAX_CONFIG } from "@/lib/taxConfig";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-auto py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
            Based on Nigeria Tax Act {TAX_CONFIG.financeActYear} (Effective {TAX_CONFIG.effectiveDate}). 
            This calculator provides estimates only—consult a tax professional for official advice.
          </p>
          <p className="text-xs text-muted-foreground/70">
            Verified by {TAX_CONFIG.verifiedBy}
          </p>
        </div>
      </div>
    </footer>
  );
}