import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wayan Koster",
  description: "Wayan Koster App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-center" reverseOrder={false} />
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
