import { useEffect, useState } from 'react';
import { getCounsellorSchools, assignStudentToSchool } from '../../services/counsellorService';

const AssignStudentToSchoolModal = ({ open, onClose, student, onAssigned }) => {
  const [schools, setSchools] = useState([]);
  const [schoolId, setSchoolId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      getCounsellorSchools().then(setSchools);
    }
  }, [open]);

  if (!open) return null;

  const handleAssign = async () => {
    if (!schoolId) return;
    setLoading(true);
    await assignStudentToSchool(schoolId, student.id);
    setLoading(false);
    onAssigned();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-2">
          Assign Student to School
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          {student.fullName} ({student.email})
        </p>

        <select
          className="border p-2 rounded w-full mb-4"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
        >
          <option value="">Select a school</option>
          {schools.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!schoolId || loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Assigning…' : 'Assign'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignStudentToSchoolModal;