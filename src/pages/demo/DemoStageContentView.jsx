import React from "react";

export default function DemoStageContentView({ step, language = "en" }) {
  if (!step) return null;

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        {step.title?.[language]}
      </h2>

      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: step.note?.[language] }}
      />
    </div>
  );
}
