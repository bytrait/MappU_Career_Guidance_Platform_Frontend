export default function ProgressBar({ current, total }) {
    const percent = (current / total) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-accent h-3 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  }
