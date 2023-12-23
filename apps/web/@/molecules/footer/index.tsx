import React from "react"
import dayjs from "dayjs"
import Link from "next/link"

import Typography from "../typography"

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-100">
      <div className="container py-8">
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
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <Typography variant="h5">TOP</Typography>
            <ul>
              <li>Top lists</li>
              <li>Top questions</li>
              <li>Top tags</li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <Typography variant="h5">About us</Typography>
            <ul>
              <li>About us</li>
              <li>Term and condition</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <Typography variant="h5">Our service</Typography>
            <ul>
              <li>Code For Startup</li>
              <li>SAAS</li>
              <li>Outsourcing</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-neutral-200 py-4">
        <Typography variant="p" className="text-gray-500">
          ©{dayjs().year()} <Link href={"https://codeforstartup.com"}>codeforstartup</Link>
        </Typography>
      </div>
    </footer>
  )
}

export default Footer
