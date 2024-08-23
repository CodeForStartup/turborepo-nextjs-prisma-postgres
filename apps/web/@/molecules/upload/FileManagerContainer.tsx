import React, { createContext, useCallback, useContext, useReducer } from "react"

import { Image, OrderBy } from "database"

import { OrderByField } from "@/constants/upload"

export type FileManagerState = {
  selectedFiles: Image[]
  search: string
  order: (typeof OrderByField)[keyof typeof OrderByField]
  total: number
}
export type FileManagerContextType = FileManagerState & {
  setSelectedFiles: (files: Image[]) => void
  setSearch: (search: string) => void
  setOrder: (order: (typeof OrderByField)[keyof typeof OrderByField]) => void
  setTotal: (total: number) => void
}

const FileManagerContext = createContext<FileManagerContextType | null>(null)

export const useFileManager = () => {
  const context = useContext(FileManagerContext)
  if (!context) {
    throw new Error("useFileManager must be used within a FileManagerProvider")
  }
  return context
}

type FileManagerAction = {
  type: "SET_SELECTED_FILES" | "SET_SEARCH" | "SET_ORDER" | "SET_TOTAL"
  payload: any
}

function fileManagerReducer(state: FileManagerState, action: FileManagerAction): FileManagerState {
  switch (action.type) {
    case "SET_SELECTED_FILES":
      return { ...state, selectedFiles: action.payload }
    case "SET_SEARCH":
      return { ...state, search: action.payload }
    case "SET_ORDER":
      return { ...state, order: action.payload }
    case "SET_TOTAL":
      return { ...state, total: action.payload }
    default:
      return state
  }
}

const FileManagerContainer = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(fileManagerReducer, {
    selectedFiles: [],
    search: "",
    order: OrderByField.newest,
    total: 0,
  })

  const setSelectedFiles = useCallback((files: Image[]) => {
    dispatch({ type: "SET_SELECTED_FILES", payload: files })
  }, [])

  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", payload: search })
  }, [])

  const setOrder = useCallback((order: OrderBy) => {
    dispatch({ type: "SET_ORDER", payload: order })
  }, [])

  const setTotal = useCallback((total: number) => {
    dispatch({ type: "SET_TOTAL", payload: total })
  }, [])

  return (
    <FileManagerContext.Provider
      value={{
        ...state,
        setSelectedFiles,
        setSearch,
        setOrder,
        setTotal,
      }}
    >
      {children}
    </FileManagerContext.Provider>
  )
}

export default FileManagerContainer
