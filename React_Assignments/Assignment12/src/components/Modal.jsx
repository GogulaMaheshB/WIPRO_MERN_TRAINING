import ReactDOM from "react-dom";

export default function Modal({ onClose }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-2">Notification</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
