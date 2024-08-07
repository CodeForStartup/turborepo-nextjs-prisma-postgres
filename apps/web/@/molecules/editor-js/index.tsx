"use client"

import "./index.css"

import React, { useCallback } from "react"

import Blockquote from "@tiptap/extension-blockquote"
import Bold from "@tiptap/extension-bold"
import BulletList from "@tiptap/extension-bullet-list"
import CharacterCount from "@tiptap/extension-character-count"
import CodeBlock from "@tiptap/extension-code-block"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Document from "@tiptap/extension-document"
import Heading from "@tiptap/extension-heading"
import Link from "@tiptap/extension-link"
import ListItem from "@tiptap/extension-list-item"
import OrderedList from "@tiptap/extension-ordered-list"
import Paragraph from "@tiptap/extension-paragraph"
import Placeholder from "@tiptap/extension-placeholder"
import Text from "@tiptap/extension-text"
import Underline from "@tiptap/extension-underline"
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { common, createLowlight } from "lowlight"

import MenuBar from "./menu-bar"

type EditorProps = {
  content?: string
  placeholder?: string
  name: string
  onChange: (content: string) => void
}

const Editor = ({
  content = "",
  placeholder = "Write your story...",
  name,
  onChange,
  ...props
}: EditorProps) => {
  const MyHeading = Heading.extend({
    levels: [2, 3, 4],
    renderHTML({ node, HTMLAttributes }) {
      const level = this.options.levels.includes(node.attrs.level)
        ? node.attrs.level
        : this.options.levels[0]

      const classes = {
        2: "text-3xl font-bold dark:text-white",
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

  const lowlight = createLowlight(common)

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
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "mt-6 border-l-2 pl-6 italic",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      StarterKit.configure({
        heading: false,
        listItem: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
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
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      ListItem,
      Underline,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  return (
    <div className="editor h-full w-full">
      {editor && (
        <MenuBar
          editor={editor}
          setLink={setLink}
        />
      )}
      <EditorContent
        {...props}
        className="h-full w-full bg-transparent"
        name={name}
        editor={editor}
      />
    </div>
  )
}

export default Editor
