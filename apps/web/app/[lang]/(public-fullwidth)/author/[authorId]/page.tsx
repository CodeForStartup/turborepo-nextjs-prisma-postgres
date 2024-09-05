import { getUser } from "database"

import UserProfile from "@/molecules/follower/user-profile"
import PostList from "@/molecules/posts/post-list"

export const generateMetadata = async ({ params }) => {
  const { data: author, error } = await getUser({ userId: params?.authorId })

  return {
    title: author?.name,
    description: author?.bio,
  }
}

export default async function Page({ params, searchParams }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <UserProfile authorId={params?.authorId} />
      <PostList
        containerClassName="mt-0 col-span-8"
        getPostParams={{
          authorId: params?.authorId,
          ...searchParams,
        }}
      />
    </div>
  )
}
