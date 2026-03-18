"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "../../hooks/useIsMobile";

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

const CLIENTS = [
    { name: "OpenAI", category: "AI Research", logo: (<svg viewBox="0 0 200 200" fill="currentColor" style={{ width: "100%", height: "100%" }}><path d="M183.6 102.5c4.2-13 2.6-27.2-4.4-39C169.6 46 155 38.3 140 39.2c-8.8-11.5-22.3-18.3-36.7-18.3-26.3 0-47.7 21.3-47.8 47.6-13.4 2.7-25 10.8-32.2 22.5-13.2 22.8-6.4 52 15.2 66.6-4.2 13-2.6 27.2 4.4 39 9.6 16.6 27.8 26.2 46.5 24.9 8.8 11.5 22.3 18.3 36.7 18.3 26.3 0 47.7-21.3 47.8-47.6 13.4-2.7 25-10.8 32.2-22.5 13.1-22.8 6.3-52-15.3-66.6l.8-.6zM110 204.5c-9.2 0-18-3.2-24.9-9 .3-.2.9-.5 1.3-.7l41.4-23.9c2.1-1.2 3.4-3.4 3.4-5.8V107l17.5 10.1c.2.1.3.3.3.5v48.4c0 20.2-16.4 36.5-39 36.5zM26 171c-4.6-8-6.3-17.3-4.8-26.4l41.4 23.9c2.1 1.2 4.7 1.2 6.8 0l50.5-29.2v20.2l-40.9 23.6C61.5 193.2 39.1 187.1 26 171zm-11-89.7c4.6-8 11.8-14 20.4-17.3v49.2c0 2.4 1.3 4.6 3.4 5.8l50.5 29.2-17.5 10.1-.6.1L30 137.5C12.5 127.4 8.5 103.9 15 81.2zm144.5 31.4L108.9 83.4l17.5-10.1.6-.1L171 97.6c17.5 10.1 21.5 33.5 14.9 56.2-4.6 8-11.8 14-20.4 17.3v-49.2c0-2.4-1.3-4.6-3.4-5.8l-.6.5zM83.5 117l-17.5-10.1c-.2-.1-.3-.3-.3-.5V57.9c0-20.2 16.6-36.6 39.1-36.5 9.2 0 18 3.2 24.9 9-.3.2-.9.5-1.3.7l-41.4 23.9c-2.1 1.2-3.4 3.4-3.4 5.8V117h-.1zm9.5-20.5l22.5-13 22.5 13v26l-22.5 13-22.5-13v-26z" /></svg>) },
    { name: "Stripe", category: "Payments", logo: (<svg viewBox="0 0 200 84" fill="currentColor" style={{ width: "100%", height: "100%" }}><path d="M15 57.2c0 5.9 4.8 8.2 9.8 8.2 4.6 0 7.4-2.1 7.4-5.3 0-3.7-2.6-4.9-9-6.6C14 51 7.9 47.8 7.9 39.4 7.9 30.1 15.4 25 25.3 25c9.4 0 16.3 5.3 16.3 13.4H31.5c0-4.4-3.2-6.8-7.4-6.8-3.8 0-6.6 1.9-6.6 4.9 0 3.4 2.8 4.5 10.3 6.5 9.1 2.5 14.1 5.9 14.1 14.3 0 9.4-7.9 14-18.2 14C13.8 71.3 5 66 5 57.2H15zm34.3-30.9v7.4h8.7v7.7h-8.7v19.4c0 3.4 1.3 4.9 4.6 4.9 1.4 0 2.5-.1 3.9-.4v7.9c-2 .6-4.4.9-7 .9-7.4 0-12.3-3.9-12.3-12.5V41.4h-6.8v-7.7h6.8v-7.4h10.8zm14.4 7.4h10.4v6.6c2-4.4 5.8-7.3 11.1-7.3 1.1 0 2.2.1 3.2.4v9.8c-1.3-.4-3-.7-4.6-.7-6.2 0-9.9 4-9.9 11.1v17h-10.4V33.7zm27.4 37h10.4V33.7H91.1v37zm5.2-42.8c-3.5 0-6.2-2.7-6.2-6.2s2.7-6.2 6.2-6.2 6.2 2.7 6.2 6.2-2.7 6.2-6.2 6.2z" /></svg>) },
    { name: "Notion", category: "Productivity", logo: (<svg viewBox="0 0 100 100" fill="currentColor" style={{ width: "100%", height: "100%" }}><path d="M6.07 7.5c1.73 1.4 2.38 1.3 5.63 1.08l58.5-3.47c.65 0 .11-.65-.11-.76L61.84 0C60.33-.33 57.4.11 54.57.32L-1.74 4.68c-2.27.22-2.7 1.3-1.84 2.16L6.07 7.5z" /></svg>) },
    { name: "Vercel", category: "Infrastructure", logo: (<svg viewBox="0 0 284 65" fill="currentColor" style={{ width: "100%", height: "100%" }}><path d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM37.59.25l36.95 64H.64L37.59.25z" /></svg>) },
    { name: "AWS", category: "Cloud", logo: (<svg viewBox="0 0 304 182" fill="currentColor" style={{ width: "100%", height: "100%" }}><path d="M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z" /></svg>) },
    { name: "Google", category: "Technology", logo: (<svg viewBox="0 0 272 92" fill="none" style={{ width: "100%", height: "100%" }}><path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01C53.27 66.29 45.54 69.65 35.3 69.65 16.32 69.65.36 54.19.36 35.21.36 16.23 16.32.77 35.3.77c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65H35.29z" fill="#4285F4" /></svg>) },
];

export default function Clients() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const countRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = headingRef.current?.querySelectorAll<HTMLElement>(".word");
            if (words && words.length) {
                gsap.set(words, { rotateX: 88, y: 32, opacity: 0, transformOrigin: "bottom center" });
                gsap.to(words, { rotateX: 0, y: 0, opacity: 1, duration: 0.95, ease: "power4.out", stagger: { each: 0.06, ease: "power2.inOut" }, scrollTrigger: { trigger: headingRef.current, start: "top 82%", toggleActions: "play none none reset" } });
            }
            if (subtextRef.current) {
                gsap.set(subtextRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
                gsap.to(subtextRef.current, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut", delay: 0.32, scrollTrigger: { trigger: subtextRef.current, start: "top 87%", toggleActions: "play none none reset" } });
            }
            if (dividerRef.current) {
                gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });
                gsap.to(dividerRef.current, { scaleX: 1, duration: 1.2, ease: "expo.inOut", scrollTrigger: { trigger: dividerRef.current, start: "top 90%", toggleActions: "play none none reset" } });
            }
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                gsap.set(card, { clipPath: "inset(100% 0% 0% 0%)", y: 24 });
                gsap.to(card, { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.9, ease: "power4.out", delay: i * 0.07, scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reset" } });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const headingWords = "Trusted by Teams Building the Future".split(" ");

    return (
        <section ref={sectionRef} id="clients-section" style={{ fontFamily: FONT }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "24px" : "40px", alignItems: "flex-end", marginBottom: isMobile ? "40px" : "80px" }}>
                    <div>
                        <div ref={eyebrowRef} style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.38)", marginBottom: "28px", fontFamily: FONT }}>
                            <span style={{ width: "24px", height: "1.5px", background: "currentColor", display: "block", flexShrink: 0 }} />
                            Our Clients
                        </div>
                        <div ref={headingRef} style={{ perspective: "800px" }}>
                            <h2 style={{ fontSize: isMobile ? "clamp(30px,8vw,48px)" : "clamp(36px,4.6vw,64px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.035em", color: "#0a0a0a", margin: 0, fontFamily: FONT, display: "flex", flexWrap: "wrap", gap: "0 0.26em" }}>
                                {headingWords.map((word, i) => (<span key={i} style={{ overflow: "hidden", display: "inline-block" }}><span className="word" style={{ display: "inline-block" }}>{word}</span></span>))}
                            </h2>
                        </div>
                    </div>
                    <div style={{ paddingBottom: "4px" }}>
                        <p ref={subtextRef} style={{ fontSize: isMobile ? "14px" : "17px", lineHeight: 1.75, color: "#000", maxWidth: "400px", margin: "0 0 20px 0", fontFamily: FONT, fontWeight: 400 }}>
                            From early-stage startups to publicly traded companies — we partner with teams that have something worth building.
                        </p>
                        <div ref={countRef} style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                            {[["120+", "Projects shipped"], ["98%", "Retention rate"], ["12", "Countries"]].map(([val, label]) => (
                                <div key={label}>
                                    <div className="stat-value" data-value={val} style={{ fontSize: isMobile ? "22px" : "28px", fontWeight: 800, letterSpacing: "-0.03em", color: "#0a0a0a", lineHeight: 1, marginBottom: "4px", fontFamily: FONT }}>{val}</div>
                                    <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.4)", fontFamily: FONT, fontWeight: 500 }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div ref={dividerRef} id="clients-divider" style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, transparent)", marginBottom: isMobile ? "32px" : "64px" }} />
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "6px" }}>
                    {CLIENTS.map((client, i) => {
                        const isHovered = hoveredIdx === i;
                        return (
                            <div key={client.name} ref={(el) => { cardRefs.current[i] = el; }}
                                onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}
                                style={{ position: "relative", backgroundColor: isHovered ? "#0a0a0a" : "#ffffff", border: "1.5px solid rgba(0,0,0,0.08)", padding: isMobile ? "28px 20px" : "52px 48px", display: "flex", flexDirection: "column", gap: "20px", transition: "background-color 0.35s ease", cursor: "default", overflow: "hidden" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: isHovered ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.32)", fontFamily: FONT, transition: "color 0.35s ease" }}>{client.category}</span>
                                </div>
                                <div style={{ height: isMobile ? "32px" : "44px", display: "flex", alignItems: "center", color: isHovered ? "#ffffff" : "#0a0a0a", transition: "color 0.35s ease", opacity: isHovered ? 0.9 : 0.75 }}>
                                    <div style={{ height: "100%", maxWidth: isMobile ? "100px" : "140px" }}>{client.logo}</div>
                                </div>
                                <div style={{ fontSize: "13px", fontWeight: 600, color: isHovered ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.3)", fontFamily: FONT, transition: "color 0.35s ease" }}>{client.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}