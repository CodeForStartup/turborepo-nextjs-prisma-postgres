import React from "react"

import PageTitle from "@/molecules/page-title"

export const metadata = {
  title: "Users",
  description: "You can create, edit, and delete users here.",
}

const Users: React.FC = () => {
  return (
    <div className="w-full p-8">
      <PageTitle
        title="Users"
        description="You can create, edit, and delete users here."
      />
    </div>
  )
}

export default Users
