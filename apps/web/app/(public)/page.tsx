import PostItem from "@/molecules/posts/post-item";
import { getPosts } from "../post-actions";
import SidebarItem, { SidebarItemProps } from "@/molecules/sidbar-item";
import { BookCopy, HomeIcon, Smartphone, TagIcon } from "lucide-react";

const SIDE_BAR = [
  {
    label: "Home",
    link: "/",
    icons: <HomeIcon size={16} />,
  },
  {
    label: "Tags",
    link: "/tags",
    icons: <TagIcon size={16} />,
  },
  {
    label: "Contact",
    link: "/contact",
    icons: <Smartphone size={16} />,
  },
  {
    label: "About",
    link: "/about",
    icons: <BookCopy size={16} />,
  },
] as Array<SidebarItemProps>;

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="">
      <div className="flex gap-2">
        <div className="bg-slate-200 py-1 px-2 text-slate-500 uppercase text-sm rounded-sm">
          Newest
        </div>
        <div className="bg-slate-200 py-1 px-2 text-slate-500 uppercase text-sm rounded-sm">
          Hot
        </div>
        <div className="bg-slate-200 py-1 px-2 text-slate-500 uppercase text-sm rounded-sm">
          Trending
        </div>
      </div>
      <div>
        {posts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
