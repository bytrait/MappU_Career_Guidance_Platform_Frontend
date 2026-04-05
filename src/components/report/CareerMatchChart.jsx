export default function CareerMatchChart({ chartData, language = "en" }) {
  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-10">
        {language === "mr" ? "डेटा उपलब्ध नाही" : "No chart data available"}
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl p-6">
      <h3 className="text-xl font-bold text-center mb-6 text-default">
        {language === "mr"
          ? "श्रेणी जुळण्याचे चार्ट"
          : "Career Category Match Chart"}
      </h3>

      <div className="space-y-6 w-full">
        {chartData.map((item, index) => {
          const percent = item.value; // 0–100

          return (
            <div key={index} className="w-full">
              {/* Label */}
              <div className="mb-2 font-semibold text-primary text-sm sm:text-base">
                {item.name}
              </div>

              {/* Bar */}
              <div className="w-full bg-gray-200 rounded-lg h-4 relative overflow-hidden">
                <div
                  className="h-4 rounded-lg transition-all duration-500 bg-accent"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Score */}
              <div className="text-gray-700 text-sm mt-1">
                {percent} {language === "mr" ? "पैकी 100" : "out of 100"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
