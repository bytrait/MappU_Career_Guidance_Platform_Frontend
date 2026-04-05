import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div 
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px"
      }}
    >
      
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        style={{
          padding: "8px 14px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: page <= 1 ? "not-allowed" : "pointer",
          background: page <= 1 ? "#f0f0f0" : "white"
        }}
      >
        Previous
      </button>

      <span style={{ fontSize: "16px" }}>
        Page <strong>{page}</strong> of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        style={{
          padding: "8px 14px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: page >= totalPages ? "not-allowed" : "pointer",
          background: page >= totalPages ? "#f0f0f0" : "white"
        }}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;
