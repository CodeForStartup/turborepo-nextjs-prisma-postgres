"use client"

import { useRef, useState } from "react"

import { Upload } from "lucide-react"
import { toast } from "react-toastify"
import { LoadingButton } from "ui"

const UploadImageButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    console.log(file)

    if (file) {
      // Handle file upload logic here
      const formData = new FormData()
      formData.append("file", file)

      fetch("/api/protected/images", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Image uploaded successfully")
        })
        .catch((error) => {
          toast.error("Error uploading image")
          console.error("Error uploading image:", error)
        })
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
      <LoadingButton
        variant="outline"
        onClick={handleButtonClick}
        // loading={loading}
      >
        <Upload size={16} />
        Upload
      </LoadingButton>
    </div>
  )
}

export default UploadImageButton
