import React from "react";
import Link from "next/link";

import { LucideEdit } from "lucide-react";

import { TPostItem } from "@/types/posts";
import { getServerSession } from "@/utils/auth";

interface EditPostButtonProps {
  post: TPostItem;
}

const EditPostButton: React.FC<EditPostButtonProps> = async ({ post }) => {
  const session = await getServerSession();

  if (post?.author?.id !== session?.user?.id) {
    return null;
  }

  return (
    <Link href={`/user/posts/${post?.id}/edit`}>
      <LucideEdit className="h-6 w-6" />
    </Link>
  );
};

export default EditPostButton;
