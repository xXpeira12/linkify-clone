import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Link in Bio",
    description: "Link in Bio",
}

export default async function RootLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />
            <main>
                {children}
            </main>
        </div>
    )
}