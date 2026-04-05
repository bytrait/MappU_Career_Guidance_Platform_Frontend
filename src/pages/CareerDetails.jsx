import React, { useEffect, useState } from "react";
import { fetchCareerDetails } from "../services/careerService";
import { useParams } from "react-router-dom";
import StepCard from "../components/career/StepCard";

const CareerDetails = () => {
    const { id } = useParams();
    const [career, setCareer] = useState(null);

    useEffect(() => {
        loadCareer();
    }, [id]);

    const loadCareer = async () => {
        const data = await fetchCareerDetails(id);
        setCareer(data);
    };

    if (!career)
        return (
            <div className="flex items-center justify-center h-40 text-gray-500">
                Loading...
            </div>
        );

    const en = career.translations.find((t) => t.language === "en");
    const mr = career.translations.find((t) => t.language === "mr");
    console.log("Career details loaded:", en,mr);

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Career Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* English */}
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-900">{en?.title}</h2>
                    <p className="mt-2 text-gray-700">{en?.description}</p>

                    <h3 className="mt-6 text-lg font-medium text-gray-800">Base Info</h3>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        <li>
                            <span className="font-medium text-gray-700">Min Cost:</span>{" "}
                            {career.base_info.min_cost}
                        </li>
                        <li>
                            <span className="font-medium text-gray-700">Avg Cost:</span>{" "}
                            {career.base_info.avg_cost}
                        </li>
                        <li>
                            <span className="font-medium text-gray-700">High Cost:</span>{" "}
                            {career.base_info.high_cost}
                        </li>
                        <li>
                            <span className="font-medium text-gray-700">Avg Salary:</span>{" "}
                            {career.base_info.avg_salary}
                        </li>
                    </ul>
                </div>

                {/* Marathi */}
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-900">{mr?.title}</h2>
                    <p className="mt-2 text-gray-700">{mr?.description}</p>

                    <h3 className="mt-6 text-lg font-medium text-gray-800">मूलभूत माहिती</h3>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        <li>
                            <span className="font-medium text-gray-700">किमान खर्च:</span>{" "}
                            {career.base_info.min_cost}
                        </li>
                        <li>
                            <span className="font-medium text-gray-700">सरासरी खर्च:</span>{" "}
                            {career.base_info.avg_cost}
                        </li>
                        <li>
                            <span className="font-medium text-gray-700">जास्तीत जास्त खर्च:</span>{" "}
                            {career.base_info.high_cost}
                        </li>
                        <li>
                            <span className="font-medium text-gray-700">सरासरी पगार:</span>{" "}
                            {career.base_info.avg_salary}
                        </li>
                    </ul>
                </div>
            </div>

            <h3 className="mt-8 text-xl font-semibold text-gray-900">Steps (English / Marathi)</h3>

            <div className="mt-4 space-y-4">
                {career.steps.map((step) => (
                    <div key={step.id}>
                        <StepCard step={step} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CareerDetails;
