import Header from "@/components/common/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Typographer",
    description: "Typing space",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main className="min-h-[calc(100vh-112px)] p-24">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
