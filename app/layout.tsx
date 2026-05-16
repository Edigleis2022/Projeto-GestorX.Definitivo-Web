import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "GESTORX",
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
  description: "Sistema de gestão de estoque e usuários",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-gray-100 text-black">
        <AuthProvider>
          <div className="flex min-h-screen items-center justify-center">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}