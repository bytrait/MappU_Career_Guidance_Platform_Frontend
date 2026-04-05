import { useEffect, useState } from "react";
import CounsellorLayout from "../../components/counsellor/layout/CounsellorLayout";
import StatsCard from "../../components/counsellor/dashboard/StatsCard";
import QuickActions from "../../components/counsellor/dashboard/QuickActions";

import { getCreditSummary } from "../../services/billingService";
import {
  getCounsellorSchools,
  getCounsellorStudents
} from "../../services/counsellorService";
import { getCurrentUser, markWelcomeShown } from "../../services/auth";


export default function Dashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [schoolsCount, setSchoolsCount] = useState(0);
  const [availableCredits, setAvailableCredits] = useState(0);

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Existing calls (unchanged)
      const studentsRes = await getCounsellorStudents({
        page: 1,
        limit: 1
      });
      setStudentsCount(studentsRes.meta.total);

      const schoolsRes = await getCounsellorSchools();
      setSchoolsCount(schoolsRes.length);

      const creditRes = await getCreditSummary();
      setAvailableCredits(creditRes.availableCredits);

      // NEW: Fetch user state
      const userRes = await getCurrentUser();

      // NEW: Welcome condition
      if (
        userRes.role === "COUNSELLOR" &&
        !userRes.welcomeShown &&
        creditRes.availableCredits > 0
      ) {
        setShowWelcome(true);
      }

    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  const handleCloseWelcome = async () => {
    try {
      await markWelcomeShown();
      setShowWelcome(false);
    } catch (error) {
      console.error("Failed to mark welcome shown:", error);
    }
  };

  return (
    <div className="space-y-6 relative">

      <h1 className="text-2xl font-bold text-gray-800">
        Overview
      </h1>

      {/* Stats Section (UNCHANGED) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Total Students"
          value={studentsCount}
        />

        <StatsCard
          title="Schools"
          value={schoolsCount}
        />

        <StatsCard
          title="Available Credits"
          value={availableCredits}
        />
      </div>

      {/* Quick Actions (UNCHANGED) */}
      <QuickActions />

      {/* NEW: Welcome Popup */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[400px] text-center">

            <h2 className="text-xl font-bold mb-3">
              🎉 Welcome to ByTrait!
            </h2>

            <p className="mb-3 text-gray-700">
              You have received{" "}
              <span className="font-semibold">
                {availableCredits} free credits
              </span>{" "}
              to start registering students.
            </p>

            <p className="text-sm text-gray-500 mb-5">
              Each student registration consumes 1 credit.
            </p>

            <button
              onClick={handleCloseWelcome}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
            >
              Start Using Platform
            </button>

          </div>
        </div>
      )}

    </div>
  );
}