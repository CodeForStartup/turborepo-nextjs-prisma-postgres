import PageTitle from "@/molecules/page-title"
import Filter from "@/molecules/tag/filter"
import TagList from "@/molecules/tag/tag-list"

export const metadata = {
  title: "Tags",
  description:
    "A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.",
}

export default async function Page() {
  return (
    <div className="">
      <PageTitle
        title="Tags"
        description="A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question."
      />

      <Filter />

      <TagList />
    </div>
  )
}
