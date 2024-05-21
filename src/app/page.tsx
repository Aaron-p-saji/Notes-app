"use client";
import { FollowerPointerCard } from "@/components/ui/pointer";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard } from "@/components/global/AuthCard";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/providers/firebase-config";
import { useRouter } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("login");
  const handleOpenDialog = (tab: "login" | "register") => {
    setActiveTab(tab);
    setIsOpen(true);
  };
  return (
    <>
      <BackgroundBeams className="z-[-1]" />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
          <p className="text-neutral-800 dark:text-neutral-800 text-xs sm:text-base  ">
            The road to freedom starts from here
          </p>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button
                  className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm cursor-pointer"
                  onClick={() => {
                    user ? router.push("/home") : handleOpenDialog("login");
                  }}
                >
                  Login
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-fit !bg-black">
                <AuthCard df={activeTab} setActiveTab={setActiveTab} />
              </DialogContent>
            </Dialog>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button
                  className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm"
                  onClick={() =>
                    user ? router.push("/home") : handleOpenDialog("register")
                  }
                >
                  Join Now
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-fit !bg-black">
                <AuthCard df={activeTab} setActiveTab={setActiveTab} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </>
  );
}
