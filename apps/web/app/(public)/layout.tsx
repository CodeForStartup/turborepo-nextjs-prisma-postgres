import { BookCopy, HomeIcon, Smartphone, TagIcon } from "lucide-react"

import SidebarItem, { SidebarItemProps } from "@/molecules/sidbar-item"

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

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid w-full grid-cols-12">
      <div className="col-span-3">
        {SIDE_BAR.map((item) => (
          <div key={item.label} className="mb-4">
            <SidebarItem {...item} />
          </div>
        ))}
      </div>
      <div className="col-span-12 md:col-span-7">{children}</div>
      <div className="hide md:col-span-2"></div>
    </div>
  )
}
