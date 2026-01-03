import { useState, useEffect } from "react";
import { TaxResult } from "@/lib/taxUtils";

export interface HistoryEntry {
  id: string;
  timestamp: number;
  grossSalary: number;
  pensionRate: number;
  nhfContribution: number;
  lifeInsurance: number;
  result: TaxResult;
}

const STORAGE_KEY = "ngntax-history";
const MAX_ENTRIES = 10;

export function useCalculationHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addEntry = (
    grossSalary: number,
    pensionRate: number,
    nhfContribution: number,
    lifeInsurance: number,
    result: TaxResult
  ) => {
    const newEntry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      grossSalary,
      pensionRate,
      nhfContribution,
      lifeInsurance,
      result,
    };

    setHistory((prev) => {
      const updated = [newEntry, ...prev].slice(0, MAX_ENTRIES);
      return updated;
    });
  };

  const removeEntry = (id: string) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addEntry, removeEntry, clearHistory };
}
