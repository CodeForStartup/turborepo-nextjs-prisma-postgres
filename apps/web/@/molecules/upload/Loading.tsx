import { Skeleton } from "ui"

export default function Loading() {
  return (
    <div className="mt-2 flex flex-wrap gap-3 p-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton className="w-[160px h-[160px]	" />
      ))}
    </div>
  )
}
