import type { Metadata } from "next";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Linkify - Create Your Perfect Link in Bio",
  description: "Build a beautiful, customizable link-in-bio page to showcase all your important links in one place.",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClerkProvider dynamic>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>

        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
