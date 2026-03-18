"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function Footer() {
    const textRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!textRef.current || isMobile) return;
        gsap.to(textRef.current, {
            y: -120,
            scrollTrigger: {
                trigger: "#footer",
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
            },
        });
    }, [isMobile]);

    return (
        <footer id="footer" className="relative bg-neutral-100 overflow-hidden"
            style={{ paddingTop: isMobile ? "60px" : "144px", paddingBottom: isMobile ? "32px" : "48px" }}>

            {/* Huge background word — desktop only */}
            {!isMobile && (
                <div ref={textRef}
                    className="absolute left-1/2 top-20 -translate-x-1/2 pointer-events-none"
                    style={{ fontSize: 220, fontWeight: 600, letterSpacing: "-0.05em", color: "rgba(0,0,0,0.03)", whiteSpace: "nowrap" }}>
                    NEXOD
                </div>
            )}

            <div className="relative z-10" style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 20px" : "0 24px" }}>

                {/* Main grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
                    gap: isMobile ? "32px 24px" : "64px",
                    marginBottom: isMobile ? "48px" : "96px",
                }}>
                    {/* Brand — spans 2 cols on mobile */}
                    <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: isMobile ? "16px" : "28px", fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em" }}>
                            <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}>N</div>
                            Nexod
                        </div>
                        <p style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.7, marginBottom: isMobile ? "16px" : "28px", fontSize: isMobile ? "14px" : "15px" }}>
                            AI-native product and growth studio building intelligent platforms for companies shaping the future.
                        </p>
                        <div style={{ display: "flex", gap: 20, color: "rgba(0,0,0,0.6)", fontSize: "14px" }}>
                            <span className="hover:text-black transition cursor-pointer">LinkedIn</span>
                            <span className="hover:text-black transition cursor-pointer">Twitter</span>
                        </div>
                    </div>

                    <FooterColumn title="Services" items={["AI Platforms", "Automation Systems", "Growth Infrastructure", "Product Engineering"]} isMobile={isMobile} />
                    <FooterColumn title="Company" items={["About", "Careers", "Case Studies", "Contact"]} isMobile={isMobile} />

                    <div>
                        <h4 style={{ fontWeight: 600, marginBottom: isMobile ? "16px" : "28px", letterSpacing: "-0.01em", fontSize: isMobile ? "13px" : "15px" }}>Contact</h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: isMobile ? "10px" : "16px", color: "rgba(0,0,0,0.6)", fontSize: isMobile ? "13px" : "14px" }}>
                            <li className="hover:text-black transition cursor-pointer">hello@nexod.ai</li>
                            <li>San Francisco / Remote</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: "1px solid rgba(0,0,0,0.1)",
                    paddingTop: isMobile ? "20px" : "32px",
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "12px" : "0",
                    fontSize: "13px",
                    color: "rgba(0,0,0,0.5)",
                }}>
                    <div>© {new Date().getFullYear()} Nexod. All rights reserved.</div>
                    <div style={{ display: "flex", gap: isMobile ? "16px" : "32px" }}>
                        {["Privacy", "Terms", "Cookies"].map(item => (
                            <span key={item} className="hover:text-black transition cursor-pointer">{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, items, isMobile }: { title: string; items: string[]; isMobile: boolean }) {
    return (
        <div>
            <h4 style={{ fontWeight: 600, marginBottom: isMobile ? "16px" : "28px", letterSpacing: "-0.01em", fontSize: isMobile ? "13px" : "15px" }}>{title}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: isMobile ? "10px" : "16px", color: "rgba(0,0,0,0.6)", fontSize: isMobile ? "13px" : "14px" }}>
                {items.map(item => <li key={item} className="hover:text-black transition cursor-pointer">{item}</li>)}
            </ul>
        </div>
    );
}