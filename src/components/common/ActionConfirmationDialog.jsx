import React, { useState } from 'react';
import { FaExclamationTriangle, FaTimes, FaSpinner } from 'react-icons/fa';

const ActionConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  requireNote = false,
  noteLabel = "Note / Reason",
  notePlaceholder = "Enter your reason here...",
  isDestructive = false
}) => {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm(note);
    setLoading(false);
    setNote(""); // Reset on close
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isDestructive ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              <FaExclamationTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                {message}
              </p>

              {requireNote && (
                <div className="mb-6 space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    {noteLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={notePlaceholder}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-sm"
                    rows={3}
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading || (requireNote && !note.trim())}
              className={`px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                isDestructive 
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-100' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-100'
              }`}
            >
              {loading && <FaSpinner className="w-4 h-4 animate-spin" />}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionConfirmationDialog;
