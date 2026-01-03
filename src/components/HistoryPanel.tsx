import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryEntry } from "@/hooks/useCalculationHistory";
import { formatNaira } from "@/lib/taxUtils";
import { History, Trash2, RotateCcw } from "lucide-react";

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
    <Card className="no-print">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5 text-primary" />
            History
          </CardTitle>
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearHistory}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No calculations yet. Your history will appear here.
          </p>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="group flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50 transition-colors"
                >
                  <button
                    onClick={() => onLoadEntry(entry)}
                    className="flex-1 text-left"
                  >
                    <p className="text-sm font-medium">
                      {formatNaira(entry.grossSalary)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tax: {formatNaira(entry.result.annualTax)} • {formatDate(entry.timestamp)}
                    </p>
                  </button>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onLoadEntry(entry)}
                      title="Load this calculation"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onRemoveEntry(entry.id)}
                      title="Remove from history"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
