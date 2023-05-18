import React, { useState } from "react";
import AppRouter from "./Routes/Routes";

export const AppStateContext = React.createContext<{
  myState: boolean;
  setMyState: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  myState: false,
  setMyState: () => {},
});

const App: React.FC = () => {
  const [myState, setMyState] = useState<boolean>(false);

  return (
    <div>
      <AppStateContext.Provider value={{ myState, setMyState }}>
        <AppRouter />
      </AppStateContext.Provider>
    </div>
  );
};

export default App;
