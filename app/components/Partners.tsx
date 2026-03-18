"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "../../hooks/useIsMobile";

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const PARTNERS = [
    { name: "OpenAI", category: "AI Foundation", description: "Large language models & embeddings powering our AI core.", logo: (<svg viewBox="0 0 200 200" fill="currentColor" style={{ width: "100%", height: "100%" }}><path d="M183.6 102.5c4.2-13 2.6-27.2-4.4-39C169.6 46 155 38.3 140 39.2c-8.8-11.5-22.3-18.3-36.7-18.3-26.3 0-47.7 21.3-47.8 47.6-13.4 2.7-25 10.8-32.2 22.5-13.2 22.8-6.4 52 15.2 66.6-4.2 13-2.6 27.2 4.4 39 9.6 16.6 27.8 26.2 46.5 24.9 8.8 11.5 22.3 18.3 36.7 18.3 26.3 0 47.7-21.3 47.8-47.6 13.4-2.7 25-10.8 32.2-22.5 13.1-22.8 6.3-52-15.3-66.6l.8-.6z" /></svg>) },
    { name: "AWS", category: "Cloud Infrastructure", description: "Global compute, storage, and serverless at any scale.", logo: (<svg viewBox="0 0 304 182" fill="currentColor" style={{ width: "100%", height: "100%" }}><path d="M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z" /><path d="M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z" /></svg>) },
    { name: "Google Cloud", category: "ML & Data", description: "Vertex AI, BigQuery, and distributed data pipelines.", logo: (<svg viewBox="0 0 128 20" fill="none" style={{ width: "100%", height: "100%" }}><path d="M17.8 6.3H9.6v2h7.4c-.4 3.9-3.7 7-7.4 7-4.2 0-7.6-3.4-7.6-7.6s3.4-7.6 7.6-7.6c2 0 3.8.8 5.2 2l1.4-1.4C14.6.9 12.2 0 9.6 0 4.3 0 0 4.3 0 9.6s4.3 9.6 9.6 9.6c5.6 0 9.3-3.9 9.3-9.5 0-.5 0-1-.1-1.4z" fill="#4285F4" /><text x="24" y="15" fontFamily="-apple-system,sans-serif" fontSize="11" fontWeight="500" fill="#5F6368">Google Cloud</text></svg>) },
    { name: "Microsoft Azure", category: "Enterprise Cloud", description: "Enterprise-grade security, compliance, and global reach.", logo: (<svg viewBox="0 0 200 50" fill="none" style={{ width: "100%", height: "100%" }}><path d="M0 0h23.5L12.3 33.9 0 50V0z" fill="#0078D4" /><path d="M8.1 0h15.4L34.8 35.1 23.4 50H0L8.1 0z" fill="#0078D4" opacity="0.7" /><text x="52" y="35" fontFamily="-apple-system,sans-serif" fontSize="18" fontWeight="600" fill="#0078D4">Azure</text></svg>) },
];

export default function Partners() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = headingRef.current?.querySelectorAll<HTMLElement>(".word");
            if (words && words.length) {
                gsap.set(words, { rotateX: 88, y: 32, opacity: 0, transformOrigin: "bottom center" });
                gsap.to(words, { rotateX: 0, y: 0, opacity: 1, duration: 0.95, ease: "power4.out", stagger: 0.065, scrollTrigger: { trigger: headingRef.current, start: "top 83%", toggleActions: "play none none reset" } });
            }
            if (dividerRef.current) {
                gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });
                gsap.to(dividerRef.current, { scaleX: 1, duration: 1.2, ease: "expo.inOut", scrollTrigger: { trigger: dividerRef.current, start: "top 88%", toggleActions: "play none none reset" } });
            }
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                gsap.set(card, { clipPath: "inset(100% 0% 0% 0%)", y: 24 });
                gsap.to(card, { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.9, ease: "power4.out", delay: i * 0.09, scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reset" } });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const headingWords = "Built on Industry-Leading Infrastructure".split(" ");
    return (
        <section ref={sectionRef} id="partners-section" style={{ fontFamily: FONT, paddingTop: isMobile ? "80px" : "140px", paddingBottom: isMobile ? "80px" : "160px" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "24px" : "48px", alignItems: "flex-end", marginBottom: isMobile ? "40px" : "80px" }}>
                    <div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.38)", marginBottom: "28px", fontFamily: FONT }}>
                            <span style={{ width: "24px", height: "1.5px", background: "currentColor", display: "block", flexShrink: 0 }} />
                            Technology Stack
                        </div>
                        <div ref={headingRef} style={{ perspective: "800px" }}>
                            <h2 style={{ fontSize: isMobile ? "clamp(28px,7vw,44px)" : "clamp(36px,4.4vw,60px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.035em", color: "#0a0a0a", margin: 0, fontFamily: FONT, display: "flex", flexWrap: "wrap", gap: "0 0.26em" }}>
                                {headingWords.map((word, i) => (<span key={i} style={{ overflow: "hidden", display: "inline-block" }}><span className="word" style={{ display: "inline-block" }}>{word}</span></span>))}
                            </h2>
                        </div>
                    </div>
                    <div style={{ paddingBottom: "4px" }}>
                        <p ref={subtextRef} style={{ fontSize: isMobile ? "14px" : "17px", lineHeight: 1.75, color: "#000", maxWidth: "400px", margin: 0, fontFamily: FONT, fontWeight: 400 }}>
                            Every tool we use is chosen for reliability, scale, and speed. We don&apos;t experiment on production — we ship on proven platforms.
                        </p>
                    </div>
                </div>
                <div ref={dividerRef} id="partners-divider" style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, transparent)", marginBottom: isMobile ? "32px" : "64px" }} />
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "2px" }}>
                    {PARTNERS.map((p, i) => {
                        const isHovered = hoveredIdx === i;
                        return (
                            <div key={p.name} ref={(el) => { cardRefs.current[i] = el; }}
                                onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}
                                style={{ position: "relative", backgroundColor: isHovered ? "#f5f5f4" : "#fafaf9", border: `1px solid ${isHovered ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.07)"}`, padding: isMobile ? "28px 20px 32px" : "44px 36px 48px", display: "flex", flexDirection: "column", gap: isMobile ? "16px" : "28px", transition: "background-color 0.3s ease", cursor: "default", overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: isHovered ? "linear-gradient(90deg, #ef4444, #3b82f6, #22c55e)" : "transparent", transition: "background 0.4s ease" }} />
                                <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: isHovered ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.32)", fontFamily: FONT }}>{p.category}</span>
                                <div style={{ height: isMobile ? "28px" : "40px", display: "flex", alignItems: "center", color: isHovered ? "#0a0a0a" : "rgba(0,0,0,0.6)", transition: "color 0.3s ease" }}>
                                    <div style={{ height: "100%", maxWidth: isMobile ? "100px" : "130px" }}>{p.logo}</div>
                                </div>
                                {!isMobile && <p style={{ fontSize: "14px", lineHeight: 1.65, color: isHovered ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.38)", margin: 0, fontFamily: FONT }}>{p.description}</p>}
                                <div style={{ fontSize: "13px", fontWeight: 600, color: isHovered ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.2)", fontFamily: FONT }}>{p.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}