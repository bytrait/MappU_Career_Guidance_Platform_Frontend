import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  getSchoolStudents,
  rotateSchoolReferenceCode,
  getBulkAssessmentStatus,
} from "../../services/counsellorService";

import Pagination from "../../components/Pagination";
import Spinner from "../../components/common/Spinner";
import TokensTable from "../../components/counsellor/TokensTable";

const SchoolStudents = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("students");

  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showRotateModal, setShowRotateModal] = useState(false);
  const [rotating, setRotating] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchData = async (page = 1) => {
    setLoading(true);

    try {
      const res = await getSchoolStudents(schoolId, { page });
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

      const filtered = enrichedStudents.filter((student) => {
        if (
          search &&
          !student.fullName
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          !student.email
            .toLowerCase()
            .includes(search.toLowerCase())
        ) {
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

      setStudents(filtered);
      setMeta(res.meta);
    } catch (error) {
      console.error("School students fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [schoolId]);

  useEffect(() => {
    if (activeTab === "students") {
      fetchData(meta?.page || 1);
    }
  }, [search, statusFilter, activeTab]);

  const handleRotate = async () => {
    try {
      setRotating(true);
      await rotateSchoolReferenceCode(schoolId);
      toast.success("Legacy school code rotated");
      setShowRotateModal(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to rotate code.";
      toast.error(message);
    } finally {
      setRotating(false);
    }
  };

  const legacyMenu = (
    <>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setShowRotateModal(true)}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
      >
        Quick rotate (legacy)
      </button>
      <p className="px-4 pb-2 pt-1 text-xs text-slate-400">
        Auto-generates one random code via the legacy endpoint.
      </p>
    </>
  );

  if (loading && activeTab === "students" && !students.length) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          School detail
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage reference tokens and students for this school.
        </p>
      </div>

      <div className="flex gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("students")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
            activeTab === "students"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Students
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tokens")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
            activeTab === "tokens"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Tokens
        </button>
      </div>

      {activeTab === "tokens" ? (
        <TokensTable
          scope="school"
          schoolId={schoolId}
          title="School reference tokens"
          description="Custom codes for this school — each can have its own label, dates, and optional price."
          legacyMenu={legacyMenu}
        />
      ) : (
        <>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Students</p>
            <h2 className="text-3xl font-semibold text-slate-800">
              {meta?.total || students.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by name or email"
              className="border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border border-slate-200 rounded-xl px-4 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="COMPLETED">Completed</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="NOT_STARTED">Not Started</option>
            </select>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {students.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-slate-500">No students found.</p>
              </div>
            ) : (
              <>
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-6 text-left text-sm text-slate-500">
                        Name
                      </th>
                      <th className="py-3 px-6 text-left text-sm text-slate-500">
                        Email
                      </th>
                      <th className="py-3 px-6 text-left text-sm text-slate-500">
                        Status
                      </th>
                      <th className="py-3 px-6 text-left text-sm text-slate-500">
                        Joined
                      </th>
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
                        className={`border-b border-slate-100 transition ${
                          s.assessmentStatus === "COMPLETED"
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
                            className={`px-3 py-1 text-xs rounded-full font-medium ${
                              s.assessmentStatus === "COMPLETED"
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

                {meta?.totalPages > 1 && (
                  <div className="py-6 flex justify-center">
                    <Pagination
                      page={meta.page}
                      totalPages={meta.totalPages}
                      onPageChange={(p) => fetchData(p)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {showRotateModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Quick rotate (legacy)?
            </h2>

            <p className="text-sm text-slate-600 mb-6">
              Auto-generates a new random code on the legacy endpoint. Your
              custom multi-token codes are not affected.
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
                {rotating ? "Rotating..." : "Confirm rotate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolStudents;
