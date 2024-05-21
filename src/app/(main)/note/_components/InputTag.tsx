import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  field: any;
  fileName: any;
  onChange: any;
};

const InputTag = ({ field, fileName, onChange }: Props) => {
  return (
    <Input
      className="border-0 dark:focus-visible:ring-0 focus-visible:ring-1 transition-all focus:h-[10vw] focus:placeholder:text-[3vw] duration-[0.5s] focus:text-[3vw] focus:font-bold"
      placeholder="untitled"
      {...field}
      value={fileName}
      onChange={onChange}
    />
  );
};

export default InputTag;
