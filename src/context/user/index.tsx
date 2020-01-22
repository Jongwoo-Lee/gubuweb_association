// React
import React from "react";
import { useFirebaseAuth } from "../../hooks";

export const AuthUserContext: React.Context<any> = React.createContext(null);

const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const authUser = useFirebaseAuth();

  return (
    <AuthUserContext.Provider value={{ authUser }}>
      {props.children}
    </AuthUserContext.Provider>
  );
};

export default AuthContextProvider;

// const [authUser, setAuthUser] = useState<firebase.User | null>(() => {
//   const localUser = localStorage.getItem("authUser");
//   if (typeof localUser === "string") return JSON.parse(localUser);
// });

// useEffect(() => {
//   const listener = Firebase.auth.onAuthStateChanged(
//     (user: firebase.User | null) => {
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
