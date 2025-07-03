import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "../../components/SessionProviderWrapper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import GlobalSEO from "../../components/GlobalSEO";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nithin N - Full Stack Developer & AI Engineer | Portfolio | Mysore Karnataka",
  description:
    "Nithin N - Professional Full Stack Developer and AI Engineer from Mysore, Karnataka. VIT Bhopal graduate specializing in React, Next.js, Python, AI/ML. View my portfolio, projects, and achievements.",
  metadataBase: new URL("https://ai-quiz-app-nu.vercel.app/"),
  alternates: {
    canonical: "https://ai-quiz-app-nu.vercel.app/",
    languages: {
      "en-IN": "https://ai-quiz-app-nu.vercel.app/",
      en: "https://ai-quiz-app-nu.vercel.app/",
    },
  },
  openGraph: {
    title: "Nithin N - Full Stack Developer & AI Engineer Portfolio | Mysore Karnataka",
    description:
      "Professional portfolio of Nithin N - Full Stack Developer from Mysore, Karnataka. Showcasing React, Next.js, AI/ML projects, achievements, and technical expertise. VIT Bhopal graduate.",
    url: "https://ai-quiz-app-nu.vercel.app/",
    type: "profile",
    images: [
      {
        url: "https://res.cloudinary.com/dvmmuj2r0/image/upload/v1745171557/resumes-pictures/rfnizoeowxj6z7x0kio7.png",
        width: 1200,
        height: 630,
        alt: "Nithin N - Full Stack Developer and AI Engineer Portfolio",
      },
    ],
    locale: "en_IN",
    siteName: "Nithin N Portfolio",
    firstName: "Nithin",
    lastName: "N",
    username: "Nithin9585",
  },
  twitter: {
    card: "summary_large_image",
    site: "@NithinN356853",
    creator: "@NithinN356853",
    title: "Nithin N - Full Stack Developer & AI Engineer Portfolio",
    description:
      "Professional portfolio showcasing Full Stack Development and AI Engineering projects by Nithin N from Mysore, Karnataka. VIT Bhopal graduate.",
    images: [
      "https://res.cloudinary.com/dvmmuj2r0/image/upload/v1745171557/resumes-pictures/rfnizoeowxj6z7x0kio7.png",
    ],
    imageAlt: "Nithin N Portfolio - Full Stack Developer",
  },
  viewport: "width=device-width, initial-scale=1",
  keywords:
    "Nithin N, Nithin N developer, Nithin N portfolio, Nithin N VIT Bhopal, Full Stack Developer Mysore, AI Engineer Karnataka, React Developer India, Next.js Expert, JavaScript Developer, Python Developer, Nithin N GitHub, Nithin N LinkedIn, Web Developer Mysore, Software Engineer Karnataka, Nithin N projects, Nithin N resume",
  authors: [
    { name: "Nithin N", url: "https://www.linkedin.com/in/nithin-n-a4b837275/" },
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  other: {
    "google-site-verification": "9__SOhCWiYz4dCQT6b3a2jexCJPzu7oEFD8EhnB2J9A",
    subject: "Nithin N - Full Stack Developer Portfolio",
    copyright: "Nithin N",
    language: "English",
    revised: "Sunday, June 21st, 2025, 5:15 pm",
    classification: "Portfolio, Technology, Software Development",
    designer: "Nithin N",
    developer: "Nithin N",
    "geo.region": "IN-KA",
    "geo.placename": "Mysore, Karnataka, India",
    "geo.position": "12.2958;76.6394",
    ICBM: "12.2958, 76.6394",
    locality: "Mysore",
    region: "Karnataka",
    country: "India",
    rating: "general",
    referrer: "no-referrer-when-downgrade",
    "business:contact_data:locality": "Mysore",
    "business:contact_data:region": "Karnataka",
    "business:contact_data:country_name": "India",
    googlebot: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    bingbot: "index, follow",
  },
};

const structuredDataPerson = {
  "@context": "https://schema.org/",
  "@type": ["Person", "ProfilePage"],
  mainEntity: {
    "@type": "Person",
    name: "Nithin N",
    alternateName: [
      "Nithin",
      "Nithin Vit",
      "Nithin N Developer",
      "Nithin N Portfolio",
    ],
    jobTitle: [
      "Full Stack Developer",
      "AI Engineer",
      "Software Developer",
      "Web Developer",
    ],
    description:
      "Professional Full Stack Developer and AI Engineer from Mysore, Karnataka. VIT Bhopal graduate specializing in React, Next.js, Python, JavaScript, and AI/ML technologies. Building innovative web applications and AI solutions.",
    url: "https://ai-quiz-app-nu.vercel.app/",
    image: {
      "@type": "ImageObject",
      url: "https://res.cloudinary.com/dvmmuj2r0/image/upload/v1745171557/resumes-pictures/rfnizoeowxj6z7x0kio7.png",
      width: 1200,
      height: 630,
      caption: "Nithin N - Full Stack Developer and AI Engineer",
    },
    sameAs: [
      "https://github.com/Nithin9585",
      "https://www.linkedin.com/in/nithin-n-a4b837275",
      "https://leetcode.com/Nithin_Vit",
      "https://twitter.com/NithinN356853",
    ],
    worksFor: {
      "@type": "EducationalOrganization",
      name: "VIT Bhopal University",
      url: "https://vitbhopal.ac.in",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "VIT Bhopal University",
      url: "https://vitbhopal.ac.in",
    },
    knowsAbout: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "Artificial Intelligence",
      "Machine Learning",
      "Full Stack Development",
      "MongoDB",
      "Firebase",
      "Node.js",
      "Web Development",
      "Software Engineering",
      "Frontend Development",
      "Backend Development",
      "Database Management",
      "API Development",
      "Cloud Computing",
      "Git",
      "GitHub",
    ],
    hasSkill: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "HTML",
      "CSS",
      "MongoDB",
      "Firebase",
      "Node.js",
      "Express.js",
      "Machine Learning",
      "Artificial Intelligence",
      "Web Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mysore",
      addressRegion: "Karnataka",
      addressCountry: "India",
      postalCode: "570001",
    },
    birthPlace: {
      "@type": "Place",
      name: "Mysore, Karnataka, India",
    },
    nationality: "Indian",
    homeLocation: {
      "@type": "Place",
      name: "Mysore, Karnataka, India",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.2958,
        longitude: 76.6394,
      },
    },
    award: [
      "Global Health Hackathon Finalist",
      "Top 1% in #DrGViswanathan Challenge at VIT",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Full Stack Developer",
      occupationLocation: {
        "@type": "Place",
        name: "Bangalore, Karnataka, India",
      },
      skills: "React.js, Next.js, JavaScript, Python, AI/ML, Web Development",
    },
    seeks: {
      "@type": "Demand",
      name: "Full Stack Developer Position",
    },
  },
  name: "Nithin N Portfolio",
  description:
    "Professional portfolio website of Nithin N - Full Stack Developer and AI Engineer from Mysore, Karnataka",
  url: "https://ai-quiz-app-nu.vercel.app/",
  inLanguage: "en-IN",
  author: {
    "@type": "Person",
    name: "Nithin N",
  },
  publisher: {
    "@type": "Person",
    name: "Nithin N",
  },
  dateCreated: "2024-01-01",
  dateModified: "2025-06-21",
  keywords:
    "Nithin N, Full Stack Developer, AI Engineer, Portfolio, Mysore, Karnataka, React, Next.js, Python",
};

const structuredDataWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nithin N Portfolio",
  alternateName: ["Nithin N", "Nithin Portfolio", "Nithin N Developer"],
  url: "https://ai-quiz-app-nu.vercel.app/",
  description:
    "Professional portfolio of Nithin N - Full Stack Developer and AI Engineer from Mysore, Karnataka",
  inLanguage: "en-IN",
  author: {
    "@type": "Person",
    name: "Nithin N",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://ai-quiz-app-nu.vercel.app/?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const structuredDataBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://ai-quiz-app-nu.vercel.app/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Nithin N Portfolio",
      item: "https://ai-quiz-app-nu.vercel.app/",
    },
  ],
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlobalSEO />
        {/* Hidden semantic content for SEO is now in GlobalSEO */}
        <SessionProviderWrapper session={session}>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
