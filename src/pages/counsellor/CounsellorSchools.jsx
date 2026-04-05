import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCounsellorSchools,
  createSchool,
  updateSchool,
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

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const data = await getCounsellorSchools();
      setSchools(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      setCreating(true);
      await createSchool({ name });
      setName("");
      fetchSchools();
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
        prev.map((s) =>
          s.id === schoolId ? { ...s, name: editName } : s
        )
      );

      setEditingId(null);
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
        prev.map((s) =>
          s.id === school.id ? { ...s, isActive: updated.isActive } : s
        )
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Schools
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Create and manage schools linked to your account.
        </p>
      </div>

      {/* Create School */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-medium text-slate-800 mb-4">
          Create New School
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter school name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleCreate}
            disabled={creating}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create School"}
          </button>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div
            key={school.id}
            className={`bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition ${
              !school.isActive ? "opacity-60" : ""
            }`}
          >
            {/* Name Section */}
            {editingId === school.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdateName(school.id)}
                    disabled={updatingId === school.id}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 border border-slate-300 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() =>
                    navigate(`/counsellor/schools/${school.id}`)
                  }
                  className="cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-slate-800">
                    {school.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    {school.studentsCount} Students
                  </p>
                </div>

                {/* Bottom Controls */}
                <div className="mt-6 flex justify-between items-center">

                  {/* Edit */}
                  <button
                    onClick={() => {
                      setEditingId(school.id);
                      setEditName(school.name);
                    }}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>

                  {/* Active Toggle */}
                  <button
                    onClick={() => handleToggleActive(school)}
                    disabled={updatingId === school.id}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      school.isActive
                        ? "bg-indigo-600"
                        : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        school.isActive
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounsellorSchools;
