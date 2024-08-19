import { useState } from "react"

import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import useSWRMutation from "swr/mutation"
import useSWRImmutable from "swr/mutation"

// upload image to server API
const uploadImage = async (file: File) => {
  try {
    const formData = new FormData()

    formData.append("file", file)

    // Todo: replace with hook
    const response = await fetch("/api/protected/images", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    toast.success("Image uploaded successfully")

    return response.json()
  } catch (error) {
    toast.error("Error uploading image")
    // throw error
  }
}

// upload image hook
export const useUploadImage = () => {
  const { mutate } = useSWRConfig()

  const { trigger, isMutating, error, data } = useSWRMutation(
    "/api/protected/images",
    async (url, { arg }: { arg: File }) => {
      const result = await uploadImage(arg)
      mutate(["/api/protected/images"])
      return result
    }
  )

  return { uploadImage: trigger, isMutating, error, data }
}
