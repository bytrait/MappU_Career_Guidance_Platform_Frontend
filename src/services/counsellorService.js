import AuthAPI from './authAxiosInstance';
import API from "./axiosInstance";
import { normalizeApiError } from './apiError';


export const getCounsellorStudents = async ({
  page = 1,
  limit = 10,
  search = '',
}) => {
  const response = await AuthAPI.get(
    '/auth/counsellor/students',
    {
      params: { page, limit, search },
    }
  );

  return response.data;
};

export const getStudentDetailsForCounsellor = async (studentId) => {
  const res = await API.get(`/assessment/assessment-progress/student/${studentId}`);
  return res.data.data;
};

export const getStudentScoresForCounsellor = async (studentId) => {
  const res = await API.get(`/assessment/scores/${studentId}`);
  return res.data.data;
};

export const getStudentPreferenceForCounsellor = async (studentId) => {
  const res = await API.get(`/assessment/preference/${studentId}`);
  return res.data.data;
};

export const getRecommendedCareersForCounsellor = async ({
  studentId,
  scores,
  economicStatus,
  language,
}) => {
  const res = await API.post(
    `/career/recommendations`,
    { scores, economicStatus, language },
    { params: { studentId } }
  );

  return res.data.data;
};
export const rotateDirectReferenceCode = async () => {
  const res = await AuthAPI.post(
    "/counsellor/reference-code/rotate"
  );
  return res.data.data;
};

/* -----------------------------
   Reference Tokens (multi-token)
   Backed by ${AUTH_API_BASE}/api/v2/counsellor/...
----------------------------- */

/**
 * @typedef {'COUNSELLOR' | 'SCHOOL' | 'INSTITUTION'} ReferenceTokenType
 *
 * @typedef {Object} ReferenceToken
 * @property {string} id
 * @property {string} code
 * @property {ReferenceTokenType} type
 * @property {string} targetId
 * @property {string|null} label
 * @property {string} startDate   ISO timestamp
 * @property {string|null} expiryDate
 * @property {boolean} isActive
 * @property {number|null} [price]      from billing (auth BFF or client merge)
 * @property {string|null} [currency]
 * @property {string} createdAt
 * @property {string} updatedAt
 *
 * @typedef {Object} CreateTokenInput
 * @property {string} code               REQUIRED, 4-20 chars [A-Z0-9]
 * @property {string} [label]
 * @property {string} [startDate]
 * @property {string} [expiryDate]
 * @property {number} [price]
 * @property {string} [currency]
 *
 * @typedef {Object} ExtendTokenInput
 * @property {string} expiryDate
 * @property {number} [price]
 * @property {string} [currency]
 */

const cleanTokenPayload = (payload = {}) => {
  const out = {};
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (typeof value === "string" && value.trim() === "") return;
    out[key] = value;
  });
  return out;
};

/**
 * Run a token-related axios call and re-throw any failure as an ApiError so
 * callers can branch on `err.status` / `err.code` without re-inspecting the
 * raw axios shape.
 */
const tokenCall = async (fn) => {
  try {
    return await fn();
  } catch (err) {
    if (err?.api) throw err.api;
    throw normalizeApiError(err);
  }
};

export const createCounsellorToken = (payload) =>
  tokenCall(async () => {
    const res = await AuthAPI.post(
      "/counsellor/reference-tokens",
      cleanTokenPayload(payload)
    );
    return res.data.data;
  });

export const listCounsellorTokens = ({ includeInactive = false } = {}) =>
  tokenCall(async () => {
    const res = await AuthAPI.get("/counsellor/reference-tokens", {
      params: { includeInactive },
    });
    return res.data.data;
  });

export const createSchoolToken = (schoolId, payload) =>
  tokenCall(async () => {
    const res = await AuthAPI.post(
      `/counsellor/schools/${schoolId}/reference-tokens`,
      cleanTokenPayload(payload)
    );
    return res.data.data;
  });

export const listSchoolTokens = (
  schoolId,
  { includeInactive = false } = {}
) =>
  tokenCall(async () => {
    const res = await AuthAPI.get(
      `/counsellor/schools/${schoolId}/reference-tokens`,
      { params: { includeInactive } }
    );
    console.log(res.data.data);
    return res.data.data;
  });

export const extendToken = (tokenId, payload) =>
  tokenCall(async () => {
    const res = await AuthAPI.patch(
      `/counsellor/reference-tokens/${tokenId}/extend`,
      cleanTokenPayload(payload)
    );
    return res.data.data;
  });

export const updateTokenPrice = (tokenId, payload) =>
  tokenCall(async () => {
    const res = await AuthAPI.patch(
      `/counsellor/reference-tokens/${tokenId}/price`,
      cleanTokenPayload(payload)
    );
    return res.data.data;
  });

export const deactivateToken = (tokenId) =>
  tokenCall(async () => {
    const res = await AuthAPI.patch(
      `/counsellor/reference-tokens/${tokenId}/deactivate`
    );
    return res.data.data;
  });


/* -----------------------------
   Schools
----------------------------- */
export const getCounsellorSchools = async () => {
  const res = await AuthAPI.get('/counsellor/schools');
  return res.data.data;
};

export const createSchool = (payload) =>
  tokenCall(async () => {
    const res = await AuthAPI.post('/counsellor/schools', payload);
    return res.data.data;
  });

export const updateSchool = async (schoolId, payload) => {
  const res = await AuthAPI.patch(`/counsellor/schools/${schoolId}`, payload);
  return res.data.data;
};

/* -----------------------------
   School Students
----------------------------- */
export const getSchoolStudents = async (schoolId, params) => {
  const res = await AuthAPI.get(`/counsellor/schools/${schoolId}/students`, {
    params,
  });
  return res.data;
};

export const getDirectStudents = async (params) => {
  const res = await AuthAPI.get('/counsellor/schools/direct-students', {
    params,
  });
  return res.data;
  
};

export const assignStudentToSchool = async (schoolId, studentId) => {
  const res = await AuthAPI.post(
    `/counsellor/schools/${schoolId}/students/${studentId}`
  );
  return res.data.data;
};

/* -----------------------------
   School Reference Code
----------------------------- */
export const getSchoolReferenceCode = async (schoolId) => {
  const res = await AuthAPI.get(
    `/counsellor/schools/${schoolId}/reference-code`
  );
  return res.data.data;
};

export const rotateSchoolReferenceCode = async (schoolId) => {
  const res = await AuthAPI.post(
    `/counsellor/schools/${schoolId}/reference-code/rotate`
  );
  return res.data.data;
};

export const getBulkAssessmentStatus = async (userIds) => {
  const res = await API.post(
    "/assessment/assessment-progress/status/bulk",
    { userIds }
  );
  return res.data.data;
};

/* -----------------------------
   Pricing Config
----------------------------- */
export const getPricingConfig = async () => {
  const res = await API.get('/billing/pricing');
  return res.data.data;
};

export const savePricingConfig = async (payload) => {
  const res = await API.post('/billing/pricing', payload);
  return res.data.data;
};

export const togglePaymentEnabled = async (
  paymentEnabled
) => {
  const res = await API.patch(
    '/billing/pricing/payment-toggle',
    { paymentEnabled }
  );

  return res.data.data;
};

export const updateIndividualPrice = async (
  individualPrice
) => {
  const res = await API.patch(
    '/billing/pricing/individual-price',
    { individualPrice }
  );

  return res.data.data;
};

/* -----------------------------
   School Pricing
----------------------------- */
export const getSchoolPricingList = async () => {
  const res = await API.get('/billing/school-pricing');

  return res.data.data;
};

export const createSchoolPricing = async (payload) => {
  const res = await API.post(
    '/billing/school-pricing',
    payload
  );

  return res.data.data;
};

export const updateSchoolPricing = async (
  schoolPricingId,
  payload
) => {
  const res = await API.put(
    `/billing/school-pricing/${schoolPricingId}`,
    payload
  );

  return res.data.data;
};

export const deleteSchoolPricing = async (schoolPricingId) => {
  const res = await API.delete(
    `/billing/school-pricing/${schoolPricingId}`
  );

  return res.data.data;
};