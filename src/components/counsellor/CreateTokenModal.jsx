import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  createCounsellorToken,
  createSchoolToken,
} from "../../services/counsellorService";
import {
  bucketTokenApiError,
  CODE_REGEX,
  dateInputToIso,
  dateInputToIsoEndOfDay,
  sanitizeCodeInput,
  suggestCode,
  todayInputValue,
  validateCode,
} from "../../utils/referenceTokens";

const LABEL_MAX = 60;
const CURRENCY_OPTIONS = ["INR", "USD", "EUR", "GBP", "AED"];

/**
 * Shared modal for creating a counsellor OR school token.
 *
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - onCreated: (token) => void  (called after a successful create)
 *  - scope: 'counsellor' | 'school'
 *  - schoolId?: string           (required when scope === 'school')
 */
const CreateTokenModal = ({
  open,
  onClose,
  onCreated,
  scope = "counsellor",
  schoolId,
}) => {
  const [code, setCode] = useState("");
  const [label, setLabel] = useState("");
  const [startDate, setStartDate] = useState(todayInputValue());
  const [expiryDate, setExpiryDate] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");

  const [submitting, setSubmitting] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [currencyError, setCurrencyError] = useState("");
  const [formError, setFormError] = useState("");

  const today = useMemo(() => todayInputValue(), []);

  useEffect(() => {
    if (open) {
      setCode("");
      setLabel("");
      setStartDate(today);
      setExpiryDate("");
      setPrice("");
      setCurrency("INR");
      setCodeError("");
      setExpiryError("");
      setPriceError("");
      setCurrencyError("");
      setFormError("");
      setSubmitting(false);
    }
  }, [open, today]);

  if (!open) return null;

  const priceTrimmed = price.trim();
  const priceProvided = priceTrimmed !== "";
  const priceNumber = priceProvided ? Number(priceTrimmed) : null;

  const clearErrors = () => {
    setCodeError("");
    setExpiryError("");
    setPriceError("");
    setCurrencyError("");
    setFormError("");
  };

  const handleCodeChange = (e) => {
    setCode(sanitizeCodeInput(e.target.value));
    if (codeError) setCodeError("");
  };

  const handleSuggest = () => {
    setCode(suggestCode());
    if (codeError) setCodeError("");
  };

  // Client-side validation — we still always defer to the API for the final
  // word (especially the uniqueness check, which only the server can do).
  const clientValidate = () => {
    const codeIssue = validateCode(code);
    if (codeIssue) {
      setCodeError(codeIssue);
      return false;
    }
    if (label.length > LABEL_MAX) {
      setFormError(`Label must be ${LABEL_MAX} characters or fewer.`);
      return false;
    }
    if (expiryDate && startDate && expiryDate <= startDate) {
      setExpiryError("Expiry date must be after the start date.");
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

    if (scope === "school" && !schoolId) {
      setFormError("Missing school id.");
      return;
    }

    const payload = {
      code: code.trim(),
      label: label.trim() || undefined,
      startDate: dateInputToIso(startDate),
      expiryDate: dateInputToIsoEndOfDay(expiryDate),
      price: priceProvided ? priceNumber : undefined,
      currency: priceProvided ? currency : undefined,
    };

    try {
      setSubmitting(true);

      const token =
        scope === "school"
          ? await createSchoolToken(schoolId, payload)
          : await createCounsellorToken(payload);

      toast.success(`Token created — share code ${token.code}`);
      onCreated?.(token);
      onClose?.();
    } catch (err) {
      const bucket = bucketTokenApiError(err);
      // 401/403/5xx are already toasted globally by the axios interceptor.
      if (bucket.silent) return;
      if (bucket.field === "code") setCodeError(bucket.message);
      else if (bucket.field === "expiry") setExpiryError(bucket.message);
      else if (bucket.field === "price") setPriceError(bucket.message);
      else if (bucket.field === "currency") setCurrencyError(bucket.message);
      else if (bucket.toast) {
        toast.error(bucket.toast);
        setFormError(bucket.toast);
      } else if (bucket.form) setFormError(bucket.form);
      else setFormError(bucket.message || "Failed to create token.");
    } finally {
      setSubmitting(false);
    }
  };

  const codeLooksValid =
    code.length === 0 || CODE_REGEX.test(code);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl"
      >
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">
            Generate new token
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {scope === "school"
              ? "Issue a new reference token for this school."
              : "Issue a new reference token for direct student onboarding."}
          </p>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Reference code */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">
                Reference code{" "}
                <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleSuggest}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Suggest
              </button>
            </div>
            <input
              type="text"
              value={code}
              onChange={handleCodeChange}
              placeholder="e.g. SVPM26"
              autoComplete="off"
              maxLength={20}
              style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}
              className={`w-full font-mono border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 ${
                codeError
                  ? "border-red-300 focus:ring-red-300"
                  : "border-slate-200 focus:ring-indigo-500"
              }`}
            />
            <p
              className={`text-xs mt-1 ${
                codeError
                  ? "text-red-600"
                  : codeLooksValid
                  ? "text-slate-400"
                  : "text-amber-600"
              }`}
            >
              {codeError ||
                "4–20 characters, letters and numbers only."}
            </p>
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Label{" "}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value.slice(0, LABEL_MAX))}
              placeholder="e.g. Q3 cohort"
              maxLength={LABEL_MAX}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-slate-400 mt-1">
              {label.length}/{LABEL_MAX}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Start date
              </label>
              <input
                type="date"
                value={startDate}
                min={today}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (expiryError) setExpiryError("");
                }}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Expiry date{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="date"
                value={expiryDate}
                min={startDate || today}
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
          </div>

          {/* Price + currency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Price{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
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
                  placeholder="Leave blank for free"
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 ${
                    priceError
                      ? "border-red-300 focus:ring-red-300"
                      : "border-slate-200 focus:ring-indigo-500"
                  }`}
                />
              </div>
              <p
                className={`text-xs mt-1 ${
                  priceError ? "text-red-600" : "text-slate-400"
                }`}
              >
                {priceError ||
                  "Price is stored in the billing service. Leave blank for free."}
              </p>
            </div>

            {priceProvided && (
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
            )}
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
            {submitting ? "Generating…" : "Generate token"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTokenModal;
