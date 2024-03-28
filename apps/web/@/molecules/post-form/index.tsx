"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma } from "database"
import dayjs from "dayjs"
import { ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { useFormStatus } from "react-dom"
import { Controller, useForm } from "react-hook-form"
import AsyncCreatableSelect from "react-select/async-creatable"
import { toast } from "react-toastify"
import z from "zod"

import { createPost, updatePost } from "@/actions/protect/posts"
import { Button, buttonVariants } from "@/components/ui/button"
import { DD_MMM_YYYY_HH_MM } from "@/constants"
import APP_ROUTES from "@/constants/routes"
import { cn } from "@/lib/utils"
import Editor from "@/molecules/editor"
import InputTitle from "@/molecules/input-title"
import { TPostItem } from "@/types/posts"

const PostForm = ({ post: postData }: { post?: TPostItem }) => {
  const { title = "", content = "", tagOnPost = [] } = postData || {}
  const t = useTranslations()

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
      tags: tagOnPost?.map((tag) => ({
        id: tag?.tag?.id,
        label: tag?.tag?.name,
        value: tag?.tag?.id,
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
    <div className="w-full">
      <div className="mb-4 flex justify-between">
        <div className="flex">
          <Link
            href={APP_ROUTES.USER_POSTS}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <ArrowLeft />
            <div className="ml-2">{t("common.back")}</div>
          </Link>
        </div>
        <div className="flex gap-4">
          {postData && (
            <div className="text-bold flex items-center gap-2">
              <div className="text-sm">{t("common.last_update_at")}</div>
              <div className="font-bold">
                {dayjs(postData?.updatedAt).format(DD_MMM_YYYY_HH_MM)}
              </div>
            </div>
          )}
        </div>
      </div>
      <form
        className="mb-4 w-full max-w-6xl"
        onSubmit={handleSubmit(handleSubmitPost)}
      >
        <div className="mb-4 w-full rounded-md p-8">
          <div className="w-full max-w-6xl">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <InputTitle
                  placeholder={t("common.title")}
                  {...field}
                />
              )}
            />

            <div className="mt-2">
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <AsyncCreatableSelect
                    isMulti
                    isClearable
                    placeholder={t("common.tags")}
                    name="colors"
                    classNamePrefix="select"
                    loadOptions={promiseOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value="reactjs"
                    classNames={{
                      menu: () => "dark:!bg-gray-900",
                      singleValue: () => "text-gray-900 dark:text-gray-100",
                      multiValue: () => "bg-transparent",
                      input: () => "dark:text-white",
                      multiValueRemove: () => "text-red-500",
                      control: () => "!bg-transparent !border-none",
                      option: () => "hover:bg-gray-100 dark:bg-gray-800",
                      noOptionsMessage: () => "text-gray-500 dark:bg-gray-800",
                    }}
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
                  <Editor
                    content={field?.value}
                    placeholder="Content..."
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end p-2">
          <Link
            className="mr-4 flex h-10 items-center justify-center rounded-md text-sm font-medium"
            href="/user/posts"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={!isValid || pending}
          >
            Publish
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
