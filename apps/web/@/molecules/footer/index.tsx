import React from "react"
import dayjs from "dayjs"
import { TwitterIcon } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Typography from "../typography"
import ThemeToggle from "./ThemeToggle"

const Footer: React.FC = () => {
  return (
    <footer className="border-t">
      <div className="container py-16">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <div className="mr-4">
              <Link href="/">
                <Typography variant="h2">toplist</Typography>
              </Link>
              <Typography variant="p" className="text-gray-500">
                Top list of everything
              </Typography>
            </div>
            <div>
              <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "h-4 w-4")}>
                <TwitterIcon size={24} />
              </Link>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <Typography variant="h5" className="mb-4">
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
            <Typography variant="h5" className="mb-4">
              About us
            </Typography>
            <ul>
              <li>About us</li>
              <li>Term and condition</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <Typography variant="h5" className="mb-4">
              Our services
            </Typography>
            <ul>
              <li>Code For Startup</li>
              <li>SAAS</li>
              <li>Outsourcing</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border py-4">
        <div className="container flex items-center justify-between">
          <Typography variant="p" className="text-gray-500">
            ©{dayjs().year()} <Link href={"https://codeforstartup.com"}>codeforstartup</Link>
          </Typography>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}

export default Footer
