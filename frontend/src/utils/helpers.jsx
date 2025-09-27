import React from 'react';
import { Car, Bike } from 'lucide-react';
import { userData } from '../data/userData';

export const getAllChallans = (user) => {
  if (!user?.vehicles) return [];

  return user.vehicles.flatMap(vehicle =>
    (vehicle.challans || []).map(challan => ({
      ...challan,
      vehicleNumber: vehicle.vehicleNumber,
      vehicleType: vehicle.vehicleType,
      userName: user.name,
      email: user.email,
      licenseNumber: user.licenseNumber,
    }))
  );
};


/**
 * Format date string to readable format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Get vehicle icon based on vehicle type
 * @param {string} type - Vehicle type (Car/Bike)
 * @returns {JSX.Element} Vehicle icon component
 */
export const getVehicleIcon = (type) => {
  return type === 'Car' ? <Car className="w-5 h-5" /> : <Bike className="w-5 h-5" />;
};

/**
 * Get status color classes based on challan status
 * @param {string} status - Challan status (Paid/Pending)
 * @returns {string} CSS classes for status styling
 */
export const getStatusColor = (status) => {
  return status === 'Paid' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
};

/**
 * Calculate total fine amount from array of challans
 * @param {Array} challans - Array of challan objects
 * @returns {number} Total fine amount
 */
export const calculateTotalFine = (challans) => {
  return challans.reduce((sum, challan) => sum + challan.fineAmount, 0);
};

/**
 * Filter challans by status
 * @param {Array} challans - Array of challan objects
 * @param {string} status - Status to filter by (all/pending/paid)
 * @returns {Array} Filtered challans
 */
export const filterChallansByStatus = (challans, status) => {
  if (status === 'all') return challans;
  if (status === 'pending') return challans.filter(c => c.status === 'Pending');
  if (status === 'paid') return challans.filter(c => c.status === 'Paid');
  return challans;
};

/**
 * Get notification icon type
 * @param {string} type - Notification type
 * @returns {string} Icon type
 */
export const getNotificationIcon = (type) => {
  switch (type) {
    case 'new':
      return 'alert';
    case 'reminder':
      return 'clock';
    default:
      return 'info';
  }
};