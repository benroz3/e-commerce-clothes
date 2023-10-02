'use client'
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/navElements/Navbar";
import { Provider } from "react-redux";
import store from "@/redux/store";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/assets/logo.png" />
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <main className="flex min-h--[80%] flex-col mt-[80px]">
            {children}
          </main>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
