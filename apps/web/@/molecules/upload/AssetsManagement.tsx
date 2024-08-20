import { useMemo } from "react"

import { useGetImages } from "@/hooks/useGetImages"

import { useFileManager } from "./FileManagerContainer"
import ImageList from "./ImageList"
import ImageSearchBar from "./ImageSearchBar"

const AssetManagement = () => {
  const { search } = useFileManager()

  const filterParams = useMemo(() => {
    return {
      search,
    }
  }, [search])

  const { images, isLoading, isError } = useGetImages(filterParams)

  return (
    <div className="h-[400px] overflow-scroll px-4 py-4">
      <ImageSearchBar />

      <ImageList
        isLoading={isLoading}
        images={images}
      />
    </div>
  )
}

export default AssetManagement
