import React, { createContext, useState } from "react";

interface HistoryItem {
  expression: string;
  result: string;
}

interface CalculatorContextProps {
  history: HistoryItem[];
  addToHistory: (item: HistoryItem) => void;
}

export const CalculatorContext = createContext<CalculatorContextProps>({
  history: [],
  addToHistory: () => {},
});

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = (item: HistoryItem) => {
    setHistory((prev) => [item, ...prev]);
  };

  return (
    <CalculatorContext.Provider value={{ history, addToHistory }}>
      {children}
    </CalculatorContext.Provider>
  );
};
