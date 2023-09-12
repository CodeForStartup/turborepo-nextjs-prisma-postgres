import React from "react";
import { getPosts } from "./post-handlers";
import Link from "next/link";
import PostItem from "@/molecules/post/post-item";

export default async function Page() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}
