import { useEffect, useState } from "react";
import CounsellorLayout from "../../../components/counsellor/layout/CounsellorLayout";
import PaymentHistoryTable from "../../../components/counsellor/billing/PaymentHistoryTable";
import { getPaymentHistory } from "../../../services/billingService";

export default function PaymentHistory() {
    const [payments, setPayments] = useState([]);
    const [meta, setMeta] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchPayments(page);
    }, [page]);

    const fetchPayments = async (pageNumber) => {
        try {
            const res = await getPaymentHistory({
                page: pageNumber,
                limit: 10
            });

            setPayments(res.data);
            setMeta(res.meta);

        } catch (error) {
            console.error("Payment history error:", error);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
                Payment History
            </h1>

            <PaymentHistoryTable
                payments={payments}
                meta={meta}
                onPageChange={setPage}
            />
        </div>
    );
}
