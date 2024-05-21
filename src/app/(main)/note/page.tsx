"use client";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; // Adjust path as needed
import { useState, useEffect } from "react";
import { auth, db } from "@/providers/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

export default function NotePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useAuthState(auth);

  console.log(user);

  useEffect(() => {
    const createNote = async (
      userid: string,
      title?: string,
      notes?: string
    ) => {
      setIsLoading(true);
      try {
        const docRef = await addDoc(collection(db, "notesDb"), {
          userid,
          title,
          notes,
          createdAt: serverTimestamp(),
        });
        router.push(`/note/${docRef.id}`); // Redirect to the created note
      } catch (error) {
        console.error("Error creating note:", error);
        // Handle errors gracefully (e.g., show an error message)
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      createNote(user.uid, "", "");
      console.log("created");
    } else {
      toast.error("user Not Found");
      console.log("not created");
    }
  }, [router, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
}
