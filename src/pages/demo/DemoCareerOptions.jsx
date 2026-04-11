import React, { useMemo, useState, useEffect } from "react";

import {
    demoCareerFields,
} from "../../data/demoCareerOptions";

import { demoCareerBaseInfo } from "../../data/demoCareerBaseInfo";

import CareerMatchChart from "../../components/report/CareerMatchChart";
import { useNavigate } from "react-router-dom";

export default function DemoCareerOptions({ language = "en", careersData }) {
    const careers = useMemo(() => {
        return careersData?.recommendations?.professional || [];
    }, [careersData]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const dummyUserScores = { R: 28, I: 28, A: 24, S: 25, E: 22, C: 26 };

    useEffect(() => {
        if (careersData) setLoading(false);
    }, [careersData]);

    const chartData = useMemo(() => {
        const careers = careersData?.recommendations?.professional || [];

        const uniqueCategories = [...new Set(careers.map(c => c.category))];

        // Sort categories (optional but keeps UI consistent)
        uniqueCategories.sort();

        const max = 95;
        const min = 80;

        const step = uniqueCategories.length > 1
            ? (max - min) / (uniqueCategories.length - 1)
            : 0;

        return uniqueCategories.map((category, index) => ({
            name: category,
            value: Math.round(max - index * step),
        }));
    }, [careersData]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-7xl w-full text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                    {language === "mr" ? "करिअर पर्याय" : "Career Options"}
                </h2>
            </div>

            {loading ? (
                <div className="py-10 text-gray-500">Loading...</div>
            ) : (
                <>
                    <div className="w-full max-w-7xl mt-10">
                        <CareerMatchChart chartData={chartData} language={language} />
                    </div>

                    <div className="max-w-7xl w-full mt-10 space-y-10">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            {language === "mr" ? "व्यावसायिक करिअर" : "Recommended Professional Careers"}
                        </h2>
                        {/* Professional Careers */}
                        {/* {careers.some((career) => career.careerType === "professional") && (
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    {language === "mr" ? "व्यावसायिक करिअर" : "Recommended Professional Careers"}
                                </h2>
                                {careers.length > 0 && (
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                                            {language === "mr" ? "व्यावसायिक करिअर" : "Recommended Professional Careers"}
                                        </h2> */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                            {careers.map((career) => (
                                <div
                                    key={career.id}
                                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                                >
                                    <h3 className="text-primary text-xl font-semibold mb-2">
                                        {career.title?.value}
                                    </h3>

                                    <p className="text-muted text-sm mb-5">
                                        {career.description?.value.substring(0, 200)}...
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() => navigate(`/demo/career/${career.id}`)}
                                            className="bg-accent text-white px-4 py-2 rounded-lg text-sm hover:bg-success"
                                        >
                                            {language === "mr" ? "मार्ग पहा" : "Show Path"}
                                        </button>

                                        <span className="bg-blue-50 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                            {Math.round(career.similarity)}%{" "}
                                            {language === "mr" ? "जुळणारे" : "match"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* </div> */}
                        {/* )}
                            </div>
                        )} */}

                        {/* Vocational Careers */}
                        {/* {careers.some((career) => career.careerType === "vocational") && (
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    {language === "mr" ? "व्यावसायिक प्रशिक्षण करिअर" : "Recommended Vocational Careers"}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                                    {careers
                                        .filter((career) => career.careerType === "vocational")
                                        .map((career) => (
                                            <div
                                                key={career.id}
                                                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                                            >
                                                <h3 className=" text-xl font-semibold mb-2">
                                                    {career.title[language]}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-5">
                                                    {career.description[language]}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <button
                                                        onClick={() => navigate(`/demo/career/${career.id}`)}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                                                    >
                                                        {language === "mr" ? "मार्ग पहा" : "Show Path"}
                                                    </button>
                                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                        {career.similarity}% {language === "mr" ? "जुळणारे" : "match"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )} */}
                    </div>
                </>
            )}
        </div>
    );
}
