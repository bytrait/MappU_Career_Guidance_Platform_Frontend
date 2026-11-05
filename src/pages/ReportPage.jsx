// src/pages/ReportPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setScores,
  setLanguage,
  setEconomicStatus,
  setRecommendedCareers,
  setSelectedCareer,
} from "../store/reportSlice";

import { getScores } from "../services/assessmentService";
import { getPreference } from "../services/preferenceService";
import { getRecommendedCareers } from "../services/careerService";
import { fetchUserDetailsById } from "../services/userAssessmentProgressService";

import { downloadReportPDF } from "../services/reportService";
import ReportIndexPage from "../components/report/ReportIndexPage";

import { useTenant } from '../context/TenantContext'
import {
  REPORT_LAYOUT_REGISTRY,
  PRINT_LAYOUT_REGISTRY,
} from '../reports/registry'
import { resolvePrintLayout, resolveReportLayout } from "../reports/resolver";

/* ------------------ PRINT STYLES ------------------ */
function collectStylesForIframe() {
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  const styles = Array.from(document.querySelectorAll("style"));

  const linkTags = links
    .map(l => (l.href ? `<link rel="stylesheet" href="${l.href}" />` : ""))
    .join("\n");

  const styleTags = styles
    .map(s => `<style>${s.innerHTML}</style>`)
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

        .print-page .rounded-3xl {
          border-radius: 1.5rem !important;
        }
        .print-page .rounded-2xl {
          border-radius: 1rem !important;
        }
        .print-page .rounded-xl {
          border-radius: 0.75rem !important;
        }
        .print-page .rounded-lg {
          border-radius: 0.5rem !important;
        }
        .print-page .rounded-md {
          border-radius: 0.375rem !important;
        }
        .print-page .rounded-full {
          border-radius: 9999px !important;
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

/* ------------------ NEW: WAIT FOR IFRAME ASSETS ------------------ */
async function waitForIframeAssets(doc) {
  const images = Array.from(doc.images || []);

  const imagePromises = images.map(img => {
    if (img.complete && img.naturalHeight > 0) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = img.onerror = resolve;
    });
  });

  const fontPromise = doc.fonts ? doc.fonts.ready : Promise.resolve();

  await Promise.all([...imagePromises, fontPromise]);

  // small safety buffer so fonts actually paint
  await new Promise(r => setTimeout(r, 500));
}

/* ------------------ MAIN COMPONENT ------------------ */
export default function ReportPage() {
  const dispatch = useDispatch();

  const offscreenPrintRef = useRef(null);
  const iframeRef = useRef(null);

  const tenant = useTenant();
  const ReportLayout = resolveReportLayout(tenant);
  const PrintLayout = resolvePrintLayout(tenant);

  const [userDetails, setUserDetails] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedCareerIds, setSelectedCareerIds] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const { scores, language, economicStatus, recommendedCareers } = useSelector(
    s => s.report
  );

  /* ------------------ LOAD INITIAL DATA ------------------ */
  useEffect(() => {
    async function load() {
      const pref = await getPreference();
      dispatch(setLanguage(pref.preferredLanguage || "en"));
      dispatch(setEconomicStatus(pref.economicStatus || null));

      const scoreRes = await getScores();
      if (scoreRes.data?.success) {
        dispatch(setScores(scoreRes.data.data));
      }

      const user = await fetchUserDetailsById();
      setUserDetails(user);
    }
    load();
  }, []);

  /* ------------------ LOAD CAREERS ------------------ */
  useEffect(() => {
    async function loadCareers() {
      if (!scores?.length || !language || !economicStatus) return;

      const res = await getRecommendedCareers(scores, economicStatus, language);
      let recs = [];

      if (res.data?.recommendations) {
        recs =
          economicStatus === "weak"
            ? [
              ...(res.data.recommendations.vocational || []),
              ...(res.data.recommendations.professional || []),
            ]
            : res.data.recommendations.professional || [];
      }

      dispatch(setRecommendedCareers(recs));
    }
    loadCareers();
  }, [scores, language, economicStatus]);

  const isLoading =
    !scores?.length || !language || !economicStatus || !recommendedCareers.length;

  /* ------------------ SELECTION ------------------ */
  function toggleCareer(id) {
    setSelectedCareerIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  }

  function openPrintModal() {
    if (!selectedCareerIds.length && recommendedCareers.length) {
      setSelectedCareerIds(recommendedCareers.slice(0, 3).map(c => c.id));
    }
    setShowPrintModal(true);
  }

  /* ------------------ PRINT ------------------ */
  async function handleDownloadPDF() {
    setIsDownloading(true);

    try {
      if (!offscreenPrintRef.current) {
        throw new Error("Print template container is not mounted");
      }

      await new Promise(r => setTimeout(r, 400));

      const styles = collectStylesForIframe();

      const finalHTML = `
      <!doctype html>
      <html>
        <head>
          <base href="${window.location.origin}" />
          <meta charset="utf-8" />
          <title>${userDetails?.fullName || "Report"}</title>
          ${styles}
        </head>
        <body>
          ${offscreenPrintRef.current.innerHTML}
        </body>
      </html>
    `;

      const response = await downloadReportPDF({
        html: finalHTML,
        studentName: userDetails?.fullName,
      });

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      const brandSlug = (tenant?.code || "ByTrait").replace(/\s+/g, "");
      const fileName = `${userDetails?.fullName || "Student"}_${brandSlug}_Report_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;

      link.href = url;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
    } finally {
      setIsDownloading(false);
      setShowPrintModal(false);
    }
  }

  /* ------------------ RENDER ------------------ */
  return (
    <>
      {/* Offscreen Print Container managed cleanly by React */}
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
          <PrintLayout
            userDetails={userDetails}
            language={language}
            scores={scores}
            recommendedCareers={recommendedCareers}
            selectedCareerIds={
              selectedCareerIds.length
                ? selectedCareerIds
                : recommendedCareers.slice(0, 3).map(c => c.id)
            }
          />
        )}
      </div>

      {/* Language Switch */}
      {/* <div className="flex justify-end px-6 py-4 no-print">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => dispatch(setLanguage("en"))}
            className={`px-3 py-1 rounded-full ${language === "en" ? "bg-primary text-white" : ""} cursor-pointer`}
          >
            English
          </button>
          <button
            onClick={() => dispatch(setLanguage("mr"))}
            className={`px-3 py-1 rounded-full ${language === "mr" ? "bg-primary text-white" : ""} cursor-pointer`}
          >
            मराठी
          </button>
        </div>
      </div> */}

      {/* Print Button */}
      <div className="max-w-7xl mx-auto px-2 py-4 mb-6 no-print">
        <div className="flex justify-end">
          <button
            onClick={openPrintModal}
            className="px-4 py-2 bg-primary text-white rounded shadow cursor-pointer"
          >
            {language === "mr" ? "डाऊनलोड अहवाल" : "Download Report"}
          </button>
        </div>
      </div>

      {/* Screen Content */}
      <div className="max-w-7xl mx-auto px-2 space-y-16">
        <h1 className="text-5xl font-semibold mb-8 text-gray-800">
          {userDetails?.fullName}
        </h1>

        <ReportLayout
          scores={scores}
          language={language}
          economicStatus={economicStatus}
          recommendedCareers={recommendedCareers}
          isLoading={isLoading}
          dispatch={dispatch}
        />
      </div>

      {/* PRINT MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-40" />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              Select Careers to Print
            </h2>

            <div className="max-h-64 overflow-y-auto border p-3 rounded">
              {recommendedCareers.map(c => (
                <label key={c.id} className="flex gap-3 py-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCareerIds.includes(c.id)}
                    onChange={() => toggleCareer(c.id)}
                  />
                  <div>
                    <div className="font-semibold">{c.title?.value}</div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {c.description?.value}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowPrintModal(false)}
                disabled={isDownloading}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className={`px-4 py-2 rounded text-white font-medium transition
                    ${isDownloading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90"}
                  `}
              >
                {language === "mr" ? "अहवाल डाउनलोड करा" : "Download PDF"}
              </button>
            </div>
          </div>
          {isDownloading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-50">

              {/* Spinner */}
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

              {/* Text */}
              <p className="mt-4 text-sm font-medium text-gray-700">
                {language === "mr"
                  ? "अहवाल तयार होत आहे..."
                  : "Generating your report..."}
              </p>

              {/* Subtext */}
              <p className="text-xs text-gray-500 mt-1">
                {language === "mr"
                  ? "कृपया थांबा"
                  : "This may take a few seconds"}
              </p>
            </div>
          )}
        </div>
      )}

      <iframe ref={iframeRef} style={{ display: "none" }} title="print" />
    </>
  );
} 
