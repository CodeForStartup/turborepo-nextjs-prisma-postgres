"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma } from "database"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useFormStatus } from "react-dom"
import { Controller, useForm } from "react-hook-form"
import AsyncCreatableSelect from "react-select/async-creatable"
import { toast } from "react-toastify"
import z from "zod"

import { createPost, TPostItem, updatePost } from "@/actions/protected/posts"
import { Button } from "@/components/ui/button"
import Editor from "@/molecules/editor"
import InputTitle from "@/molecules/input-title"

const PostForm = ({ post: postData }: { post?: TPostItem }) => {
  const { title = "", content = "", pagOnPost = [] } = postData

  const { postId } = useParams()
  const { pending } = useFormStatus()

  const postSchema = z.object({
    title: z.string(),
    tags: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          id: z.string().optional().nullable(),
          __isNew__: z.boolean().optional().nullable(),
        })
      )
      .max(5, "You can only add up to 5 tags")
      .optional()
      .nullable(),
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
  } = useForm({
    defaultValues: {
      title,
      tags: pagOnPost?.map((tag) => ({
        id: tag?.tag?.id,
        label: tag?.tag?.name,
        value: tag?.tag?.slug,
        __isNew__: false,
      })),
      content,
    },
    resolver: zodResolver(postSchema),
  })

  const handleSubmitPost = async (data) => {
    try {
      if (postId) {
        await updatePost(postId as string, {
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
    const rawData = await fetch("/api/protected/tags?search=" + inputValue)
    const tags = await rawData.json()

    return tags.map((tag) => ({
      label: tag.name,
      value: tag.id,
    }))
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
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <AsyncCreatableSelect
                isClearable
                isMulti
                name="colors"
                className="basic-multi-select"
                classNamePrefix="select"
                loadOptions={promiseOptions}
                {...field}
              />
            )}
          />
        </div>

        <div className="mt-3 rounded">
          <Controller
            name="content"
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
