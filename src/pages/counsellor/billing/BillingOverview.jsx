import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CounsellorLayout from "../../../components/counsellor/layout/CounsellorLayout";
import CreditSummaryCard from "../../../components/counsellor/billing/CreditSummaryCard";
import PaymentTable from "../../../components/counsellor/billing/PaymentTable";
import { getCreditHistory, getCreditSummary, getPaymentHistory } from "../../../services/billingService";
import CreditHistoryPreview from "../../../components/counsellor/billing/CreditHistoryPreview";

export default function BillingOverview() {
    const navigate = useNavigate();

    const [creditSummary, setCreditSummary] = useState({
        totalCredits: 0,
        usedCredits: 0,
        availableCredits: 0
    });

    const [recentPayments, setRecentPayments] = useState([]);
    const [recentCreditHistory, setRecentCreditHistory] = useState([]);


    useEffect(() => {
        fetchBillingData();
    }, []);

    const fetchBillingData = async () => {
        try {
            const summary = await getCreditSummary();
            setCreditSummary(summary);

            const payments = await getPaymentHistory({
                page: 1,
                limit: 5
            });

            setRecentPayments(payments.data);
            const creditHistory = await getCreditHistory({
                page: 1,
                limit: 5
            });

            setRecentCreditHistory(creditHistory.data);

        } catch (error) {
            console.error("Billing fetch error:", error);
        }
    };

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    Billing
                </h1>

                <button
                    onClick={() => navigate("/counsellor/billing/buy")}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
                >
                    Buy Credits
                </button>
            </div>

            <CreditSummaryCard
                total={creditSummary.totalCredits}
                used={creditSummary.usedCredits}
                available={creditSummary.availableCredits}
            />

            {/* Payments + Credit History Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PaymentTable payments={recentPayments} />

                <CreditHistoryPreview
                    transactions={recentCreditHistory}
                />
            </div>

        </div>
    );
}
