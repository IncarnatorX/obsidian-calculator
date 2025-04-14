import { CalculatorLayout } from "./components/CalculatorLayout";
import { CalculatorProvider } from "./context/CalculatorContext";

const App = () => {
  return (
    <div className="text-white min-h-screen flex items-center justify-center p-4">
      <CalculatorProvider>
        <CalculatorLayout />
      </CalculatorProvider>
    </div>
  );
};

export default App;
