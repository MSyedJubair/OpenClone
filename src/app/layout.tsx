import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/client";
import "./globals.css";
import { SandPackCSS } from "@/components/sandpack-styles";
import { Toaster } from "sonner";
import ProjectContextProvider from "@/context/ProjectContextProvider";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "OpenClone",
  description: "Ai Web Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <SandPackCSS />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        <TRPCReactProvider>
          <Toaster />
          <ProjectContextProvider>
            {children}
          </ProjectContextProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
