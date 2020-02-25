import { useState, useEffect, useLayoutEffect } from "react";
import Firebase, { FirebaseAuth, FirebaseAsc } from "../helpers/Firebase";
import { AUTHUSER, ASSOCIATION } from "../constants/local";
import { ascConverter } from "../helpers/Firebase/asc";
import { COL_ASC } from "../constants/firestore";
import { getAscCupInfos } from "../helpers/Firebase/cup";
import { CupInfoObject } from "../context/cup/cup";

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<FirebaseAuth>(() => {
    const localUser = localStorage.getItem(AUTHUSER);
    if (typeof localUser === "string") return JSON.parse(localUser);
    else return null;
  });

  useEffect(() => {
    const listener = Firebase.auth.onAuthStateChanged((user: FirebaseAuth) => {
      if (user !== null) {
        console.log("firebase user: " + user.email);
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
    if (ascID === undefined) {
      localStorage.removeItem(ASSOCIATION);
      return;
    }
    const ascListener = Firebase.firestore
      .collection(COL_ASC.ASSOC)
      .doc(ascID)
      .withConverter(ascConverter)
      .onSnapshot(doc => {
        const snapshotData = doc.data();
        if (snapshotData !== undefined) {
          localStorage.setItem(ASSOCIATION, JSON.stringify(snapshotData));
          setAscData(snapshotData);
        } else {
          localStorage.removeItem(ASSOCIATION);
          setAscData(null);
        }
      });

    return () => {
      localStorage.removeItem(ASSOCIATION);
      ascListener();
    };
  }, [ascID]);

  return { ascData, setAscData };
};

export const useCupInfoList = (cuplist: string[] | undefined) => {
  const [cupInfos, setCupInfos] = useState<CupInfoObject>({});
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (cuplist === undefined) {
      setCupInfos({});
      setLoading(false);
      return;
    }
    let cupsData: CupInfoObject = {};
    const fetchData = async () => {
      setLoading(true);
      await getAscCupInfos(cuplist)
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const cupData = doc.data();
            cupsData[doc.id] = cupData;
          });
        })
        .catch(err => console.log(err));
      setCupInfos(cupsData);
      setLoading(false);
    };

    fetchData();

    return () => {};
  }, [cuplist]);

  return { cupInfos, setCupInfos, isLoading };
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
    onChange: (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      event.preventDefault();
      setValue({ ...value, value: event.target.value, error: "" });
    }
  };
};

export const useDateInput = (initialDate: Date | null) => {
  const [value, setDate] = useState<{
    value: Date | null;
    error?: string;
  }>({
    value: initialDate,
    error: ""
  });

  return {
    value,
    setDate,
    onChange: (value: Date | null) => {
      setDate({ ...value, value: value, error: "" });
    }
  };
};

export const useRadioInput = (initialInput: string = "") => {
  const [radio, setRadio] = useState<{
    value: string;
    error?: string;
  }>({
    value: initialInput,
    error: ""
  });

  return {
    radio,
    setRadio,
    onChange: (event: React.MouseEvent, newInput: string) => {
      event.preventDefault();
      setRadio({
        value: radio.value === newInput ? "" : newInput,
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
        window.innerWidth >= 1280
          ? "lg"
          : window.innerWidth >= 960
          ? "md"
          : window.innerWidth >= 600
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

export const useListInput = () => {
  const [list, setList] = useState<{ value: string; error: string }[]>([]);

  return {
    list,
    setList,
    onElementChange: (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      index: number
    ) => {
      event.preventDefault();
      let newList = [...list];
      newList[index] = { value: event.target.value, error: "" };

      setList(newList);
    },
    onElementDelete: (event: React.MouseEvent, index: number) => {
      event.preventDefault();
      let delDoc = [...list];
      delDoc.splice(index, 1);
      setList(delDoc);
    }
  };
};
