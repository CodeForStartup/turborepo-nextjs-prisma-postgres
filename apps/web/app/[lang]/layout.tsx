import "./globals.css"

import AuthProvider from "providers/authProvider"
import { ToastContainer } from "react-toastify"

import Nav from "@/molecules/nav"

import "react-toastify/dist/ReactToastify.css"
import "remixicon/fonts/remixicon.css"

import Footer from "@/molecules/footer"
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
  return (
    <html lang={lang || "en"} suppressHydrationWarning>
      <body>
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
      </body>
    </html>
  )
}
