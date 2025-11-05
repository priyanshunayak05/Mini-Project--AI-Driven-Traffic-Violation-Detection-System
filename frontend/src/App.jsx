import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import TrafficChallanDashboard from "./TrafficChallanDashboard";
import Landing from "./landing";
import Data from "./data";

// Component to handle email param
function DashboardWithEmail() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Data email={email} setUser={setUser} setLoading={setLoading} />

      {loading ? (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 via-blue-100 to-indigo-300">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
    <p className="text-indigo-700 font-semibold text-lg tracking-wide">
      Loading data...
    </p>
  </div>
) : (
  <TrafficChallanDashboard user={user} />
)}
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Landing />} />
        {/* Example: /dashboard/aryan@example.com */}
        <Route path="/dashboard/:email" element={<DashboardWithEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
