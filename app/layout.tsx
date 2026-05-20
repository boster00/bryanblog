import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bryanblog",
  description: "A simple static site.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
