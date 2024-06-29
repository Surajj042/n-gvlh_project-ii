"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { MyProvider } from "@/context/teacherContext";
import { ConfettiProvider } from "@/providers/confetti-provider";
import { ToastProvider } from "@/providers/taoster-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import "../styles/prism.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signUpForceRedirectUrl="/"
      signInForceRedirectUrl="/"
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary: "border-white",
          footerActionLink:
            "primary-text-gradient hover:text-primary-500 primary-gradient",
        },
        layout: {
          logoImageUrl: "/icons/logo-only.svg",
        },
        variables: {},
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          <ThemeProvider>
            <MyProvider>{children}</MyProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
