import React from "react";

export default function A4Page({ children, pageNumber }) {
  return (
    <div
      style={{
        width: "210mm",
        height: "297mm",
        background: "#ffffff",
        position: "relative",
        pageBreakAfter: "always",
        overflow: "hidden",
      }}
    >
      {/* Content area */}
      <div>
        {children}
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "6mm",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: "12px",
          color: "#6b7280",
        }}
      >
        <div
          style={{
            width: "40mm",
            height: "1px",
            backgroundColor: "#d1d5db",
            margin: "0 auto 6px",
          }}
        />
        {pageNumber}
      </div>
    </div>
  );
}
