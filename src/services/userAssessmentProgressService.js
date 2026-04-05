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