import { Metadata } from "next"

import { LucideHeart } from "lucide-react"
import { Button, Input, Typography } from "ui"

import PageTitle from "@/molecules/page-title"
import TagBadge from "@/molecules/tag/tag-badge"

export const metadata: Metadata = {
  title: "Next-forum - Page UI",
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
    <div className="mb-16 rounded-md p-8">
      <PageTitle
        title="List of UI components"
        description="Pages components"
      />

      <Section title="Typography">
        <Typography variant="h1">
          H1. React is the library for web and native user interfaces.
        </Typography>
        <Typography variant="h2">
          H2. React is the library for web and native user interfaces
        </Typography>
        <Typography variant="h3">
          H3. React is the library for web and native user interfaces
        </Typography>
        <Typography variant="h4">
          H4. React is the library for web and native user interfaces
        </Typography>
        <Typography>p. React is the library for web and native user interfaces</Typography>
        <Typography
          variant="p"
          className="text-sm text-muted-foreground"
        >
          p.sm React is the library for web and native user interfaces
        </Typography>
        <Typography variant="blockquote">
          React is the library for web and native user interfaces
        </Typography>
        <Typography variant="code">
          React is the library for web and native user interfaces
        </Typography>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>React is the library for web and native user interfaces</li>
          <li>React is the library for web and native user interfaces</li>
          <li>React is the library for web and native user interfaces</li>
        </ul>
      </Section>

      <Section title="Buttons">
        <TagBadge
          tag={{
            id: "1",
            name: "Tag name",
            slug: "tag",
          }}
        />
        <Button
          variant="link"
          className="h-8 rounded-md p-0 px-2 text-gray-600 hover:bg-slate-300"
        >
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
