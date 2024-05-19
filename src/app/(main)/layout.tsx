import { ActionCenter } from "@/components/global/ActionCenter";
import { FloatingNav } from "@/components/ui/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const navItems = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  return (
    <div className="w-screen h-screen">
      <FloatingNav navItems={navItems} />
      {children}
    </div>
  );
};

export default layout;
