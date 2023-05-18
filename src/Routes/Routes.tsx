import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Pages/Dashboard";
import NotFound from "../ExpeptionHandling/NotFound";

const AppRouter: React.FC = () => {
  const key = localStorage.getItem("authenticated");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {key === "72f4f34t4ytg44" && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
