import { useEffect, useState } from "react"

import { Image, TListImageResponse } from "database"

import SearchBar from "../nav/search-bar"
import ImageList from "./ImageList"

const AssetManagement = () => {
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/protected/images")
        const data: TListImageResponse = await response.json()

        setImages(data?.data?.data?.data)
      } catch (error) {
        console.error("Error fetching images:", error)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className="py-4">
      <div className="flex gap-4 p-1">
        <SearchBar />
        <div>filter...</div>
      </div>

      <ImageList images={images} />
    </div>
  )
}

export default AssetManagement
