import React from "react"

import { Image as ImageType } from "database"

import NoItemFounded from "../no-item-founded"
import ImageItem from "./ImageItem"
import Loading from "./Loading"

type ImageListProps = {
  images: ImageType[]
  isLoading: boolean
}

const ImageList: React.FC<ImageListProps> = ({ images, isLoading }) => {
  if (isLoading) {
    return <Loading />
  }

  if (images?.length === 0) {
    return <NoItemFounded />
  }

  return (
    <div className="flex flex-wrap gap-3 p-1">
      {images?.map((image) => (
        <ImageItem
          key={image.id}
          image={image}
        />
      ))}
    </div>
  )
}

export default ImageList
