// React
import React, { useContext } from "react";
import { FirebaseAuth } from "../../helpers/Firebase";
import { useFirebaseAuth } from "../../hooks";

/// Firebase Auth User Context
export const AuthUserContext: React.Context<FirebaseAuth> = React.createContext<
  FirebaseAuth
>(null);

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const authUser = useFirebaseAuth();

  return (
    <AuthUserContext.Provider value={authUser}>
      {props.children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserValue = () => useContext(AuthUserContext);

///
