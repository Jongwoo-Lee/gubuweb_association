import { useState, useEffect, useLayoutEffect } from "react";
import Firebase, { FirebaseAuth, FirebaseAsc } from "../helpers/Firebase";
import { AUTHUSER, ASSOCIATION } from "../constants/local";
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

export const useAssociation = (ascID: string | undefined) => {
  const [ascData, setAscData] = useState<FirebaseAsc>(() => {
    const localUser = localStorage.getItem(ASSOCIATION);
    if (typeof localUser === "string") return JSON.parse(localUser);
    else return null;
  });

  useEffect(() => {
    const fetchData = async () => {
      if (ascID === undefined) {
        localStorage.removeItem(ASSOCIATION);
        setAscData(null);
      } else {
        const result = await getAscData(ascID);
        localStorage.setItem(ASSOCIATION, JSON.stringify(result));

        setAscData(result);
      }
    };

    fetchData();

    return () => {
      localStorage.removeItem(ASSOCIATION);
    };
  }, [ascID]);

  return ascData;
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
      event.preventDefault();
      setValue({ ...value, value: event.target.value, error: "" });
    }
  };
};

export const useDateInput = (initialDate: Date = new Date()) => {
  const [date, setDate] = useState<{
    date: Date | null;
    focus?: boolean;
    error?: string;
  }>({
    date: initialDate,
    error: "",
    focus: false
  });

  return {
    date,
    setDate,
    onChange: (date: Date | null) => {
      setDate({ ...date, date: date, error: "" });
    }
  };
};

export const useRadioInput = (initialInput: string = "") => {
  const [radio, setRadio] = useState<{
    input: string;
    error?: string;
  }>({
    input: initialInput,
    error: ""
  });

  return {
    radio,
    setRadio,
    onChange: (event: React.MouseEvent, newInput: string) => {
      event.preventDefault();
      setRadio({
        ...radio,
        input: radio.input === newInput ? "" : newInput,
        error: ""
      });
    }
  };
};

export const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0, device: "xs" });
  useLayoutEffect(() => {
    const updateSize = () => {
      const device =
        window.innerWidth >= 1200
          ? "lg"
          : window.innerWidth >= 992
          ? "md"
          : window.innerWidth >= 768
          ? "sm"
          : "xs";
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        device: device
      });
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

