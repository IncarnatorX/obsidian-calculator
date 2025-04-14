import React, { useState, useContext } from "react";
import { differentiate, integrate } from "../../utils/calculatorEngine";
import { CalculatorContext } from "../../context/CalculatorContext";
import Display from "../Display";
import { CalcResult } from "../../types/CalcResult";

const allowedVariables: string[] = ["x", "y"];

const CalculusTab: React.FC = () => {
  const { addToHistory } = useContext(CalculatorContext);

  const [expression, setExpression] = useState("");
  const [variable, setVariable] = useState("x");

  const [lowerLimit, setLowerLimit] = useState("0");
  const [upperLimit, setUpperLimit] = useState("1");

  const [result, setResult] = useState("0");

  const handleDifferentiation = () => {
    if (!allowedVariables.includes(variable.toLowerCase())) {
      alert("Only variables 'x' or 'y' are allowed for differentiation.");
      return;
    }

    const res: CalcResult = differentiate(expression, variable);
    if (res.success) {
      setResult(res.result !== undefined ? String(res.result) : "0");
    } else {
      setResult(res.error ?? "Differentiation failed");
    }
    addToHistory({
      expression: `d/d${variable} (${expression})`,
      result: String(res.result ?? res.error ?? "Differentiation failed"),
    });
  };

  const handleIntegration = () => {
    const a = parseFloat(lowerLimit);
    const b = parseFloat(upperLimit);

    const res = integrate(expression, a, b);

    setResult(
      res.result !== undefined
        ? String(res.result)
        : res.error ?? "Integration failed"
    );

    addToHistory({
      expression: `∫[${a},${b}] (${expression}) dx`,
      result: String(res.result ?? res.error ?? "Error"),
    });
  };

  return (
    <div className="space-y-4">
      <Display value={result} />

      <input
        type="text"
        placeholder="Enter expression (e.g. x^2 + 3x)"
        className="w-full rounded-xl px-3 py-2 bg-zinc-800 text-white"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-white">Differentiate w.r.t</label>
          <input
            type="text"
            placeholder="x"
            className="rounded-xl px-3 py-2 bg-zinc-800 text-white"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
          />
        </div>
        <button
          onClick={handleDifferentiation}
          className="rounded-xl bg-blue-700 hover:bg-blue-600 text-white py-2 cursor-pointer"
        >
          Differentiate
        </button>
      </div>

      <hr className="border-zinc-700 my-4" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-white text-sm block mb-1">Lower Limit</label>
          <input
            type="number"
            placeholder="e.g. 0"
            className="w-full rounded-xl px-3 py-2 bg-zinc-800 text-white"
            value={lowerLimit}
            onChange={(e) => setLowerLimit(e.target.value)}
          />
        </div>
        <div>
          <label className="text-white text-sm block mb-1">Upper Limit</label>
          <input
            type="number"
            placeholder="e.g. 1"
            className="w-full rounded-xl px-3 py-2 bg-zinc-800 text-white"
            value={upperLimit}
            onChange={(e) => setUpperLimit(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleIntegration}
        className="w-full rounded-xl bg-purple-700 hover:bg-purple-600 text-white py-2 cursor-pointer"
      >
        Integrate
      </button>

      <div className="text-sm text-zinc-400 mt-6 space-y-2">
        <p className="font-semibold text-white">ℹ️ Instructions:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Use only <strong>x</strong> or <strong>y</strong> as variables for
            differentiation/integration.
          </li>
          <li>
            For differentiation: example input — <code>x^2 + 3x + 1</code>
          </li>
          <li>For integration: provide valid lower and upper limits.</li>
          <li>
            Use <code>^</code> for exponentiation and parentheses where needed.
          </li>
          <li>
            If the result shows "undefined" or "NaN", check for missing
            variable, brackets, or limits.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CalculusTab;
