import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom/client";

import PersonalityStrengths from "../../components/report/PersonalityStrengths";
import CareerInterests from "../../components/report/CareerInterests";
import AptitudeChart from "../../components/report/AptitudeChart";
import CareerOptions from "../../components/report/CareerOptions";
import Spinner from "../../components/common/Spinner";

import PrintDocument from "../../components/report/PrintDocument";
import PrintCoverPage from "../../components/report/PrintCoverPage";

import { getStudentById, isAuthenticated } from "../../services/auth";

import {
  getStudentScoresForCounsellor,
  getStudentPreferenceForCounsellor,
  getStudentDetailsForCounsellor,
} from "../../services/counsellorService";
import { getRecommendedCareers } from "../../services/careerService";

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
      @page { size: A4 portrait; margin: 12mm; }

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

  // small buffer so fonts actually paint
  await new Promise(r => setTimeout(r, 500));
}

export default function CounsellorStudentReport() {
  const { studentId } = useParams();

  const offscreenRootRef = useRef(null);
  const iframeRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  const [scores, setScores] = useState([]);
  const [language, setLanguage] = useState("en");
  const [economicStatus, setEconomicStatus] = useState(null);
  const [recommendedCareers, setRecommendedCareers] = useState([]);

  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedCareerIds, setSelectedCareerIds] = useState([]);

  const [studentProfile, setStudentProfile] = useState(null);
  const [counsellor, setCounsellor] = useState(null);

  /* ------------------ LOAD STUDENT DATA ------------------ */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const [
          studentRes,
          prefRes,
          scoreRes,
          studentAuthRes,
          counsellorRes
        ] = await Promise.all([
          getStudentDetailsForCounsellor(studentId),
          getStudentPreferenceForCounsellor(studentId),
          getStudentScoresForCounsellor(studentId),
          getStudentById(studentId),
          isAuthenticated(),
        ]);

        setStudent(studentRes);
        setLanguage(prefRes?.preferredLanguage || "en");
        setEconomicStatus(prefRes?.economicStatus || null);
        setScores(scoreRes || []);
        setStudentProfile(studentAuthRes || null);
        setCounsellor(counsellorRes || null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [studentId]);

  /* ------------------ LOAD CAREERS ------------------ */
  useEffect(() => {
    async function loadCareers() {
      if (!scores.length || !economicStatus || !language) return;

      const res = await getRecommendedCareers(
        scores,
        economicStatus,
        language
      );

      let recs = [];
      if (res?.data?.recommendations) {
        recs =
          economicStatus === "weak"
            ? [
                ...(res.data.recommendations.vocational || []),
                ...(res.data.recommendations.professional || []),
              ]
            : res.data.recommendations.professional || [];
      }

      setRecommendedCareers(recs);
    }

    loadCareers();
  }, [scores, economicStatus, language]);

  const isLoading =
    loading || !scores.length || !economicStatus || !recommendedCareers.length;

  /* ------------------ PRINT HELPERS ------------------ */
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

  function toggleCareer(id) {
    setSelectedCareerIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  }

  async function handlePrint() {
    const container = ensureOffscreenRoot();
    container.innerHTML = "";

    const root = ReactDOM.createRoot(container);
    root.render(
      <>
        <PrintCoverPage
          userDetails={studentProfile}
          counsellorDetails={counsellor}
          language={language}
        />
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
          <title>${studentProfile?.fullName || "Student Report"}</title>
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

    // ✅ SAME timeout, just waits correctly
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
  if (loading) {
    return (
      <div className="flex justify-center mt-12">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-4xl font-semibold text-gray-800">
          {studentProfile?.fullName}
        </h1>

        <button
          onClick={() => setShowPrintModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Print Report
        </button>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="space-y-16">
          <PersonalityStrengths scores={scores} language={language} />
          <CareerInterests scores={scores} language={language} />
          <AptitudeChart scores={scores} language={language} />

          <section className="mb-16">
            <CareerOptions
              scores={scores}
              careers={recommendedCareers}
              economicStatus={economicStatus}
              language={language}
              readOnly
            />
          </section>
        </div>
      )}

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
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
