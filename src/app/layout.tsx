import Header from "@/components/common/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Footer } from "@/components/common/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppinsFont = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

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
            <body className={`${poppinsFont.variable} font-sans`}>
                <div className="absolute top-1"></div>
                <Header />
                <main className="min-h-[calc(100vh-112px)] p-3 lg:p-24">
                    {children}
                </main>
                <Footer />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
