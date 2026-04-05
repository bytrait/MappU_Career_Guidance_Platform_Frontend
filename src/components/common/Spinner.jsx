// src/components/LoadingSpinner.jsx
import React from "react";

const Spinner = ({ size = "md", message = "Loading..." }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <div
        className={`animate-spin rounded-full border-t-transparent border-blue-500 ${sizeClasses[size]}`}
      ></div>
      {message && (
        <span className="text-gray-600 text-sm font-medium">{message}</span>
      )}
    </div>
  );
};

export default Spinner;
