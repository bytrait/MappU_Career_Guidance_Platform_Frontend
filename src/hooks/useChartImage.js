// src/hooks/useChartImage.js
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

export function useChartImage() {
  const chartRef = useRef(null);
  const [chartImage, setChartImage] = useState(null);

  const captureChart = async () => {
    if (!chartRef.current) return;

    const canvas = await html2canvas(chartRef.current, {
      scale: 2,
      backgroundColor: "white"
    });

    setChartImage(canvas.toDataURL("image/png"));
  };

  return { chartRef, chartImage, captureChart };
}
