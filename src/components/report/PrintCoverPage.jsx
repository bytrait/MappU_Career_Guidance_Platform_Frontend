// src/components/report/PrintCoverPage.jsx
import React from "react";
import coverImage from "../../assets/coverImage.png";
import bytraitLogo from "../../assets/bytrait_logo.png";

export default function PrintCoverPage({
  userDetails,
  counsellorDetails,
  language = "en",
}) {
  const counsellorName =
    counsellorDetails?.data?.fullName || null;

  return (
    <div className="print-page"
      style={{
        width: "210mm",
        height: "297mm",
        position: "relative",
        background: "#ffffff",
        overflow: "hidden",
        pageBreakAfter: "always",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#111827",
      }}
    >
      {/* -------- IMAGE (BOTTOM CENTER, MOVED UP) -------- */}
        <img
          src={coverImage}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            bottom: "40mm", // 👈 moved image upward
            transform: "translateX(-50%)", // 👈 horizontally center
            width: "520px",
            maxWidth: "100%",
            objectFit: "contain",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* -------- CONTENT (ONE COLUMN, TRUE CENTER) -------- */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "110mm",
          margin: "32mm auto 0",
          textAlign: "center",
        }}
      >
        {/* Company Branding */}
          <img
            src={bytraitLogo}
            alt="ByTrait Logo"
            style={{
              width: 220,
              height: 80,
              display: "block",
              margin: "0 auto 16px",
              objectFit: "contain",
            }}
          />
          
          {/* Divider */}
        <div
          style={{
            width: 120,
            height: 4,
            background: "#2563eb",
            margin: "24px auto",
          }}
        />

        {/* Student Name */}
        <h2
          style={{
            fontSize: 28,
            fontWeight: 600,
            margin: 0,
          }}
        >
          {userDetails?.fullName || ""}
        </h2>

        {/* Counsellor Info */}
        {counsellorName && (
          <div style={{ marginTop: 24 }}>
            <p
              style={{
                fontSize: 14,
                color: "#374151",
                margin: 0,
              }}
            >
              {language === "mr" ? "समुपदेशक" : "Counsellor"}
            </p>
            <p
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#111827",
                marginTop: 4,
              }}
            >
              {counsellorName}
            </p>
          </div>
        )}
      </div>

      {/* -------- FOOTER (CENTERED) -------- */}
      <div
        style={{
          position: "absolute",
          bottom: "12mm",
          left: "50%",
          transform: "translateX(-50%)", // 👈 true horizontal center
          fontSize: 12,
          color: "#6b7280",
          zIndex: 1,
          textAlign: "center",
        }}
      >
      </div>
    </div>
  );
}
