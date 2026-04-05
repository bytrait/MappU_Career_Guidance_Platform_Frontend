// src/components/career/SectionCard.jsx
import React from "react";
import parse from "html-react-parser";
import styles from "./SegmentedStyles.module.css";

export default function SectionCard({ title, children, color = "blue" }) {
  return (
    <section className={`${styles.card} ${styles[color]}`}>
      <h3 className={styles.cardTitle}>{parse(title)}</h3>
      <div className={styles.cardContent}>{children}</div>
    </section>
  );
}

