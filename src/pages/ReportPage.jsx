// src/pages/ReportPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom/client";

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

import PersonalityStrengths from "../components/report/PersonalityStrengths";
import CareerInterests from "../components/report/CareerInterests";
import AptitudeChart from "../components/report/AptitudeChart";
import CareerOptions from "../components/report/CareerOptions";
import Spinner from "../components/common/Spinner";

import PrintDocument from "../components/report/PrintDocument";
import PrintCoverPage from "../components/report/PrintCoverPage";
import ReportOverviewPage from "../components/report/ReportOverviewPage";
import ReportIndexPage from "../components/report/ReportIndexPage";

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
      @page { size: A4 portrait;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      }

      @media print {
        .print-page {
          page-break-after: always;
        }
        .print-page:last-child {
          page-break-after: auto;
        }
      }

      html, body {
        background: white !important;
        color: #111827 !important;
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

  const offscreenRootRef = useRef(null);
  const iframeRef = useRef(null);

  const [userDetails, setUserDetails] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedCareerIds, setSelectedCareerIds] = useState([]);

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

  /* ------------------ OFFSCREEN ROOT ------------------ */
  function ensureOffscreenRoot() {
    if (offscreenRootRef.current) return offscreenRootRef.current;

    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.left = "-9999px";
    document.body.appendChild(div);
    offscreenRootRef.current = div;
    return div;
  }

  function ensureIframe() {
    if (iframeRef.current) return iframeRef.current;

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    iframeRef.current = iframe;
    return iframe;
  }

  /* ------------------ PRINT ------------------ */
  async function handlePrint() {
    const container = ensureOffscreenRoot();
    container.innerHTML = "";

    const root = ReactDOM.createRoot(container);
    root.render(
      <>
        <PrintCoverPage userDetails={userDetails} language={language} />
        <ReportOverviewPage />
        {/* <ReportIndexPage /> */}
        <PrintDocument
          scores={scores}
          language={language}
          recommendedCareers={recommendedCareers}
          selectedCareerIds={selectedCareerIds}
        />
      </>
    );

    await new Promise(r => setTimeout(r, 300));

    const html = container.innerHTML;
    const styles = collectStylesForIframe();

    const finalHTML = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${userDetails?.fullName || "Report"}</title>
          ${styles}
        </head>
        <body>${html}</body>
      </html>
    `;

    const iframe = ensureIframe();
    const doc = iframe.contentDocument;
    doc.open();
    doc.write(finalHTML);
    doc.close();

    // ✅ SAME setTimeout, just waiting correctly
    setTimeout(async () => {
      await waitForIframeAssets(doc);
      iframe.contentWindow.print();
    }, 300);

    root.unmount();
    container.remove();
    offscreenRootRef.current = null;
    setShowPrintModal(false);
  }

  /* ------------------ RENDER ------------------ */
  return (
    <>
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
            {language === "mr" ? "प्रिंट अहवाल" : "Print Report"}
          </button>
        </div>
      </div>

      {/* Screen Content */}
      <div className="max-w-7xl mx-auto px-2 space-y-16">
        <h1 className="text-5xl font-semibold mb-8 text-gray-800">
          {userDetails?.fullName}
        </h1>

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
              onSelectCareer={c => dispatch(setSelectedCareer(c))}
            />
          )}
        </section>
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
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}

      <iframe ref={iframeRef} style={{ display: "none" }} title="print" />
    </>
  );
}
