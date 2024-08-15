import React, { useState } from "react"
import Image from "next/image"

import { Image as ImageType } from "database"
import { Check, Circle, TrashIcon } from "lucide-react"
import { Button } from "ui"

type ImageListProps = {
  images: ImageType[]
}

const ImageList: React.FC<ImageListProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)

  return (
    <div className="mt-2 flex flex-wrap gap-3">
      {images?.map((image) => (
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
              console.log(image)

              setSelectedImage(image)
            }}
          >
            {selectedImage?.id === image.id ? (
              <Check
                strokeWidth={1.5}
                className="h-6 w-6 text-blue-500"
              />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ImageList
