import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Head from "next/head";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";


export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Med24.uz | Shifokor qabuli va klinikalar</title>
        <meta name="description" content="Med24.uz — Toshkent shahridagi eng yaxshi klinikalar va shifokorlar haqida ma'lumot. Shifokor qabuliga onlayn yoziling." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}