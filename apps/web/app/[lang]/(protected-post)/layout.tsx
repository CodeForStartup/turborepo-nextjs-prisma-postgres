export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-1">{children}</div>
}
