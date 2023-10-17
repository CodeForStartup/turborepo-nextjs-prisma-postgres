import Link from "next/link";

export type SidebarItemProps = {
  label: string;
  link: string;
  icons: React.ReactElement;
};

export default function SidebarItem({ label, link, icons }: SidebarItemProps) {
  return (
    <Link href={link}>
      <div className="flex items-center">
        <div className="w-4 h-6 mr-2 flex justify-center items-center">
          {icons}
        </div>
        <div className="text-slate-500">{label}</div>
      </div>
    </Link>
  );
}
