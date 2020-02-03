// React
import React, { useContext } from "react";
import { FirebaseAuth, FirebaseAsc } from "../../helpers/Firebase";
import { useFirebaseAuth, useAssociation } from "../../hooks";

/// Firebase Auth User Context
interface AscAuthData {
  authUser: FirebaseAuth;
  ascData: FirebaseAsc;
}

export const AuthUserContext: React.Context<AscAuthData> = React.createContext<
  AscAuthData
>({ authUser: null, ascData: null });

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const authUser = useFirebaseAuth();
  const ascData = useAssociation(authUser?.uid);

  return (
    <AuthUserContext.Provider value={{ authUser, ascData }}>
      {props.children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserValue = () => useContext(AuthUserContext).authUser;
export const useAssociationValue = () => useContext(AuthUserContext).ascData;

///
