import { getTags } from "database"

import PageTitle from "@/molecules/page-title"

import TagList from "./components/tags-list"

export const metadata = {
  title: "Tags",
  description: "Tags are used to categorize posts. You can create, edit, and delete tags here.",
}

export default async function Page({ searchParams }) {
  const { data, total } = await getTags({
    ...searchParams,
  })

  return (
    <div className="w-full p-8">
      <PageTitle
        title="Tags"
        description="Tags are used to categorize posts. You can create, edit, and delete tags here."
      />
      <TagList
        data={data}
        total={total}
      />
    </div>
  )
}
