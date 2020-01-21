import React from "react";
import Firebase from "./functions/Firebase";
import AuthContextProvider from "./context/User/auth";

Firebase.init();

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthContextProvider>hewllo</AuthContextProvider>
    </div>
  );
};

export default App;
