"use client"

import React, { useEffect, useRef } from "react"

import EditorJS from "@editorjs/editorjs"
import Header from "@editorjs/header"
import List from "@editorjs/list"

interface EditorJSProps {
  onChange: (data: any) => void
  data?: any
}

const Editor: React.FC<EditorJSProps> = ({ onChange, data }) => {
  const editorRef = useRef<EditorJS | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List,
        },
        data: data,
        placeholder: "Write your post here...",
        onChange: async () => {
          const content = await editorRef.current?.save()

          onChange(content)
        },
      })
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy()
      }
    }
  }, [])

  return <div id="editorjs" />
}

export default Editor
