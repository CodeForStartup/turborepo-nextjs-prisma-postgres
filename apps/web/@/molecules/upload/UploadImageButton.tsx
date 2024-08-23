"use client"

import { useRef } from "react"

import { Upload } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "react-toastify"
import { LoadingButton } from "ui"

import { useUploadImage } from "@/hooks/useUploadImage"

const UploadImageButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations("uploads")
  const { uploadImage, isMutating } = useUploadImage()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      uploadImage(file)
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
        loading={isMutating}
        variant="default"
        onClick={handleButtonClick}
        className="gap-1"
        size="sm"
      >
        <Upload size={16} />
        {t("upload")}
      </LoadingButton>
    </div>
  )
}

export default UploadImageButton
