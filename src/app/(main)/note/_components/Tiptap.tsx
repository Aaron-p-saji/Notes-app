"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./ToolTip";
import Heading from "@tiptap/extension-heading";
import FontFamily from "@tiptap/extension-font-family";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/providers/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  content: any;
  onChange: (richText: string) => void;
  docId: string;
  title: string;
};

export type Notes = {
  id: string;
  notes: string;
  title: string;
  userId: string;
};

const createNote = async (
  userid: string,
  title: string,
  notes: string,
  createdAt?: string
) => {
  try {
    const docRef = await addDoc(collection(db, "notesDb"), {
      userid,
      title,
      notes,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const Tiptap = ({ content, onChange, docId, title }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [editorContent, setEditorContent] = useState(content);

  const router = useRouter();
  const [user] = useAuthState(auth);

  const handleChange = async (newContent: string) => {
    onChange(newContent);
    setEditorContent(newContent);

    if (isUpdating) return; // Prevent concurrent updates

    setIsUpdating(true);

    try {
      const docRef = doc(db, "notesDb", docId);

      if (!docRef.id) {
        // Document doesn't exist, create a new one
        const success = await createNote(user!.uid, title, newContent);
        if (!success) {
          toast.error("Failed to create new note.");
        } else {
          router.refresh();
        }
        setIsUpdating(false);
        return;
      }

      await updateDoc(docRef, {
        title,
        notes: newContent,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to save notes. Please try again.");
    } finally {
      setIsUpdating(false);
    }
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
      TextStyle,
      FontFamily,
    ],
    content: editorContent,
    editorProps: {
      attributes: {
        class:
          "w-full bg-[#EDEDED] min-h-[30vw] p-[1vw] rounded-md border-2 border-[#EBEBEB] focus-visible:ring-1 focus:border-[#9B9B9B] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      onChange(newContent);

      // Debounce the update function
      debounceUpdate(newContent, 500);
    },
  });

  const debounceUpdate = (content: string, delay: number) => {
    let timeoutId: NodeJS.Timeout | undefined; // Initialize as undefined

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      handleChange(content);
    }, delay);
  };
  if (!editor) {
    return null; // Don't render until editor is ready
  }

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
