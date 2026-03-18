"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "../../../hooks/useIsMobile";

const ACCENT = "rgba(88,87,249)", ACCENT_SOFT = "rgba(88,87,249,0.07)", ACCENT_RING = "rgba(88,87,249,0.18)";
const FONT = "'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif";
const MONO = "'DM Mono','Fira Mono','Courier New',monospace";
const INK = "#0a0a0a", INK_MID = "rgba(10,10,10,0.5)", INK_FAINT = "rgba(10,10,10,0.3)", RULE = "rgba(10,10,10,0.07)", SURFACE = "#f8f8f8";
const ACCENTHEX = "#5857f9";

const STATS = [{ value: "150+", sub: "Models in production" }, { value: "98.9%", sub: "Average uptime" }, { value: "10×", sub: "Faster than in-house" }, { value: "< 6wk", sub: "Avg. first deployment" }];
const CAPABILITIES = [
    { n: "01", tag: "Foundation", title: "Custom ML Models", body: "We train and fine-tune bespoke models on your proprietary data. Precision-built for your domain — not borrowed from the internet." },
    { n: "02", tag: "Language AI", title: "LLM Applications", body: "RAG pipelines, multi-agent systems, function calling. Full-stack builds around OpenAI, Anthropic, and open-source LLMs — from API to production UI." },
    { n: "03", tag: "Vision", title: "Computer Vision", body: "Object detection, classification, real-time video analysis. Shipped across manufacturing, retail, and security with sub-100ms inference." },
    { n: "04", tag: "Analytics", title: "Predictive Analytics", body: "Churn models, demand forecasting, anomaly detection. We convert historical data into daily-use intelligence your team actually acts on." },
    { n: "05", tag: "Platform", title: "AI Infrastructure", body: "Vector databases, feature stores, model monitoring, CI/CD for ML. The invisible layer that keeps AI reliable when traffic spikes." },
    { n: "06", tag: "Integration", title: "System Integration", body: "We wire AI into your existing CRM, ERP, or product via clean REST/gRPC APIs — zero disruption to current workflows." },
];
const PROCESS = [
    { n: "01", period: "Week 1", title: "Technical Audit", body: "We map your stack, data landscape, and the highest-leverage AI opportunities in a focused 60-minute session. No templates." },
    { n: "02", period: "Week 2–3", title: "Architecture Design", body: "System blueprints, data pipelines, model selection rationale. You see exactly what we'll build and why — before a single line of code." },
    { n: "03", period: "Week 4–6", title: "Rapid Prototyping", body: "Working prototypes in days, not months. We validate assumptions fast and iterate on real performance data." },
    { n: "04", period: "Week 7–12", title: "Production Build", body: "Hardened, tested, monitored. Systems built for edge cases — the traffic spikes, the bad data, the unexpected. Then we hand it over with docs." },
];
const STACK = ["PyTorch", "TensorFlow", "LangChain", "OpenAI API", "Anthropic", "Pinecone", "Supabase pgvector", "Kubernetes", "FastAPI", "Next.js", "PostgreSQL", "Redis", "Docker", "Hugging Face"];
const FAQS = [
    { q: "Do we need large datasets to get started?", a: "Not always. Depending on the task, fine-tuning a foundation model with a few hundred labelled examples is often sufficient. We can also use RAG with your existing docs, or build synthetic data pipelines. The audit will give you a clear picture." },
    { q: "How do you handle data privacy and security?", a: "We architect for data minimisation by default. On-premise, private cloud, or fully encrypted pipelines — your data never leaves your control without explicit sign-off. We sign NDAs and DPAs before any work begins." },
    { q: "Can you work alongside our existing engineering team?", a: "Yes — and we prefer it. Our best engagements are collaborative. We can lead, augment, or advise depending on your team's current capacity. Knowledge transfer is built into every engagement." },
    { q: "What does ongoing support look like after launch?", a: "Every production deployment includes 90 days of monitoring, weekly performance reports, and rapid-response support. After that, we offer async support retainers or an embedded engineer model." },
];

export default function AIDevelopmentPage() {
    const router = useRouter();
    const heroRef = useRef<HTMLDivElement>(null), capRef = useRef<HTMLDivElement>(null), procRef = useRef<HTMLDivElement>(null), stackRef = useRef<HTMLDivElement>(null), faqRef = useRef<HTMLDivElement>(null), ctaRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false), [openFaq, setOpenFaq] = useState<number | null>(null), [hovCap, setHovCap] = useState<number | null>(null), [form, setForm] = useState({ name: "", email: "", company: "", idea: "" }), [sent, setSent] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const link = document.createElement("link"); link.rel = "stylesheet"; link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap"; document.head.appendChild(link);
        const handleScroll = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", handleScroll);
        gsap.registerPlugin(ScrollTrigger);
        if (heroRef.current) { gsap.fromTo(heroRef.current.querySelectorAll<HTMLElement>(".hr"), { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 1.05, ease: "power3.out", stagger: 0.09, delay: 0.12 }); }
        [{ ref: capRef, cls: ".cr", stagger: 0.055 }, { ref: procRef, cls: ".pr", stagger: 0.08 }, { ref: stackRef, cls: ".sr", stagger: 0.03 }, { ref: faqRef, cls: ".fr", stagger: 0.06 }, { ref: ctaRef, cls: ".tr", stagger: 0.07 }].forEach(({ ref, cls, stagger }) => {
            if (!ref.current) return; const els = ref.current.querySelectorAll<HTMLElement>(cls); if (!els.length) return;
            gsap.fromTo(els, { y: 38, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger, scrollTrigger: { trigger: ref.current, start: "top 82%", toggleActions: "play none none reset" } });
        });
        return () => { ScrollTrigger.getAll().forEach(t => t.kill()); window.removeEventListener("scroll", handleScroll); document.head.removeChild(link); };
    }, []);

    const pad = isMobile ? "20px 20px" : "60px";
    const maxW = 1240;

    return (
        <main style={{ fontFamily: FONT, background: "#fff", color: INK, overflowX: "hidden" }}>
            {/* NAV */}
            <div className="fixed top-5 z-[99999] flex justify-center" style={{ left: "50%", transform: "translateX(-50%)", width: "85%" }}>
                <div className={`w-full max-w-7xl rounded-full transition-all duration-500 backdrop-blur-2xl border border-black/10 ${scrolled ? "bg-white/50 shadow-[0_15px_50px_rgba(0,0,0,0.08)]" : "bg-white/60"}`}>
                    <div className="flex items-center justify-between px-6 md:px-10 py-3 md:py-4">
                        <div className="flex items-center gap-2.5 font-semibold text-base md:text-lg tracking-tight cursor-pointer" onClick={() => router.push("/")}>
                            <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-sm">N</div>Nexod
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-black/40">
                            <span className="cursor-pointer hover:text-black transition-colors duration-200" onClick={() => router.push("/#services-section")}>Services</span>
                            <svg viewBox="0 0 12 12" width={10} height={10} fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span className="text-black font-semibold">AI Development</span>
                        </div>
                        <button onClick={() => ctaRef.current?.scrollIntoView({ behavior: "smooth" })} className="px-5 md:px-8 py-2.5 md:py-3 bg-black text-white rounded-full text-xs md:text-sm font-medium hover:scale-105 transition-all duration-300">Start a Project</button>
                    </div>
                </div>
            </div>

            {/* HERO */}
            <div ref={heroRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "120px 20px 60px" : "140px 60px 96px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 400px", gap: isMobile ? 40 : 80, alignItems: "start" }}>
                    <div>
                        <div className="hr" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENTHEX }}>
                            <span style={{ width: 20, height: 1.5, background: "currentColor", display: "block" }} />Service · 01
                        </div>
                        <h1 className="hr" style={{ margin: "0 0 24px", fontSize: isMobile ? "clamp(44px,11vw,72px)" : "clamp(52px,6.5vw,88px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.97 }}>
                            AI<br /><span style={{ color: ACCENTHEX }}>Develop</span>ment
                        </h1>
                        <p className="hr" style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.8, color: INK_MID, maxWidth: 500, margin: "0 0 36px", fontWeight: 400 }}>
                            We build AI systems that actually ship. From prototype to production, our engineers design, train, and deploy machine intelligence that compounds your team&apos;s leverage.
                        </p>
                        <div className="hr" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <button onClick={() => ctaRef.current?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "13px 26px", background: INK, color: "#fff", border: "none", borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FONT, transition: "opacity 0.2s" }} onMouseEnter={e => { e.currentTarget.style.opacity = "0.78" }} onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}>Start a Project</button>
                            <button onClick={() => procRef.current?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "13px 26px", background: "transparent", color: INK, border: `1.5px solid ${RULE}`, borderRadius: 100, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: FONT, transition: "border-color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.28)")} onMouseLeave={e => (e.currentTarget.style.borderColor = RULE)}>How it works</button>
                        </div>
                    </div>
                    <div className="hr" style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: isMobile ? 0 : 10 }}>
                        {STATS.map((s, i) => (
                            <div key={i} style={{ padding: "18px 22px", background: i === 0 ? ACCENTHEX : SURFACE, border: `1px solid ${i === 0 ? "transparent" : RULE}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontFamily: MONO, fontSize: i === 0 ? 32 : 26, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1, color: i === 0 ? "#fff" : INK }}>{s.value}</span>
                                <span style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.4, textAlign: "right", maxWidth: 130, color: i === 0 ? "rgba(255,255,255,0.62)" : INK_FAINT }}>{s.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${isMobile ? "20px" : "60px"}` }}><div style={{ height: 1, background: RULE }} /></div>

            {/* CAPABILITIES */}
            <div ref={capRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "60px 20px" : "96px 60px" }}>
                <div className="cr" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: INK_FAINT }}><span style={{ width: 18, height: 1.5, background: "currentColor", display: "block" }} />What We Build</div>
                <h2 className="cr" style={{ fontSize: isMobile ? "clamp(28px,7vw,40px)" : "clamp(32px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 40px" }}> Six core capabilities.<br /><span style={{ color: INK_FAINT, fontWeight: 400 }}>End-to-end ownership.</span></h2>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 3 }}>
                    {CAPABILITIES.map((c, i) => {
                        const isHov = hovCap === i; return (
                            <div key={i} className="cr" onMouseEnter={() => setHovCap(i)} onMouseLeave={() => setHovCap(null)}
                                style={{ padding: isMobile ? "28px 24px" : "36px 32px", background: isHov ? ACCENTHEX : SURFACE, borderRadius: 16, border: `1px solid ${isHov ? "transparent" : RULE}`, transition: "background 0.28s,border-color 0.28s", cursor: "default" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                    <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, color: isHov ? "rgba(255,255,255,0.45)" : ACCENTHEX, transition: "color 0.28s" }}>{c.n}</span>
                                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: isHov ? "rgba(255,255,255,0.4)" : INK_FAINT, border: `1px solid ${isHov ? "rgba(255,255,255,0.18)" : RULE}`, borderRadius: 100, padding: "3px 10px", transition: "all 0.28s" }}>{c.tag}</span>
                                </div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", color: isHov ? "#fff" : INK, margin: "0 0 10px", transition: "color 0.28s" }}>{c.title}</h3>
                                <p style={{ fontSize: 13, lineHeight: 1.7, color: isHov ? "rgba(255,255,255,0.62)" : INK_MID, margin: 0, transition: "color 0.28s" }}>{c.body}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${isMobile ? "20px" : "60px"}` }}><div style={{ height: 1, background: RULE }} /></div>

            {/* PROCESS */}
            <div ref={procRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "60px 20px" : "96px 60px" }}>
                <div className="pr" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: INK_FAINT }}><span style={{ width: 18, height: 1.5, background: "currentColor", display: "block" }} />How We Work</div>
                <h2 className="pr" style={{ fontSize: isMobile ? "clamp(28px,7vw,40px)" : "clamp(32px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 40px" }}>Zero guesswork.<br /><span style={{ color: INK_FAINT, fontWeight: 400 }}>Structured delivery.</span></h2>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 3 }}>
                    {PROCESS.map((step, i) => (
                        <div key={i} className="pr" style={{ padding: isMobile ? "24px 20px" : "36px 28px", background: i % 2 === 0 ? SURFACE : "#fff", border: `1px solid ${RULE}`, borderRadius: 16 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: ACCENT_SOFT, border: `1px solid ${ACCENT_RING}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, color: ACCENTHEX }}>{step.n}</span></div>
                            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, color: ACCENTHEX, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{step.period}</div>
                            <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.015em", color: INK, margin: "0 0 8px" }}>{step.title}</h3>
                            <p style={{ fontSize: 12.5, lineHeight: 1.65, color: INK_MID, margin: 0 }}>{step.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${isMobile ? "20px" : "60px"}` }}><div style={{ height: 1, background: RULE }} /></div>

            {/* STACK */}
            <div ref={stackRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "48px 20px" : "72px 60px" }}>
                <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: isMobile ? 24 : 48, flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
                    <div>
                        <div className="sr" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: INK_FAINT }}><span style={{ width: 18, height: 1.5, background: "currentColor", display: "block" }} />Tech Stack</div>
                        <p className="sr" style={{ fontSize: 14, color: INK_MID, margin: 0, maxWidth: 220 }}>We pick the right tool for the job — not the fashionable one.</p>
                    </div>
                    <div className="sr" style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: isMobile ? "100%" : 680 }}>
                        {STACK.map((t, i) => <span key={i} style={{ fontFamily: MONO, fontSize: 11.5, fontWeight: 400, padding: "6px 13px", borderRadius: 100, background: SURFACE, border: `1px solid ${RULE}`, color: "rgba(10,10,10,0.58)" }}>{t}</span>)}
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${isMobile ? "20px" : "60px"}` }}><div style={{ height: 1, background: RULE }} /></div>

            {/* FAQ */}
            <div ref={faqRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "60px 20px" : "96px 60px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "380px 1fr", gap: isMobile ? 32 : 80 }}>
                    <div>
                        <div className="fr" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: INK_FAINT }}><span style={{ width: 18, height: 1.5, background: "currentColor", display: "block" }} />Questions</div>
                        <h2 className="fr" style={{ fontSize: isMobile ? "clamp(26px,7vw,36px)" : "clamp(28px,3.2vw,42px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.07, margin: "0 0 14px" }}>Straight answers.<br />No sales deck.</h2>
                        <p className="fr" style={{ fontSize: 14, lineHeight: 1.72, color: INK_MID, margin: "0 0 24px" }}>If your question isn&apos;t here, reach out directly. We reply within one business day.</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {FAQS.map((faq, i) => {
                            const isOpen = openFaq === i; return (
                                <div key={i} className="fr" style={{ border: `1px solid ${RULE}`, borderRadius: 13, background: isOpen ? SURFACE : "#fff", overflow: "hidden", transition: "background 0.25s" }}>
                                    <button onClick={() => setOpenFaq(isOpen ? null : i)} style={{ width: "100%", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, fontFamily: FONT, textAlign: "left" }}>
                                        <span style={{ fontSize: 13.5, fontWeight: 600, color: INK }}>{faq.q}</span>
                                        <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${RULE}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.28s ease" }}>
                                            <svg viewBox="0 0 12 12" width={10} height={10} fill="none"><path d="M6 2v8M2 6h8" stroke={INK} strokeWidth="1.5" strokeLinecap="round" /></svg>
                                        </div>
                                    </button>
                                    <div style={{ maxHeight: isOpen ? 220 : 0, overflow: "hidden", transition: "max-height 0.36s ease" }}>
                                        <p style={{ fontSize: 13, lineHeight: 1.72, color: INK_MID, margin: 0, padding: "0 20px 20px" }}>{faq.a}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${isMobile ? "20px" : "60px"}` }}><div style={{ height: 1, background: RULE }} /></div>

            {/* CTA FORM */}
            <div ref={ctaRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "60px 20px 80px" : "96px 60px 130px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 80, alignItems: "start" }}>
                    <div>
                        <div className="tr" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENTHEX, marginBottom: 18 }}><span style={{ width: 18, height: 1.5, background: "currentColor", display: "block" }} />Get Started</div>
                        <h2 className="tr" style={{ fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(32px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 16px" }}>Tell us what<br />you&apos;re building.</h2>
                        <p className="tr" style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.76, color: INK_MID, margin: "0 0 32px" }}>Drop a few lines about your project. We&apos;ll come back with a concrete proposal — no vague decks, no six-week discovery cycles.</p>
                        <div className="tr" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {["Reply within 1 business day", "Free technical scoping session", "No obligation, no sales pressure"].map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: ACCENT_SOFT, border: `1px solid ${ACCENT_RING}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <svg viewBox="0 0 10 10" width={9} height={9} fill="none"><path d="M2 5l2 2 4-4" stroke={ACCENTHEX} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <span style={{ fontSize: 13, color: INK_MID, fontWeight: 500 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="tr" style={{ background: SURFACE, border: `1px solid ${RULE}`, borderTop: `3px solid ${ACCENTHEX}`, borderRadius: 18, padding: isMobile ? "28px 24px" : "44px" }}>
                        {sent ? (
                            <div style={{ textAlign: "center", padding: "28px 0" }}>
                                <div style={{ width: 48, height: 48, borderRadius: "50%", background: ACCENT_SOFT, border: `1.5px solid ${ACCENT_RING}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none"><path d="M5 12l5 5L19 7" stroke={ACCENTHEX} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                                <h3 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>We&apos;ve got your message.</h3>
                                <p style={{ fontSize: 13, color: INK_MID, margin: 0, lineHeight: 1.65 }}>Expect a reply within one business day with clear next steps.</p>
                            </div>
                        ) : (
                            <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
                                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 12 }}>
                                    {[["Name", "name", "John Doe", "text"], ["Email", "email", "john@company.com", "email"]].map(([label, name, placeholder, type]) => (
                                        <div key={name}><label style={{ fontSize: 11, fontWeight: 600, color: INK_FAINT, display: "block", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</label><input type={type} placeholder={placeholder} value={(form as Record<string, string>)[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} style={{ width: "100%", boxSizing: "border-box", background: "#fff", border: `1.5px solid ${RULE}`, borderRadius: 10, padding: "10px 13px", fontSize: 13, color: INK, fontFamily: FONT, outline: "none", transition: "border-color 0.2s" }} onFocus={e => (e.currentTarget.style.borderColor = ACCENTHEX)} onBlur={e => (e.currentTarget.style.borderColor = RULE)} /></div>
                                    ))}
                                </div>
                                <div style={{ marginBottom: 12 }}><label style={{ fontSize: 11, fontWeight: 600, color: INK_FAINT, display: "block", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>Company</label><input placeholder="Acme Corp." value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} style={{ width: "100%", boxSizing: "border-box", background: "#fff", border: `1.5px solid ${RULE}`, borderRadius: 10, padding: "10px 13px", fontSize: 13, color: INK, fontFamily: FONT, outline: "none", transition: "border-color 0.2s" }} onFocus={e => (e.currentTarget.style.borderColor = ACCENTHEX)} onBlur={e => (e.currentTarget.style.borderColor = RULE)} /></div>
                                <div style={{ marginBottom: 20 }}><label style={{ fontSize: 11, fontWeight: 600, color: INK_FAINT, display: "block", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>What are you building?</label><textarea value={form.idea} onChange={e => setForm(f => ({ ...f, idea: e.target.value }))} placeholder="Describe your project — the problem it solves, where you are now, and what success looks like." rows={4} style={{ width: "100%", boxSizing: "border-box", background: "#fff", border: `1.5px solid ${RULE}`, borderRadius: 10, padding: "11px 13px", fontSize: 13, color: INK, fontFamily: FONT, resize: "none", outline: "none", transition: "border-color 0.2s", lineHeight: 1.65 }} onFocus={e => (e.currentTarget.style.borderColor = ACCENTHEX)} onBlur={e => (e.currentTarget.style.borderColor = RULE)} /></div>
                                <button type="submit" style={{ width: "100%", padding: "13px", background: INK, color: "#fff", border: "none", borderRadius: 100, fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity 0.2s" }} onMouseEnter={e => { e.currentTarget.style.opacity = "0.78" }} onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}>
                                    Send Message<svg viewBox="0 0 16 16" width={12} height={12} fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}