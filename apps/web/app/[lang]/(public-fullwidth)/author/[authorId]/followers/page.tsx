import FollowerItem from "@/molecules/follower/followers/follower-item"
import UserProfile from "@/molecules/follower/user-profile"

export const metadata = {
  title: "Follower",
  description: "List of followers",
}

export default async function Page({ params }: { params: { authorId: string } }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <UserProfile authorId={params?.authorId} />
    </div>
  )
}
