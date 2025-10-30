import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import TrafficChallanDashboard from "./TrafficChallanDashboard";
import Landing from "./landing";
import Data from "./data";

// Component to handle email param
function DashboardWithEmail() {
  const [user, setUser] = useState(null);
  const { email } = useParams(); // get email from URL


  return (
    <>
      {/* Pass email to Data */}
      <Data email={email} setUser={setUser}/>
      <TrafficChallanDashboard user={user}/>
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
