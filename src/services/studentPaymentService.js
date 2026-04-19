// frontend/src/services/studentPaymentService.js

import API from './axiosInstance';

export const getStudentPaymentStatus = async () => {
  const res = await API.get('/billing/student-payment/status');
  return res.data.data;
};

export const createStudentPaymentOrder = async () => {
  const res = await API.post('/billing/student-payment/create-order');
  return res.data.data;
};

export const verifyStudentPayment = async (payload) => {
  const res = await API.post('/billing/student-payment/verify', payload);
  return res.data.data;
};