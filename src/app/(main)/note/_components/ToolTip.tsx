"use client";
import { type Editor } from "@tiptap/react";
import React, { useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  interface FontOption {
    name: string;
    fontName: string;
  }
  const fontOptions: FontOption[] = [
    { name: "Inter", fontName: "Inter" },
    { name: "Comic Sans", fontName: "Comic Sans MS, Comic Sans" },
    { name: "Serif", fontName: "serif" },
    { name: "Monospace", fontName: "monospace" },
  ];
  const [selectedFont, setSelectedFont] = useState<FontOption>(fontOptions[0]);
  const handleFontChange = (newFont: FontOption) => {
    setSelectedFont(newFont);
  };
  if (!editor) {
    return null;
  }
  return (
    <div className="border border-input bg-transparent rounded-md p-[0.5vw] flex">
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
      <Select
        onValueChange={(value) => {
          editor.chain().focus().setFontFamily(value).run();
        }}
        defaultValue={selectedFont.fontName} // Set the default font on load
      >
        <SelectTrigger className="w-[10vw]">
          <SelectValue placeholder={selectedFont.name} />
        </SelectTrigger>
        <SelectContent>
          {fontOptions.map((data, index) => (
            <SelectItem
              key={index}
              value={data.fontName}
              className={
                editor.isActive("textStyle", { fontFamily: data.fontName })
                  ? "is-active"
                  : ""
              }
            >
              {data.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Toolbar;
