import { getPosts, getTag } from "database"

import { DEFAULT_PAGE_LIMIT } from "@/constants"
import NoItemFounded from "@/molecules/no-item-founded"
import TagPagination from "@/molecules/pagination"
import PostItem from "@/molecules/posts/post-item"
import PostList from "@/molecules/posts/post-list"
import TagDetail from "@/molecules/tag/tag-detail"

export const metadata = {
  title: "Tags",
  description: "A list of tags used in the blog posts",
}

export default async function Page({ searchParams, params }) {
  console.log(params?.tagId)

  return (
    <div className="grid grid-cols-12 gap-10">
      {/* <TagDetail /> */}

      <PostList
        getPostParams={{
          tag: "reactjs",
        }}
      />
    </div>
  )
}
