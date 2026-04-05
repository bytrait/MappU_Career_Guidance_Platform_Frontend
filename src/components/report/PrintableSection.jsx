export default function PrintableSection({ title, children }) {
  return (
    <section className="print-section">
      <h3 className="print-section-title">
        {parse(title)}
      </h3>

      <div className="print-section-content">
        {children}
      </div>
    </section>
  );
}
