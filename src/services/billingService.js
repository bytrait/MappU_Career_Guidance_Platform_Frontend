import API from "./axiosInstance";


export const getCreditSummary = async () => {
  const res = await API.get("/billing/credits/summary");
  return res.data.data;
};
export const getCreditHistory = async ({ page, limit, type }) => {
  const query = new URLSearchParams({
    page,
    limit,
    ...(type && { type })
  });

  const res = await API.get(
    `/billing/credits/history?${query.toString()}`
  );

  return res.data;
};

export const getPaymentHistory = async ({ page, limit }) => {
  const res = await API.get(
    `/billing/payments/history?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const createOrder = async ({ studentCount }) => {
  const res = await API.post("/billing/payments/create-order", {
    studentCount
  });
  return res.data;
};

export const getPaymentStatus = async (orderId) => {
  const res = await API.get(
    `/billing/payment/status/${orderId}`
  );
  return res.data.data;
};