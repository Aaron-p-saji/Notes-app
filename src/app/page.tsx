"use client";
import { FollowerPointerCard } from "@/components/ui/pointer";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Image from "next/image";

export default function Home() {
  const words = [
    {
      text: "Write",
      className: "text-black dark:text-black",
    },
    {
      text: "&",
      className: "text-black dark:text-black",
    },
    {
      text: "Save",
      className: "text-black dark:text-black",
    },
    {
      text: "Your",
      className: "text-black dark:text-black",
    },
    {
      text: "Notes.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <FollowerPointerCard>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
          <p className="text-neutral-800 dark:text-neutral-800 text-xs sm:text-base  ">
            The road to freedom starts from here
          </p>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm cursor-none">
              Join now
            </button>
            <button className="w-40 h-10 rounded-xl bg-white text-black border border-black cursor-none text-sm">
              Signup
            </button>
          </div>
        </div>
      </main>
    </FollowerPointerCard>
  );
}
