// src/pages/counsellor/CounsellorStudentReport.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FaArrowLeft,
  FaDownload,
  FaPrint,
  FaRedo,
  FaFilePdf,
  FaSchool,
  FaUserGraduate,
  FaCheckCircle,
  FaExpand,
  FaCompress,
  FaExternalLinkAlt,
  FaSearchPlus,
  FaSearchMinus,
} from "react-icons/fa";

import Spinner from "../../components/common/Spinner";
import PrintCoverPage from "../../components/report/PrintCoverPage";
import ReportOverviewPage from "../../components/report/ReportOverviewPage";
import PrintDocument from "../../components/report/PrintDocument";

import { useTenant } from "../../context/TenantContext";
import { getStudentById, isAuthenticated } from "../../services/auth";
import {
  fetchStudentReportPdfBlob,
  fetchStudentReportStatus,
  saveStudentReportPdfToServer,
  deleteStudentReportPdfCache,
} from "../../services/reportService";
import {
  getStudentScoresForCounsellor,
  getStudentPreferenceForCounsellor,
  getStudentDetailsForCounsellor,
} from "../../services/counsellorService";
import { getRecommendedCareers } from "../../services/careerService";

/* ------------------ PRINT STYLES BUILDER ------------------ */
function collectStylesForIframe() {
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  const styles = Array.from(document.querySelectorAll("style"));

  const linkTags = links
    .map((l) => (l.href ? `<link rel="stylesheet" href="${l.href}" />` : ""))
    .join("\n");

  const styleTags = styles
    .map((s) => `<style>${s.innerHTML}</style>`)
    .join("\n");

  return `
    ${linkTags}
    ${styleTags}
    <link rel="stylesheet" href="/src/styles/printCareer.css" />

    <style>
      @page { 
        size: A4 portrait; 
        margin: 0 !important; 
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        box-sizing: border-box !important;
      }

      @media print, all {
        .print-page {
          width: 210mm !important;
          height: 297mm !important;
          max-height: 297mm !important;
          overflow: hidden !important;
          page-break-after: always !important;
          break-after: page !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          box-sizing: border-box !important;
        }
        .print-page:last-child {
          page-break-after: auto !important;
          break-after: auto !important;
        }
        .career-detail-wrapper {
          page-break-before: always !important;
          break-before: page !important;
        }
      }

      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
        color: #111827 !important;
        font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .no-print { display: none !important; }
    </style>
  `;
}

export default function CounsellorStudentReport() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const tenant = useTenant();

  const offscreenPrintRef = useRef(null);
  const pdfIframeRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [zoomMode, setZoomMode] = useState("FitH");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [studentProfile, setStudentProfile] = useState(null);
  const [studentBasic, setStudentBasic] = useState(null);
  const [counsellor, setCounsellor] = useState(null);
  const [scores, setScores] = useState([]);
  const [language, setLanguage] = useState("en");
  const [economicStatus, setEconomicStatus] = useState("strong");
  const [recommendedCareers, setRecommendedCareers] = useState([]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [pdfBlobUrl]);

  /* ------------------ COMPILE AND STORE PDF ON SERVER ------------------ */
  const generateAndStorePdf = useCallback(
    async (targetLang = language) => {
      setGeneratingPdf(true);
      try {
        // Wait for Recharts SVG and child components to render in the hidden DOM
        await new Promise((r) => setTimeout(r, 700));

        if (!offscreenPrintRef.current) {
          throw new Error("Print template container is not mounted");
        }

        const contentHtml = offscreenPrintRef.current.innerHTML;
        if (!contentHtml || contentHtml.trim().length < 50) {
          await new Promise((r) => setTimeout(r, 400));
        }

        const styles = collectStylesForIframe();
        const finalHTML = `
          <!doctype html>
          <html>
            <head>
              <base href="${window.location.origin}" />
              <meta charset="utf-8" />
              <title>${studentProfile?.fullName || "Student Report"}</title>
              ${styles}
            </head>
            <body>${offscreenPrintRef.current?.innerHTML || ""}</body>
          </html>
        `;

        await saveStudentReportPdfToServer(studentId, {
          html: finalHTML,
          studentName: studentProfile?.fullName || "Student",
          language: targetLang,
          tenantId: tenant?.code || "bytrait",
          counsellorId: counsellor?.id,
        });

        // Fetch newly stored PDF as Blob
        const blob = await fetchStudentReportPdfBlob(studentId, {
          language: targetLang,
          download: false,
        });

        if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);
      } catch (err) {
        console.error("Failed to compile and save report PDF:", err);
        toast.error("Failed to generate report PDF. Please try again.");
      } finally {
        setGeneratingPdf(false);
      }
    },
    [studentId, studentProfile, counsellor, tenant, language, pdfBlobUrl]
  );

  /* ------------------ LOAD STUDENT DATA & FETCH/GENERATE PDF ------------------ */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const [studentRes, prefRes, scoreRes, studentAuthRes, counsellorRes] =
        await Promise.all([
          getStudentDetailsForCounsellor(studentId).catch(() => null),
          getStudentPreferenceForCounsellor(studentId).catch(() => null),
          getStudentScoresForCounsellor(studentId).catch(() => []),
          getStudentById(studentId).catch(() => null),
          isAuthenticated().catch(() => null),
        ]);

      setStudentBasic(studentRes);
      const chosenLang = prefRes?.preferredLanguage || "en";
      const chosenEco = prefRes?.economicStatus || "strong";
      setLanguage(chosenLang);
      setEconomicStatus(chosenEco);
      setScores(scoreRes || []);
      setStudentProfile(studentAuthRes || null);
      setCounsellor(counsellorRes || null);

      // Fetch recommended careers for printable report
      let recs = [];
      if (scoreRes && scoreRes.length > 0) {
        const recRes = await getRecommendedCareers(
          scoreRes,
          chosenEco,
          chosenLang
        ).catch(() => null);

        if (recRes?.data?.recommendations) {
          recs =
            chosenEco === "weak"
              ? [
                ...(recRes.data.recommendations.vocational || []),
                ...(recRes.data.recommendations.professional || []),
              ]
              : recRes.data.recommendations.professional || [];
        }
      }
      setRecommendedCareers(recs);

      // Check if PDF already exists on server
      const statusRes = await fetchStudentReportStatus(studentId, chosenLang).catch(
        () => ({ exists: false })
      );

      if (statusRes?.exists) {
        const blob = await fetchStudentReportPdfBlob(studentId, {
          language: chosenLang,
          download: false,
        });
        if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);
        setLoading(false);
      } else {
        setLoading(false);
        // Wait for hidden JSX tree to mount with new state, then generate PDF
        setTimeout(() => {
          generateAndStorePdf(chosenLang);
        }, 300);
      }
    } catch (error) {
      console.error("Failed to load student report:", error);
      toast.error("Failed to load report data");
      setLoading(false);
    }
  }, [studentId, generateAndStorePdf, pdfBlobUrl]);

  useEffect(() => {
    loadData();
  }, [studentId]);

  /* ------------------ REGENERATE ACTION ------------------ */
  const handleRegenerate = async () => {
    try {
      setGeneratingPdf(true);
      await deleteStudentReportPdfCache(studentId, language).catch(() => { });

      let currentRecs = recommendedCareers;
      if (!currentRecs.length && scores.length) {
        const recRes = await getRecommendedCareers(scores, economicStatus, language);
        if (recRes?.data?.recommendations) {
          currentRecs =
            economicStatus === "weak"
              ? [
                ...(recRes.data.recommendations.vocational || []),
                ...(recRes.data.recommendations.professional || []),
              ]
              : recRes.data.recommendations.professional || [];
        }
        setRecommendedCareers(currentRecs);
      }

      setTimeout(() => {
        generateAndStorePdf(language);
      }, 200);
      toast.success("Regenerating report...");
    } catch (err) {
      console.error("Regeneration error:", err);
      toast.error("Failed to regenerate report");
      setGeneratingPdf(false);
    }
  };

  /* ------------------ DOWNLOAD ACTION ------------------ */
  const handleDownload = async () => {
    try {
      const blob = await fetchStudentReportPdfBlob(studentId, {
        language,
        download: true,
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const cleanName = (studentProfile?.fullName || "Student").replace(
        /[^a-zA-Z0-9_-]/g,
        "_"
      );
      link.href = url;
      link.download = `${cleanName}_Career_Report_${language}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Report downloaded successfully");
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Failed to download report PDF");
    }
  };

  /* ------------------ PRINT ACTION ------------------ */
  const handlePrint = () => {
    if (pdfIframeRef.current?.contentWindow) {
      pdfIframeRef.current.contentWindow.print();
    } else if (pdfBlobUrl) {
      const printWin = window.open(pdfBlobUrl, "_blank");
      if (printWin) {
        printWin.focus();
        printWin.print();
      }
    }
  };

  /* ------------------ LANGUAGE SWITCH ------------------ */
  const handleLanguageChange = async (newLang) => {
    if (newLang === language) return;
    setLanguage(newLang);
    setGeneratingPdf(true);

    try {
      const statusRes = await fetchStudentReportStatus(studentId, newLang).catch(
        () => ({ exists: false })
      );

      if (statusRes?.exists) {
        const blob = await fetchStudentReportPdfBlob(studentId, {
          language: newLang,
          download: false,
        });
        if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);
        setGeneratingPdf(false);
      } else {
        const recRes = await getRecommendedCareers(scores, economicStatus, newLang);
        let recs = [];
        if (recRes?.data?.recommendations) {
          recs =
            economicStatus === "weak"
              ? [
                ...(recRes.data.recommendations.vocational || []),
                ...(recRes.data.recommendations.professional || []),
              ]
              : recRes.data.recommendations.professional || [];
        }
        setRecommendedCareers(recs);
        setTimeout(() => {
          generateAndStorePdf(newLang);
        }, 300);
      }
    } catch (err) {
      console.error("Language switch error:", err);
      toast.error("Failed to switch language report");
      setGeneratingPdf(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Spinner />
        <p className="text-slate-600 font-medium animate-pulse">
          Loading student report...
        </p>
      </div>
    );
  }

  const studentName = studentProfile?.fullName || "Student";
  const schoolName = studentProfile?.schoolName || studentBasic?.schoolName || null;
  const tenantName = tenant?.name || (tenant?.code === "mappu" ? "MappMYUniversity" : "ByTrait");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ---------------- HIDDEN IN-TREE PRINT TEMPLATE ---------------- */}
      <div
        ref={offscreenPrintRef}
        style={{
          position: "fixed",
          left: "-99999px",
          top: "-99999px",
          width: "210mm",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -9999,
        }}
        aria-hidden="true"
      >
        {scores?.length > 0 && (
          <>
            <PrintCoverPage
              userDetails={studentProfile}
              counsellorDetails={counsellor}
              tenant={tenant}
              language={language}
            />
            <ReportOverviewPage />
            <PrintDocument
              scores={scores}
              language={language}
              recommendedCareers={recommendedCareers}
              selectedCareerIds={recommendedCareers.map((c) => c.id)}
            />
          </>
        )}
      </div>

      {/* ---------------- TOP CONTROL TOOLBAR ---------------- */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Left: Navigation & Student Metadata */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/counsellor/students")}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition flex items-center gap-2 text-sm font-medium"
              title="Back to Students"
            >
              <FaArrowLeft />
              <span className="hidden sm:inline">Students</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FaUserGraduate className="text-indigo-600 text-lg" />
                  {studentName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
                  <FaCheckCircle className="text-xs" /> Completed
                </span>
                <span className="hidden lg:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {tenantName}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                {schoolName && (
                  <span className="flex items-center gap-1">
                    <FaSchool className="text-slate-400" />
                    {schoolName}
                  </span>
                )}
                <span>• White-Labeled PDF Report</span>
              </div>
            </div>
          </div>

          {/* Right: Actions & Toolbar */}
          <div className="flex flex-wrap items-center gap-2 self-end md:self-auto">
            {/* Zoom / View Presets */}
            {pdfBlobUrl && !generatingPdf && (
              <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setZoomMode("FitH")}
                  className={`px-2.5 py-1.5 rounded-lg transition ${zoomMode === "FitH"
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                    }`}
                  title="Fit Width (Large & Easy to Read)"
                >
                  Fit Width
                </button>
                <button
                  onClick={() => setZoomMode("125")}
                  className={`px-2.5 py-1.5 rounded-lg transition ${zoomMode === "125"
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                    }`}
                  title="125% Zoom"
                >
                  125%
                </button>
                <button
                  onClick={() => setZoomMode("150")}
                  className={`px-2.5 py-1.5 rounded-lg transition ${zoomMode === "150"
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                    }`}
                  title="150% Zoom (Extra Large)"
                >
                  150%
                </button>
                <button
                  onClick={() => setZoomMode("Fit")}
                  className={`px-2.5 py-1.5 rounded-lg transition ${zoomMode === "Fit"
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                    }`}
                  title="Fit Full Page"
                >
                  Fit Page
                </button>
              </div>
            )}

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-3 py-1.5 rounded-lg transition ${language === "en"
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange("mr")}
                className={`px-3 py-1.5 rounded-lg transition ${language === "mr"
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                मराठी
              </button>
            </div>

            {/* Open in New Tab Button */}
            {pdfBlobUrl && (
              <a
                href={pdfBlobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 text-xs font-medium"
                title="Open PDF in Full Native Browser Tab"
              >
                <FaExternalLinkAlt />
                <span className="hidden lg:inline">Open in Tab</span>
              </a>
            )}

            {/* Fullscreen Toggle Button */}
            {pdfBlobUrl && (
              <button
                onClick={() => setIsFullscreen((prev) => !prev)}
                className={`p-2 sm:px-3 sm:py-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-medium ${isFullscreen
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold"
                    : "border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
                <span className="hidden lg:inline">
                  {isFullscreen ? "Exit" : "Fullscreen"}
                </span>
              </button>
            )}

            {/* Regenerate Button */}
            <button
              onClick={handleRegenerate}
              disabled={generatingPdf}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 text-xs font-medium disabled:opacity-50"
              title="Regenerate Report PDF"
            >
              <FaRedo className={generatingPdf ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Regenerate</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              disabled={!pdfBlobUrl || generatingPdf}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 text-xs font-medium disabled:opacity-50"
              title="Print PDF"
            >
              <FaPrint />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Download PDF Button */}
            <button
              onClick={handleDownload}
              disabled={!pdfBlobUrl || generatingPdf}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition flex items-center gap-2 text-xs font-semibold disabled:opacity-50 cursor-pointer"
            >
              <FaDownload />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- MAIN PDF PREVIEW AREA ---------------- */}
      <main
        className={`flex-1 w-full mx-auto p-2 sm:p-4 flex flex-col ${isFullscreen
            ? "fixed inset-0 z-50 bg-slate-900 p-3 sm:p-6"
            : "max-w-[1550px]"
          }`}
      >
        {isFullscreen && (
          <div className="flex items-center justify-between pb-3 text-white">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold">
                {studentName} — Career Report (Fullscreen)
              </h2>
              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setZoomMode("FitH")}
                  className={`px-2.5 py-1 rounded-md transition ${zoomMode === "FitH" ? "bg-indigo-600 text-white" : "text-slate-300 hover:text-white"
                    }`}
                >
                  Fit Width
                </button>
                <button
                  onClick={() => setZoomMode("125")}
                  className={`px-2.5 py-1 rounded-md transition ${zoomMode === "125" ? "bg-indigo-600 text-white" : "text-slate-300 hover:text-white"
                    }`}
                >
                  125%
                </button>
                <button
                  onClick={() => setZoomMode("150")}
                  className={`px-2.5 py-1 rounded-md transition ${zoomMode === "150" ? "bg-indigo-600 text-white" : "text-slate-300 hover:text-white"
                    }`}
                >
                  150%
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <FaCompress /> Exit Fullscreen
            </button>
          </div>
        )}

        {generatingPdf && !pdfBlobUrl ? (
          <div className="flex-1 min-h-[78vh] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <h3 className="text-lg font-bold text-slate-800">
              Generating White-Labeled Report...
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md text-center">
              Compiling student psychometrics, career clustering, and partner
              branding into a multi-page PDF.
            </p>
          </div>
        ) : pdfBlobUrl ? (
          <div
            className={`flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${isFullscreen ? "h-[calc(100vh-60px)]" : "h-[calc(100vh-85px)] min-h-[85vh]"
              }`}
          >
            <iframe
              ref={pdfIframeRef}
              key={`${pdfBlobUrl}_${zoomMode}`}
              src={`${pdfBlobUrl}#toolbar=1&navpanes=0${zoomMode === "FitH"
                  ? "&view=FitH"
                  : zoomMode === "Fit"
                    ? "&view=Fit"
                    : `&zoom=${zoomMode}`
                }`}
              title={`${studentName} Career Report Preview`}
              className="w-full flex-1 border-0 h-full"
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 p-8 text-center min-h-[70vh]">
            <FaFilePdf className="text-5xl text-slate-300 mb-3" />
            <h3 className="text-lg font-semibold text-slate-700">
              No Preview Available
            </h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">
              Click below to generate the PDF report for this student.
            </p>
            <button
              onClick={handleRegenerate}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition flex items-center gap-2"
            >
              <FaRedo /> Generate Report PDF
            </button>
          </div>
        )}
      </main>
    </div>
  );
}


