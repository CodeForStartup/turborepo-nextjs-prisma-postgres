import { BookCopy, HomeIcon, Smartphone, TagIcon } from "lucide-react"

import SidebarItem, { SidebarItemProps } from "@/molecules/sidebar-item"
import SquareAdvertisement from "@/molecules/square-advertisement"
import TopTag from "@/molecules/top-tags"

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
      <div className="col-span-2 flex flex-col gap-1">
        {SIDE_BAR.map((item) => (
          <SidebarItem {...item} key={item.link} />
        ))}

        <TopTag />
      </div>
      <div className="col-span-10 md:col-span-7">{children}</div>
      <div className="hide md:col-span-3">
        <SquareAdvertisement />
      </div>
    </div>
  )
}
