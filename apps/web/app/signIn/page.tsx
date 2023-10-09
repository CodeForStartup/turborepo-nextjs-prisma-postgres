import React from "react";
import Link from "next/link";
import PostItem from "@/molecules/user/posts/post-item";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Page() {
  return (
    <div>
      <h1>Sign In</h1>
    </div>
  );
}
