import { Metadata } from "next"

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
        <h5 className="text-lg font-bold">
          H5. React is the library for web and native user interfaces
        </h5>
        <h6 className="text-sm font-bold">
          H6. React is the library for web and native user interfaces
        </h6>
        <p>p. React is the library for web and native user interfaces</p>
        <p className="text-sm text-muted-foreground">
          p.sm React is the library for web and native user interfaces
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
      </Section>

      <Section title="Inputs">
        <Input placeholder="Input" />
      </Section>
    </div>
  )
}
