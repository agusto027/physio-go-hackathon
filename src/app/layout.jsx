import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Chatbot from "@/Components/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "PhysioGo",
  description: "Welcome to PhysioGo",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-[#0D1117] text-[#E2E8F0]`}>
          <div className="min-h-screen flex flex-col bg-[#0D1117]">
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
            <Chatbot />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}