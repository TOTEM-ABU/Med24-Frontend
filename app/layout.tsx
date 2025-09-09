import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Med24.uz | Shifokor qabuli va klinikalar",
  description:
    "Med24.uz — Toshkent shahridagi eng yaxshi klinikalar va shifokorlar haqida ma'lumot. Shifokor qabuliga onlayn yoziling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
