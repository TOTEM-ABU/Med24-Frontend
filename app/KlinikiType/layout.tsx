"use client";

import React from "react";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

export default function KlinikiTypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
