"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import GradientButton from "./hover-border-gradient-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";

import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/providers/firebase-config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ActionCenter } from "../global/ActionCenter";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(true);
        }
      }
    }
  });
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
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <>
      {isOpen && (
        <div className="absolute w-screen h-screen bg-black/50 z-[999] pt-[15vh] flex justify-center">
          <div className="flex w-fit h-fit" ref={wrapperRef}>
            <ActionCenter isOpen={isOpen} />
          </div>
        </div>
      )}
      <DropdownMenu>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{
              opacity: 1,
              y: -100,
            }}
            animate={{
              y: visible ? 0 : -100,
              opacity: visible ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className={cn(
              "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
              className
            )}
          >
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-400 dark:hover:text-neutral-300 hover:text-white transition-all"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm">{navItem.name}</span>
              </Link>
            ))}
            <DropdownMenuTrigger asChild className="bg-transparent">
              <div className="w-fit h-fit p-0 rounded-full bg-white/80">
                <GradientButton
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-white/80 border-0 bg-black/20 text-white dark:text-black flex items-center space-x-2"
                >
                  <span>Options</span>
                </GradientButton>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 relative top-1">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⇧⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                Finder
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a
                  href="https://github.com/Aaron-p-saji"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </motion.div>
        </AnimatePresence>
      </DropdownMenu>
    </>
  );
};
