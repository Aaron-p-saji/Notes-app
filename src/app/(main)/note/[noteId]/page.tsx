"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import Tiptap, { Notes } from "../_components/Tiptap";
import InputTag from "../_components/InputTag";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/providers/firebase-config";

type Props = {};

const NoteEditor = ({ params }: { params: { noteId: string } }) => {
  const router = useRouter();
  const [fileName, setFileName] = useState<string>("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Title should be more than 5 characters" })
      .max(20, { message: "title is too long" }),
    price: z.number(),
    description: z
      .string()
      .min(1, { message: "Note should have some content" })
      .trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      price: 29.99,
      description: "",
    },
  });

  const { register } = useForm();

  const handleInputChange = (e: any) => {
    setFileName(e.target.value);
    register("fileName").onChange(e); // Trigger react-hook-form's onChange
  };

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const docRef = doc(db, "notesDb", params.noteId);
        const docSnap = await getDoc(docRef); // Fetch document

        if (docSnap.exists()) {
          const data = docSnap.data() as Notes;
          setFileName(data.title); // Set title in InputTag
          setContent(data.notes); // Set content in Tiptap
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoteData();
  }, [params.noteId]);
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <main>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="p-0">
                <FormControl>
                  <InputTag
                    field={field}
                    fileName={fileName}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="px-[5vw] pt-[1vw]">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="p-0">
                  <FormControl>
                    <Tiptap
                      content={content}
                      onChange={handleContentChange}
                      docId={params.noteId}
                      title={fileName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </main>
  );
};

export default NoteEditor;
