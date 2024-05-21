import React from "react";
import MenuButtons from "./MenuButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconCornerUpLeft, IconCornerUpRight } from "@tabler/icons-react";
import { FontSelect } from "./FontSelect";

type Props = {};

const Topbar = (props: Props) => {
  return (
    <div className="w-full h-[5vh] bg-[#d0e2ea] rounded-xl justify-center p-[0.25vw] xs:hidden md:flex flex-col">
      <MenuButtons />
    </div>
  );
};

export default Topbar;
