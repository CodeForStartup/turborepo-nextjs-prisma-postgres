export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid w-full grid-cols-12 md:gap-8">
      <div className="col-span-12 md:col-span-9">{children}</div>
      <div className="hide md:col-span-3"></div>
    </div>
  )
}
