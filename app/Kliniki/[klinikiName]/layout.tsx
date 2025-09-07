"use client";

import React, { useState } from "react";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function KlinikiNameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
