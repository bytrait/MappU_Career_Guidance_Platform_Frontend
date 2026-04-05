import { useEffect, useState } from "react";
import CounsellorLayout from "../../../components/counsellor/layout/CounsellorLayout";
import CreditLedgerTable from "../../../components/counsellor/billing/CreditLedgerTable";
import { getCreditHistory } from "../../../services/billingService";

export default function CreditLedger() {
  const [transactions, setTransactions] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchTransactions(page, filter);
  }, [page, filter]);

  const fetchTransactions = async (pageNumber, type) => {
    try {
      const res = await getCreditHistory({
        page: pageNumber,
        limit: 10,
        type
      });

      setTransactions(res.data);
      setMeta(res.meta);

    } catch (error) {
      console.error("Ledger fetch error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Credit Ledger
      </h1>

      <CreditLedgerTable
        transactions={transactions}
        meta={meta}
        onPageChange={setPage}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}
