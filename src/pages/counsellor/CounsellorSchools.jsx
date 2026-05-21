import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCounsellorSchools,
  createSchool,
  updateSchool,
  getPricingConfig,
  updateIndividualPrice,
  togglePaymentEnabled,
  createSchoolPricing,
  updateSchoolPricing,
} from "../../services/counsellorService";
import Spinner from "../../components/common/Spinner";

const CounsellorSchools = () => {
  const navigate = useNavigate();

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const [individualPrice, setIndividualPrice] = useState("");
  const [savedIndividualPrice, setSavedIndividualPrice] = useState("");
  const [paymentEnabled, setPaymentEnabled] = useState(true);

  const [schoolPriceMap, setSchoolPriceMap] = useState({});
  const [savingPriceId, setSavingPriceId] = useState(null);
  const [savingIndividualPrice, setSavingIndividualPrice] = useState(false);
  const [togglingPayment, setTogglingPayment] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const activeSchoolsCount = useMemo(
    () => schools.filter((school) => school.isActive).length,
    [schools]
  );

  const totalStudents = useMemo(
    () =>
      schools.reduce(
        (total, school) => total + (school.studentsCount || 0),
        0
      ),
    [schools]
  );

  const showSuccess = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const data = await getCounsellorSchools();
      setSchools(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchPricingConfig = async () => {
    try {
      const data = await getPricingConfig();

      const individual = data?.individualPrice || "";

      setPaymentEnabled(data?.paymentEnabled ?? true);
      setIndividualPrice(individual);
      setSavedIndividualPrice(individual);

      const schoolPriceLookup = {};

      if (data?.schoolPrices?.length) {
        data.schoolPrices.forEach((item) => {
          schoolPriceLookup[item.schoolId] = {
            id: item.id,
            amount: item.amount,
            savedAmount: item.amount,
          };
        });
      }

      setSchoolPriceMap(schoolPriceLookup);
    } catch (error) {
      console.error("Failed to load pricing config", error);
    }
  };

  useEffect(() => {
    fetchSchools();
    fetchPricingConfig();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      setCreating(true);
      await createSchool({ name });
      setName("");
      fetchSchools();
      showSuccess("School created successfully");
    } catch (error) {
      console.error("Failed to create school", error);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateName = async (schoolId) => {
    if (!editName.trim()) return;

    try {
      setUpdatingId(schoolId);

      await updateSchool(schoolId, {
        name: editName,
      });

      setSchools((prev) =>
        prev.map((school) =>
          school.id === schoolId
            ? { ...school, name: editName }
            : school
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

  const handleSaveIndividualPrice = async () => {
    try {
      setSavingIndividualPrice(true);

      const updated = await updateIndividualPrice(
        Number(individualPrice)
      );

      setIndividualPrice(updated.individualPrice || "");
      setSavedIndividualPrice(updated.individualPrice || "");

      showSuccess("Individual pricing updated successfully");
    } catch (error) {
      console.error("Failed to update individual price", error);
    } finally {
      setSavingIndividualPrice(false);
    }
  };

  const handleTogglePayment = async () => {
    try {
      setTogglingPayment(true);

      const updated = await togglePaymentEnabled(
        !paymentEnabled
      );

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

  const handleSaveSchoolPrice = async (school) => {
    try {
      setSavingPriceId(school.id);

      const currentAmount = Number(
        schoolPriceMap[school.id]?.amount || 0
      );

      const existingPricing = schoolPriceMap[school.id];

      if (existingPricing?.id) {
        const updated = await updateSchoolPricing(
          existingPricing.id,
          {
            amount: currentAmount,
          }
        );

        setSchoolPriceMap((prev) => ({
          ...prev,
          [school.id]: {
            id: updated.id,
            amount: updated.amount,
            savedAmount: updated.amount,
          },
        }));
      } else {
        const created = await createSchoolPricing({
          schoolId: school.id,
          schoolName: school.name,
          amount: currentAmount,
        });

        setSchoolPriceMap((prev) => ({
          ...prev,
          [school.id]: {
            id: created.id,
            amount: created.amount,
            savedAmount: created.amount,
          },
        }));
      }

      showSuccess(`${school.name} pricing updated successfully`);
    } catch (error) {
      console.error("Failed to save school price", error);
    } finally {
      setSavingPriceId(null);
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

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Schools & Pricing
          </h1>
          <p className="text-slate-500 mt-2">
            Manage school-wise pricing and direct student pricing
            for your reference codes.
          </p>
        </div>

        {/* <div className="flex flex-wrap gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 min-w-[140px]">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Active Schools
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {activeSchoolsCount}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 min-w-[140px]">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total Students
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {totalStudents}
            </p>
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 text-sm font-medium">
                Direct Reference Code
              </div>

              <h2 className="text-2xl font-bold mt-4">
                Individual Student Pricing
              </h2>

              <p className="text-indigo-100 mt-2">
                Students using your direct counsellor reference code
                will be charged this amount during registration.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-xs">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={individualPrice}
                    onChange={(e) =>
                      setIndividualPrice(e.target.value)
                    }
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-4 py-3 rounded-2xl bg-white text-slate-900 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <button
                  onClick={handleSaveIndividualPrice}
                  disabled={
                    savingIndividualPrice ||
                    Number(individualPrice) ===
                      Number(savedIndividualPrice)
                  }
                  className="px-6 py-3 rounded-2xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition disabled:opacity-50"
                >
                  {savingIndividualPrice
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>

              {savedIndividualPrice !== "" && (
                <p className="text-sm text-indigo-100 mt-3">
                  Current saved price: ₹{savedIndividualPrice}
                </p>
              )}
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 min-w-[220px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-100">
                    Payment Status
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    {paymentEnabled ? "Enabled" : "Disabled"}
                  </p>
                </div>

                <button
                  onClick={handleTogglePayment}
                  disabled={togglingPayment}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                    paymentEnabled
                      ? "bg-emerald-400"
                      : "bg-white/30"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                      paymentEnabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <p className="text-xs text-indigo-100 mt-4 leading-relaxed">
                Disable payment if you want to allow free student
                registrations temporarily.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Add New School
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Create a school and configure its registration pricing.
          </p>

          <div className="mt-5 space-y-4">
            <input
              type="text"
              placeholder="Enter school name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={handleCreate}
              disabled={creating}
              className="w-full px-5 py-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create School"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {schools.map((school) => {
          const schoolPricing = schoolPriceMap[school.id];

          return (
            <div
              key={school.id}
              className={`bg-white border rounded-3xl p-6 transition-all ${
                school.isActive
                  ? "border-slate-200 shadow-sm"
                  : "border-slate-200 opacity-60"
              }`}
            >
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                <div className="flex-1">
                  {editingId === school.id ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />

                      <button
                        onClick={() => handleUpdateName(school.id)}
                        disabled={updatingId === school.id}
                        className="px-5 py-3 bg-indigo-600 text-white rounded-2xl"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditName("");
                        }}
                        className="px-5 py-3 border border-slate-200 rounded-2xl"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() =>
                            navigate(
                              `/counsellor/schools/${school.id}`
                            )
                          }
                          className="text-xl font-semibold text-slate-900 hover:text-indigo-600 transition"
                        >
                          {school.name}
                        </button>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            school.isActive
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {school.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-6 mt-4">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            Students
                          </p>
                          <p className="text-lg font-semibold text-slate-900 mt-1">
                            {school.studentsCount || 0}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            Saved Price
                          </p>
                          <p className="text-lg font-semibold text-slate-900 mt-1">
                            ₹{schoolPricing?.savedAmount || 0}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="w-full xl:w-[460px] bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    School Registration Price
                  </label>

                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                        ₹
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={schoolPricing?.amount || ""}
                        onChange={(e) => {
                          setSchoolPriceMap((prev) => ({
                            ...prev,
                            [school.id]: {
                              ...prev[school.id],
                              amount: e.target.value,
                            },
                          }));
                        }}
                        placeholder="Enter amount"
                        className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <button
                      onClick={() => handleSaveSchoolPrice(school)}
                      disabled={
                        savingPriceId === school.id ||
                        Number(schoolPricing?.amount || 0) ===
                          Number(schoolPricing?.savedAmount || 0)
                      }
                      className="px-5 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                      {savingPriceId === school.id
                        ? "Saving..."
                        : "Save"}
                    </button>
                  </div>

                  {schoolPricing?.savedAmount !== undefined && (
                    <p className="text-xs text-slate-500 mt-2">
                      Current saved price: ₹
                      {schoolPricing.savedAmount}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingId(school.id);
                          setEditName(school.name);
                        }}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        Edit School
                      </button>

                      <button
                        onClick={() =>
                          navigate(
                            `/counsellor/schools/${school.id}`
                          )
                        }
                        className="text-sm font-medium text-slate-600 hover:text-slate-800"
                      >
                        View Students
                      </button>
                    </div>

                    <button
                      onClick={() => handleToggleActive(school)}
                      disabled={updatingId === school.id}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                        school.isActive
                          ? "bg-indigo-600"
                          : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                          school.isActive
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CounsellorSchools;