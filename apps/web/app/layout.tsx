import Nav from "@/molecules/nav";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "providers/authProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Nav />
          <main className="container max-w-6xl mt-12 mx-auto px-4 sm:px-6 lg:px-8">
            {children}
            <ToastContainer />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
