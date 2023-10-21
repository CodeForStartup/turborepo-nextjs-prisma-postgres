import { getPosts } from "../post-actions"
import PostItem from "@/molecules/posts/post-item"
import SidebarItem, { SidebarItemProps } from "@/molecules/sidbar-item"
import { BookCopy, HomeIcon, Smartphone, TagIcon } from "lucide-react"

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
] as Array<SidebarItemProps>

export default async function Page() {
  const posts = await getPosts()

  return (
    <div className="">
      <div className="flex gap-2">
        <div className="rounded-sm bg-slate-200 px-2 py-1 text-sm uppercase text-slate-500">
          Newest
        </div>
        <div className="rounded-sm bg-slate-200 px-2 py-1 text-sm uppercase text-slate-500">
          Hot
        </div>
        <div className="rounded-sm bg-slate-200 px-2 py-1 text-sm uppercase text-slate-500">
          Trending
        </div>
      </div>
      <div>
        {posts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}
