import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Layouts
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";

// Student Pages
import WelcomePage from "../pages/WelcomePage";
import AssessmentPage from "../pages/AssessmentPage";
import ReportPage from "../pages/ReportPage";
import CongratulationsPage from "../pages/CongratulationsPage";
import CareerContent from "../components/CareerContent/CareerContent";
import CareerPage from "../pages/CareerPage";
import CareerList from "../pages/CareerList";
import CareerDetails from "../pages/CareerDetails";

// Counsellor Pages
import CounsellorStudents from "../pages/counsellor/CounsellorStudents";

// Demo Pages
import DemoWelcomePage from "../pages/demo/DemoWelcomePage";
import DemoAssessmentPage from "../pages/demo/DemoAssessmentPage";
import DemoReportPage from "../pages/demo/DemoReportPage";
import DemoCareerPage from "../pages/demo/DemoCareerPage";
import CounsellorStudentReport from "../pages/counsellor/CounsellorStudentReport";
import CounsellorSchools from "../pages/counsellor/CounsellorSchools";
import SchoolStudents from "../pages/counsellor/SchoolStudents";

// Counsellor Dashboard + Billing
import Dashboard from "../pages/counsellor/Dashboard";
import BillingOverview from "../pages/counsellor/billing/BillingOverview";
import BuyCredits from "../pages/counsellor/billing/BuyCredits";
import PaymentHistory from "../pages/counsellor/billing/PaymentHistory";
import CreditLedger from "../pages/counsellor/billing/CreditLedger";
import CounsellorLayout from "../components/counsellor/layout/CounsellorLayout";


export const router = createBrowserRouter([

  // ---------------------------------------
  // 1) STUDENT ROUTES (Authenticated, STUDENT)
  // ---------------------------------------
  {
    path: "/",
    element: (
      <ProtectedRoute roles={["STUDENT"]}>
        <PrivateLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <WelcomePage /> },
      { path: "assessment", element: <AssessmentPage /> },
      { path: "report", element: <ReportPage /> },
      { path: "congratulations", element: <CongratulationsPage /> },
      { path: "career_content", element: <CareerContent /> },
      { path: "career/:careerId", element: <CareerPage /> },
      { path: "careers", element: <CareerList /> },
      { path: "careers/:id", element: <CareerDetails /> },
    ],
  },

  // ---------------------------------------
  // 2) COUNSELLOR ROUTES (Authenticated, COUNSELLOR)
  // ---------------------------------------
  {
    path: "/counsellor",
    element: (
      <ProtectedRoute roles={["COUNSELLOR"]}>
        <CounsellorLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },

      { path: "students", element: <CounsellorStudents /> },
      { path: "students/:studentId/report", element: <CounsellorStudentReport /> },

      { path: "schools", element: <CounsellorSchools /> },
      { path: "schools/:schoolId", element: <SchoolStudents /> },

      { path: "billing", element: <BillingOverview /> },
      { path: "billing/buy", element: <BuyCredits /> },
      { path: "billing/payments", element: <PaymentHistory /> },
      { path: "billing/ledger", element: <CreditLedger /> },
    ]
  },
  // ---------------------------------------
  // 3) PUBLIC DEMO ROUTES
  // ---------------------------------------
  {
    path: "/demo",
    element: <PublicLayout />,
    children: [
      { path: "", element: <DemoWelcomePage /> },
      { path: "assessment", element: <DemoAssessmentPage /> },
      { path: "report", element: <DemoReportPage /> },
      { path: "career/:careerId", element: <DemoCareerPage /> },
    ],
  },

]);
