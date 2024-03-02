import { redirect } from "next/navigation"

import PostForm from "@/molecules/post-form"
import { getServerSession } from "@/utils/auth"

export const metadata = {
  title: "toplist: Create Post",
  description: "Create a new post",
}

export default async function Page() {
  const session = await getServerSession()

  if (!session) {
    redirect("/signIn")
  }

  return <PostForm />
}
