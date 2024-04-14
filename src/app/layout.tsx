import "./globals.css";
import { DM_Sans } from "next/font/google";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../../prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <ClerkProvider>
    <html lang="en" className={dmSans.variable}>
      <body className="grid bg-[#fff] text-black">
       
        <Header />
          <main className='container mx-auto'>
              <div className='flex items-start justify-center min-h-screen'>
                <div className='mt-20'>{children}</div>
              </div>
          </main>
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  </ClerkProvider>
  );
}