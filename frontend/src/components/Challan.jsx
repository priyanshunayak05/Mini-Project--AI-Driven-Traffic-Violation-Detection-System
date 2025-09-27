import React from 'react';
import { Calendar, MapPin, AlertTriangle, IndianRupee, CreditCard, FileText, Share2 } from 'lucide-react';
import { formatDate, getVehicleIcon, getStatusColor } from '../utils/helpers';

// Challan Card Component
export const ChallanCard = ({ challan, onPayNow, onViewReceipt, onShare, onDispute }) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2">
        {getVehicleIcon(challan.vehicleType)}
        <span className="font-semibold text-gray-800">{challan.vehicleNumber}</span>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(challan.status)}`}>
        {challan.status}
      </span>
    </div>

    {challan.evidence?.screenshot && (
      <div className="mb-4">
        <img src={challan.evidence.screenshot} alt="Evidence" className="rounded-lg w-full h-40 object-cover border" />
      </div>
    )}
    
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(challan.date)}</span>
      </div>
      
      <div className="flex items-center gap-2 text-gray-600">
        <MapPin className="w-4 h-4" />
        <span>{challan.location}</span>
      </div>
      
      <div className="flex items-center gap-2 text-gray-800">
        <AlertTriangle className="w-4 h-4 text-red-500" />
        <span className="font-medium">{challan.violation}</span>
      </div>
      
      <div className="flex items-center gap-2 text-gray-800">
        <IndianRupee className="w-4 h-4" />
        <span className="font-semibold text-lg">₹{challan.fineAmount}</span>
      </div>
    </div>
    
    <div className="mt-4 flex flex-wrap gap-2">
      {challan.status === 'Pending' && (
        <button 
          onClick={() => onPayNow(challan.challanId)}
          className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <CreditCard className="w-4 h-4" />
          Pay Now
        </button>
      )}
      
      <button 
        onClick={() => onViewReceipt(challan)}
        className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        <FileText className="w-4 h-4" />
        View Receipt
      </button>
      
      <button 
        onClick={() => onShare(challan)}
        className="flex items-center gap-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>
      
      <button 
        onClick={() => onDispute(challan)}
        className="flex items-center gap-1 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
      >
        <FileText className="w-4 h-4" />
        Dispute
      </button>
    </div>
  </div>
);

// Challan Grid Component
export const ChallanGrid = ({ challans, onPayNow, onViewReceipt, onShare, onDispute }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {challans.map((challan) => (
      <ChallanCard 
        key={challan.challanId} 
        challan={challan}
        onPayNow={onPayNow}
        onViewReceipt={onViewReceipt}
        onShare={onShare}
        onDispute={onDispute}
      />
    ))}
  </div>
);

// Dispute Modal Component
export const DisputeModal = ({ isOpen, challan, onClose }) => {
  if (!isOpen || !challan) return null;

  const handleSubmit = () => {
    alert('Dispute submitted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Dispute Challan {challan.challanId}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Dispute</label>
            <textarea 
              rows="4" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2" 
              placeholder="Describe your reason for disputing this challan..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Evidence (optional)</label>
            <input type="file" className="w-full" />
          </div>
          <div className="flex justify-end gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Dispute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};