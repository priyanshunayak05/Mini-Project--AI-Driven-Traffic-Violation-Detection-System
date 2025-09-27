import React from 'react';
import { Bell, FileText, Clock, IndianRupee, Car, Filter } from 'lucide-react';

// Header Component
export const DashboardHeader = ({ user, notifications }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Traffic Challan Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome, {user.name}</p>
        <p className="text-sm text-gray-500">License: {user.licenseNumber}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            
            >
              {notifications.length}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

// Stats Card Component
export const StatsCard = ({ title, value, icon: Icon, color = "text-gray-900" }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
  </div>
);

// Stats Overview Component
export const StatsOverview = ({ allChallans, pendingChallans, totalFineAmount, vehicleCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
    <StatsCard 
      title="Total Challans" 
      value={allChallans.length} 
      icon={FileText} 
      color="text-blue-600" 
    />
    <StatsCard 
      title="Pending Challans" 
      value={pendingChallans.length} 
      icon={Clock} 
      color="text-red-600" 
    />
    <StatsCard 
      title="Total Outstanding" 
      value={`₹${totalFineAmount}`} 
      icon={IndianRupee} 
      color="text-orange-600" 
    />
    <StatsCard 
      title="Vehicles" 
      value={vehicleCount} 
      icon={Car} 
      color="text-gray-600" 
    />
  </div>
);

// Navigation Tabs Component
export const NavigationTabs = ({ activeTab, setActiveTab, tabs }) => (
  <div className="flex gap-4 mb-6 flex-wrap">
    {tabs.map(({ key, label }) => (
      <button 
        key={key}
        onClick={() => setActiveTab(key)} 
        className={`px-6 py-3 font-medium rounded-lg ${
          activeTab === key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

// Filter Dropdown Component
export const FilterDropdown = ({ filterStatus, setFilterStatus }) => (
  <div className="flex items-center gap-2">
    <Filter className="w-4 h-4 text-gray-600" />
    <select 
      value={filterStatus} 
      onChange={(e) => setFilterStatus(e.target.value)}
      className="border border-gray-300 rounded-lg px-3 py-2"
    >
      <option value="all">All Status</option>
      <option value="pending">Pending</option>
      <option value="paid">Paid</option>
    </select>
  </div>
);

// Empty State Component
export const EmptyState = ({ title, description, icon: Icon }) => (
  <div className="text-center py-12">
    <Icon className="w-16 h-16 text-green-500 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);