import React from "react"
import Link from "next/link"

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 pt-20">
      <h1 className="flex flex-col justify-center text-center text-4xl font-bold tracking-tight text-slate-800">
        <span className="text-9xl">404</span>
        <span className="uppercase">Page Not Found</span>
      </h1>
      <div>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tags">Tags</Link>
          </li>
          <li>
            <Link href="/about-us">About</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NotFound
