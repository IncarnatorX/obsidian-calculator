import React, { useState } from "react";
import BasicTab from "./Tabs/BasicTab";
import ScientificTab from "./Tabs/ScientificTab";
import AdvancedMathTab from "./Tabs/AdvancedMathTab";
import ConversionTab from "./Tabs/ConversionTab";
import HistoryTab from "./Tabs/HistoryTab";
import CalcToolsTab from "./Tabs/CalculusTab";

const tabs = [
  "Basic",
  "Scientific",
  "Advanced",
  "Convert",
  "CalcTools",
  "History",
] as const;

type Tab = (typeof tabs)[number];

const Calculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Basic");
  console.log("Calculator.tsx");

  const renderTab = () => {
    switch (activeTab) {
      case "Basic":
        return <BasicTab />;
      case "Scientific":
        return <ScientificTab />;
      case "Advanced":
        return <AdvancedMathTab />;
      case "Convert":
        return <ConversionTab />;
      case "CalcTools":
        return <CalcToolsTab />;
      case "History":
        return <HistoryTab />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-4">
      <div className="flex justify-between rounded-xl overflow-hidden bg-zinc-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? "bg-purple-700 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {renderTab()}
    </div>
  );
};

export default Calculator;
