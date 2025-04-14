import React, { useState, useContext } from "react";
import {
  fibonacci,
  primeFactors,
  gcd,
  lcm,
  binomial,
  isPrime,
  formatResult,
} from "../../utils/calculatorEngine";

import { CalculatorContext } from "../../context/CalculatorContext";
import Display from "../Display";
import Button from "../Button";
import { CalcResult } from "../../types/CalcResult";

const actions: string[] = [
  "Fibonacci",
  "Is Prime?",
  "Prime Factors",
  "GCD",
  "LCM",
  "nCr",
];

const AdvancedMathTab: React.FC = () => {
  const [input, setInput] = useState("");
  const [secondaryInput, setSecondaryInput] = useState("");
  const [result, setResult] = useState("0");
  const { addToHistory } = useContext(CalculatorContext);

  function checkSecondaryInput(): boolean {
    if (!input || !secondaryInput) {
      setResult("Two inputs required");
      return false;
    }
    return true;
  }

  function clearInputs(): void {
    setInput("");
    setSecondaryInput("");
  }

  const handleClick = (label: string) => {
    const a: number = parseInt(input);
    const b: number = parseInt(secondaryInput);
    let calc: CalcResult = { success: false, error: "Unknown error" };

    switch (label) {
      case "Fibonacci":
        calc = fibonacci(a);
        break;
      case "Is Prime?":
        calc = isPrime(a);
        break;
      case "Prime Factors":
        calc = primeFactors(a);
        break;
      case "GCD":
        if (!checkSecondaryInput()) return;
        calc = gcd(a, b);
        break;
      case "LCM":
        if (!checkSecondaryInput()) return;
        calc = lcm(a, b);
        break;
      case "nCr":
        if (!checkSecondaryInput()) return;
        calc = binomial(a, b);
        break;
    }

    let display = "";
    if (calc.success) {
      display =
        typeof calc.result === "number"
          ? formatResult(calc.result)
          : typeof calc.result === "string"
          ? calc.result
          : "Invalid result";
    } else {
      display = calc.error || "Error";
    }

    setResult(display);

    addToHistory({
      expression: `${label}(${a}${b ? `, ${b}` : ""})`,
      result: display,
    });

    clearInputs();
  };

  return (
    <div className="space-y-4">
      <Display value={result} />
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          placeholder="Input A"
          className="rounded-xl px-3 py-2 bg-zinc-800 text-white focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="number"
          placeholder="Input B (if needed)"
          className="rounded-xl px-3 py-2 bg-zinc-800 text-white focus:outline-none"
          value={secondaryInput}
          onChange={(e) => setSecondaryInput(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, i) => (
          <Button key={i} value={action} onClick={() => handleClick(action)} />
        ))}
      </div>
    </div>
  );
};

export default AdvancedMathTab;
