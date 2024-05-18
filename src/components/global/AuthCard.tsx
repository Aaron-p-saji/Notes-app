"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import Login from "./Login";
import SignIn from "./SignIn";

type Props = {
  df: any;
  setActiveTab: (tab: "login" | "register") => void;
};

export function AuthCard({ df, setActiveTab }: Props) {
  return (
    <Tabs defaultValue={df} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 !bg-[#27272A]">
        <TabsTrigger value="login" onClick={() => setActiveTab("login")}>
          Login
        </TabsTrigger>
        <TabsTrigger value="register" onClick={() => setActiveTab("register")}>
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader className="text-white items-center pb-[1vh]">
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to an Existing Account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Login />
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col items-center">
              <button className="flex items-center justify-center space-x-2 text-white hover:text-gray-400 transition-all shadow-md max-w-[300px] w-full rounded-3xl p-2">
                <span className="text-base font-medium antialiased font-inter">
                  Sign In with Google
                </span>
              </button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardContent className="!space-y-0 text-white">
            <SignIn />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
