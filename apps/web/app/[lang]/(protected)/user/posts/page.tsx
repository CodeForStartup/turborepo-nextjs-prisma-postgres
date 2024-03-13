import React from "react"
import { redirect } from "next/navigation"
import { Metadata } from "next/types"

import { getTranslations } from "next-intl/server"

import { getPosts } from "@/actions/protect/posts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import NoItemFounded from "@/molecules/no-item-founded"
import PageTitle from "@/molecules/page-title"
import PostItem from "@/molecules/user/posts/post-item"
import { getServerSession } from "@/utils/auth"

export async function generateMetadata(): Promise<Metadata> {
  // TODO: Get user info
  return {
    title: "Posts",
    description: "User posts",
  }
}

export default async function Page({ searchParams }) {
  const session = await getServerSession()
  const t = await getTranslations()

  if (!session) {
    redirect("/sign-in")
  }

  const { total, data } = await getPosts({
    searchParams: {
      authorId: session?.user?.id,
      ...searchParams,
    },
  })

  return (
    <div>
      <PageTitle title="Posts" />

      <div className="flex items-center justify-between">
        <div>
          {t("common.total_post_plural", {
            total,
          })}
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-12">
        {data?.length === 0 ? (
          <NoItemFounded />
        ) : (
          data?.map((post) => (
            <PostItem
              key={post.id}
              {...post}
            />
          ))
        )}
      </div>
    </div>
  )
}
