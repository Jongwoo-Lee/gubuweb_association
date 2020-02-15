import { useState, useEffect } from "react";
import Firebase, { FirebaseAuth, FirebaseAsc } from "../helpers/Firebase";
import { AUTHUSER } from "../constants/local";
import { getAscData } from "../helpers/Firebase/asc";

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

export const useTextInput = (initialValue: string = "") => {
  const [value, setValue] = useState<{
    value: string;
    focus?: boolean;
    error?: string;
  }>({
    value: initialValue,
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

export const useAssociation = (ascID: string | undefined) => {
  const [ascData, setAscData] = useState<FirebaseAsc>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (ascID === undefined) {
        setAscData(null);
      } else {
        const result = await getAscData(ascID);
        setAscData(result);
      }
    };

    fetchData();
  }, [ascID]);

  return ascData;
};
