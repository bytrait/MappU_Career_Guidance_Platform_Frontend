import { useEffect, useState } from "react";
import { toast } from "sonner";

import { updateTokenPrice } from "../../services/counsellorService";
import { bucketTokenApiError } from "../../utils/referenceTokens";

const CURRENCY_OPTIONS = ["INR", "USD", "EUR", "GBP", "AED"];

/**
 * Lightweight modal for changing JUST the price of a token. Hits the new
 * `PATCH /reference-tokens/:tokenId/price` endpoint — DO NOT use the extend
 * modal to re-price.
 *
 * Props:
 *  - open: boolean
 *  - token: ReferenceToken | null
 *  - onClose: () => void
 *  - onUpdated: (response) => void   response = { tokenId, code, price, currency }
 */
const EditPriceModal = ({ open, token, onClose, onUpdated }) => {
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");

  const [submitting, setSubmitting] = useState(false);
  const [priceError, setPriceError] = useState("");
  const [currencyError, setCurrencyError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (open) {
      const existing =
        token?.price != null && token?.price !== ""
          ? String(token.price)
          : "";
      setPrice(existing);
      setCurrency(token?.currency || "INR");
      setSubmitting(false);
      setPriceError("");
      setCurrencyError("");
      setFormError("");
    }
  }, [open, token?.id, token?.currency, token?.price]);

  if (!open || !token) return null;

  const priceTrimmed = price.trim();
  const priceNumber = priceTrimmed === "" ? null : Number(priceTrimmed);

  const clearErrors = () => {
    setPriceError("");
    setCurrencyError("");
    setFormError("");
  };

  const clientValidate = () => {
    if (priceTrimmed === "") {
      setPriceError("Price is required.");
      return false;
    }
    if (!Number.isFinite(priceNumber) || priceNumber < 0) {
      setPriceError("Price must be a non-negative number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    clearErrors();
    if (!clientValidate()) return;

    try {
      setSubmitting(true);
      const updated = await updateTokenPrice(token.id, {
        price: priceNumber,
        currency,
      });
      toast.success("Price updated");
      onUpdated?.(updated);
      onClose?.();
    } catch (err) {
      const bucket = bucketTokenApiError(err);
      if (bucket.silent) return;
      if (bucket.field === "price") setPriceError(bucket.message);
      else if (bucket.field === "currency") setCurrencyError(bucket.message);
      else if (bucket.toast) {
        toast.error(bucket.toast);
        setFormError(bucket.toast);
      } else if (bucket.form) setFormError(bucket.form);
      else setFormError(bucket.message || "Failed to update price.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl w-full max-w-md shadow-xl"
      >
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Edit price</h2>
          <p className="text-sm text-slate-500 mt-1">
            Token{" "}
            <span className="font-mono font-semibold text-slate-800">
              {token.code}
            </span>
            {token.label ? ` · ${token.label}` : ""}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            This only updates the billing service — the token's dates and
            active state are untouched.
          </p>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {currency === "INR" ? "₹" : currency}
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    if (priceError) setPriceError("");
                  }}
                  placeholder="e.g. 799"
                  autoFocus
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 ${
                    priceError
                      ? "border-red-300 focus:ring-red-300"
                      : "border-slate-200 focus:ring-indigo-500"
                  }`}
                />
              </div>
              {priceError && (
                <p className="text-xs text-red-600 mt-1">{priceError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  if (currencyError) setCurrencyError("");
                }}
                className={`w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 ${
                  currencyError
                    ? "border-red-300 focus:ring-red-300"
                    : "border-slate-200 focus:ring-indigo-500"
                }`}
              >
                {CURRENCY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {currencyError && (
                <p className="text-xs text-red-600 mt-1">{currencyError}</p>
              )}
            </div>
          </div>

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {formError}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {submitting ? "Saving…" : "Save price"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPriceModal;
