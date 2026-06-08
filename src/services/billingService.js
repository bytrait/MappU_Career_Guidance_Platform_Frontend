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

const PRICE_BATCH_SIZE = 100;

/**
 * Batch-read reference token prices from billing (system of record).
 * @param {string[]} tokenIds
 * @returns {Promise<Array<{ tokenId: string, price: number|null, currency: string|null }>>}
 */
export const getReferenceTokenPricesBatch = async (tokenIds = []) => {
  const ids = [...new Set(tokenIds.filter(Boolean))];
  if (!ids.length) return [];

  const all = [];
  for (let i = 0; i < ids.length; i += PRICE_BATCH_SIZE) {
    const chunk = ids.slice(i, i + PRICE_BATCH_SIZE);
    const res = await API.post("/billing/reference-tokens/prices/batch", {
      tokenIds: chunk,
    });
    const data = res.data?.data ?? res.data;
    if (Array.isArray(data)) all.push(...data);
  }
  return all;
};