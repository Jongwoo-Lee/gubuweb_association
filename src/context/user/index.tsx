// React
import React from "react";
import { FirebaseAuth } from "../../helpers/Firebase";
import { useFirebaseAuth } from "../../hooks";

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

// const [authUser, setAuthUser] = useState<FirebaseAuth>(() => {
//   const localUser = localStorage.getItem("authUser");
//   if (typeof localUser === "string") return JSON.parse(localUser);
// });

// useEffect(() => {
//   const listener = Firebase.auth.onAuthStateChanged(
//     (user: FirebaseAuth) => {
//       if (user !== null) {
//         localStorage.setItem("authUser", JSON.stringify(user));
//         setAuthUser(user);
//       } else {
//         localStorage.removeItem("authUser");
//         setAuthUser(null);
//       }
//     }
//   );
//   return () => {
//     localStorage.removeItem("authUser");
//     listener();
//   };
// }, []);
