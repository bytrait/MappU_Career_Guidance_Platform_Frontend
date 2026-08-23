import React from "react";

export default function DemoEqInstructions({ onStart }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="w-full max-w-6xl p-6 rounded-sm flex flex-col justify-center bg-white shadow z-50">
        <h2 className="text-5xl font-bold ">
          <span className="text-gray-700">Dear</span>{" "}
          <span className="text-primary">Student</span>
        </h2>
        <h3 className="text-3xl text-gray-700 font-semibold mt-4 mb-6">
          We will now move to the Emotional Intelligence profile. Please note these points before you start:
        </h3>
        <ul className="list-disc pl-6 text-gray-700 mb-6 leading-relaxed space-y-2 marker:text-blue-600 marker:text-2xl">
          <li>This demo contains only <strong>4 questions</strong> (one per area).</li>
          <li>There are no right or wrong answers.</li>
          <li>Select the option that best describes how you usually feel or act.</li>
          <li>This is a self-report profile to support growth — not a clinical diagnosis.</li>
        </ul>
        <p className="text-sm text-gray-500 italic mb-6">
          Note: The actual main test contains <strong>20 questions</strong> for a more comprehensive analysis.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-accent hover:bg-success text-white px-6 py-2 rounded-lg"
            onClick={onStart}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
