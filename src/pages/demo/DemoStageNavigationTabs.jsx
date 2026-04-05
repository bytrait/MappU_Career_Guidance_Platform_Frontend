    import React from "react";

export default function DemoStageNavigationTabs({
  steps,
  selectedIndex,
  onSelect,
  language = "en",
}) {
  return (
    <div className="flex overflow-x-auto border-b mb-6">
      {steps.map((s, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`px-4 py-3 whitespace-nowrap border-b-2 ${
            idx === selectedIndex
              ? "border-blue-600 text-blue-600 font-semibold"
              : "border-transparent text-gray-600"
          }`}
        >
          {s.title?.[language]}
        </button>
      ))}
    </div>
  );
}
