"use client"

import { Loader } from "lucide-react"

import useInfiniteScroll from "@/hooks/useInfinityScroll"

interface InfiniteScrollProps {
  containerClassName?: string
  children: React.ReactNode
  hasMore?: boolean
  root?: HTMLElement | null
  loading: boolean
  nextPage: (params: Record<string, any>) => Promise<any>
}

export default function InfiniteScroll({
  containerClassName,
  children,
  hasMore,
  root,
  nextPage,
  loading,
}: InfiniteScrollProps) {
  const { setNode } = useInfiniteScroll(nextPage, root, loading)

  return (
    <div className={containerClassName}>
      {children}

      <div
        ref={setNode}
        className="flex h-10 w-full items-center justify-center"
      >
        {loading && <Loader className="animate-spin" />}
      </div>
    </div>
  )
}
