import { FaThumbsUp } from "react-icons/fa";

export default function CompletionModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-xs z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center relative">
        <FaThumbsUp className="mx-auto mb-3 text-primary" size={48} />
        <h2 className="text-2xl font-bold text-primary mb-4">Well Done!</h2>
        <p className="mb-6 text-2xl">Well done! You have successfully completed the personality test</p>
        <button
          onClick={onClose}
          className="bg-accent hover:bg-accent-dark text-white font-semibold py-2 px-6 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
