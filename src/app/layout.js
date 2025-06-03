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
    description: "Automatically generate quizzes from PDFs & PPTX using Gemini AI and Google Forms | Ai Quiz App by Nithin N VIT Bhopal",
    url: "https://ai-quiz-app-nu.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://ai-quiz-app-nu.vercel.app/Nithin.jpg",
        width: 1200,
        height: 630,
        alt: "Ai Quiz App preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ai Quiz App",
    description: "Automatically generate quizzes from PDFs & PPTX using Gemini AI and Google Forms | Ai Quiz App by Nithin N VIT Bhopal",
    images: ["https://ai-quiz-app-nu.vercel.app/Nithin.jpg"],
    creator: "@NithinN356853",
  },
  viewport: "width=device-width, initial-scale=1",
  keywords: ["AI", "Quiz Generator", "Gemini", "PDF to Quiz", "Google Forms"],
  authors: [{ name: "Nithin N", url: "https://www.linkedin.com/in/nithin-n-a4b837275/" }],
  robots: "index, follow",
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
