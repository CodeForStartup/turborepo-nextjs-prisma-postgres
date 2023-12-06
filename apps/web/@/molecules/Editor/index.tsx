"use client"

import "./index.css"

import React, { FormEventHandler } from "react"
import Bold from "@tiptap/extension-bold"
import BulletList from "@tiptap/extension-bullet-list"
import CharacterCount from "@tiptap/extension-character-count"
import CodeBlock from "@tiptap/extension-code-block"
import Document from "@tiptap/extension-document"
import Heading from "@tiptap/extension-heading"
import ListItem from "@tiptap/extension-list-item"
import OrderedList from "@tiptap/extension-ordered-list"
import Paragraph from "@tiptap/extension-paragraph"
import Placeholder from "@tiptap/extension-placeholder"
import Text from "@tiptap/extension-text"
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import MenuBar from "./menu-bar"

type EditorProps = {
  content?: string
  placeholder?: string
  name: string
  onChange: FormEventHandler<HTMLDivElement>
}

const Editor = ({ content = "", placeholder = "", name, onChange, ...props }: EditorProps) => {
  const MyHeading = Heading.extend({
    levels: [2, 3, 4],
    renderHTML({ node, HTMLAttributes }) {
      const level = this.options.levels.includes(node.attrs.level)
        ? node.attrs.level
        : this.options.levels[0]

      const classes = {
        2: "text-3xl font-bold",
        3: "text-2xl font-bold",
        4: "text-xl font-bold",
      }

      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${classes[level]}`,
        }),
        0,
      ]
    },
  }).configure({
    levels: [2, 3, 4],
  })

  const editor = useEditor({
    extensions: [
      Bold,
      Document,
      Paragraph,
      Text,
      CodeBlock,
      MyHeading,
      CharacterCount.configure({
        limit: 10000,
      }),
      Placeholder.configure({
        placeholder,
      }),
      StarterKit.configure({
        heading: false,
        listItem: false,
        bulletList: false,
        orderedList: false,
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-6",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-6",
        },
      }),
      ListItem,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange({
        target: {
          name: name as string,
          value: editor.getHTML(),
        },
      })
    },
  })

  return (
    <div className="editor h-full w-full p-3">
      {editor && <MenuBar editor={editor} />}
      <EditorContent {...props} name={name} editor={editor} />
    </div>
  )
}

export default Editor
