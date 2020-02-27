import React, { useState, useContext } from "react";

type ContextSetTrue = React.Dispatch<React.SetStateAction<boolean>>;

/// Send Boolean
interface sendBooleanData {
  isTrue: boolean;
  setTrue: ContextSetTrue;
}

const SendBooleanContext: React.Context<sendBooleanData> = React.createContext<
  sendBooleanData
>({
  isTrue: false,
  setTrue: () => {
    console.log("setTrue not initialized");
  }
});

export const SendBooleanProvider = (props: { children: React.ReactNode }) => {
  const [isTrue, setTrue] = useState(false);

  return (
    <SendBooleanContext.Provider value={{ isTrue, setTrue }}>
      {props.children}
    </SendBooleanContext.Provider>
  );
};

export const useSendBoolean = () => useContext(SendBooleanContext);
