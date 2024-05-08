import React from "react"
import Link from "next/link"

import dayjs from "dayjs"
import { TwitterIcon } from "lucide-react"
import { buttonVariants, cn, Typography } from "ui"

import LanguageSwitcher from "../language-switcher"
import Logo from "../nav/logo"

const Footer: React.FC = () => {
  return (
    <footer className="border-t">
      <div className="container py-16">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <div className="mr-4">
              <Logo />
              <Typography
                variant="p"
                className="text-gray-500"
              >
                Top list of everything
              </Typography>
            </div>
            <div>
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "ghost" }), "h-4 w-4")}
              >
                <TwitterIcon size={24} />
              </Link>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <Typography
              variant="h5"
              className="mb-8"
            >
              TOP
            </Typography>
            <ul>
              <li>
                <Typography>
                  <Link href="/top">TOP users</Link>
                </Typography>
              </li>
              <li>
                <Typography>
                  <Link href="/top">TOP questions</Link>
                </Typography>
              </li>
              <li>
                <Typography>
                  <Link href="/top">TOP tags</Link>
                </Typography>
              </li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <Typography
              variant="h5"
              className="mb-8"
            >
              About us
            </Typography>
            <ul>
              <li>
                <Typography>About us</Typography>
              </li>
              <li>
                <Typography>Term and condition</Typography>
              </li>
              <li>
                <Typography>Contact</Typography>
              </li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <Typography
              variant="h5"
              className="mb-8"
            >
              Our services
            </Typography>
            <ul>
              <li>
                <Typography>
                  <Link href="https://codeforstartup.com">Services</Link>
                </Typography>
              </li>
              <li>
                <Typography>
                  <Link href="https://codeforstartup.com/SAAS">SAAS</Link>
                </Typography>
              </li>
              <li>
                <Typography>
                  <Link href="https://codeforstartup.com/outsourcing">Outsourcing</Link>
                </Typography>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
