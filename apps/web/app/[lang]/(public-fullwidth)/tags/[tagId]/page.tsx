import { getTag } from "database"

import PostList from "@/molecules/posts/post-list"
import TagDetail from "@/molecules/tag/tag-detail"

export const generateMetadata = async ({ params }) => {
  const { data: tag, error } = await getTag({
    tagIdOrSlug: params?.tagId,
  })

  return {
    title: tag?.name,
    description: tag?.description,
  }
}

export default async function Page({ searchParams, params }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <TagDetail tagIdOrSlug={params?.tagId} />

      <PostList
        containerClassName="col-span-8 mt-0"
        getPostParams={{
          tag: params?.tagId,
        }}
      />
    </div>
  )
}
