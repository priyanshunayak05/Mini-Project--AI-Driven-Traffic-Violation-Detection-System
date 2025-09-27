import React, { useState } from 'react';

const DisputeModal = ({ challan, onClose }) => {
  const [reason, setReason] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle dispute submission logic here
    alert(`Dispute submitted for challan ${challan.challanId}`);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative mx-4">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl leading-none"
        >
          &times;
        </button>
        
        <h2 className="text-xl font-bold mb-4">
          Dispute Challan {challan.challanId}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Dispute *
            </label>
            <textarea 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="4" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Describe your reason for disputing this challan..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Evidence (optional)
            </label>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*,.pdf"
            />
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Submit Dispute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DisputeModal;