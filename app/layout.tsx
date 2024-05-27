import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Study Pomodoro App Completed!",
  description:
    "I'm thrilled to share that my latest project, a Study Pomodoro App, is now complete! This app helps users manage their study sessions effectively and track their progress over time. The only thing remaining is the timer sounds.",
  openGraph: {
    title: "Study Pomodoro App Completed!",
    description:
      "I'm thrilled to share that my latest project, a Study Pomodoro App, is now complete! This app helps users manage their study sessions effectively and track their progress over time. The only thing remaining is the timer sounds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
