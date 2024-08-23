import { useEffect, useMemo, useRef } from "react"

import { useGetImages } from "@/hooks/useGetImages"
import useInfiniteScroll from "@/hooks/useInfinityScroll"

import { useFileManager } from "./FileManagerContainer"
import ImageList from "./ImageList"

const AssetManagement = () => {
  const { search, setTotal } = useFileManager()
  const imageListRef = useRef<HTMLDivElement>(null)

  const filterParams = useMemo(() => {
    return {
      search,
      // order,
    }
  }, [search])

  const { images, isLoading, total, fetchMore } = useGetImages(filterParams)
  const { setNode } = useInfiniteScroll(fetchMore, imageListRef.current, isLoading)

  useEffect(() => {
    setTotal(total)
  }, [total, setTotal])

  return (
    <div
      ref={imageListRef}
      className="h-[400px] overflow-scroll px-4 py-4"
    >
      <ImageList
        isLoading={isLoading}
        images={images}
      />

      <div
        ref={setNode}
        className="h-10 w-full bg-transparent"
      />
    </div>
  )
}

export default AssetManagement
