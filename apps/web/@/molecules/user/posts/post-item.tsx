"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TPostItem, deletePost } from "app/posts/post-actions";
import dayjs from "dayjs";
import Link from "next/link";

export default function PostItem(post: TPostItem) {
  const onDeletePost = async () => {
    await deletePost(post.id);
  };

  return (
    <div className="py-4 flex justify-between">
      <div className="flex-1">
        <Link href={`posts/${post.id}/edit`}>
          <h2 className="text-2xl font-bold text-slate-700">{post.title}</h2>
          <div className="text-xs mt-1 text-gray-400">
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
          <DropdownMenuItem>
            <Link href={`posts/${post.id}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDeletePost}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
