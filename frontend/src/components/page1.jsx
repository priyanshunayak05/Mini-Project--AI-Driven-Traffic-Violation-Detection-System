import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  Calendar, 
  MapPin, 
  IndianRupee, 
  Share2, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Camera,
  FileText,
  Bell,
  CreditCard,
  Filter
} from 'lucide-react';

// Sample data
const userData = {
  "user": {
    "name": "Aryan Pratap Singh",
    "email": "aryan@example.com",
    "licenseNumber": "UP32AB1234",
    "vehicles": [
      {
        "vehicleNumber": "UP32AB1234",
        "vehicleType": "Car",
        "challans": [
          {
            "challanId": "CHL20250821-001",
            "date": "2025-08-10",
            "violation": "Red Light Jumping",
            "location": "Hazratganj, Lucknow",
            "fineAmount": 1000,
            "status": "Pending",
            "evidence": {
              "screenshot": "https://example.com/screenshots/challan1.png"
            }
          },
          {
            "challanId": "CHL20250821-002",
            "date": "2025-07-28",
            "violation": "Overspeeding",
            "location": "Ring Road, Lucknow",
            "fineAmount": 2000,
            "status": "Paid",
            "evidence": {
              "screenshot": "https://example.com/screenshots/challan2.png"
            }
          }
        ]
      },
      {
        "vehicleNumber": "UP32XY5678",
        "vehicleType": "Bike",
        "challans": [
          {
            "challanId": "CHL20250821-003",
            "date": "2025-08-15",
            "violation": "No Helmet",
            "location": "Gomti Nagar, Lucknow",
            "fineAmount": 500,
            "status": "Pending",
            "evidence": {
              "screenshot": "https://example.com/screenshots/challan3.png"
            }
          }
        ]
      }
    ]
  }
};

const TrafficChallanDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedChallan, setSelectedChallan] = useState(null);
  const [showDispute, setShowDispute] = useState(false);
  const [page, setPage] = useState('dashboard'); // 'dashboard' or 'receipt'
  const [receiptChallan, setReceiptChallan] = useState(null);

  const [notifications] = useState([
    { id: 1, message: "New challan detected for UP32XY5678", type: "new", date: "2025-08-15" },
    { id: 2, message: "Payment due for challan CHL20250821-001", type: "reminder", date: "2025-08-20" }
  ]);

  const user = userData.user;
  
  // Get all challans from all vehicles
  const getAllChallans = () => {
    return user.vehicles.flatMap(vehicle => 
      vehicle.challans.map(challan => ({ ...challan, vehicleNumber: vehicle.vehicleNumber, vehicleType: vehicle.vehicleType }))
    );
  };

  const allChallans = getAllChallans();
  const pendingChallans = allChallans.filter(c => c.status === 'Pending');
  const totalFineAmount = pendingChallans.reduce((sum, c) => sum + c.fineAmount, 0);

  const filteredChallans = filterStatus === 'all' ? allChallans : 
                          filterStatus === 'pending' ? pendingChallans :
                          allChallans.filter(c => c.status === 'Paid');

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getVehicleIcon = (type) => {
    return type === 'Car' ? <Car className="w-5 h-5" /> : <Bike className="w-5 h-5" />;
  };

  const getStatusColor = (status) => {
    return status === 'Paid' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  // ---------------- Challan Card ----------------
  const ChallanCard = ({ challan }) => (
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

      {/* Show Image Aside */}
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
            onClick={() => handlePayNow(challan.challanId)}
            className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <CreditCard className="w-4 h-4" />
            Pay Now
          </button>
        )}
        
        <button 
          onClick={() => handleViewReceipt(challan)}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FileText className="w-4 h-4" />
          View Receipt
        </button>
        
        <button 
          onClick={() => handleShare(challan)}
          className="flex items-center gap-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
        
        <button 
          onClick={() => handleDispute(challan)}
          className="flex items-center gap-1 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
        >
          <FileText className="w-4 h-4" />
          Dispute
        </button>
      </div>
    </div>
  );

  // ---------------- Receipt Page ----------------
  const ReceiptPage = ({ challan }) => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Challan Receipt</h1>
        <p><b>Challan ID:</b> {challan.challanId}</p>
        <p><b>Date:</b> {formatDate(challan.date)}</p>
        <p><b>Vehicle:</b> {challan.vehicleNumber} ({challan.vehicleType})</p>
        <p><b>Violation:</b> {challan.violation}</p>
        <p><b>Location:</b> {challan.location}</p>
        <p><b>Fine Amount:</b> ₹{challan.fineAmount}</p>
        <p><b>Status:</b> {challan.status}</p>

        {challan.evidence?.screenshot && (
          <img src={challan.evidence.screenshot} alt="Challan Proof" className="w-full h-60 object-cover rounded mt-4 border" />
        )}

        <div className="mt-6 flex gap-4">
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Print Receipt
          </button>
          <button 
            onClick={() => setPage('dashboard')}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );

  // ---------------- Main Render ----------------
  if (page === 'receipt' && receiptChallan) {
    return <ReceiptPage challan={receiptChallan} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Challans</p>
                <p className="text-2xl font-bold text-gray-900">{allChallans.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Challans</p>
                <p className="text-2xl font-bold text-red-600">{pendingChallans.length}</p>
              </div>
              <Clock className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Outstanding</p>
                <p className="text-2xl font-bold text-orange-600">₹{totalFineAmount}</p>
              </div>
              <IndianRupee className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vehicles</p>
                <p className="text-2xl font-bold text-gray-900">{user.vehicles.length}</p>
              </div>
              <Car className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-3 font-medium rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('history')} className={`px-6 py-3 font-medium rounded-lg ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Challan History</button>
          <button onClick={() => setActiveTab('pending')} className={`px-6 py-3 font-medium rounded-lg ${activeTab === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Pending Challans</button>
          <button onClick={() => setActiveTab('notifications')} className={`px-6 py-3 font-medium rounded-lg ${activeTab === 'notifications' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Notifications</button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Recent Challans</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {allChallans.slice(0, 4).map((challan) => (
                  <ChallanCard key={challan.challanId} challan={challan} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Challan History</h2>
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
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredChallans.map((challan) => (
                  <ChallanCard key={challan.challanId} challan={challan} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pending' && (
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
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Challans</h3>
                  <p className="text-gray-600">Great! You have no pending traffic violations.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap
-6">
                  {pendingChallans.map((challan) => (
                    <ChallanCard key={challan.challanId} challan={challan} />
                  ))} 
                </div>
              )}
            </div>    
          </div>
        )}    
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Notifications</h2>
              {notifications.length === 0 ? (
                <p className="text-gray-600">No new notifications.</p>
              ) : (
                <ul className="space-y-4">
                  {notifications.map((note) => (
                    <li key={note.id} className="border border-gray-200 rounded-lg p-4 flex items-start gap-4">
                      <div>
                        {note.type === 'new' && <AlertTriangle className="w-6 h-6 text-blue-600" />}
                        {note.type === 'reminder' && <Clock className="w-6 h-6 text-orange-600" />}
                      </div>
                      <div>
                        <p className="text-gray-800">{note.message}</p>
                        <p className="text-sm text-gray-500">{formatDate(note.date)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Dispute Modal */}   
        {showDispute && selectedChallan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
              <button 
                onClick={() => setShowDispute(false)} 
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Dispute Challan {selectedChallan.challanId}</h2>
              <form className="space-y-4">
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
                    onClick={() => setShowDispute(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Submit Dispute
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>    
  );
;};  
export default TrafficChallanDashboard