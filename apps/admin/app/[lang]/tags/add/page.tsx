import PageTitle from "@/molecules/page-title"
import TagForm from "@/molecules/tag/tag-form"

export const metadata = {
  title: "Create new tag",
  description: "",
}

export default async function Page({ searchParams }) {
  return (
    <div className="w-full p-8">
      <PageTitle title="Create Tag" />

      <TagForm />
    </div>
  )
}
