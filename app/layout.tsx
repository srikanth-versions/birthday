import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Surprise Made Just For You ❤️",
  description: "A high-end romantic editorial birthday experience created with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#12080D] text-[#FFF1F4] selection:bg-[#641A35] selection:text-[#FFF1F4]">
        {children}
      </body>
    </html>
  );
}
