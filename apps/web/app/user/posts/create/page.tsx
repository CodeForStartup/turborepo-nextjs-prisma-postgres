import { authConfigs } from "configs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import PostForm from "./post-form";

export default async function Page() {
  const session = await getServerSession(authConfigs);

  if (!session) {
    redirect("/signIn");
  }

  return <PostForm />;
}
