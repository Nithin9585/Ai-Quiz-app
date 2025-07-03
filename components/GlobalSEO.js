"use client";
import Head from "next/head";

export default function GlobalSEO() {
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

  return (
    <Head>
      {/* Preconnects for performance */}
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* Favicons and icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      {/* Canonical and alternate links */}
      <link rel="canonical" href="https://ai-quiz-app-nu.vercel.app/" />
      <link rel="alternate" href="https://ai-quiz-app-nu.vercel.app/" hrefLang="en-in" />
      <link rel="alternate" href="https://ai-quiz-app-nu.vercel.app/" hrefLang="en" />
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataPerson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataWebsite) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataBreadcrumb) }} />
      {/* Hidden semantic content for SEO */}
      <div style={{ display: "none" }}>
        <h1>Nithin N - Full Stack Developer Portfolio</h1>
        <h2>Nithin N - AI Engineer from Mysore Karnataka</h2>
        <p>
          Professional portfolio of Nithin N, Full Stack Developer and AI Engineer from Mysore, Karnataka. VIT Bhopal graduate specializing in React, Next.js, Python, JavaScript, and modern web development technologies.
        </p>
      </div>
    </Head>
  );
} 