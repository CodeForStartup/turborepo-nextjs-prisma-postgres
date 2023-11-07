"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma } from "database"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useFormStatus } from "react-dom"
import { Controller, useForm } from "react-hook-form"
import AsyncSelect from "react-select/async"
import CreatableSelect from "react-select/creatable"
import { toast } from "react-toastify"
import z from "zod"

import { Button } from "@/components/ui/button"
import Editor from "@/molecules/editor"
import InputTitle from "@/molecules/input-title"

export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
]

const PostForm = ({ title = "", content = "" }: Partial<Prisma.PostCreateInput>) => {
  const { postId } = useParams()
  const { pending } = useFormStatus()

  const postSchema = z.object({
    title: z.string(),
    content: z
      .string()
      .max(10000, "Content must be at most 10000 characters")
      .optional()
      .nullable(),
  }) satisfies z.ZodType<Partial<Prisma.PostCreateInput>>

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Partial<Prisma.PostCreateInput>>({
    defaultValues: {
      title,
      content,
    },
    resolver: zodResolver(postSchema),
  })

  const handleSubmitPost = async (data) => {
    try {
      if (postId) {
        await updatePost(postId, {
          ...data,
        })
      } else {
        await createPost({
          ...data,
        })
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const promiseOptions = async (inputValue: string) => {
    const tags = await fetch("/api/protected/tags?search=" + inputValue)
    return await tags.json()
  }

  return (
    <form className="w-full max-w-6xl" onSubmit={handleSubmit(handleSubmitPost)}>
      <div className="w-full max-w-6xl">
        <div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <InputTitle placeholder="Title..." {...field} />}
          />
        </div>

        <div className="mt-2">
          <AsyncSelect
            isClearable
            isMulti
            name="colors"
            options={colourOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            loadOptions={promiseOptions}
          />
        </div>

        <div className="mt-3 rounded">
          <Controller
            name="content"
            className="rounded"
            control={control}
            render={({ field }) => (
              <Editor content={field?.value} placeholder="Content..." {...field} />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end p-2">
        <Link
          className="mr-4 flex h-10 items-center justify-center rounded-md text-sm font-medium"
          href="/user/posts"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={!isValid || pending}>
          Publish
        </Button>
      </div>
    </form>
  )
}

export default PostForm
