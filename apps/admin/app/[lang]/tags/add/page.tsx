import PageTitle from "@/molecules/page-title"

export const metadata = {
  title: "Create new tag",
  description: "",
}

export default async function Page() {
  return (
    <div className="w-full p-8">
      <PageTitle title="Create Tag" />
    </div>
  )
}
