import "./globals.css";

export const metadata = {
  title: "CODE FOR STARTUP",
  description: "Make your idea into reality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
