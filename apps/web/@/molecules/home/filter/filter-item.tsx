import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FilterItemProps = {
  label: string
  isActive: boolean
  onclick: () => void
}

export const FilterItem: React.FC<FilterItemProps> = ({
  label,
  isActive,
  onclick,
}: FilterItemProps) => {
  return (
    <Button
      variant="link"
      size="sm"
      onClick={onclick}
      className={cn("w-[60px] hover:no-underline", {
        "border font-bold": isActive,
      })}
    >
      {label}
    </Button>
  )
}
