import TaskList from "app/[lang]/tags/components/taskList"

import { getTags } from "@/actions/tags"
import { DEFAULT_TAG_PAGE_LIMIT } from "@/constants"
import PageTitle from "@/molecules/page-title"

// import { GetDataSuccessType } from "@/types"
// import { TTagItem } from "@/types/tags"

export const metadata = {
  title: "Tags",
  description:
    "A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.",
}

export default async function Page({ searchParams }) {
  const tags = await getTags({ ...searchParams })

  return (
    <div className="w-full p-8">
      <PageTitle title="Tags" />
      <TaskList tags={tags} />
    </div>
  )
}
