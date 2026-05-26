import PrintCoverPage from "../../components/report/PrintCoverPage"; // Import the component
import ReportOverviewPage from "../../components/report/ReportOverviewPage";
import PrintDocument from "../../components/report/PrintDocument";

export default function PrintLayout({
  userDetails,
  language,
  scores,
  recommendedCareers,
  selectedCareerIds,
}) {
  return (
    <>
      <PrintCoverPage userDetails={userDetails} language={language} />
      <ReportOverviewPage />
      <PrintDocument
        scores={scores}
        language={language}
        recommendedCareers={recommendedCareers}
        selectedCareerIds={selectedCareerIds}
      />
    </>
  );
}