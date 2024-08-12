import React, { useEffect, useState } from "react"

import { TrashIcon } from "lucide-react"
import { Button } from "ui"

interface Image {
  id: string
  url: string
}

const ImageList: React.FC = () => {
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    // Fetch images from API
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images") // Replace with your API endpoint
        const data = await response.json()
        setImages(data)
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
    <div className="grid grid-cols-5 gap-2">
      {images.map((image) => (
        <div
          key={image.id}
          className="group relative"
        >
          <img
            src={image.url}
            alt={`Image ${image.id}`}
            className="h-40 w-40 cursor-pointer object-cover"
            onClick={() => handleSelect(image.id)}
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => handleDelete(image.id)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ImageList
