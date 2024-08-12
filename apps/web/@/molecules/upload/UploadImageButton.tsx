"use client"

import { useRef, useState } from "react"

import { Upload } from "lucide-react"
import { Button } from "ui"

const UploadImageButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Handle file upload logic here
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
        multiple={false}
      />
      <Button
        variant="outline"
        onClick={handleButtonClick}
      >
        <Upload />
        Upload
      </Button>
    </div>
  )
}

export default UploadImageButton
