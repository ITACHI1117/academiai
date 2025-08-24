"use client";
import { useEffect, useState } from "react";
import { Dash } from "./Dash";
import { StartConvo } from "./StartConvo";

export const DashBoardComponent = () => {
  const [view, setView] = useState("Dashboard");
  useEffect(() => {
    console.log(view);
  }, [view]);
  return (
    <>
      {view == "Dashboard" ? (
        <Dash setView={setView} />
      ) : (
        <StartConvo setView={setView} />
      )}
    </>
  );
};
