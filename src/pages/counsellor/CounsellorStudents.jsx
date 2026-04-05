import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCounsellorStudents,
  getCounsellorSchools,
  getBulkAssessmentStatus,
  rotateDirectReferenceCode
} from "../../services/counsellorService";

import { getReferenceCode } from "../../services/auth";

import Pagination from "../../components/Pagination";
import Spinner from "../../components/common/Spinner";

const CounsellorStudents = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);

  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);

  const [search, setSearch] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [page, setPage] = useState(1);

  const [referenceCode, setReferenceCode] = useState("");
  const [copied, setCopied] = useState(false);

  const [showRotateModal, setShowRotateModal] = useState(false);
  const [rotating, setRotating] = useState(false);


  const limit = 10;

  // Fetch schools
  useEffect(() => {
    getCounsellorSchools().then(setSchools).catch(() => { });
  }, []);

  // Fetch reference code
  useEffect(() => {
    getReferenceCode().then(setReferenceCode).catch(() => { });
  }, []);

  // Fetch students + merge assessment status + apply filters
  const fetchStudents = async () => {
    setLoading(true);

    try {
      const params = {
        page,
        limit,
        search,
      };

      const res = await getCounsellorStudents(params);
      const baseStudents = res.data || [];

      const userIds = baseStudents.map((s) => s.id);

      let enrichedStudents = baseStudents;

      if (userIds.length > 0) {
        const statusList = await getBulkAssessmentStatus(userIds);

        const statusMap = new Map(
          statusList.map((s) => [s.userId, s.status])
        );

        enrichedStudents = baseStudents.map((student) => ({
          ...student,
          assessmentStatus:
            statusMap.get(student.id) || "NOT_STARTED",
        }));
      }

      // ✅ Apply School + Status filters here
      const filteredStudents = enrichedStudents.filter((student) => {

        if (schoolFilter && student.schoolId !== schoolFilter) {
          return false;
        }

        if (
          statusFilter !== "ALL" &&
          student.assessmentStatus !== statusFilter
        ) {
          return false;
        }

        return true;
      });

      setStudents(filteredStudents);
      setMeta(res.meta);
    } catch (error) {
      console.error("Student fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, search, schoolFilter, statusFilter]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referenceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleRotate = async () => {
    try {
      setRotating(true);
      const newCode = await rotateDirectReferenceCode();
      setReferenceCode(newCode.code);
      setShowRotateModal(false);
    } catch (error) {
      console.error("Rotate failed:", error);
    } finally {
      setRotating(false);
    }
  };

  if (loading && !students.length) return <Spinner />;

  return (
    <div className="space-y-8">

      {/* Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Total Students</p>
          <h3 className="text-2xl font-semibold text-slate-800">
            {meta?.total || 0}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Filtered Students</p>
          <h3 className="text-2xl font-semibold text-slate-800">
            {students.length}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Completed</p>
          <h3 className="text-2xl font-semibold text-green-600">
            {students.filter(s => s.assessmentStatus === "COMPLETED").length}
          </h3>
        </div>
      </div>

      {/* Reference Code */}
      {referenceCode && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-sm text-slate-500">
              Direct Student Reference Code
            </p>
            <p className="text-3xl font-bold tracking-widest text-indigo-600">
              {referenceCode}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              {copied ? "Copied" : "Copy Code"}
            </button>

            {/* ✅ Rotate Button */}
            <button
              onClick={() => setShowRotateModal(true)}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition"
            >
              Rotate
            </button>
          </div>
        </div>
      )}

      {/* ✅ Rotate Confirmation Modal */}
      {showRotateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">

            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Rotate Reference Code?
            </h2>

            <p className="text-sm text-slate-600 mb-6">
              This will immediately invalidate the current reference code.
              Students using the old code will no longer be able to register.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRotateModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleRotate}
                disabled={rotating}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition disabled:opacity-50"
              >
                {rotating ? "Rotating..." : "Confirm Rotate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email"
          className="border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        {/* School Filter */}
        <select
          className="border border-slate-200 rounded-xl px-4 py-2"
          value={schoolFilter}
          onChange={(e) => {
            setPage(1);
            setSchoolFilter(e.target.value);
          }}
        >
          <option value="">All Schools</option>
          {schools.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          className="border border-slate-200 rounded-xl px-4 py-2"
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
        >
          <option value="ALL">All Status</option>
          <option value="COMPLETED">Completed</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="NOT_STARTED">Not Started</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {students.length === 0 ? (
          <p className="text-center py-12 text-slate-500">
            No students found.
          </p>
        ) : (
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="py-3 px-6 text-left text-sm text-slate-500">Name</th>
                <th className="py-3 px-6 text-left text-sm text-slate-500">Email</th>
                <th className="py-3 px-6 text-left text-sm text-slate-500">Status</th>
                <th className="py-3 px-6 text-left text-sm text-slate-500">Joined</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => {
                    if (s.assessmentStatus === "COMPLETED") {
                      navigate(`/counsellor/students/${s.id}/report`);
                    }
                  }}
                  className={`border-b border-slate-100 transition ${s.assessmentStatus === "COMPLETED"
                    ? "hover:bg-slate-50 cursor-pointer"
                    : "opacity-70 cursor-not-allowed"
                    }`}
                >
                  <td className="py-4 px-6 font-medium text-slate-800">
                    {s.fullName}
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {s.email}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${s.assessmentStatus === "COMPLETED"
                        ? "bg-green-100 text-green-600"
                        : s.assessmentStatus === "IN_PROGRESS"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-slate-100 text-slate-500"
                        }`}
                    >
                      {s.assessmentStatus === "COMPLETED"
                        ? "Completed"
                        : s.assessmentStatus === "IN_PROGRESS"
                          ? "In Progress"
                          : "Not Started"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {meta?.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default CounsellorStudents;
