"use client";
import React from "react";
import { DataTableDemo } from "@/components/global/NotesList";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full w-full bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 p-[5%]">
        <div>
          <h1 className="font-black text-6xl">Notes</h1>
        </div>
        <DataTableDemo />
      </div>
    </div>
  );
};

export default HomePage;
