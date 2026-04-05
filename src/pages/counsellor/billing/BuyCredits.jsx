import CounsellorLayout from "../../../components/counsellor/layout/CounsellorLayout";
import BuyCreditsCard from "../../../components/counsellor/billing/BuyCreditsCard";

export default function BuyCredits() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
                Purchase Credits
            </h1>

            <BuyCreditsCard />
        </div>
    );
}
