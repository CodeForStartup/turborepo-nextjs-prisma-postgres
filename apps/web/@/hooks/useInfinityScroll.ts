import { useCallback, useEffect, useRef, useState } from "react"

const useInfiniteScroll = (callback: () => void, root: HTMLElement | null, isFetching: boolean) => {
  // const [isFetching, setIsFetching] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)
  const [node, setNode] = useState<HTMLElement | null>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isFetching) {
        console.log("isIntersecting", entries[0])
        callback?.()
      }
    },
    [callback, isFetching]
  )

  useEffect(() => {
    if (!root || !node || isFetching) return

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(handleIntersection, {
      root,
      rootMargin: "100px",
      threshold: 0.1,
    })

    observer.current.observe(node)

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [handleIntersection, root, node])

  return { setNode }
}

export default useInfiniteScroll
