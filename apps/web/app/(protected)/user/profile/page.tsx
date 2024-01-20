import PageTitle from "@/molecules/page-title"
import Profile from "@/molecules/profile"

export default function Page() {
  return (
    <div>
      <PageTitle title="Profile" description="User detail information" />

      <Profile />
    </div>
  )
}
