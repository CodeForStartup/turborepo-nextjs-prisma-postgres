"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePost } from "app/posts/post-handlers";
import { Prisma } from "database";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function PostItem(post: Prisma.Post) {
  const onDeletePost = async () => {
    await deletePost(post.id);
  };

  return (
    <div className="py-4 flex justify-between">
      <div className="flex-1">
        <Link href={`posts/${post.id}/edit`}>
          <h2 className="text-2xl font-bold text-slate-700">{post.title}</h2>
          <div className="text-xs mt-1">
            Last edited: {dayjs(post.createdAt).format("MMMM D, YYYY")}
          </div>
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <i className="ri-more-2-fill" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={`posts/${post.id}`}>Preview</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDeletePost}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
