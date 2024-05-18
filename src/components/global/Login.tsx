"use client";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Button } from "../ui/button";
import { AsterInput } from "../ui/acter-input";
import { AsterLabel } from "../ui/aster-label";
import { auth } from "@/providers/firebase-config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUserWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (email && password) {
      try {
        const res = await signUserWithEmailAndPassword(email, password);
        console.log({ res });
        toast.success("Login Successful!");
        setEmail("");
        setPassword("");
        router.push("/home");
      } catch (error) {
        const errorMessage = error;
        toast.error(`Registration Failed: ${errorMessage}`);
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-[1vh] text-white">
        <AsterLabel htmlFor="email">Email</AsterLabel>
        <AsterInput
          id="email"
          placeholder="user@notes.com"
          className="text-white/50"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="space-y-1 text-white">
        <AsterLabel htmlFor="password">Password</AsterLabel>
        <AsterInput
          id="password"
          placeholder="•••••"
          className="text-white/50"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col items-end w-full pt-[2vh]">
        <button
          className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Login
          </span>
          <BottomGradient />
        </button>
      </div>
    </form>
  );
};

export default Login;
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
