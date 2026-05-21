import API from "./axiosInstance";

/**
 * Generate and download PDF report
 * @param {Object} payload
 * @param {string} payload.html
 * @param {string} payload.studentName
 */
export const downloadReportPDF = async ({ html, studentName }) => {
  const response = await API.post(
    "/assessment/report/pdf",
    {
      html,
      studentName,
    },
    {
      responseType: "blob",
    }
  );

  return response;
};