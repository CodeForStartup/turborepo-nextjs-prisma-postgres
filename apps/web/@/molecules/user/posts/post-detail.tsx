import { Prisma } from "database";
import dayjs from "dayjs";
import Link from "next/link";
import reactHtmlParser from "react-html-parser";

export default function PostDetail({ post }: { post: Prisma.Post }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-extrabold text-slate-700">
        <Link href={`${post.id}`}>{post.title}</Link>
      </h1>
      <div className="mt-2 text-xs">
        {dayjs(post.updatedAt).format("MMMM D, YYYY")}
      </div>
      <div className="mt-12">{reactHtmlParser(post.content)}</div>
    </div>
  );
}
