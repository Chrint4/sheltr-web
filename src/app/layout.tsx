import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Toaster } from 'sonner';
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "sheltr",
    template: "%s | sheltr"
  },
  description: "Find shelters, food banks and public facilties near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body className={`antialiased min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-200`}>
        <>
          <Header />
          {children}
          <Toaster richColors closeButton position="top-center" />
        </>
      </body>
    </html>
  );
}
