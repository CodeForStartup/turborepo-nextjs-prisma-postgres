import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export enum FilteredValue {
  lasted = "lasted",
  hot = "hot",
}

export enum PeriodValues {
  week = "week",
  month = "month",
  yearn = "yearn",
  infinity = "infinity",
}

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
