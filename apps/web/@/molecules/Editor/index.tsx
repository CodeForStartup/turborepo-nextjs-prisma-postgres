"use client";

import React, { FormEventHandler } from "react";

import CharacterCount from "@tiptap/extension-character-count";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import "./index.css";
import MenuBar from "./menu-bar";

type EditorProps = {
  content?: string;
  placeholder?: string;
  name: string;
  onChange: FormEventHandler<HTMLDivElement>;
};

export default ({
  content = "",
  placeholder = "",
  name,
  onChange,
  ...props
}: EditorProps) => {
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
    onUpdate: ({ editor }) => {
      onChange({
        target: {
          name,
          value: editor.getHTML(),
        },
      } as any);
    },
  });

  return (
    <div className="w-full editor p-3 h-full">
      {editor && <MenuBar editor={editor} />}
      <EditorContent {...props} name={name} editor={editor} />
    </div>
  );
};
