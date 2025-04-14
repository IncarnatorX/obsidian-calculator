import React, { useContext } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";

const HistoryTab: React.FC = () => {
  const { history } = useContext(CalculatorContext);

  return (
    <div className="space-y-3 max-h-[450px] overflow-y-auto px-2">
      {history.length === 0 ? (
        <p className="text-gray-400 text-center">No history yet.</p>
      ) : (
        history.map((entry, i) => (
          <div
            key={i}
            className="bg-zinc-800 p-3 rounded-xl shadow-inner border border-zinc-700"
          >
            <p className="text-sm text-zinc-400">{entry.expression}</p>
            <p className="text-xl text-white font-semibold">{entry.result}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryTab;
