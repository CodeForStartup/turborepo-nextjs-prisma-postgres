import { getUserById } from "@/actions/public/authors"
import FollowerItem from "@/molecules/follower/follower-item"
import UserProfile from "@/molecules/follower/user-profile"

export const metadata = {
  title: "Follower",
  description: "List of followers",
}

export default async function Page({ params }: { params: { authorId: string } }) {
  const author = await getUserById(params?.authorId as string)

  return (
    <div className="grid grid-cols-12 gap-10">
      <UserProfile author={author} />
      <div className="col-span-8 flex flex-col gap-4">
        <FollowerItem />
        <FollowerItem />
        <FollowerItem />
        <FollowerItem />
      </div>
    </div>
  )
}
