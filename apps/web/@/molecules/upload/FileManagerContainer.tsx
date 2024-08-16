import React, { createContext, useCallback, useContext, useReducer } from "react"

import { OrderBy } from "database"

// newest
// oldest
// name A-Z
// name Z-A
export const OrderField = {
  newest: "createdAt",
  oldest: "createdAt",
  nameAsc: "name",
  nameDesc: "name",
}

export type FileManagerState = {
  selectedFiles: File[]
  search: string
  orderBy: OrderBy
  order: (typeof OrderField)[keyof typeof OrderField]
}
export type FileManagerContextType = FileManagerState & {
  setSelectedFiles: (files: File[]) => void
  setSearch: (search: string) => void
  setOrder: (order: "asc" | "desc") => void
  setOrderBy: (orderBy: string) => void
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
  type: "SET_SELECTED_FILES" | "SET_SEARCH" | "SET_ORDER" | "SET_ORDER_BY"
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
    case "SET_ORDER_BY":
      return { ...state, orderBy: action.payload }
    default:
      return state
  }
}

const FileManagerContainer = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(fileManagerReducer, {
    selectedFiles: [],
    search: "",
    order: OrderField.newest,
    orderBy: "asc",
  })

  const setSelectedFiles = useCallback((files: File[]) => {
    dispatch({ type: "SET_SELECTED_FILES", payload: files })
  }, [])

  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", payload: search })
  }, [])

  const setOrder = useCallback((order: OrderBy) => {
    dispatch({ type: "SET_ORDER", payload: order })
  }, [])

  const setOrderBy = useCallback((orderBy: string) => {
    dispatch({ type: "SET_ORDER_BY", payload: orderBy })
  }, [])

  return (
    <FileManagerContext.Provider
      value={{
        ...state,
        setSelectedFiles,
        setSearch,
        setOrder,
        setOrderBy,
      }}
    >
      {children}
    </FileManagerContext.Provider>
  )
}

export default FileManagerContainer
