export default function StatsCard({ title, value, subtitle }) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-1">
        {value}
      </h2>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
