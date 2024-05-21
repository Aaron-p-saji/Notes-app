"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./ToolTip";
import Heading from "@tiptap/extension-heading";

type Props = {
  content: any;
  onChange: (richText: string) => void;
};

const Tiptap = ({ content, onChange }: Props) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "font-bold text-3xl",
          levels: [2],
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "w-full bg-[#EDEDED] min-h-[30vw] p-[1vw] rounded-md border-2 border-[#EBEBEB] focus-visible:ring-1 focus:border-[#9B9B9B] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
