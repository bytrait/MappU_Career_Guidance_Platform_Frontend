import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { extendToken } from "../../services/counsellorService";
import {
  bucketTokenApiError,
  dateInputToIsoEndOfDay,
  getTokenStatus,
  todayInputValue,
} from "../../utils/referenceTokens";

const CURRENCY_OPTIONS = ["INR", "USD", "EUR", "GBP", "AED"];

/**
 * Modal for extending (and optionally re-billing) a token.
 * Works for both counsellor and school tokens — the endpoint is the same.
 *
 * Props:
 *  - open: boolean
 *  - token: ReferenceToken | null
 *  - onClose: () => void
 *  - onExtended: (token) => void
 */
const ExtendTokenModal = ({ open, token, onClose, onExtended }) => {
  const today = useMemo(() => todayInputValue(), []);

  const [expiryDate, setExpiryDate] = useState("");
  const [rebill, setRebill] = useState(false);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");

  const [submitting, setSubmitting] = useState(false);
  const [expiryError, setExpiryError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (open) {
      setExpiryDate("");
      setRebill(false);
      setPrice("");
      setCurrency("INR");
      setExpiryError("");
      setPriceError("");
      setFormError("");
      setSubmitting(false);
    }
  }, [open, token?.id]);

  if (!open || !token) return null;

  const willReactivate = getTokenStatus(token) !== "ACTIVE";

  const priceTrimmed = price.trim();
  const priceProvided = rebill && priceTrimmed !== "";
  const priceNumber = priceProvided ? Number(priceTrimmed) : null;

  const clearErrors = () => {
    setExpiryError("");
    setPriceError("");
    setFormError("");
  };

  const clientValidate = () => {
    if (!expiryDate) {
      setExpiryError("New expiry date is required.");
      return false;
    }
    if (expiryDate <= today) {
      setExpiryError("New expiry date must be in the future.");
      return false;
    }
    // Mirror the server rule: must also be strictly after token.startDate.
    if (token.startDate) {
      const start = new Date(token.startDate);
      // Compare on a date-only basis since `expiryDate` is yyyy-mm-dd.
      const startDay = new Date(
        Date.UTC(
          start.getUTCFullYear(),
          start.getUTCMonth(),
          start.getUTCDate()
        )
      );
      const expiryDay = new Date(`${expiryDate}T00:00:00.000Z`);
      if (expiryDay <= startDay) {
        setExpiryError(
          "New expiry date must be after the token's start date."
        );
        return false;
      }
    }
    if (rebill && priceTrimmed === "") {
      setPriceError("Enter a price or uncheck Re-bill.");
      return false;
    }
    if (
      priceProvided &&
      (!Number.isFinite(priceNumber) || priceNumber < 0)
    ) {
      setPriceError("Price must be a non-negative number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    clearErrors();
    if (!clientValidate()) return;

    const payload = {
      expiryDate: dateInputToIsoEndOfDay(expiryDate),
    };
    if (rebill) {
      payload.price = priceNumber;
      payload.currency = currency;
    }

    try {
      setSubmitting(true);
      // The response is the AUTHORITATIVE state — including the case where
      // billing rolled back the expiry change. Never optimistically keep the
      // user-typed value here.
      const updated = await extendToken(token.id, payload);
      toast.success(`Token ${updated?.code || token.code} extended`);
      onExtended?.(updated);
      onClose?.();
    } catch (err) {
      const bucket = bucketTokenApiError(err);
      if (bucket.silent) return; // 401/403/5xx — interceptor toasted already
      if (bucket.field === "expiry") setExpiryError(bucket.message);
      else if (bucket.field === "price") setPriceError(bucket.message);
      else if (bucket.toast) {
        toast.error(bucket.toast);
        setFormError(bucket.toast);
      } else if (bucket.form) setFormError(bucket.form);
      else setFormError(bucket.message || "Failed to extend token.");
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
          <h2 className="text-lg font-semibold text-slate-900">
            Extend token
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Token{" "}
            <span className="font-mono font-semibold text-slate-800">
              {token.code}
            </span>
            {token.label ? ` · ${token.label}` : ""}
          </p>
          {willReactivate && (
            <p className="text-xs text-blue-700 mt-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
              This will reactivate the token.
            </p>
          )}
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              New expiry date
            </label>
            <input
              type="date"
              value={expiryDate}
              min={today}
              onChange={(e) => {
                setExpiryDate(e.target.value);
                if (expiryError) setExpiryError("");
              }}
              className={`w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 ${
                expiryError
                  ? "border-red-300 focus:ring-red-300"
                  : "border-slate-200 focus:ring-indigo-500"
              }`}
            />
            {expiryError && (
              <p className="text-xs text-red-600 mt-1">{expiryError}</p>
            )}
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={rebill}
              onChange={(e) => setRebill(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-slate-700">
              Re-bill (charge a new price for the extension)
            </span>
          </label>

          {rebill && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price
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
                    placeholder="e.g. 599"
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
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CURRENCY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

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
            {submitting ? "Extending…" : "Extend token"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExtendTokenModal;
