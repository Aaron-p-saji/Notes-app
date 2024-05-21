import { ActionCenter } from "@/components/global/ActionCenter";
import { FloatingNav } from "@/components/ui/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <div className="w-screen h-screen">{children}</div>;
};

export default layout;
