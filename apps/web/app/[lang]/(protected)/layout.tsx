import SidebarItem, { SidebarItemProps } from "@/molecules/sidebar-item"

const SIDE_BAR = [
  {
    label: "Profile",
    link: "/user/profile",
  },
  {
    label: "Posts",
    link: "/user/posts",
  },
  {
    label: "Password",
    link: "/user/change-password",
  },
  {
    label: "Setting",
    link: "/user/settings",
  },
] as Array<SidebarItemProps>

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
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
