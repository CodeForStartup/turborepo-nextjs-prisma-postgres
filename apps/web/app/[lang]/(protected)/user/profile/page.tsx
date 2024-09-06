import { auth } from "configs/auth"

import APP_APIS from "@/constants/apis"
import PageTitle from "@/molecules/page-title"
import Profile from "@/molecules/profile"
import { generatePath } from "@/utils/generatePath"

export default async function Page() {
  let currentUser = null
  try {
    const session = await auth()

    const userRaw = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}${generatePath(APP_APIS.protected.user.GET, {
        userId: session?.user?.id,
      })}`,
      {
        cache: "no-cache",
      }
    )

    currentUser = await userRaw.json()
  } catch (error) {
    //
  }

  return (
    <div>
      <PageTitle
        title="Profile"
        description="User detail information"
      />

      <Profile user={currentUser} />
    </div>
  )
}
