import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/Context"
import SessionWrapper from "./components/SessionWrapper";
import Footer from "./components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <main>
            <CartProvider>
              <Header />
              {children}
              <Footer/>
            </CartProvider>
          </main>
        </body>
      </html>
    </SessionWrapper>

  );
}
