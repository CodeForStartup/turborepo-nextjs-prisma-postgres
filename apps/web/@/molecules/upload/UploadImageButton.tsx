"use client"

import { useRef } from "react"

import { Upload } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "react-toastify"
import { LoadingButton } from "ui"

const UploadImageButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations("uploads")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const formData = new FormData()
      formData.append("file", file)

      // Todo: replace with hook
      fetch("/api/protected/images", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(t("image_uploaded_successfully"))
        })
        .catch((error) => {
          toast.error(t("error_uploading_image"))
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
