import React, { useEffect, useState } from "react";
import { fetchUserDetailsById } from "../../services/userAssessmentProgressService";

export default function OceanInstructions({ onStart }) {
   const [userDetails, setUserDetails] = useState(null);
  
     useEffect(() => {
        const getUserDetails = async () => {
          const userDetails = await fetchUserDetailsById();
          setUserDetails(userDetails);
        };
        getUserDetails();
      }, []);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-6xl mx-auto p-6 rounded-sm flex flex-col justify-center shadow z-50 bg-white">
        <h2 className="text-5xl font-bold ">
          <span className="text-gray-700">Dear</span> <span className="text-primary">{userDetails?.fullName}</span>
        </h2>
        <h3 className="text-3xl text-gray-700 font-semibold mt-4 mb-6">
          Let's start with the personality test. Please note a few points before you start.
        </h3>

        {/* <p className="text-gray-700 my-4 leading-relaxed">
          The OCEAN test helps you understand your personality based on five
          dimensions: Openness, Conscientiousness, Extraversion, Agreeableness,
          and Neuroticism.
        </p> */}

        <ul className="list-disc pl-6 text-gray-700 mb-6 leading-relaxed space-y-2 marker:text-blue-600 marker:text-2xl">
          <li>Make sure you are relaxed without any disturbance, and free of any stress while taking this test</li>
          <li>There are 50 questions</li>
          <li>You can go to previous questions if you want to change your answer</li>
          <li>There is no right or wrong answer</li>
          <li>Select the option that you feel you are most like</li>
        </ul>
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
