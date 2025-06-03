import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "../../components/SessionProviderWrapper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Convert PDF to Google Form Quiz | AI Quiz App by Nithin N Mysore",
  description: "Easily convert PDF and PPTX files to Google Form quizzes using Gemini AI. Developed by Nithin N Mysore, VIT Bhopal.",
  openGraph: {
    title: "Convert PDF to Google Form Quiz | AI Quiz App by Nithin N Mysore",
    description: "Easily convert PDF and PPTX files to Google Form quizzes using Gemini AI. Developed by Nithin N Mysore, VIT Bhopal.",
    url: "https://ai-quiz-app-nu.vercel.app/",
    type: "website",
  },
};


export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProviderWrapper session={session}>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
