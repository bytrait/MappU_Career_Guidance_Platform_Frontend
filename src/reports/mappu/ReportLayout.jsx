// reports/default/ReportLayout.jsx
import PersonalityStrengths from "../../components/report/PersonalityStrengths";
import CareerInterests from "../../components/report/CareerInterests";
import AptitudeChart from "../../components/report/AptitudeChart";
import CareerOptions from "../../components/report/CareerOptions";
import Spinner from "../../components/common/Spinner";

export default function ReportLayout({
  scores,
  language,
  economicStatus,
  recommendedCareers,
  isLoading,
  dispatch,
}) {
  return (
    <div className="max-w-7xl mx-auto px-2 space-y-16">
      <PersonalityStrengths scores={scores} language={language} />
      <CareerInterests scores={scores} language={language} />
      <AptitudeChart scores={scores} language={language} />

      <section className="mb-16">
        {isLoading ? (
          <Spinner />
        ) : (
          <CareerOptions
            scores={scores}
            careers={recommendedCareers}
            economicStatus={economicStatus}
            language={language}
            onSelectCareer={(career) => dispatch(setSelectedCareer(career))} // Dispatch the action
          />
        )}
      </section>
    </div>
  );
}