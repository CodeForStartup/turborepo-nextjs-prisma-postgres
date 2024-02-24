import { getTagById } from "@/actions/public/tags"
import TagDetail from "@/molecules/tag/tag-detail"

export const metadata = {
  title: "Tags",
  description: "A list of tags used in the blog posts",
}

export default async function Page({ params }: { params: { tagId: string } }) {
  const tag = await getTagById(params?.tagId as string)

  return (
    <div className="grid grid-cols-12 gap-10">
      <TagDetail tag={tag} />
    </div>
  )
}
