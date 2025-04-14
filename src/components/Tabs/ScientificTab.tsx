import React, { useContext, useState } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import { calculateExpression } from "../../utils/calculatorEngine";
import Button from "../Button";
import Display from "../Display";
import { scientificButtons } from "../buttons";

const ScientificTab: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [useDegrees, setUseDegrees] = useState<boolean>(true);
  const { addToHistory } = useContext(CalculatorContext);

  const handleButtonClick = (btn: string): void => {
    if (/^[0-9.+\-*/]$/.test(btn)) {
      setInput((prev) => prev + btn);
      return;
    }

    if (btn === "(" || btn === ")") {
      setInput((prev) => prev + btn);
      return;
    }

    switch (btn) {
      case "=": {
        const result = calculateExpression(input, useDegrees);
        if (result.success && result.result) {
          addToHistory({ expression: input, result: result.result.toString() });
          setInput(result.result.toString());
        } else {
          setInput(result.error || "Error");
        }
        break;
      }
      case "Clear":
        setInput("");
        break;
      case "DEL":
        setInput((prev) => prev.slice(0, -1));
        break;
      case "π":
        setInput((prev) => prev + Math.PI.toString());
        break;
      case "e":
        setInput((prev) => prev + Math.E.toString());
        break;
      default: {
        const isScientificFn: boolean = [
          "sin",
          "cos",
          "tan",
          "asin",
          "acos",
          "atan",
          "log",
          "ln",
          "√",
          "∛",
          "exp",
          "!",
        ].includes(btn);

        if (isScientificFn) {
          setInput((prev) => prev + `${btn}(`);
        }
        break;
      }
    }
  };

  const toggleDegrees = (): void => {
    setUseDegrees((prev) => !prev);
  };

  return (
    <div className="p-4">
      <Display value={input || "0"} />

      <div className="flex items-center justify-between gap-4 my-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white">Angle:</span>
          <button
            onClick={toggleDegrees}
            className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm cursor-pointer"
          >
            {useDegrees ? "Degrees" : "Radians"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {scientificButtons.map((btn: string, index: number) => (
          <Button
            key={index}
            value={btn}
            onClick={() => handleButtonClick(btn)}
            className={`text-sm py-2 px-2 ${
              btn === "=" ? "bg-green-600 hover:bg-green-700" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ScientificTab;
