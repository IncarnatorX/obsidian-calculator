import React from "react";

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => (
  <div className="bg-gray-700 text-white text-2xl rounded-xl p-4 min-h-[60px] text-right font-mono">
    {value}
  </div>
);

export default Display;
