"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { AsterLabel } from "../ui/aster-label";
import { AsterInput } from "../ui/acter-input";

import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"; // Removed OnlyFans icon
import { getAuth } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "sonner";
import { auth, db } from "@/providers/firebase-config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc } from "firebase/firestore";

type Props = {};
const createUser = async (
  userid: string,
  firstname: string,
  lastname: string,
  email: string
) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      userid,
      firstname,
      lastname,
      email,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const SignIn = (props: Props) => {
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const router = useRouter();
  const [user] = useAuthState(auth);

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (userDetails.firstname && userDetails.email && password && rePassword) {
      if (password === rePassword) {
        try {
          const res = await createUserWithEmailAndPassword(
            userDetails.email,
            password
          );
          console.log({ res });
          const auth = getAuth();
          const updatedUser = auth.currentUser;

          if (updatedUser) {
            const docRef = await createUser(
              updatedUser.uid,
              userDetails.firstname,
              userDetails?.lastname,
              userDetails.email
            );
            if (docRef) {
              // Move toast here
              toast.success("Registration Successful!");
              setUserDetails({
                firstname: "",
                lastname: "",
                email: "",
              });
              setPassword("");
              router.push("/home"); // Now push after successful save
            } else {
              toast.error("Unable to save user data");
            }
          }
        } catch (error) {
          const errorMessage = error;
          toast.error(`Registration Failed: ${errorMessage}`);
        }
      } else {
        toast.error("Passwords do not match.");
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };
  return (
    <>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl bg-white dark:bg-black pt-[2vh] !border-0">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Notes.app
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Hola! Create an account to get started
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <AsterLabel htmlFor="firstname">First name</AsterLabel>
              <AsterInput
                id="firstname"
                placeholder="Tyler"
                type="text"
                value={userDetails.firstname}
                onChange={(e) => {
                  setUserDetails({
                    firstname: e.target.value,
                    lastname: userDetails.lastname,
                    email: userDetails.email,
                  });
                }}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <AsterLabel htmlFor="lastname">Last name</AsterLabel>
              <AsterInput
                id="lastname"
                placeholder="Durden"
                type="text"
                value={userDetails.lastname}
                onChange={(e) => {
                  setUserDetails({
                    firstname: userDetails.firstname,
                    lastname: e.target.value,
                    email: userDetails.email,
                  });
                }}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <AsterLabel htmlFor="email-input">Email Address</AsterLabel>
            <AsterInput
              id="email-input"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={userDetails.email}
              onChange={(e) => {
                setUserDetails({
                  firstname: userDetails.firstname,
                  lastname: userDetails.lastname,
                  email: e.target.value,
                });
              }}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <AsterLabel htmlFor="password-inp">Password</AsterLabel>
            <AsterInput
              id="password-inp"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <AsterLabel htmlFor="re_password">Re-enter password</AsterLabel>
            <AsterInput
              id="re_password"
              placeholder="••••••••"
              type="password"
              value={rePassword}
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
      <div className="flex flex-col space-y-4 w-full items-center">
        <button
          className=" relative group/btn flex space-x-2 items-center px-4 w-full text-black rounded-md justify-center h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            GitHub
          </span>
          <BottomGradient />
        </button>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Google
          </span>
          <BottomGradient />
        </button>
      </div>
    </>
  );
};

export default SignIn;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
