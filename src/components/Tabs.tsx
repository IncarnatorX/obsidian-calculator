import React from "react";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="w-full flex justify-center mb-4 border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-6 py-2 text-sm font-medium tracking-wide transition-colors duration-200 border-b-2 cursor-pointer ${
            activeTab === tab
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
