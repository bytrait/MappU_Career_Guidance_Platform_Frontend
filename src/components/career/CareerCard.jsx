import React from "react";

const CareerCard = ({ career, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "12px",
        cursor: "pointer",
        background: "#fafafa"
      }}
    >
      <h3 style={{ marginBottom: "6px" }}>
        {career.titles?.en}
      </h3>

      {career.titles?.mr && (
        <p style={{ color: "#666", margin: 0 }}>
          {career.titles.mr}
        </p>
      )}
    </div>
  );
};

export default CareerCard;
