import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  getCounsellorSchools,
  createSchool,
  updateSchool,
  getPricingConfig,
  togglePaymentEnabled,
  listSchoolTokens,
} from "../../services/counsellorService";
import Spinner from "../../components/common/Spinner";
import {
  bucketTokenApiError,
  CODE_REGEX,
  countActiveTokens,
  dateInputToIso,
  dateInputToIsoEndOfDay,
  sanitizeCodeInput,
  suggestCode,
  todayInputValue,
  validateCode,
} from "../../utils/referenceTokens";

const TOKEN_CURRENCY = "INR";

const CounsellorSchools = () => {
  const navigate = useNavigate();

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const [tokenCode, setTokenCode] = useState("");
  const [tokenCodeError, setTokenCodeError] = useState("");

  const [tokenOpen, setTokenOpen] = useState(false);
  const [tokenLabel, setTokenLabel] = useState("");
  const [tokenStartDate, setTokenStartDate] = useState(todayInputValue());
  const [tokenExpiryDate, setTokenExpiryDate] = useState("");
  const [tokenExpiryError, setTokenExpiryError] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [tokenPriceError, setTokenPriceError] = useState("");

  const [activeTokenCounts, setActiveTokenCounts] = useState({});

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const [paymentEnabled, setPaymentEnabled] = useState(true);
  const [togglingPayment, setTogglingPayment] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const fetchActiveTokenCounts = async (list) => {
    const entries = await Promise.all(
      list.map(async (school) => {
        try {
          const tokens = await listSchoolTokens(school.id, {
            includeInactive: false,
          });
          return [school.id, countActiveTokens(tokens)];
        } catch {
          return [school.id, 0];
        }
      })
    );
    setActiveTokenCounts(Object.fromEntries(entries));
  };

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const data = await getCounsellorSchools();
      setSchools(data);
      fetchActiveTokenCounts(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentSetting = async () => {
    try {
      const data = await getPricingConfig();
      setPaymentEnabled(data?.paymentEnabled ?? true);
    } catch (error) {
      console.error("Failed to load payment setting", error);
    }
  };

  useEffect(() => {
    fetchSchools();
    fetchPaymentSetting();
  }, []);

  const resetCreateSchoolForm = () => {
    setName("");
    setTokenCode("");
    setTokenCodeError("");
    setTokenOpen(false);
    setTokenLabel("");
    setTokenStartDate(todayInputValue());
    setTokenExpiryDate("");
    setTokenExpiryError("");
    setTokenPrice("");
    setTokenPriceError("");
    setCreateError("");
  };

  const clearCreateSchoolErrors = () => {
    setTokenCodeError("");
    setTokenExpiryError("");
    setTokenPriceError("");
    setCreateError("");
  };

  const handleCreate = async () => {
    clearCreateSchoolErrors();

    if (!name.trim()) {
      setCreateError("School name is required.");
      return;
    }

    const codeIssue = validateCode(tokenCode);
    if (codeIssue) {
      setTokenCodeError(codeIssue);
      return;
    }

    if (
      tokenExpiryDate &&
      tokenStartDate &&
      tokenExpiryDate <= tokenStartDate
    ) {
      setTokenExpiryError("Expiry date must be after the start date.");
      return;
    }

    const priceTrimmed = tokenPrice.trim();
    const priceNumber = priceTrimmed === "" ? null : Number(priceTrimmed);
    if (
      priceTrimmed !== "" &&
      (!Number.isFinite(priceNumber) || priceNumber < 0)
    ) {
      setTokenPriceError("Price must be a non-negative number.");
      return;
    }

    const payload = {
      name: name.trim(),
      tokenCode: tokenCode.trim(),
    };

    if (tokenLabel.trim()) payload.tokenLabel = tokenLabel.trim();
    const startIso = dateInputToIso(tokenStartDate);
    if (startIso) payload.tokenStartDate = startIso;
    const expiryIso = dateInputToIsoEndOfDay(tokenExpiryDate);
    if (expiryIso) payload.tokenExpiryDate = expiryIso;
    if (priceTrimmed !== "") {
      payload.price = priceNumber;
      payload.currency = TOKEN_CURRENCY;
    }

    try {
      setCreating(true);
      const created = await createSchool(payload);

      resetCreateSchoolForm();
      fetchSchools();

      if (created?.referenceToken?.code) {
        showSuccess(
          `School created — first token ${created.referenceToken.code} is ready`
        );
      } else {
        showSuccess("School created successfully");
      }
    } catch (error) {
      const bucket = bucketTokenApiError(error);
      if (bucket.silent) {
        setCreateError("Couldn't create the school. Try again in a moment.");
        return;
      }
      if (bucket.field === "code") setTokenCodeError(bucket.message);
      else if (bucket.field === "expiry") setTokenExpiryError(bucket.message);
      else if (bucket.field === "price") setTokenPriceError(bucket.message);
      else if (bucket.toast) {
        toast.error(bucket.toast);
        setCreateError(bucket.toast);
      } else if (bucket.form) {
        setCreateError(bucket.form);
        toast.error(bucket.form);
      } else {
        setCreateError(bucket.message || "Failed to create school.");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateName = async (schoolId) => {
    if (!editName.trim()) return;

    try {
      setUpdatingId(schoolId);
      await updateSchool(schoolId, { name: editName });

      setSchools((prev) =>
        prev.map((school) =>
          school.id === schoolId ? { ...school, name: editName } : school
        )
      );

      setEditingId(null);
      setEditName("");
      showSuccess("School updated successfully");
    } catch (error) {
      console.error("Failed to update school", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleActive = async (school) => {
    try {
      setUpdatingId(school.id);
      const updated = await updateSchool(school.id, {
        isActive: !school.isActive,
      });

      setSchools((prev) =>
        prev.map((item) =>
          item.id === school.id
            ? { ...item, isActive: updated.isActive }
            : item
        )
      );

      showSuccess(
        updated.isActive
          ? "School activated successfully"
          : "School deactivated successfully"
      );
    } catch (error) {
      console.error("Failed to toggle school", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleTogglePayment = async () => {
    try {
      setTogglingPayment(true);
      const updated = await togglePaymentEnabled(!paymentEnabled);
      setPaymentEnabled(updated.paymentEnabled);
      showSuccess(
        updated.paymentEnabled
          ? "Payments enabled successfully"
          : "Payments disabled successfully"
      );
    } catch (error) {
      console.error("Failed to toggle payment setting", error);
    } finally {
      setTogglingPayment(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-8">
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4 text-sm font-medium">
          {successMessage}
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Schools
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl">
            Create schools, manage reference tokens, and control student
            payment access. Token prices are set per reference code.
          </p>
        </div>

        {/* <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 shadow-sm shrink-0">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Student payments
            </p>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">
              {paymentEnabled ? "Enabled" : "Disabled"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleTogglePayment}
            disabled={togglingPayment}
            aria-label="Toggle student payments"
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition shrink-0 ${
              paymentEnabled ? "bg-indigo-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                paymentEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Add new school
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Requires a first reference code. Set token price in optional
                settings or later from the school&apos;s Tokens tab.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  School name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delhi Public School"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700">
                    First reference code{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setTokenCode(suggestCode(name));
                      if (tokenCodeError) setTokenCodeError("");
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Suggest
                  </button>
                </div>
                <input
                  type="text"
                  value={tokenCode}
                  onChange={(e) => {
                    setTokenCode(sanitizeCodeInput(e.target.value));
                    if (tokenCodeError) setTokenCodeError("");
                  }}
                  placeholder="e.g. DPS2026"
                  maxLength={20}
                  autoComplete="off"
                  style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}
                  className={`w-full font-mono border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 ${
                    tokenCodeError
                      ? "border-red-300 focus:ring-red-300"
                      : "border-slate-200 focus:ring-indigo-500"
                  }`}
                />
                <p
                  className={`text-xs mt-1 ${
                    tokenCodeError
                      ? "text-red-600"
                      : tokenCode === "" || CODE_REGEX.test(tokenCode)
                      ? "text-slate-400"
                      : "text-amber-600"
                  }`}
                >
                  {tokenCodeError ||
                    "4–20 characters, letters and numbers only."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setTokenOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-slate-700 bg-slate-50/80 hover:bg-slate-50 transition"
              >
                <span>
                  Initial token settings{" "}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </span>
                <span className="text-indigo-600 text-lg leading-none">
                  {tokenOpen ? "−" : "+"}
                </span>
              </button>

              {tokenOpen && (
                <div className="px-4 pb-4 pt-3 space-y-4 border-t border-slate-100 bg-white">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={tokenLabel}
                      onChange={(e) =>
                        setTokenLabel(e.target.value.slice(0, 60))
                      }
                      placeholder="e.g. Default 2026"
                      maxLength={60}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Start date
                      </label>
                      <input
                        type="date"
                        value={tokenStartDate}
                        min={todayInputValue()}
                        onChange={(e) => setTokenStartDate(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Expiry date
                      </label>
                      <input
                        type="date"
                        value={tokenExpiryDate}
                        min={tokenStartDate || todayInputValue()}
                        onChange={(e) => {
                          setTokenExpiryDate(e.target.value);
                          if (tokenExpiryError) setTokenExpiryError("");
                        }}
                        className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                          tokenExpiryError
                            ? "border-red-300 focus:ring-red-300"
                            : "border-slate-200 focus:ring-indigo-500"
                        }`}
                      />
                      {tokenExpiryError && (
                        <p className="text-xs text-red-600 mt-1">
                          {tokenExpiryError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Price <span className="text-slate-400">(INR, optional)</span>
                    </label>
                    <div className="relative max-w-xs">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={tokenPrice}
                        onChange={(e) => {
                          setTokenPrice(e.target.value);
                          if (tokenPriceError) setTokenPriceError("");
                        }}
                        placeholder="Leave blank for free"
                        className={`w-full pl-8 pr-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                          tokenPriceError
                            ? "border-red-300 focus:ring-red-300"
                            : "border-slate-200 focus:ring-indigo-500"
                        }`}
                      />
                    </div>
                    {tokenPriceError && (
                      <p className="text-xs text-red-600 mt-1">
                        {tokenPriceError}
                      </p>
                    )}
                    <p className="text-xs text-slate-400 mt-1.5">
                      Synced to billing when the school is created.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {createError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {createError}
              </div>
            )}

            <button
              type="button"
              onClick={handleCreate}
              disabled={creating}
              className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 shadow-sm shadow-indigo-600/20"
            >
              {creating ? "Creating…" : "Create school"}
            </button>
          </div>
        </div>

        <div className="xl:col-span-2 bg-gradient-to-br from-slate-50 to-indigo-50/50 border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
            How pricing works
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex gap-2">
              <span className="text-indigo-600 font-bold">1.</span>
              Each reference token can have its own price in INR.
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-600 font-bold">2.</span>
              Set price when creating a school or from the school Tokens tab.
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-600 font-bold">3.</span>
              Students pay the price linked to the code they use at signup.
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Your schools
          <span className="ml-2 text-sm font-normal text-slate-500">
            ({schools.length})
          </span>
        </h2>

        {schools.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center">
            <p className="text-slate-600 font-medium">No schools yet</p>
            <p className="text-sm text-slate-400 mt-1">
              Create your first school using the form above.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {schools.map((school) => (
              <div
                key={school.id}
                className={`bg-white border rounded-2xl p-5 sm:p-6 transition-all ${
                  school.isActive
                    ? "border-slate-200 shadow-sm"
                    : "border-slate-200 opacity-60"
                }`}
              >
                {editingId === school.id ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleUpdateName(school.id)}
                      disabled={updatingId === school.id}
                      className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setEditName("");
                      }}
                      className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/counsellor/schools/${school.id}`)
                          }
                          className="text-lg font-semibold text-slate-900 hover:text-indigo-600 transition text-left truncate"
                        >
                          {school.name}
                        </button>

                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            school.isActive
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {school.isActive ? "Active" : "Inactive"}
                        </span>

                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">
                          {activeTokenCounts[school.id] ?? 0} active{" "}
                          {(activeTokenCounts[school.id] ?? 0) === 1
                            ? "token"
                            : "tokens"}
                        </span>
                      </div>

                      <p className="text-sm text-slate-500 mt-2">
                        {school.studentsCount || 0} students enrolled
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/counsellor/schools/${school.id}`)
                        }
                        className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition"
                      >
                        Manage
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(school.id);
                          setEditName(school.name);
                        }}
                        className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
                      >
                        Edit name
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleActive(school)}
                        disabled={updatingId === school.id}
                        aria-label={
                          school.isActive
                            ? "Deactivate school"
                            : "Activate school"
                        }
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                          school.isActive ? "bg-indigo-600" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                            school.isActive
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CounsellorSchools;
