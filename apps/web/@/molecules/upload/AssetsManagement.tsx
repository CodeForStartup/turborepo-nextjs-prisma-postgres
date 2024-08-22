import { useMemo, useRef } from "react"

import { useGetImages } from "@/hooks/useGetImages"
import useInfiniteScroll from "@/hooks/useInfinityScroll"

import { useFileManager } from "./FileManagerContainer"
import ImageList from "./ImageList"
import ImageSearchBar from "./ImageSearchBar"

const AssetManagement = () => {
  const { search } = useFileManager()
  const imageListRef = useRef<HTMLDivElement>(null)

  const filterParams = useMemo(() => {
    return {
      search,
    }
  }, [search])

  const { images, isLoading, fetchMore } = useGetImages(filterParams)
  const { setNode } = useInfiniteScroll(fetchMore, imageListRef.current, isLoading)

  return (
    <div
      ref={imageListRef}
      className="h-[400px] overflow-scroll px-4 py-4"
    >
      <ImageList
        isLoading={isLoading}
        images={images}
      />

      <div ref={setNode}>
        <div className="h-10 w-full bg-transparent" />
      </div>
    </div>
  )
}

export default AssetManagement
