import { Metadata } from "next"

import { getTranslations } from "next-intl/server"
import { Typography } from "ui"

import Filter from "@/molecules/home/filter"
import SearchBar from "@/molecules/nav/search-bar"
import PostList from "@/molecules/posts/post-list"

export async function generateMetadata({ searchParams }): Promise<Metadata> {
  return {
    title: `${searchParams?.search} - Search results`,
    description: `Search results for "${searchParams?.search}"`,
  }
}

export default async function Page({ searchParams }) {
  const t = await getTranslations({
    namespace: "common",
  })

  return (
    <div>
      <Typography
        variant="h1"
        className="flex-1 text-xl font-extrabold lg:text-2xl"
      >
        {t("search_results_for")}
        <strong className="px-2 text-xl lg:text-2xl">{`"${searchParams?.search}"`}</strong>
      </Typography>

      <SearchBar />

      <Filter className="mt-3" />

      <PostList
        getPostParams={{
          search: searchParams?.search,
        }}
      />
    </div>
  )
}
