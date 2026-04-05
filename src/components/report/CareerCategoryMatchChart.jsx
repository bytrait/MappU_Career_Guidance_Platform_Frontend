import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function CareerCategoryMatchChart({ scores, language }) {
  if (!scores) return null;

  // ✅ Clone array before sorting (avoid mutating props)
  const data = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-4xl mt-10">
      <h3 className="text-xl font-bold text-center mb-4">
        {language === "mr"
          ? "कारकीर्द श्रेणी जुळणारा चार्ट"
          : "Career Category Match Chart"}
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-30}
            textAnchor="end"
          />
          <YAxis />
          <Tooltip
            formatter={(value) =>
              `${Math.round(value * 100) / 100}%`
            }
          />
          <Bar dataKey="score" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
