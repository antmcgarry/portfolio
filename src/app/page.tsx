import { Suspense } from "react";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import Profile from "@/components/Profile";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import ContactMe from "@/components/ContactMe";

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: `${site.url}/`,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      inLanguage: "en-GB",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: `${site.url}/`,
      name: site.title,
      description: site.description,
      inLanguage: "en-GB",
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: `${site.url}/`,
      image: `${site.url}/images/me.png`,
      description: site.description,
      jobTitle: site.jobTitle,
      worksFor: { "@type": "Organization", name: "Acorn Group" },
      homeLocation: { "@type": "Place", name: "Merseyside, UK" },
      knowsAbout: ["React", "TypeScript", "Next.js", "React Native", "Frontend architecture", "Engineering leadership"],
      sameAs: site.profiles,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading profile...
          </div>
        }
      >
        <Profile />
      </Suspense>

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading about section...
          </div>
        }
      >
        <AboutMe />
      </Suspense>

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading experience...
          </div>
        }
      >
        <Experience />
      </Suspense>

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading contact section...
          </div>
        }
      >
        <ContactMe />
      </Suspense>
    </>
  );
}
