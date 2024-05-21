"use client";
import React, { useState } from "react";
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
import Tiptap from "../_components/Tiptap";
import InputTag from "../_components/InputTag";

type Props = {};

const NoteEditor = (props: Props) => {
  const [fileName, setFileName] = useState<string>("");
  const [content, setContent] = useState("");
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      id: uuidv4(),
      content: content,
    };
    console.log(data);
    const existingDataString = localStorage.getItem("myData");
    const existingData = existingDataString
      ? JSON.parse(existingDataString)
      : [];
    const updatedData = [...existingData, data];
    localStorage.setItem("myData", JSON.stringify(updatedData));
    setContent("");
  };
  const { register } = useForm();

  const handleInputChange = (e: any) => {
    setFileName(e.target.value);
    register("fileName").onChange(e); // Trigger react-hook-form's onChange
  };

  const formOnSubmit = (value: z.infer<typeof formSchema>) => {};

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formOnSubmit)}>
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
                    <Tiptap content={field.name} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <button
            className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm cursor-pointer"
            type="submit"
          >
            Save
          </button>
        </form>
      </Form>
    </main>
  );
};

export default NoteEditor;
