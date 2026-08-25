import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import FloatingChatbot from "@/components/Shared/FloatingChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://mm-db.vercel.app"; // Change if needed

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "MMDB | Movie Reviews & Ratings",
    template: "%s | MMDB",
  },

  description:
    "Discover movies, write reviews, rate your favourites, build watchlists, and explore community recommendations on MMDB.",

  keywords: [
    "movie reviews",
    "movie ratings",
    "movies",
    "watchlist",
    "film reviews",
    "MMDB",
    "cinema",
  ],

  applicationName: "MMDB",

  authors: [
    {
      name: "Ashiful Islam Mukto",
    },
  ],

  creator: "Ashiful Islam Mukto",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MMDB",
    title: "MMDB | Movie Reviews & Ratings",
    description:
      "Discover, rate, and review movies with MMDB. Build your watchlist and explore what the community is watching.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MMDB",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MMDB | Movie Reviews & Ratings",
    description:
      "Discover, rate, and review movies with MMDB.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FloatingChatbot />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
