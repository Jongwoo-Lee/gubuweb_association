// React
import React, { useContext } from "react";
import { FirebaseAuth, FirebaseAsc } from "../../helpers/Firebase";
import { useFirebaseAuth, useAssociation } from "../../hooks";


export type ContextSetAsc = React.Dispatch<React.SetStateAction<FirebaseAsc>> | null;

/// Firebase Auth User Context
interface AscAuthData {
  authUser: FirebaseAuth;
  ascData: FirebaseAsc;
  setAscData: ContextSetAsc;
}

export const AuthUserContext: React.Context<AscAuthData> = React.createContext<
  AscAuthData
>({ authUser: null, ascData: null, setAscData: null });

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const authUser = useFirebaseAuth();
  const { ascData, setAscData } = useAssociation(authUser?.uid);


  return (
    <AuthUserContext.Provider value={{ authUser, ascData, setAscData }}>
      {props.children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserValue = () => useContext(AuthUserContext).authUser;
export const useAssociationValue = () => useContext(AuthUserContext).ascData;
export const useSetAssociationValue = () => useContext(AuthUserContext).setAscData;

///
