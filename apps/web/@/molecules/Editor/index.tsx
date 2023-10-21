"use client"

import "./index.css"

import React, { FormEventHandler } from "react"
import CharacterCount from "@tiptap/extension-character-count"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import MenuBar from "./menu-bar"

type EditorProps = {
  content?: string
  placeholder?: string
  name: string
  onChange: FormEventHandler<HTMLDivElement>
}

export default ({ content = "", placeholder = "", name, onChange, ...props }: EditorProps) => {
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
      } as any)
    },
  })

  return (
    <div className="editor h-full w-full p-3">
      {editor && <MenuBar editor={editor} />}
      <EditorContent {...props} name={name} editor={editor} />
    </div>
  )
}
