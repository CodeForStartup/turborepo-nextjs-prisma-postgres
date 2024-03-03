import { useTranslations } from "next-intl"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Typography from "@/molecules/typography"
import { TPostItem } from "@/types/posts"

type LikeButtonProps = {
  post: TPostItem
}

const LikeButton: React.FC<LikeButtonProps> = ({ post }: LikeButtonProps) => {
  const t = useTranslations()

  return (
    <div className="flex h-8 items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <i className="ri-heart-3-fill text-red-500" />
              <Typography
                variant="span"
                className="text-sm text-gray-600"
              >
                100
              </Typography>
            </div>
          </TooltipTrigger>
          <TooltipContent>{`100 ${t("like")}`}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default LikeButton
