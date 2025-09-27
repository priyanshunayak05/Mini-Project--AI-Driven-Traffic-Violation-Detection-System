import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ChallanGrid } from './Challan';
import { EmptyState } from './Navigation';

const Pending = ({ pendingChallans, totalFineAmount, onPayNow, onViewReceipt, onShare, onDispute }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Pending Challans</h2>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Outstanding</p>
            <p className="text-2xl font-bold text-red-600">₹{totalFineAmount}</p>
          </div>
        </div>
        {pendingChallans.length === 0 ? (
          <EmptyState 
            title="No Pending Challans"
            description="Great! You have no pending traffic violations."
            icon={CheckCircle}
          />
        ) : (
          <ChallanGrid 
            challans={pendingChallans}
            onPayNow={onPayNow}
            onViewReceipt={onViewReceipt}
            onShare={onShare}
            onDispute={onDispute}
          />
        )}
      </div>    
    </div>
  );
};

export default Pending;