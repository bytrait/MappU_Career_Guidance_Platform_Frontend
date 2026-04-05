import API from './axiosInstance';

export const fetchAssessmentQuestions = async (assessmentType ) => {
  const response = await API.get(`/assessment/questions`, {
    params: { assessmentType },
  });
  return response.data.data;
};

export const submitScores = (scoreData) => {
  return API.post('/assessment/submit-scores', scoreData);
};

export const getScores = () => {
  return API.get('/assessment/scores');
};