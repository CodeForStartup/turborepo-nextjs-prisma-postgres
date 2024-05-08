import { redirect } from "next/navigation"

import APP_ROUTES from "@/constants/routes"
import PostForm from "@/molecules/post-form"
import { getServerSession } from "@/utils/auth"

export const metadata = {
  title: "Create Post",
  description: "Create a new post",
}

export default async function Page() {
  const session = await getServerSession()

  if (!session) {
    redirect(APP_ROUTES.LOGIN)
  }

  return <PostForm />
}
