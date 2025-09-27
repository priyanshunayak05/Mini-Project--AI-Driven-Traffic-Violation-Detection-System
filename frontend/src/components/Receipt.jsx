import React from 'react';
import { formatDate } from '../utils/helpers';

const Receipt = ({ challan, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-200">
        {/* Header with official branding */}
        <div className="text-center mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Traffic E-Challan</h1>
          </div>
          <p className="text-sm text-gray-600">Official Traffic Violation Receipt</p>
        </div>
        
        {/* Receipt content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {/* Main violation details */}
          <div className="md:col-span-2">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Violation Details</h2>
              
              <div className="space-y-3">
                <div className='flex justify-between'>
                  <span className="text-gray-600 block">Name</span>
                  <span className="font-medium">{challan.userName}</span>
                </div>
                <div className='flex justify-between'>
                  <span className="text-gray-600 block">Email</span>
                  <span className="font-medium">{challan.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Challan ID</span>
                  <span className="font-medium">{challan.challanId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Issue Date</span>
                  <span className="font-medium">{formatDate(challan.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle Number</span>
                  <span className="font-medium">{challan.vehicleNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle Type</span>
                  <span className="font-medium">{challan.vehicleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">License Number</span>
                  <span className="font-medium">{challan.licenseNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Violation Type</span>
                  <span className="font-medium text-red-600">{challan.violation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-right max-w-xs">{challan.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment status and amount */}
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Payment Information</h2>
            
            <div className="flex-1 space-y-3">
              <div>
                <span className="text-gray-600 block">Fine Amount</span>
                <span className="text-2xl font-bold text-blue-700">₹{challan.fineAmount}</span>
              </div>
              
              <div>
                <span className="text-gray-600 block">Status</span>
                <span className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                  challan.status === 'Paid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {challan.status}
                </span>
              </div>
              
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-100">
              <p className="text-xs text-gray-500 text-center">
                Payment due within 30 days of issue date
              </p>
            </div>
          </div>
        </div>
               
        {/* Evidence section */}
        {challan.evidence?.screenshot && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Evidence</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <img 
                src={challan.evidence.screenshot} 
                alt="Challan Evidence" 
                className="w-full h-64 object-contain bg-gray-100" 
              />
              <div className="bg-gray-50 p-2 text-center">
                <p className="text-sm text-gray-500">Violation captured by automated traffic system</p>
              </div>
            </div>
          </div>
        )}

        {/* Additional information */}
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Important Information</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>This is an electronically generated receipt, no physical signature required</li>
            <li>Please keep this receipt for your records</li>
            <li>Dispute within 7 days of issuance if applicable</li>
          </ul>
        </div>

        {/* Action buttons - hidden during printing */}
        <div className="print:hidden flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
            </svg>
            Print Receipt
          </button>
          <button 
            onClick={onBack}
            className="flex items-center justify-center px-5 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            For queries contact: traffic-support@example.com | Helpline: 1800-XXX-XXXX
          </p>
        </div>
      </div>
      
      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Receipt;