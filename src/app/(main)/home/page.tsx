"use client";
import React, { useEffect, useRef, useState } from "react";
import { DataTableDemo } from "@/components/global/NotesList";
import { ActionCenter } from "@/components/global/ActionCenter";
import { useSignOut } from "react-firebase-hooks/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { auth } from "@/providers/firebase-config";
import { eventNames } from "process";
import { FloatingNav } from "@/components/ui/navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";

type Props = {};

const HomePage = (props: Props) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const [signout] = useSignOut(auth);

  const signOut = async () => {
    try {
      const success = await signout();
      toast.success("Successfully Signed Out");
      router.push("/");
    } catch (e) {
      toast.error(`Firebase Error: ${e}`);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.key === "k") ||
        (event.metaKey && event.key === "k")
      ) {
        event.preventDefault();
        setIsOpen((prevIsOpen) => !prevIsOpen); // Toggle using functional update
      }
      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    const handleQuitPress = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "q") ||
        (event.metaKey && event.shiftKey && event.key.toLowerCase() === "q")
      ) {
        // Correct condition
        signOut();
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Attach event listeners
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keydown", handleQuitPress); // Added quit press listener
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Remove event listeners on cleanup
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keydown", handleQuitPress); // Removed quit press listener
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function handleOutsideClick(e: MouseEvent) {
    if (!wrapperRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }
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
    <>
      <BackgroundBeams />
      <FloatingNav navItems={navItems} />
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
