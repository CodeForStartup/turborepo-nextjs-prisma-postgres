import { useEffect, useState } from "react"

import { Image, TListImageResponse } from "database"

import { useGetImages } from "@/hooks/useGetImages"

import SearchBar from "../nav/search-bar"
import ImageList from "./ImageList"

const AssetManagement = () => {
  const { images, isLoading, isError } = useGetImages({})

  return (
    <div className="h-[400px] overflow-scroll px-4 py-4">
      <div className="flex gap-4">
        <SearchBar />
        <div>filter...</div>
      </div>

      <ImageList
        isLoading={isLoading}
        images={images}
      />
    </div>
  )
}

export default AssetManagement
