import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "layouts";

const App = () => {
  return (
    <Routes>
      
      <Route path="dashboard/*" element={<DashboardLayout />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
