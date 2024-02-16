import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const FollowerItem = ({ follower }) => {
  return (
    <div className="flex flex-1 items-center rounded-md bg-white p-8">
      <div className="flex flex-1 items-center gap-4">
        <div className="m-0 flex items-center justify-center rounded-[100%] border-dashed border-stone-900 bg-slate-200">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={"https://avatars.githubusercontent.com/u/5276963?v=4" || ""}
              alt={""}
            />
            <AvatarFallback>{"CO".slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <div className="font-bold">Name</div>
          <div className="text-gray-400">Bio</div>
        </div>
      </div>
      <div>
        <Button variant="outline">Follow</Button>
      </div>
    </div>
  )
}

export default FollowerItem
