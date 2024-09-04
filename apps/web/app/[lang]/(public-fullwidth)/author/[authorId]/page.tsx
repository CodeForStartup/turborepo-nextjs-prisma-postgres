import UserProfile from "@/molecules/follower/user-profile"
import PostList from "@/molecules/posts/post-list"

export const generateMetadata = async ({ params, searchParams }) => {
  return {
    title: "Author",
    description: "",
  }
}

export default async function Page({ params, searchParams }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      {/* <UserProfile authorId={params?.authorId} /> */}
      <div className="col-span-8 rounded-md">
        <PostList
          getPostParams={{
            authorId: params?.authorId,
            ...searchParams,
          }}
        />
      </div>
    </div>
  )
}
