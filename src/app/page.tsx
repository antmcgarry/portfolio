import { Suspense } from "react";
import Profile from "@/components/Profile";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import ContactMe from "@/components/ContactMe";

export default function Home() {
  return (
    <>
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
