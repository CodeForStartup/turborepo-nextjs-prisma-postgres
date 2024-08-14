import React from "react"
import Image from "next/image"

import { Image as ImageType } from "database"
import { TrashIcon } from "lucide-react"
import { Button } from "ui"

type ImageListProps = {
  images: ImageType[]
}

const ImageList: React.FC<ImageListProps> = ({ images }) => {
  return (
    <div className="mt-2 grid grid-cols-5 gap-3">
      {images?.map((image) => (
        <div
          key={image.id}
          className="group relative"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${image.url}`}
            alt={`Image ${image.id}`}
            width={90}
            height={90}
            className="h-[90px] w-[90px] cursor-pointer object-cover"
            // onClick={() => handleSelect(image.id)}
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
            // onClick={() => handleDelete(image.id)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ImageList
