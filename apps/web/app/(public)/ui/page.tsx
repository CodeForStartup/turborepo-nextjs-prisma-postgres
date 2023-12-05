import { LucideHeart } from "lucide-react"
import { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageTitle from "@/molecules/page-title"
import TagBadge from "@/molecules/tag/tag-badge"

export const metadata: Metadata = {
  title: "Toplist360 - Page UI",
  description: "UI components for pages",
}

const Section = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="my-16">
    <h1 className="mb-10 scroll-m-20 text-4xl font-bold tracking-tight text-slate-800">{title}</h1>
    {children}
  </div>
)

export default async function Page() {
  return (
    <div className="mb-16 rounded-md bg-white p-8">
      <PageTitle title="List of UI components" description="Pages components" />

      <Section title="Typography">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800">
          H1. React is the library for web and native user interfaces.
        </h1>
        <h2 className="text-3xl font-bold">
          H2. React is the library for web and native user interfaces
        </h2>
        <h3 className="text-2xl font-bold">
          H3. React is the library for web and native user interfaces
        </h3>
        <h4 className="text-xl font-bold">
          H4. React is the library for web and native user interfaces
        </h4>
        <p>p. React is the library for web and native user interfaces</p>
        <p className="text-sm text-muted-foreground">
          p.sm React is the library for web and native user interfaces
        </p>

        <blockquote className="mt-6 border-l-2 pl-6 italic">
          React is the library for web and native user interfaces
        </blockquote>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>React is the library for web and native user interfaces</li>
          <li>React is the library for web and native user interfaces</li>
          <li>React is the library for web and native user interfaces</li>
        </ul>

        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          React is the library for web and native user interfaces
        </code>

        <p className="text-xl text-muted-foreground">
          A modal dialog that interrupts the user with important content and expects a response.
        </p>
      </Section>

      <Section title="Buttons">
        <TagBadge
          tag={{
            id: "1",
            name: "Tag name",
            slug: "tag",
          }}
        />
        <Button variant="link" className="h-8 rounded-md p-0 px-2 text-gray-600 hover:bg-slate-300">
          <LucideHeart className="h-4 w-4 text-red-500" />
          <span className="ml-1 hover:no-underline">999</span>
        </Button>
      </Section>

      <Section title="Inputs">
        <Input placeholder="Input" />
      </Section>
    </div>
  )
}
