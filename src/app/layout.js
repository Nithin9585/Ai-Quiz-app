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
  title: "Ai Quiz App",
  description: "Automatically generate quizzes from PDFs & PPTX using Gemini AI and Google Forms",
  metadataBase: new URL("https://ai-quiz-app-nu.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ai Quiz App",
    description: "Automatically generate quizzes from PDFs & PPTX using Gemini AI and Google Forms| Ai Quiz App by Nithin N VIT Bhopal",
    url: "https://ai-quiz-app-nu.vercel.app/",
  },
  other: {
    "google-site-verification": "9__SOhCWiYz4dCQT6b3a2jexCJPzu7oEFD8EhnB2J9A",
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
