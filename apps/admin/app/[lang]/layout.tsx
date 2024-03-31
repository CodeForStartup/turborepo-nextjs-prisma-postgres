import "./globals.css"

import AuthProvider from "providers/authProvider"
import { ToastContainer } from "react-toastify"

import Nav from "@/molecules/nav"

import "react-toastify/dist/ReactToastify.css"
import "remixicon/fonts/remixicon.css"

import { NextIntlClientProvider, useMessages } from "next-intl"

import Footer from "@/molecules/footer"
import SidebarItem from "@/molecules/sidebar-item"
import { Providers } from "@/providers"

export const metadata = {
  icons: {
    icon: "/assets/logo.png",
  },
}

export default function RootLayout({
  params: { lang },
  children,
}: {
  params: { lang: string }
  children: React.ReactNode
}) {
  const messages = useMessages()

  return (
    <html
      lang={lang || "en"}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider
          locale={lang}
          messages={messages}
        >
          <AuthProvider>
            <Providers>
              <Nav />
              <main className="flex min-h-[800px]">
                <div className="w-[300px] border-r">SIDE BAR</div>
                {children}
                <ToastContainer />
              </main>
              <Footer />
            </Providers>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
