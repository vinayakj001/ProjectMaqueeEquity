import React from "react";
import Login from "./Login/Login";
import Dashboard from "./Pages/Dashboard";
import AppRouter from "./Routes/Routes";


const App: React.FC = () => {
  return (
    <div>

      <AppRouter/>
      {/* <Login /> */}
      {/* <Dashboard /> */}
    </div>
  );
};

export default App;
