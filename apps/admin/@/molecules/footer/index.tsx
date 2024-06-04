import React from "react"
import Link from "next/link"

import dayjs from "dayjs"
import { Typography } from "ui"

import LanguageSwitcher from "../language-switcher"

const Footer: React.FC = () => {
  return (
    <footer className="border-t">
      <div className="border py-4">
        <div className="container flex items-center justify-between">
          <Typography
            variant="p"
            className="text-gray-500"
          >
            ©{dayjs().year()} <Link href={"https://codeforstartup.com"}>codeforstartup</Link>
          </Typography>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  )
}

export default Footer
