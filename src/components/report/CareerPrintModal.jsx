// src/components/print/CareerPrintModal.jsx
import React from "react";

export default function CareerPrintModal({
  careers = [],
  selectedCareerIds = [],
  onToggle,
  onClose,
  onPrint,
  language = "en",
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl">
        
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {language === "mr" ? "प्रिंटसाठी करिअर निवडा" : "Select Careers to Print"}
        </h2>

        <p className="text-gray-600 mb-4">
          {language === "mr"
            ? "मुख्य अहवाल छापला जाईल. खालीलपैकी तुम्ही कोणती करिअर माहिती छापायची ते निवडा."
            : "The main report will be printed. Select which career details you want to include."}
        </p>

        {/* List */}
        <div className="max-h-64 overflow-y-auto border rounded-md p-3 space-y-3">
          {careers.map((career) => (
            <label
              key={career.id}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCareerIds.includes(career.id)}
                onChange={() => onToggle(career.id)}
              />
              <span className="text-gray-800">{career.title?.value}</span>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700"
          >
            {language === "mr" ? "रद्द करा" : "Cancel"}
          </button>

          <button
            onClick={onPrint}
            className="px-4 py-2 bg-blue-600 rounded-md text-white"
          >
            {language === "mr" ? "प्रिंट करा" : "Print Selected"}
          </button>
        </div>
      </div>
    </div>
  );
}
