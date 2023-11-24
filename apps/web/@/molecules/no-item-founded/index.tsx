import React from "react"
import { LucideDog } from "lucide-react"

const NoItemFounded: React.FC = () => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-md bg-white p-20">
      <LucideDog className="mx-auto h-16 w-16" />
      <p>There are no items founded.</p>
    </div>
  )
}

export default NoItemFounded
