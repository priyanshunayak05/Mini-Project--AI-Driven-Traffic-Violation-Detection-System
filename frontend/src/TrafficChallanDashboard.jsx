import React, { useState } from 'react';
import { userData, notificationsData } from './data/userData';
import { getAllChallans } from './utils/helpers';
import { DashboardHeader, StatsOverview, NavigationTabs } from './components/Navigation';
import { DisputeModal } from './components/Challan';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Pending from './components/Pending';
import Notification from './components/Notification';
import Receipt from './components/Receipt';

const TrafficChallanDashboard = () => {
  console.log('User Data:', userData); // Debugging line
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedChallan, setSelectedChallan] = useState(null);
  const [showDispute, setShowDispute] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [receiptChallan, setReceiptChallan] = useState(null);
  const [notifications] = useState(notificationsData);

  const user = userData.user;
  const allChallans = getAllChallans(user);
  const pendingChallans = allChallans.filter(c => c.status === 'Pending');
  const totalFineAmount = pendingChallans.reduce((sum, c) => sum + c.fineAmount, 0);

  const filteredChallans = filterStatus === 'all' ? allChallans : 
                          filterStatus === 'pending' ? pendingChallans :
                          allChallans.filter(c => c.status === 'Paid');

  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'history', label: 'Challan History' },
    { key: 'pending', label: 'Pending Challans' },
    { key: 'notifications', label: 'Notifications' }
  ];

  // Event handlers
  const handlePayNow = (challanId) => {
    alert(`Redirecting to payment gateway for Challan ID: ${challanId}`);
  };

  const handleShare = (challan) => {
    alert(`Sharing challan ${challan.challanId} via email/WhatsApp`);
  };

  const handleDispute = (challan) => {
    setSelectedChallan(challan);
    setShowDispute(true);
  };

  const handleViewReceipt = (challan) => {
    setReceiptChallan(challan);
    setPage('receipt');
  };

  const handleDisputeClose = () => {
    setShowDispute(false);
    setSelectedChallan(null);
  };

  const handleBackToDashboard = () => {
    setPage('dashboard');
    setReceiptChallan(null);
  };

  // Render receipt page
  if (page === 'receipt' && receiptChallan) {
    return <Receipt challan={receiptChallan} onBack={handleBackToDashboard} />;
  }

  // Render main dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto p-6">
        <DashboardHeader user={user} notifications={notifications} />
        
        <StatsOverview 
          allChallans={allChallans}
          pendingChallans={pendingChallans}
          totalFineAmount={totalFineAmount}
          vehicleCount={user.vehicles.length}
        />

        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            allChallans={allChallans}
            onPayNow={handlePayNow}
            onViewReceipt={handleViewReceipt}
            onShare={handleShare}
            onDispute={handleDispute}
          />
        )}

        {activeTab === 'history' && (
          <History 
            filteredChallans={filteredChallans}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onPayNow={handlePayNow}
            onViewReceipt={handleViewReceipt}
            onShare={handleShare}
            onDispute={handleDispute}
          />
        )}

        {activeTab === 'pending' && (
          <Pending 
            pendingChallans={pendingChallans}
            totalFineAmount={totalFineAmount}
            onPayNow={handlePayNow}
            onViewReceipt={handleViewReceipt}
            onShare={handleShare}
            onDispute={handleDispute}
          />
        )}

        {activeTab === 'notifications' && (
          <Notification notifications={notifications} />
        )}

        <DisputeModal 
          isOpen={showDispute}
          challan={selectedChallan}
          onClose={handleDisputeClose}
        />
      </div>
    </div>
  );
};

export default TrafficChallanDashboard;