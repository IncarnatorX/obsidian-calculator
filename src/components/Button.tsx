import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  value: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ value, onClick, className }) => {
  const baseStyle = `text-white rounded-xl font-semibold transition duration-200 shadow-md active:scale-95 cursor-pointer
  ${className ?? "text-lg py-3"}`;

  const getButtonColor = () => {
    switch (value) {
      case "DEL":
        return "bg-red-600 hover:bg-red-700";
      case "Clear":
        return "bg-yellow-500 hover:bg-yellow-600 text-black";
      case "=":
        return "bg-blue-600 hover:bg-blue-700";
      default:
        return "bg-gray-600 hover:bg-gray-700";
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`${baseStyle} ${getButtonColor()}`}
    >
      {value}
    </motion.button>
  );
};

export default Button;
