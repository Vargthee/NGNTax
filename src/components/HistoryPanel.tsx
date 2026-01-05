import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryEntry } from "@/hooks/useCalculationHistory";
import { formatNaira } from "@/lib/taxUtils";
import { Trash2 } from "lucide-react";

interface HistoryPanelProps {
  history: HistoryEntry[];
  onLoadEntry: (entry: HistoryEntry) => void;
  onRemoveEntry: (id: string) => void;
  onClearHistory: () => void;
}

export function HistoryPanel({
  history,
  onLoadEntry,
  onRemoveEntry,
  onClearHistory,
}: HistoryPanelProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-NG", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-lg border border-border/50 bg-card p-5 no-print">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">History</h3>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
          >
            Clear all
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-6">
          No saved calculations yet
        </p>
      ) : (
        <ScrollArea className="h-[240px]">
          <div className="space-y-1">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="group flex items-center justify-between rounded-md px-3 py-2.5 hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => onLoadEntry(entry)}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium tabular-nums truncate">
                    {formatNaira(entry.grossSalary)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tax: {formatNaira(entry.result.annualTax)} · {formatDate(entry.timestamp)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveEntry(entry.id);
                  }}
                  title="Remove"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}