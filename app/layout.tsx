import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "./components/Sidebar";
import type React from "react"; // Added import for React

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orçamento de Blusas",
  description: "Aplicação para orçamentos de blusas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 p-4 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
