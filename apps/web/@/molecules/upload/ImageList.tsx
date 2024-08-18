import React from "react"
import Image from "next/image"

import { Image as ImageType } from "database"
import { Check, CheckCircle, Circle, CircleDot, TrashIcon } from "lucide-react"
import { Button } from "ui"

import { useFileManager } from "./FileManagerContainer"

type ImageListProps = {
  images: ImageType[]
  isLoading: boolean
}

const ImageList: React.FC<ImageListProps> = ({ images, isLoading }) => {
  const { selectedFiles, setSelectedFiles } = useFileManager()

  const handleSelect = (image: ImageType) => {
    setSelectedFiles([image])
  }

  return (
    <div className="mt-2 flex flex-wrap gap-3 p-1">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        images?.map((image) => (
          <div
            key={image.id}
            className="group relative border"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${image.url}`}
              alt={`Image ${image.name}`}
              width={160}
              height={160}
              className="cursor-pointe h-[160px] w-[160px] bg-gray-300 object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute bottom-1 right-1 h-7 w-7 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => console.log("delete")}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="absolute right-1 top-1 h-7 w-7 rounded-full p-0"
              onClick={() => {
                if (selectedFiles?.at(0)?.id === image.id) {
                  setSelectedFiles([])
                } else {
                  handleSelect(image)
                }
              }}
            >
              {selectedFiles?.at(0)?.id === image.id ? (
                <CheckCircle className="h-6 w-6 text-blue-500" />
              ) : (
                <Circle className="h-6 w-6" />
              )}
            </Button>
          </div>
        ))
      )}
    </div>
  )
}

export default ImageList
