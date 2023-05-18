import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AppStateContext } from "../App";
import NotFound from "../ExpeptionHandling/NotFound";
import Login from "../Login/Login";
import Dashboard from "../Pages/Dashboard";

const AppRouter: React.FC = () => {
  const { myState } = useContext(AppStateContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {myState && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
