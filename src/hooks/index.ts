import { useState, useEffect } from "react";
import Firebase from "../helpers/Firebase";
import { AUTHUSER } from "../constants/local";

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<firebase.User | null>(() => {
    const localUser = localStorage.getItem(AUTHUSER);
    if (typeof localUser === "string") return JSON.parse(localUser);
    else return null;
  });

  useEffect(() => {
    const listener = Firebase.auth.onAuthStateChanged(
      (user: firebase.User | null) => {
        if (user !== null) {
          localStorage.setItem(AUTHUSER, JSON.stringify(user));
          setAuthUser(user);
        } else {
          localStorage.removeItem(AUTHUSER);
          setAuthUser(null);
        }
      }
    );
    return () => {
      localStorage.removeItem(AUTHUSER);
      listener();
    };
  }, []);

  return authUser;
};
