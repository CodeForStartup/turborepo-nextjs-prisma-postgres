"use client"

import "./index.css"

import React, { FormEventHandler } from "react"
import Bold from "@tiptap/extension-bold"
import CharacterCount from "@tiptap/extension-character-count"
import CodeBlock from "@tiptap/extension-code-block"
import Document from "@tiptap/extension-document"
import Heading from "@tiptap/extension-heading"
import Paragraph from "@tiptap/extension-paragraph"
import Placeholder from "@tiptap/extension-placeholder"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
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
  const editor = useEditor({
    extensions: [
      Bold,
      Document,
      Paragraph,
      Text,
      StarterKit.configure({
        heading: false,
      }),
      CodeBlock,
      TaskList,
      TaskItem,
      Heading.extend({
        addAttributes() {
          return {
            class: {
              default: null,
              parseHTML: (element) => ({
                class: element.getAttribute("class"),
              }),
              renderHTML: (attributes) => ({
                class: attributes.class,
              }),
              // renderHTML({ node, HTMLAttributes }) {
              //   const level = this.options.levels.includes(node.attrs.level)
              //     ? node.attrs.level
              //     : this.options.levels[0]
              //   const classes: { [index: number]: string } = {
              //     1: "text-2xl",
              //     2: "text-xl",
              //   }
              //   return [
              //     `h${level}`,
              //     mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              //       class: `${classes[level]}`,
              //     }),
              //     0,
              //   ]
              // },
            },
          }
        },
      }).configure({ levels: [1, 2] }),

      CharacterCount.configure({
        limit: 10000,
      }),
      Placeholder.configure({
        placeholder,
      }),
      StarterKit.configure({
        history: false,
      }),
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

  editor?.on("transaction", ({ doc }) => {
    const heading = doc.querySelector("h1, h2, h3, h4")
    if (heading) {
      const classes = heading.attrs.class || []
      heading.attrs.class = classes.concat("your-custom-class")
    }
  })

  return (
    <div className="editor h-full w-full bg-red-500 p-3">
      {editor && <MenuBar editor={editor} />}
      <EditorContent {...props} name={name} editor={editor} />
    </div>
  )
}

export default Editor
