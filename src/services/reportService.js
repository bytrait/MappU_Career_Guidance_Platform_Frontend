import API from "./axiosInstance";

/**
 * Generate and download PDF report directly from HTML
 */
export const downloadReportPDF = async ({ html, studentName, studentId, language = "en", tenantId, counsellorId }) => {
  const response = await API.post(
    "/assessment/report/pdf",
    {
      html,
      studentName,
      studentId,
      language,
      tenantId,
      counsellorId,
    },
    {
      responseType: "blob",
    }
  );

  return response;
};

/**
 * Fetch stored student PDF report as Blob (for preview or download)
 */
export const fetchStudentReportPdfBlob = async (studentId, { language = "en", download = false } = {}) => {
  const response = await API.get(
    `/assessment/report/student/${studentId}/pdf`,
    {
      params: { language, download: download ? "true" : "false", _t: Date.now() },
      responseType: "blob",
    }
  );

  return response.data;
};

/**
 * Check if a stored PDF report already exists for this student
 */
export const fetchStudentReportStatus = async (studentId, language = "en") => {
  const response = await API.get(
    `/assessment/report/student/${studentId}/status`,
    {
      params: { language },
    }
  );

  return response.data.data;
};

/**
 * Save rendered HTML as stored PDF on server
 */
export const saveStudentReportPdfToServer = async (studentId, { html, studentName, language = "en", tenantId, counsellorId }) => {
  const response = await API.post(
    `/assessment/report/student/${studentId}/save`,
    {
      html,
      studentName,
      language,
      tenantId,
      counsellorId,
    }
  );

  return response.data;
};

/**
 * Delete stored PDF cache for student
 */
export const deleteStudentReportPdfCache = async (studentId, language = "en") => {
  const response = await API.delete(
    `/assessment/report/student/${studentId}/pdf`,
    {
      params: { language },
    }
  );

  return response.data;
};