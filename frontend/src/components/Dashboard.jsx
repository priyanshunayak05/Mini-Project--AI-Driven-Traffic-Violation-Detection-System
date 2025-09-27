import React from 'react';
import { ChallanGrid } from './Challan';

const Dashboard = ({ allChallans, onPayNow, onViewReceipt, onShare, onDispute }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Challans</h2>
        <ChallanGrid 
          challans={allChallans.slice(0, 4)}
          onPayNow={onPayNow}
          onViewReceipt={onViewReceipt}
          onShare={onShare}
          onDispute={onDispute}
        />
      </div>
    </div>
  );
};

export default Dashboard;