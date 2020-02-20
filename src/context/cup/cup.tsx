import React, { useState, useContext } from "react";

/// Firebase Auth User Context
interface TempData {
    temp: any;
    setTemp: any;
}

export const TempContext: React.Context<TempData> = React.createContext<
    TempData
>({ temp: null, setTemp: null });

export const TempProvider = (props: { children: React.ReactNode }) => {
    const [temp, setTemp] = useState([])
    return (
        <TempContext.Provider value={{ temp, setTemp }}>
            {props.children}
        </TempContext.Provider>
    );
};

export const useTempTeam = () => useContext(TempContext).temp;
export const useSetTempTeam = () => useContext(TempContext).setTemp;

