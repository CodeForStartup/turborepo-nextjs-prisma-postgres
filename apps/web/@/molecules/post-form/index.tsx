"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma, TImage, TPostItem } from "database"
import { Upload as UploadIcon, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import { Controller, useForm } from "react-hook-form"
import AsyncCreatableSelect from "react-select/async-creatable"
import { Button, buttonVariants, cn, Label, LoadingButton, Typography } from "ui"
import z from "zod"

import { handleCreateUpdatePost } from "@/actions/protect/postAction"
import APP_ROUTES from "@/constants/routes"
import InputTitle from "@/molecules/input-title"

import Upload from "../upload"

const Editor = dynamic(() => import("../editor-js"), { ssr: false })

const PostForm = ({ post: postData }: { post?: TPostItem }) => {
  const { title = "", content = "", tagOnPost = [], id: postId } = postData || {}

  const t = useTranslations()
  const session = useSession()
  const [image, setImage] = useState<TImage | null>(postData?.Image)

  const userId = session?.data?.user?.id

  const postSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
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
    content: z.string(),
    //   .max(10000, "Content must be at most 10000 characters")
    //   .min(100, "Content must be at least 10 characters"),
  }) satisfies z.ZodType<Partial<Prisma.PostCreateInput>>

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
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

  const promiseOptions = async (inputValue: string) => {
    const rawData = await fetch(`/api/protected/tags?search=${inputValue}`)
    const tags = await rawData.json()

    return tags.map((tag) => ({
      label: tag.name,
      value: tag.id,
    }))
  }

  const onSubmit = async (data) =>
    await handleCreateUpdatePost({
      postId: postId as string,
      data: {
        ...data,
        Image: {
          connect: {
            id: image?.id,
          },
        },
      },
      userId,
    })

  return (
    <div className="w-full">
      <form
        className="mb-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-3 mb-4 w-full rounded-md">
            <div className="w-full">
              <div className="">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <InputTitle
                      placeholder={t("common.untitled")}
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="mt-3">
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <Editor
                      content={field?.value}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="relative overflow-hidden rounded-lg border-2 p-2">
              <Upload onSelect={setImage}>
                {image ? (
                  <div className="group relative cursor-pointer">
                    <Image
                      src={image.url}
                      alt="image"
                      width={480}
                      height={270}
                      className="border-1 flex aspect-video w-full rounded-sm object-cover hover:scale-90 hover:opacity-50"
                    />
                    <div className="invisible absolute inset-0 flex-col items-center justify-center gap-2 group-hover:flex">
                      <UploadIcon className="invisible group-hover:visible" />
                      <Typography
                        className="bold invisible group-hover:visible"
                        variant="mutedText"
                      >
                        {t("uploads.upload_image")}
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <div className="border-1 flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-sm bg-slate-200">
                    <UploadIcon />
                    <Typography variant="mutedText">{t("uploads.upload_image")}</Typography>
                  </div>
                )}
              </Upload>
              {image && (
                <Button
                  onClick={() => setImage(null)}
                  variant="outline"
                  className="absolute right-2 top-2 h-6 w-6 p-0"
                >
                  <X className="text-destructive" />
                </Button>
              )}
            </div>
            <div className="mt-4">
              <Label>Tags</Label>
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
                      container: () => "w-full border rounded",
                      menu: () => "dark:!bg-gray-900",
                      singleValue: () => "text-gray-900 dark:text-gray-100",
                      multiValue: () => "bg-transparent",
                      input: () => "dark:text-white",
                      multiValueRemove: () => "text-red-500",
                      control: () => "!bg-transparent !border-none",
                      option: () => "hover:bg-gray-100 dark:bg-gray-800 hover:cursor-pointer",
                      noOptionsMessage: () => "text-gray-500 dark:bg-gray-800",
                    }}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-4">
          <LoadingButton
            type="submit"
            className="w-[150px] uppercase"
          >
            {postId ? t("common.update") : t("common.publish")}
          </LoadingButton>
          <Link
            className={cn(buttonVariants({ variant: "outline" }), "w-[150px] uppercase")}
            href={APP_ROUTES.USER_POSTS}
          >
            {t("common.cancel")}
          </Link>
        </div>
      </form>
    </div>
  )
}

export default PostForm
