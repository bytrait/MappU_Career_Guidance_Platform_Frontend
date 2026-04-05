import React from "react";

export default function DemoOceanInstructions({ onStart }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-6xl mx-auto p-6 rounded-sm flex flex-col justify-center shadow z-50 bg-white">

        {/* Heading */}
        <h2 className="text-5xl font-bold ">
          <span className="text-gray-700">Dear</span>{" "}
          <span className="text-blue-700">Student</span>
        </h2>

        <h3 className="text-3xl text-gray-700 font-semibold mt-4 mb-6">
          Let's begin with the personality test. Please read a few quick points before you start.
        </h3>

        {/* Description */}
        <p className="text-gray-700 my-4 leading-relaxed">
          The OCEAN test helps you understand your personality across five important traits:
          Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
        </p>

        {/* Bullet Points */}
        <ul className="list-disc pl-6 text-gray-700 mb-6 leading-relaxed space-y-2 marker:text-blue-600 marker:text-2xl">
          <li>Please sit comfortably in a quiet place.</li>
          <li>This demo test contains only <strong>10 questions</strong>.</li>
          <li>You can go back and change your answers anytime.</li>
          <li>There are no right or wrong answers.</li>
          <li>Select the option that best describes you.</li>
        </ul>

        {/* Start Button */}
        <div className="flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            onClick={onStart}
          >
            Start Test
          </button>
        </div>

      </div>
    </div>
  );
}
