"use client";

import React from "react";

import CharacterCount from "@tiptap/extension-character-count";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import "./index.css";
import MenuBar from "./MenuBar";

type EditorProps = {
  content?: string;
  placeholder?: string;
};

export default ({ content = "", placeholder = "" }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: 10000,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
  });

  return (
    <div className="w-full editor p-3 h-full">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};
