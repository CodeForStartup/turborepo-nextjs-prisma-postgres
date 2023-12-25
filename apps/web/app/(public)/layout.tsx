import { BookCopy, HomeIcon, Smartphone, TagIcon } from "lucide-react"

import SidebarItem, { SidebarItemProps } from "@/molecules/sidebar-item"

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
    link: "/about-us",
    icons: <BookCopy size={16} />,
  },
] as Array<SidebarItemProps>

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid w-full grid-cols-12 gap-8">
      <div className="col-span-2">
        {SIDE_BAR.map((item) => (
          <SidebarItem {...item} key={item.link} />
        ))}
      </div>
      <div className="col-span-12 md:col-span-10">{children}</div>
    </div>
  )
}
