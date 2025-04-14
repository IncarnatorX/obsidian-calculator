import { useState } from "react";
import ScientificTab from "./Tabs/ScientificTab";
import AdvancedMathTab from "./Tabs/AdvancedMathTab";
import ConversionTab from "./Tabs/ConversionTab";
import HistoryTab from "./Tabs/HistoryTab";
import BasicTab from "./Tabs/BasicTab";
import Tabs from "./Tabs";
import CalculusTab from "./Tabs/CalculusTab";

const tabs = [
  "Basic",
  "Scientific",
  "Advanced",
  "Conversions",
  "Calculus",
  "History",
];

export const CalculatorLayout = () => {
  const [activeTab, setActiveTab] = useState("Basic");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Basic":
        return <BasicTab />;
      case "Scientific":
        return <ScientificTab />;
      case "Advanced":
        return <AdvancedMathTab />;
      case "Conversions":
        return <ConversionTab />;
      case "Calculus":
        return <CalculusTab />;
      case "History":
        return <HistoryTab />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-4 w-full max-w-3xl">
      <h1 className="text-xl font-bold my-2">Obsidian Calculator</h1>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <div className="mt-4">{renderActiveTab()}</div>
    </div>
  );
};
