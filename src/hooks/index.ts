import { useState, useEffect } from "react";
import Firebase, { FirebaseAuth } from "../helpers/Firebase";
import { AUTHUSER } from "../constants/local";

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<FirebaseAuth>(() => {
    const localUser = localStorage.getItem(AUTHUSER);
    if (typeof localUser === "string") return JSON.parse(localUser);
    else return null;
  });

  useEffect(() => {
    const listener = Firebase.auth.onAuthStateChanged((user: FirebaseAuth) => {
      if (user !== null) {
        console.log("GUBU firebase user: " + user.email);
        localStorage.setItem(AUTHUSER, JSON.stringify(user));
        setAuthUser(user);
      } else {
        localStorage.removeItem(AUTHUSER);
        setAuthUser(null);
      }
    });
    return () => {
      localStorage.removeItem(AUTHUSER);
      listener();
    };
  }, []);

  return authUser;
};

export const useInput = () => {
  const [value, setValue] = useState<{
    value: string;
    focus?: boolean;
    error?: string;
  }>({
    value: "",
    error: "",
    focus: false
  });

  return {
    value,
    setValue,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue({ ...value, value: event.target.value, error: "" });
    }
  };
};
