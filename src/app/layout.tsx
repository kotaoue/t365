import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "t365",
  description: "Generate GitHub contribution dates from text with a 5x7 bitmap preview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
