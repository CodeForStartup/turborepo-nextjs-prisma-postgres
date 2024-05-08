import { Skeleton } from "ui"

export default function UserPostLoading() {
  return (
    <div className="w-full">
      <div>
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="mt-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="flex space-x-4 py-4"
          >
            <Skeleton className="h-24 w-24" />
            <div className="flex-1">
              <Skeleton className="h-12" />
              <Skeleton className=" mt-2 h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
