import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anthony McGarry - Portfolio",
  description:
    "Senior Front-End Developer portfolio showcasing skills and experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* React 19 resource preloading for resume PDF */}
        <link
          rel="preload"
          href="/resume.pdf"
          as="fetch"
          crossOrigin="anonymous"
        />

        {/* Preload critical images */}
        <link rel="preload" href="/images/me.png" as="image" />
        <link rel="preload" href="/images/logo.png" as="image" />

        {/* Preconnect to third-party domains */}
        <link rel="preconnect" href="https://api.emailjs.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
