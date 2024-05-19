"use client";
import React, { useEffect, useRef, useState } from "react";
import { DataTableDemo } from "@/components/global/NotesList";
import { ActionCenter } from "@/components/global/ActionCenter";

type Props = {};

const HomePage = (props: Props) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setIsOpen(!isOpen); // Toggle isOpen directly here
      }
      if (isOpen) {
        if (event.key === "Escape") {
          event.preventDefault();
          setIsOpen(false); // Toggle isOpen directly here
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen]);

  function handleOutsideClick(e: MouseEvent) {
    if (!wrapperRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }

  return (
    <>
      {isOpen && (
        <div className="absolute w-screen h-screen bg-black/50 z-[999] pt-[15vh] flex justify-center">
          <div className="flex w-fit h-fit" ref={wrapperRef}>
            <ActionCenter isOpen={isOpen} />
          </div>
        </div>
      )}

      <div className="w-full h-full pt-[15vh] px-[15vw] ">
        <div className="flex flex-col h-full w-full bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 p-[5%]">
          <div>
            <h1 className="font-black text-6xl">Notes</h1>
          </div>
          <div ref={tableRef}>
            <DataTableDemo />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
