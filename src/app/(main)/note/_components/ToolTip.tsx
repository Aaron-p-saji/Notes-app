"use client";
import { type Editor } from "@tiptap/react";
import React from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="border border-input bg-transparent rounded-md p-[0.5vw]">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        <Heading1 className="h-4 w-4 focus:font-bold" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italics")}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strikethrough")}
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("list-bullet")}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("list-ordered")}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default Toolbar;
