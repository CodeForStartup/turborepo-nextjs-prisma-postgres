import { Metadata } from "next";

import { getPosts } from "@/actions/public/posts";
import Filter from "@/molecules/home/filter";
import PostItem from "@/molecules/posts/post-item";

export const metadata: Metadata = {
  title: "Toplist360 - Share the best things",
  description: "Top of the best things in the world",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const posts = await getPosts({
    searchParams,
  });

  return (
    <div className="">
      <Filter />
      <div className="mt-4">
        {posts?.data?.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </div>
  );
}
