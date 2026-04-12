import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import congrasIms from "../../assets/congrats.png";

export default function CongratulationsPage() {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState(null);



    const handleSubmit = async (e) => {
        navigate("/demo/report");
    };

    return (
        <div className="bg-white min-h-screen max-w-5xl flex flex-col items-center justify-center px-6 py-12 mx-auto h-[10vh]  border border-gray-50 mt-6">
            {/* 🎉 Image */}
            <img
                src={congrasIms}
                alt="Congratulations"
                className="w-32 h-32 mb-6"
            />

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Congratulations, Student!
            </h1>

            {/* Subheading */}
            <p className="text-lg text-center mb-6">
                Let’s take a look at what your Career Report says.
            </p>

            {/* Paragraphs */}
            <p className="text-center max-w-2xl mb-4">
                Congratulations on taking the first step towards a successful,
                satisfying, and meaningful career.
            </p>
            <p className="text-center max-w-2xl mb-8">
                This confidential report is based on your responses to the personality
                and career interest tests. The analysis of your responses is then used
                to find out potential career options that best suit your personality
                strengths and career interests so you can choose appropriate study
                options and career paths.
            </p>

            {/* Generate Button */}
            <div className="p-8 w-full max-w-md space-y-6">
                <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                >
                    Generate Career Report
                </button>
            </div>
        </div>
    );
}
