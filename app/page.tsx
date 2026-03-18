"use client";
import StoryCanvas from "./components/StoryCanvas";
import Header from "./Header";
import Hero from "./components/Hero";
import Process from "./components/Process";
import Services from "./components/Services";
import Why from "./components/Why";
import Clients from "./components/Clients";
import Partners from "./components/Partners";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

// Desktop: 94px outer padding (unchanged).
// Mobile: outer padding is 0 — each component handles its own via useIsMobile().
export default function Page() {
  return (
    <main className="relative bg-white text-black">
      <StoryCanvas />
      <div
        style={{ padding: "0px 94px" }}
        className="md:block [padding:0px_94px] max-md:!p-0"
      >
        <div
        style={{
          paddingLeft:'15px'
        }}
        >
          <Header />
        </div>
        <Hero />
        <Process />
        <Services />
        <Why />
        <Clients />
        <Partners />
      </div>
      <CTA />
      <Footer />
    </main>
  );
}