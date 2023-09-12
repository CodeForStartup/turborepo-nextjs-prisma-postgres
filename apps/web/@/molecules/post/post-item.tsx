import { Prisma } from "database";
import dayjs from "dayjs";
import Link from "next/link";

export default function PostItem(post: Prisma.Post) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-extrabold">
        <Link href={`posts/${post.id}`}>{post.title}</Link>
      </h2>
      <div className="text-xs">
        {dayjs(post.createdAt).format("MMMM D, YYYY")}
      </div>
    </div>
  );
}
