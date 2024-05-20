import React from "react";

type Props = {
  children: React.ReactNode;
};

const layput = ({ children }: Props) => {
  return <div className="w-full h-full pt-[15vh] px-[15vw] ">{children}</div>;
};

export default layput;
