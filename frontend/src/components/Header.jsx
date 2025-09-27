import React from 'react';
import { Bell } from 'lucide-react';

const Header = ({ user, notifications }) => {
  return (
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
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;