import React from "react"
import Link from "next/link"

import { GithubIcon } from "lucide-react"
import { Typography } from "ui"

const SquareAdvertisement: React.FC = () => {
  return (
    <div className="flex w-full flex-col justify-end border-4 border-double p-4">
      <Typography className="hidden font-bold lg:block">faster with</Typography>
      <Typography
        variant="span"
        className="mb-2 text-xs italic"
      >
        free
      </Typography>
      <Link href="/">
        <Typography className="bg-gradient-to-r from-[tomato] to-[#ff0000] bg-clip-text text-xs font-bold text-transparent hover:underline lg:text-base">
          <GithubIcon
            size={16}
            className="mr-1 inline-block text-black dark:text-white"
          />
          SAAS TEMPLATE
        </Typography>
      </Link>
    </div>
  )
}

export default SquareAdvertisement
