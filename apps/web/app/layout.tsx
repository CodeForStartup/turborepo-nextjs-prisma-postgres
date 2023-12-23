import "./globals.css"

import AuthProvider from "providers/authProvider"
import { ToastContainer } from "react-toastify"

import Nav from "@/molecules/nav"

import "react-toastify/dist/ReactToastify.css"
import "remixicon/fonts/remixicon.css"

import Footer from "@/molecules/footer"

export const metadata = {
  icons: {
    icon: "/assets/logo.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <AuthProvider>
          <Nav />
          <main className="container mx-auto mt-12 min-h-[800px] px-4 sm:px-6 lg:px-8">
            {children}
            <ToastContainer />
          </main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  )
}
