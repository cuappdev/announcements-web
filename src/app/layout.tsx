import { Toaster } from "@/components/ui/toaster";
import localFont from "next/font/local";
import "./globals.css";

// Fonts
const sfProDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sfprodisplay",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfProDisplay.variable} font-sans bg-neutral-white`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
