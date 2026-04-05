import { useEffect, useState } from "react";
import { fetchUserDetailsById } from "../../services/userAssessmentProgressService";

export default function AptitudeInstructions({ onStart }) {
 
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="w-full max-w-6xl p-6 rounded-sm flex flex-col justify-center bg-white  shadow z-50">
        <h2 className="text-5xl font-bold ">
          <span className="text-gray-700">Dear</span> <span className="text-blue-700">Student</span>
        </h2>
        <h3 className="text-3xl text-gray-700 font-semibold mt-4 mb-6">
          We will now move to the Aptitude Test. Please note these points before you start
        </h3>
        <ul className="list-disc pl-6 text-gray-700 mb-6 leading-relaxed space-y-2 marker:text-blue-600 marker:text-2xl">
          <li>There are 50 questions.</li>
          <li>
            This test contains multiple-choice questions with one correct answer each.
          </li>
          <li>
            Questions are from categories like Quantitative, Logical Reasoning, and Verbal Ability.
          </li>
          <li>          Each correct answer gives you <strong>1 point</strong>.
          </li>
          <li>          Please answer all questions carefully. You cannot change your answers after submission.
          </li>
        </ul>
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
