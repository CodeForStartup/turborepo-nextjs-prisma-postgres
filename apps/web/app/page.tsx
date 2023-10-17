import PostItem from "@/molecules/posts/post-item";
import { getPosts } from "./post-actions";
import SidebarItem, { SidebarItemProps } from "@/molecules/sidbar-item";
import { BookCopy, HomeIcon, Smartphone, TagIcon } from "lucide-react";

const SIDE_BAR = [
  {
    label: "Home",
    link: "/",
    icons: <HomeIcon color="tomato" size={16} />,
  },
  {
    label: "Tags",
    link: "/",
    icons: <TagIcon color="blue" size={16} />,
  },
  {
    label: "Contact",
    link: "/",
    icons: <Smartphone color="green" size={16} />,
  },
  {
    label: "About",
    link: "/",
    icons: <BookCopy color="black" size={16} />,
  },
] as Array<SidebarItemProps>;

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="w-full grid grid-cols-4">
      <div className="col-span-1">
        {SIDE_BAR.map((item) => (
          <div key={item.label} className="mb-4">
            <SidebarItem {...item} />
          </div>
        ))}
      </div>
      <div className="col-span-3 md:col-span-2">
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
      <div className="hide md:col-span-1"></div>
    </div>
  );
}
