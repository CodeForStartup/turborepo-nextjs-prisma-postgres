import SidebarItem, { SidebarItemProps } from "@/molecules/sidebar-item"
import { User, HomeIcon, StickyNote, TagIcon, Settings } from "lucide-react"


export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {

  const SIDE_BAR = [
    {
      label: "Dashboard",
      link: "/user/profile",
      icons: <HomeIcon size={16} />,
    },
    {
      label: "Posts",
      link: "/user/posts",
      icons: <StickyNote size={16} />,
    },
    {
      label: "Tags",
      link: "/user/tags",
      icons: <TagIcon size={16} />,
    },
    {
      label: "Users",
      link: "/user/user",
      icons: <User size={16} />,
    },
    {
      label: "Setting",
      icons: <Settings size={16} />,
      children: [
        {
          label: "Permission and Role",
          link: "/user/Permission",
        },
        {
          label: "Configuration",
          link: "/user/configuration",
        },
      ]
    },
  ] as Array<SidebarItemProps>

  return (
    <div className="grid w-full grid-cols-12 gap-8">
      <div className="col-span-2 flex flex-col gap-1">
        {SIDE_BAR.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
          />
        ))}
      </div>
      <div className="col-span-9 md:col-span-8">{children}</div>
    </div>
  )
}
