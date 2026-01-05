import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Calender from "./pages/Calender";
import Stats from "./pages/Stats";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  const location = useLocation();
  const hideshell = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#0d1320]">
      {!hideshell && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/login" element={<Login initialMode="login" />} />
        <Route path="/signup" element={<Login initialMode="signup" />} />
      </Routes>

      {!hideshell && <Footer />}
    </div>
  );
};

export default App;