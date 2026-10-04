import API from './axiosInstance';

export async function fetchUserProgress() {
  const res = await API.get(`/assessment/assessment-progress`);
  return res.data.data;
}

export async function startUserProgress(stage) {
  const res = await API.post('/assessment/assessment-progress/start', { stage });
  return res.data.data;
}

export async function updateUserProgress(stage) {
  const res = await API.patch('/assessment/assessment-progress/update', { stage });
  return res.data.data;
}

export async function completeUserProgress() {
  const res = await API.patch('/assessment/assessment-progress/complete');
  return res.data.data;
}


export async function fetchUserDetailsById() {
  const res = await API.get(`/assessment/assessment-progress/user`);
  return res.data.data.data;
}

export async function fetchAssessmentState(assessmentType) {
  const res = await API.get('/assessment/assessment-progress/state', {
    params: { assessmentType },
  });
  return res.data.data;
}

export async function saveAssessmentState(payload) {
  const res = await API.put('/assessment/assessment-progress/state', payload);
  return res.data.data;
}

export async function clearAssessmentState(assessmentType) {
  const res = await API.delete('/assessment/assessment-progress/state', {
    params: { assessmentType },
  });
  return res.data;
}