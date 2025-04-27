import { useState, useContext } from "react";
import { calculateExpression } from "../../utils/calculatorEngine";
import { CalculatorContext } from "../../context/CalculatorContext";
import Display from "../Display";
import Button from "../Button";

const buttonLayout = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "DEL", "+"],
  ["(", ")", "Clear", "="],
];

const BasicTab = () => {
  const [input, setInput] = useState("");
  const { addToHistory } = useContext(CalculatorContext);

  const handleClick = (value: string) => {
    if (value === "Clear") {
      setInput("");
    } else if (value === "DEL") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      const calcResult = calculateExpression(input);

      if (calcResult.success) {
        const resultStr = String(calcResult.result);
        addToHistory({ expression: input, result: resultStr });
        setInput(resultStr);
      } else {
        setInput(String(calcResult.error));
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div className="space-y-4">
      <Display value={input || "0"} />
      <div className="grid grid-cols-4 gap-3">
        {buttonLayout.flat().map((btn, i) => (
          <Button key={i} value={btn} onClick={() => handleClick(btn)} />
        ))}
      </div>
    </div>
  );
};

export default BasicTab;
