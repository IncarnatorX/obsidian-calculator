import {
  evaluate,
  format,
  derivative,
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  log,
  log10,
  sqrt,
  factorial,
  pow,
  pi,
  e,
  exp,
  MathType,
  parse,
} from "mathjs";
import { CalcResult } from "../types/CalcResult";

export const calculateExpression = (
  input: string,
  useDegrees: boolean = true
): CalcResult => {
  try {
    const transformed = input.replace(
      /(sin|cos|tan|asin|acos|atan)\(([^()]+)\)/g,
      (_, fn: string, val: string) => {
        const num = parseFloat(val);
        const arg = useDegrees ? (num * Math.PI) / 180 : num;
        return `${fn}(${arg})`;
      }
    );

    const evaluated = evaluate(transformed);
    return { success: true, result: formatResult(evaluated) };
  } catch (err) {
    console.error("Error occurred: ", err);
    return { success: false, error: "Invalid expression" };
  }
};

export const applyScientificFn = (
  fn: string,
  rawInput: string,
  useDegrees = true
): CalcResult => {
  try {
    let num = parseFloat(rawInput || "0");

    if (
      useDegrees &&
      ["sin", "cos", "tan", "asin", "acos", "atan"].includes(fn)
    ) {
      num = (num * Math.PI) / 180;
    }

    let result: MathType;

    switch (fn) {
      case "sin":
        result = sin(num);
        break;
      case "cos":
        result = cos(num);
        break;
      case "tan":
        if (Math.abs(Math.cos(num)) < 1e-10)
          return { success: false, error: "Undefined (tan ∞)" };
        result = tan(num);
        break;
      case "asin":
        result = asin(num);
        break;
      case "acos":
        result = acos(num);
        break;
      case "atan":
        result = atan(num);
        break;
      case "log":
        if (num <= 0) return { success: false, error: "log undefined" };
        result = log10(num);
        break;
      case "ln":
        if (num <= 0) return { success: false, error: "ln undefined" };
        result = log(num);
        break;
      case "√":
        if (num < 0) return { success: false, error: "Invalid √ of negative" };
        result = sqrt(num);
        break;
      case "∛":
        result = pow(num, 1 / 3);
        break;
      case "exp":
        result = exp(num);
        break;
      case "!":
        result = factorial(num);
        break;
      case "π":
        return { success: true, result: pi.toString() };
      case "e":
        return { success: true, result: e.toString() };
      default:
        return { success: false, error: "Unknown function" };
    }

    return { success: true, result: result.toString() };
  } catch (error) {
    console.error("Error occurred: ", error);
    return { success: false, error: "Function failed" };
  }
};
// =================== Calculus ===================

export const differentiate = (expr: string, variable = "x"): CalcResult => {
  try {
    const node = parse(expr);
    const diff = derivative(node, variable).toString();
    return { success: true, result: diff };
  } catch (error) {
    console.error("Differentiation error:", error);
    return { success: false, error: "Differentiation failed" };
  }
};

export const integrate = (expr: string, a = 0, b = 1, n = 100): CalcResult => {
  try {
    const h = (b - a) / n;
    const f = (x: number) => evaluate(expr, { x });

    let result = f(a) + f(b);
    for (let i = 1; i < n; i += 2) result += 4 * f(a + i * h);
    for (let i = 2; i < n - 1; i += 2) result += 2 * f(a + i * h);

    return { success: true, result: ((h / 3) * result).toFixed(6) };
  } catch (error) {
    console.error("Integration error:", error);
    return { success: false, error: "Integration failed" };
  }
};

// =================== Sequences ===================

export const fibonacci = (n: number): CalcResult => {
  if (n < 0) return { success: false, error: "Invalid input" };
  if (n <= 1) return { success: true, result: n };
  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return { success: true, result: b };
};

// =================== Number Theory ===================

export const primeFactors = (n: number): CalcResult => {
  if (n <= 1) return { success: false, error: "Number must be > 1" };
  const factors: number[] = [];
  for (let i = 2; i <= n; i++) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }
  return { success: true, result: factors.join(" × ") };
};

export const gcd = (a: number, b: number): CalcResult => {
  console.log("GCD Called");
  const compute = (x: number, y: number): number =>
    y === 0 ? x : compute(y, x % y);
  return { success: true, result: compute(a, b) };
};

export const lcm = (a: number, b: number): CalcResult => {
  const g = gcd(a, b);
  if (!g.success) return g;
  return { success: true, result: Math.abs(a * b) / Number(g.result) };
};

export const factorialInt = (n: number): CalcResult => {
  if (n < 0) return { success: false, error: "Negative factorial" };
  const compute = (x: number): number => (x <= 1 ? 1 : x * compute(x - 1));
  return { success: true, result: compute(n) };
};

export const binomial = (n: number, r: number): CalcResult => {
  const factN = factorialInt(n);
  const factR = factorialInt(r);
  const factNR = factorialInt(n - r);
  if (!factN.success || !factR.success || !factNR.success)
    return { success: false, error: "Binomial error. N must be >= R" };

  return {
    success: true,
    result:
      Number(factN.result) / (Number(factR.result) * Number(factNR.result)),
  };
};

export const isPrime = (n: number): CalcResult => {
  if (Number.isNaN(n)) {
    return {
      success: false,
      result: "false",
      error: "No number provided. Enter a valid positive number",
    };
  }
  if (n <= 0)
    return {
      success: false,
      result: "false",
      error: "O or less than 0 can't be a prime number",
    };
  if (n <= 1)
    return { success: true, result: "1 is neither prime nor composite." };
  if (n <= 3) return { success: true, result: `${n} is Prime.` };
  if (n % 2 === 0 || n % 3 === 0)
    return { success: true, result: `${n} not is Prime.` };
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0)
      return { success: true, result: `${n} is Prime.` };
  }
  return { success: true, result: `${n} is Prime.` };
};

// =================== Conversions ===================

export const convertValue = (
  value: number,
  fromUnit: string,
  toUnit: string
): CalcResult => {
  try {
    // Temperature
    if (fromUnit === "Celsius") {
      if (toUnit === "Fahrenheit")
        return { success: true, result: ((value * 9) / 5 + 32).toFixed(2) };
      if (toUnit === "Kelvin")
        return { success: true, result: (value + 273.15).toFixed(2) };
    }
    if (fromUnit === "Fahrenheit") {
      if (toUnit === "Celsius")
        return { success: true, result: (((value - 32) * 5) / 9).toFixed(2) };
      if (toUnit === "Kelvin")
        return {
          success: true,
          result: (((value - 32) * 5) / 9 + 273.15).toFixed(2),
        };
    }
    if (fromUnit === "Kelvin") {
      if (toUnit === "Celsius")
        return { success: true, result: (value - 273.15).toFixed(2) };
      if (toUnit === "Fahrenheit")
        return {
          success: true,
          result: (((value - 273.15) * 9) / 5 + 32).toFixed(2),
        };
    }

    // Other Units
    const conversionRates: Record<string, number> = {
      Meter: 1,
      Kilometer: 1000,
      Foot: 0.3048,
      Inch: 0.0254,
      Kilogram: 1,
      Gram: 0.001,
      Pound: 0.453592,
      Ounce: 0.0283495,
      Second: 1,
      Minute: 60,
      Hour: 3600,
    };

    if (!(fromUnit in conversionRates) || !(toUnit in conversionRates)) {
      return { success: false, error: "Invalid unit" };
    }

    const result =
      (value * conversionRates[fromUnit]) / conversionRates[toUnit];
    return { success: true, result: result.toFixed(3) };
  } catch (error) {
    console.error("Conversion error:", error);
    return { success: false, error: "Conversion failed" };
  }
};

// =================== Format Helper ===================

export const formatResult = (value: MathType): string => {
  try {
    let num: number | null = null;

    if (typeof value === "number") {
      num = value;
    } else if (value && typeof value.toString === "function") {
      const parsed = parseFloat(value.toString());
      if (!isNaN(parsed)) {
        num = parsed;
      }
    }

    if (num !== null) {
      // Treat near-zero numbers as zero
      if (Math.abs(num) < 1e-12) return "0";

      // Format the number with high precision initially
      let formatted = format(num, { precision: 14 });

      // Handle scientific notation separately
      if (formatted.includes("e")) {
        formatted = num.toFixed(14).replace(/\.?0+$/, ""); // Remove unnecessary trailing zeros
      }

      // Add commas for better readability
      if (!formatted.includes(".")) {
        // If integer, add commas
        formatted = parseInt(formatted, 10).toLocaleString();
      } else {
        // If decimal, add commas only to integer part
        const parts = formatted.split(".");
        parts[0] = parseInt(parts[0], 10).toLocaleString();

        // Limit decimal digits to 6 places if too long
        if (parts[1].length > 6) {
          parts[1] = parts[1].substring(0, 6);
        }

        formatted = parts.join(".");
      }

      // Finally strip any trailing '.0' or '.0000...'
      return formatted.replace(/\.0+$/, "");
    }

    // If the value could not be parsed
    return "Invalid result";
  } catch (err) {
    console.error("formatResult error:", err);
    return "Formatting error";
  }
};
