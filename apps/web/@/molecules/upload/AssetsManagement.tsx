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

  const handleSelect = (id: string) => {
    // Handle image selection
    console.log("Selected image:", id)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/images/${id}`, { method: "DELETE" })
      setImages(images.filter((image) => image.id !== id))
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  return (
    <div className="gap-4">
      <div className="flex gap-4 px-1 py-1">
        <SearchBar />
        <div>filter...</div>
      </div>

      <ImageList images={images} />
    </div>
  )
}

export default AssetManagement
