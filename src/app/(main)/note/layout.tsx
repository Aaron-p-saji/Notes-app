import React from "react";
import Topbar from "./_components/Topbar";

type Props = {
  children: React.ReactNode;
};

const layput = ({ children }: Props) => {
  return (
    <div className="w-full h-full pt-[2vh] px-[2vw]">
      <Topbar />
      <div>{children}</div>
    </div>
  );
};

export default layput;
