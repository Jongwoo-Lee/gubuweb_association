import React from "react";
import Firebase from "../helpers/Firebase";

export interface HomeProps {}

export const Home: React.SFC<HomeProps> = () => {
  const handleLogout = () => {
    Firebase.fireLogout();
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};
