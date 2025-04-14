import React, { useState, useContext } from "react";
import { convertValue } from "../../utils/calculatorEngine";
import { CalculatorContext } from "../../context/CalculatorContext";
import Display from "../Display";

const units = {
  Length: ["Meter", "Kilometer", "Foot", "Inch"],
  Weight: ["Kilogram", "Gram", "Pound", "Ounce"],
  Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  Time: ["Second", "Minute", "Hour"],
};

const ConversionTab: React.FC = () => {
  const [category, setCategory] = useState<keyof typeof units>("Length");
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Meter");
  const [toUnit, setToUnit] = useState("Kilometer");
  const [result, setResult] = useState("0");
  const { addToHistory } = useContext(CalculatorContext);

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    const converted = convertValue(value, fromUnit, toUnit);
    if (!converted.success) {
      setResult("Conversion error");
      return;
    }
    setResult(converted.result?.toString() || "Conversion error");

    addToHistory({
      expression: `${value} ${fromUnit} to ${toUnit}`,
      result: converted.result?.toString() || "Conversion error",
    });
  };

  return (
    <div className="space-y-4">
      <Display value={result} />

      <select
        className="w-full rounded-xl px-3 py-2 bg-zinc-800 text-white"
        value={category}
        onChange={(e) => {
          const newCat = e.target.value as keyof typeof units;
          setCategory(newCat);
          setFromUnit(units[newCat][0]);
          setToUnit(units[newCat][1]);
        }}
      >
        {Object.keys(units).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Enter value"
        className="w-full rounded-xl px-3 py-2 bg-zinc-800 text-white"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3">
        <select
          className="rounded-xl px-3 py-2 bg-zinc-800 text-white"
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
        >
          {units[category].map((unit) => (
            <option key={unit}>{unit}</option>
          ))}
        </select>
        <select
          className="rounded-xl px-3 py-2 bg-zinc-800 text-white"
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
        >
          {units[category].map((unit) => (
            <option key={unit}>{unit}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleConvert}
        className="w-full py-2 rounded-xl bg-purple-700 text-white hover:bg-purple-600 transition-all"
      >
        Convert
      </button>
    </div>
  );
};

export default ConversionTab;
