import "./globals.css"
import "ui/dist/index.css"
import "react-toastify/dist/ReactToastify.css"
import "remixicon/fonts/remixicon.css"

import { NextIntlClientProvider, useMessages } from "next-intl"
import AuthProvider from "providers/authProvider"
import { ToastContainer } from "react-toastify"

import Footer from "@/molecules/footer"
import Nav from "@/molecules/nav"
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
              <main className="container mx-auto mt-12 min-h-[800px] px-4 pb-16 sm:px-6 lg:px-8">
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
