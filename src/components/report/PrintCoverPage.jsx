// src/components/report/PrintCoverPage.jsx
import React from "react";
import coverImage from "../../assets/coverImage.png";
import bytraitLogo from "../../assets/bytrait_logo.png";
import mappuLogo from "../../assets/mappu_logo.png";

export default function PrintCoverPage({
  userDetails,
  counsellorDetails,
  tenant,
  language = "en",
}) {
  const counsellorName =
    counsellorDetails?.data?.fullName || counsellorDetails?.fullName || null;
  const counsellorOrg =
    counsellorDetails?.data?.organization || counsellorDetails?.organization || null;
  const counsellorEmail =
    counsellorDetails?.data?.email || counsellorDetails?.email || null;

  // Resolve white-labeled logo
  const tenantSlug = tenant?.code?.toLowerCase() || "bytrait";
  const customLogo = tenant?.config?.theme?.logo || tenant?.config?.customization?.logo;
  const logoSrc = customLogo || (tenantSlug === "mappu" ? mappuLogo : bytraitLogo);
  const primaryColor = tenant?.config?.theme?.primaryColor || "#2563eb";

  const schoolName = userDetails?.schoolName || userDetails?.school || null;
  const standard = userDetails?.standard || userDetails?.grade || null;

  return (
    <div
      className="print-page"
      style={{
        width: "210mm",
        height: "297mm",
        maxHeight: "297mm",
        boxSizing: "border-box",
        position: "relative",
        background: "#ffffff",
        overflow: "hidden",
        pageBreakAfter: "always",
        breakAfter: "page",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#111827",
      }}
    >
      {/* -------- IMAGE (BOTTOM CENTER) -------- */}
      <img
        src={coverImage}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          bottom: "35mm",
          transform: "translateX(-50%)",
          width: "500px",
          maxWidth: "100%",
          objectFit: "contain",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* -------- CONTENT (CENTERED) -------- */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "120mm",
          margin: "28mm auto 0",
          textAlign: "center",
        }}
      >
        {/* White-labeled Company / Tenant Logo */}
        <img
          src={logoSrc}
          alt="Organization Logo"
          style={{
            maxWidth: 240,
            maxHeight: 85,
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
            background: primaryColor,
            margin: "20px auto",
            borderRadius: 2,
          }}
        />

        {/* Report Title */}
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#6b7280",
            margin: "0 0 8px",
          }}
        >
          {language === "mr"
            ? "करिअर मार्गदर्शन व मूल्यमापन अहवाल"
            : "Comprehensive Career Guidance Report"}
        </p>

        {/* Student Name */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#1e3a8a",
            margin: "8px 0",
          }}
        >
          {userDetails?.fullName || "Student"}
        </h1>

        {/* Student Class / School Details */}
        {(schoolName || standard) && (
          <p
            style={{
              fontSize: 13,
              color: "#4b5563",
              margin: "4px 0 0",
            }}
          >
            {standard ? `${language === "mr" ? "इयत्ता" : "Class"} ${standard}` : ""}
            {standard && schoolName ? " • " : ""}
            {schoolName || ""}
          </p>
        )}

        {/* Counsellor Info */}
        {counsellorName && (
          <div
            style={{
              marginTop: 22,
              padding: "10px 16px",
              background: "#f8fafc",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              display: "inline-block",
              minWidth: "220px",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: 0,
              }}
            >
              {language === "mr" ? "मार्गदर्शक समुपदेशक" : "Certified Counsellor"}
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0f172a",
                marginTop: 2,
                marginBottom: 0,
              }}
            >
              {counsellorName}
            </p>
            {counsellorOrg && (
              <p
                style={{
                  fontSize: 12,
                  color: "#475569",
                  margin: "2px 0 0",
                }}
              >
                {counsellorOrg}
              </p>
            )}
            {counsellorEmail && (
              <p
                style={{
                  fontSize: 11,
                  color: "#94a3b8",
                  margin: "2px 0 0",
                }}
              >
                {counsellorEmail}
              </p>
            )}
          </div>
        )}
      </div>

      {/* -------- FOOTER -------- */}
      <div
        style={{
          position: "absolute",
          bottom: "12mm",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 11,
          color: "#9ca3af",
          zIndex: 1,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        <p style={{ margin: 0 }}>
          {language === "mr"
            ? "हा अहवाल गोपनीय असून विद्यार्थ्याच्या करिअर नियोजनासाठी तयार करण्यात आला आहे."
            : "Confidential Career Evaluation • Prepared exclusively for student guidance."}
        </p>
      </div>
    </div>
  );
}

