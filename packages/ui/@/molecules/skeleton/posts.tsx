import * as React from "react"

import { Skeleton } from "../../components/ui/skeleton"
import { cn } from "../../lib/utils"

interface PostSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  total?: number
  containerClassName?: string
}

function PostSkeleton({
  total = 1,
  className,
  containerClassName = "",
  ...props
}: PostSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-4", containerClassName)}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          className={cn("flex gap-4", className)}
          {...props}
          key={index}
        >
          <div className="flex flex-1 flex-col items-start gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-[50%]" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
          <Skeleton className="h-[100px] w-[160px]" />
        </div>
      ))}
    </div>
  )
}

export { PostSkeleton }
