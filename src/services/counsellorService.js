import AuthAPI from './authAxiosInstance';
import API from "./axiosInstance";


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
   Schools
----------------------------- */
export const getCounsellorSchools = async () => {
  const res = await AuthAPI.get('/counsellor/schools');
  return res.data.data;
};

export const createSchool = async (payload) => {
  const res = await AuthAPI.post('/counsellor/schools', payload);
  return res.data.data;
};

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