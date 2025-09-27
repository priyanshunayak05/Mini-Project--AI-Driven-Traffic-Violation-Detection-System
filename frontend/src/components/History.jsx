import React from 'react';
import { ChallanGrid } from './Challan';
import { FilterDropdown } from './Navigation';

const History = ({ filteredChallans, filterStatus, setFilterStatus, onPayNow, onViewReceipt, onShare, onDispute }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Challan History</h2>
          <FilterDropdown filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        </div>
        <ChallanGrid 
          challans={filteredChallans}
          onPayNow={onPayNow}
          onViewReceipt={onViewReceipt}
          onShare={onShare}
          onDispute={onDispute}
        />
      </div>
    </div>
  );
};

export default History;
