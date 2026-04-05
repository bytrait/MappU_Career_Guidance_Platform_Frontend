import { useEffect, useState } from "react";
import { fetchUserDetailsById } from "../../services/userAssessmentProgressService";

export default function InterestInstructions({ onStart }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="w-full max-w-6xl p-6 rounded-sm flex flex-col justify-center bg-white shadow z-50">
        <h2 className="text-5xl font-bold ">
          <span className="text-gray-700">Dear</span> <span className="text-blue-700">Student</span>
        </h2>
        <h3 className="text-3xl text-gray-700 font-semibold mt-4 mb-6">
          We will now move to the career interest test. Please note these points before you start
        </h3>
        <ul className="list-disc pl-6 text-gray-700 mb-6 leading-relaxed space-y-2 marker:text-blue-600 marker:text-2xl">
          <li>There are 30 questions.</li>
          <li>There are no right or wrong answers.</li>
          <li>
            This test will help you find out what your interests are and how they relate to the world of work.
          </li>
          <li>
            <span className="font-semibold">Most important –</span> as you answer the questions, try <span className="underline">NOT</span> to think about:
            <ul className="list-disc pl-8 mt-2 space-y-1">
              <li>If you have enough education or training to do the work, or</li>
              <li>How much money you would make by doing the work</li>
            </ul>
          </li>
          <li>Just think about if you would like or dislike doing the work.</li>
          <li>Please take your time answering the questions. You can change your answers any time.</li>
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
