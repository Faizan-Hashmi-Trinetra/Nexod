"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "../../../hooks/useIsMobile";

const ACCENT = "#9c34f0", ACCENT_SOFT = "rgba(156,52,240,0.07)", ACCENT_RING = "rgba(156,52,240,0.18)";
const FONT = "'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif";
const MONO = "'DM Mono','Fira Mono','Courier New',monospace";
const INK = "#0a0a0a", INK_MID = "rgba(10,10,10,0.5)", INK_FAINT = "rgba(10,10,10,0.3)", RULE = "rgba(10,10,10,0.07)", SURFACE = "#f8f8f8";

const STATS = [{ value: "3×", sub: "Average ROI across campaigns" }, { value: "40%", sub: "Lower customer acquisition cost" }, { value: "220%", sub: "Avg. organic traffic lift in 90 days" }, { value: "12hr", sub: "From brief to live campaign" }];
const CAPABILITIES = [
    { n: "01", tag: "Targeting", title: "AI Audience Segmentation", body: "We identify your highest-value segments using behavioural, psychographic, and first-party data signals — not just demographics. Then we build systems that keep segments fresh." },
    { n: "02", tag: "Content", title: "Automated Content at Scale", body: "AI-generated, human-reviewed copy for ads, emails, landing pages, and social — produced in hours, not weeks. Consistent voice, zero creative bottlenecks." },
    { n: "03", tag: "Paid Media", title: "Predictive Campaign Optimisation", body: "Real-time budget allocation, bid adjustments, and creative rotation driven by ML models trained on your historical performance — not platform black boxes." },
    { n: "04", tag: "Organic", title: "SEO & Search Intelligence", body: "Programmatic content strategies, semantic keyword clustering, and technical SEO audits that compound. We build search moats, not quick-win traffic spikes." },
    { n: "05", tag: "Social", title: "Social Media Intelligence", body: "Sentiment analysis, competitor monitoring, and trend detection across all major platforms. Know what your audience cares about before they tell you." },
    { n: "06", tag: "Analytics", title: "Unified Performance Dashboards", body: "Cross-channel attribution, cohort analysis, and predictive LTV modelling — all in one view. No more spreadsheets stitching together six ad platforms." },
];
const PROCESS = [
    { n: "01", period: "Week 1", title: "Audit & Baseline", body: "We analyse your current funnel, attribution setup, and channel performance. You get a brutally honest read on what's working, what's wasted, and where the ceiling is." },
    { n: "02", period: "Week 2–3", title: "Strategy & Playbook", body: "Channel mix, content cadence, audience architecture, and KPI framework. A 90-day playbook you can hold us to — with specific targets and a clear path to each." },
    { n: "03", period: "Week 4–6", title: "Launch & Learn", body: "Campaigns go live with automated tracking in place. We run rapid A/B tests across creative, copy, and audience — compressing months of learning into weeks." },
    { n: "04", period: "Month 2–3+", title: "Scale & Compound", body: "Winners get budget, losers get cut fast. We optimise daily and report weekly — surfacing insights your team can act on, not just vanity metrics." },
];
const CHANNELS = ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "Programmatic Display", "Email (Klaviyo)", "SEO / Content", "Influencer AI", "YouTube", "Reddit Ads", "X Ads", "Pinterest"];
const FAQS = [
    { q: "How quickly will we see results?", a: "Paid channels typically show meaningful signal within 2–3 weeks. SEO compounds over 60–90 days. We set honest timelines in the strategy document upfront — and if something isn't working, we tell you early rather than let budgets bleed." },
    { q: "Do you manage creative as well as media buying?", a: "Yes — creative and distribution are inseparable. We handle copy, ad creative, and landing pages alongside media buying and SEO. Everything is produced under one roof so creative decisions are informed by performance data in real time." },
    { q: "What budget do we need to get started?", a: "We work with brands from £5k/month ad spend upward. Below that threshold, the signal is too thin for AI optimisation to materially outperform manual management. We'd rather tell you that than take a retainer that can't deliver." },
    { q: "How do you measure and report on success?", a: "We build a custom attribution model in week one that connects ad spend to revenue — not just clicks. You get a live dashboard and a weekly async report with our commentary. No 30-page decks, just the numbers that matter and what we're doing about them." },
];
const RESULTS = [
    { brand: "E-Commerce", stat: "+312% ROAS", detail: "within 60 days of campaign restructure" },
    { brand: "B2B SaaS", stat: "–38% CAC", detail: "via AI-led lead scoring & channel shift" },
    { brand: "DTC Brand", stat: "2.1M reach", detail: "organic, 90 days, zero influencer budget" },
];

export default function MarketingPage() {
    const router = useRouter();
    const heroRef = useRef<HTMLDivElement>(null), capRef = useRef<HTMLDivElement>(null), resRef = useRef<HTMLDivElement>(null), procRef = useRef<HTMLDivElement>(null), chanRef = useRef<HTMLDivElement>(null), faqRef = useRef<HTMLDivElement>(null), ctaRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false), [openFaq, setOpenFaq] = useState<number | null>(null), [hovCap, setHovCap] = useState<number | null>(null), [form, setForm] = useState({ name: "", email: "", company: "", goals: "" }), [sent, setSent] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const link = document.createElement("link"); link.rel = "stylesheet"; link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap"; document.head.appendChild(link);
        const handleScroll = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", handleScroll);
        gsap.registerPlugin(ScrollTrigger);
        if (heroRef.current) { gsap.fromTo(heroRef.current.querySelectorAll<HTMLElement>(".hr"), { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 1.05, ease: "power3.out", stagger: 0.09, delay: 0.12 }); }
        [{ ref: capRef, cls: ".cr", stagger: 0.055 }, { ref: resRef, cls: ".rr", stagger: 0.08 }, { ref: procRef, cls: ".pr", stagger: 0.08 }, { ref: chanRef, cls: ".ch", stagger: 0.03 }, { ref: faqRef, cls: ".fr", stagger: 0.06 }, { ref: ctaRef, cls: ".tr", stagger: 0.07 }].forEach(({ ref, cls, stagger }) => {
            if (!ref.current) return; const els = ref.current.querySelectorAll<HTMLElement>(cls); if (!els.length) return;
            gsap.fromTo(els, { y: 38, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger, scrollTrigger: { trigger: ref.current, start: "top 82%", toggleActions: "play none none reset" } });
        });
        return () => { ScrollTrigger.getAll().forEach(t => t.kill()); window.removeEventListener("scroll", handleScroll); document.head.removeChild(link); };
    }, []);

    const maxW = 1240;

    return (
        <main style={{ fontFamily: FONT, background: "#fff", color: INK, overflowX: "hidden" }}>
            {/* NAV */}
            <div className="fixed top-5 z-[99999] flex justify-center" style={{ left: "50%", transform: "translateX(-50%)", width: "85%" }}>
                <div className={`w-full max-w-7xl rounded-full transition-all duration-500 backdrop-blur-2xl border border-black/10 ${scrolled ? "bg-white/50 shadow-[0_15px_50px_rgba(0,0,0,0.08)]" : "bg-white/60"}`}>
                    <div className="flex items-center justify-between px-6 md:px-10 py-3 md:py-4">
                        <div className="flex items-center gap-2.5 font-semibold text-base md:text-lg tracking-tight cursor-pointer" onClick={() => router.push("/")}>
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-black flex items-center justify-center text-sm">N</div>Nexod
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-black/40">
                            <span className="cursor-pointer hover:text-black transition-colors duration-200" onClick={() => router.push("/#services-section")}>Services</span>
                            <svg viewBox="0 0 12 12" width={10} height={10} fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span className="text-black font-semibold">Marketing</span>
                        </div>
                        <button onClick={() => ctaRef.current?.scrollIntoView({ behavior: "smooth" })} className="px-5 md:px-8 py-2.5 md:py-3 bg-black text-white rounded-full text-xs md:text-sm font-medium hover:scale-105 transition-all duration-300">Let&apos;s Talk</button>
                    </div>
                </div>
            </div>

            {/* HERO */}
            <div ref={heroRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "120px 20px 60px" : "140px 60px 96px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 400px", gap: isMobile ? 40 : 80, alignItems: "start" }}>
                    <div>
                        <div className="hr" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT }}>
                            <span style={{ width: 20, height: 1.5, background: "currentColor", display: "block" }} />Service · 02
                        </div>
                        <h1 className="hr" style={{ margin: "0 0 24px", fontSize: isMobile ? "clamp(44px,11vw,72px)" : "clamp(52px,6.5vw,88px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.97 }}>
                            <span style={{ color: ACCENT }}>Market</span>ing<br />that moves<br />
                            <span style={{ WebkitTextStroke: `2px ${INK}`, WebkitTextFillColor: "transparent", color: "transparent" }}>numbers.</span>
                        </h1>
                        <p className="hr" style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.8, color: INK_MID, maxWidth: 500, margin: "0 0 36px", fontWeight: 400 }}>
                            AI-powered campaigns that find the right people, say the right thing, and optimise in real time. We replace gut-feel marketing with systems that compound — measurably, repeatably, at scale.
                        </p>
                        <div className="hr" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <button onClick={() => ctaRef.current?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "13px 26px", background: INK, color: "#fff", border: "none", borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FONT, transition: "opacity 0.2s" }} onMouseEnter={e => { e.currentTarget.style.opacity = "0.78" }} onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}>Start Growing</button>
                            <button onClick={() => procRef.current?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "13px 26px", background: "transparent", color: INK, border: `1.5px solid ${RULE}`, borderRadius: 100, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: FONT }} onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.28)")} onMouseLeave={e => (e.currentTarget.style.borderColor = RULE)}>See the process</button>
                        </div>
                    </div>
                    <div className="hr" style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: isMobile ? 0 : 10 }}>
                        {STATS.map((s, i) => (
                            <div key={i} style={{ padding: "18px 22px", background: i === 0 ? ACCENT : SURFACE, border: `1px solid ${i === 0 ? "transparent" : RULE}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontFamily: MONO, fontSize: i === 0 ? 32 : 26, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1, color: i === 0 ? "#fff" : INK }}>{s.value}</span>
                                <span style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.4, textAlign: "right", maxWidth: 140, color: i === 0 ? "rgba(255,255,255,0.62)" : INK_FAINT }}>{s.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <MDiv />

            {/* CAPABILITIES */}
            <div ref={capRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "60px 20px" : "96px 60px" }}>
                <SLabel className="cr" text="What We Do" />
                <h2 className="cr" style={{ fontSize: isMobile ? "clamp(28px,7vw,40px)" : "clamp(32px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 40px" }}>Six disciplines.<br /><span style={{ color: INK_FAINT, fontWeight: 400 }}>One integrated system.</span></h2>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 3 }}>
                    {CAPABILITIES.map((c, i) => {
                        const isHov = hovCap === i; return (
                            <div key={i} className="cr" onMouseEnter={() => setHovCap(i)} onMouseLeave={() => setHovCap(null)} style={{ padding: isMobile ? "28px 24px" : "36px 32px", background: isHov ? ACCENT : SURFACE, borderRadius: 16, border: `1px solid ${isHov ? "transparent" : RULE}`, transition: "background 0.28s,border-color 0.28s", cursor: "default" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                    <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, color: isHov ? "rgba(255,255,255,0.45)" : ACCENT, transition: "color 0.28s" }}>{c.n}</span>
                                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: isHov ? "rgba(255,255,255,0.4)" : INK_FAINT, border: `1px solid ${isHov ? "rgba(255,255,255,0.18)" : RULE}`, borderRadius: 100, padding: "3px 10px", transition: "all 0.28s" }}>{c.tag}</span>
                                </div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", color: isHov ? "#fff" : INK, margin: "0 0 10px", transition: "color 0.28s" }}>{c.title}</h3>
                                <p style={{ fontSize: 13, lineHeight: 1.7, color: isHov ? "rgba(255,255,255,0.62)" : INK_MID, margin: 0, transition: "color 0.28s" }}>{c.body}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <MDiv />

            {/* RESULTS */}
            <div ref={resRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "60px 20px" : "96px 60px" }}>
                <SLabel className="rr" text="Client Results" />
                <h2 className="rr" style={{ fontSize: isMobile ? "clamp(28px,7vw,40px)" : "clamp(32px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 40px" }}>Numbers we&apos;re<br /><span style={{ color: INK_FAINT, fontWeight: 400 }}>proud to put our name on.</span></h2>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 3 }}>
                    {RESULTS.map((r, i) => (
                        <div key={i} className="rr" style={{ padding: isMobile ? "28px 24px" : "44px 36px", background: i === 1 ? ACCENT : SURFACE, border: `1px solid ${i === 1 ? "transparent" : RULE}`, borderRadius: 16 }}>
                            <span style={{ display: "block", fontFamily: MONO, fontSize: isMobile ? "clamp(36px,9vw,52px)" : "clamp(44px,4.5vw,60px)", fontWeight: 500, letterSpacing: "-0.05em", lineHeight: 1, color: i === 1 ? "#fff" : INK, marginBottom: 14 }}>{r.stat}</span>
                            <span style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: i === 1 ? "rgba(255,255,255,0.5)" : ACCENT, marginBottom: 10 }}>{r.brand}</span>
                            <span style={{ display: "block", fontSize: 13.5, lineHeight: 1.6, color: i === 1 ? "rgba(255,255,255,0.65)" : INK_MID }}>{r.detail}</span>
                        </div>
                    ))}
                </div>
            </div>

            <MDiv />

            {/* PROCESS */}
            <div ref={procRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "60px 20px" : "96px 60px" }}>
                <SLabel className="pr" text="How We Work" />
                <h2 className="pr" style={{ fontSize: isMobile ? "clamp(28px,7vw,40px)" : "clamp(32px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 40px" }}>No retainer roulette.<br /><span style={{ color: INK_FAINT, fontWeight: 400 }}>Clear milestones, clear ownership.</span></h2>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4,1fr)", gap: 3 }}>
                    {PROCESS.map((step, i) => (
                        <div key={i} className="pr" style={{ padding: isMobile ? "24px 20px" : "36px 28px", background: i % 2 === 0 ? SURFACE : "#fff", border: `1px solid ${RULE}`, borderRadius: 16 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: ACCENT_SOFT, border: `1px solid ${ACCENT_RING}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, color: ACCENT }}>{step.n}</span></div>
                            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{step.period}</div>
                            <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.015em", color: INK, margin: "0 0 8px" }}>{step.title}</h3>
                            <p style={{ fontSize: 12.5, lineHeight: 1.65, color: INK_MID, margin: 0 }}>{step.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            <MDiv />

            {/* CHANNELS */}
            <div ref={chanRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "48px 20px" : "72px 60px" }}>
                <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: isMobile ? 24 : 48, flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
                    <div><SLabel className="ch" text="Channels" /><p className="ch" style={{ fontSize: 14, color: INK_MID, margin: 0, maxWidth: 260 }}>We go where your audience is — not where it&apos;s easiest for us.</p></div>
                    <div className="ch" style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: isMobile ? "100%" : 680 }}>
                        {CHANNELS.map((c, i) => <span key={i} style={{ fontFamily: MONO, fontSize: 11.5, fontWeight: 400, padding: "6px 13px", borderRadius: 100, background: SURFACE, border: `1px solid ${RULE}`, color: "rgba(10,10,10,0.58)" }}>{c}</span>)}
                    </div>
                </div>
            </div>

            <MDiv />

            {/* FAQ */}
            <div ref={faqRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "60px 20px" : "96px 60px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "380px 1fr", gap: isMobile ? 32 : 80 }}>
                    <div>
                        <SLabel className="fr" text="Questions" />
                        <h2 className="fr" style={{ fontSize: isMobile ? "clamp(26px,7vw,36px)" : "clamp(28px,3.2vw,42px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.07, margin: "0 0 14px" }}>Real answers.<br />Not case studies.</h2>
                        <p className="fr" style={{ fontSize: 14, lineHeight: 1.72, color: INK_MID, margin: "0 0 24px" }}>Still have questions? Reach out directly — we respond within one business day.</p>
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

            <MDiv />

            {/* CTA FORM */}
            <div ref={ctaRef} style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "60px 20px 80px" : "96px 60px 130px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 80, alignItems: "start" }}>
                    <div>
                        <div className="tr" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}><span style={{ width: 18, height: 1.5, background: "currentColor", display: "block" }} />Get Started</div>
                        <h2 className="tr" style={{ fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(32px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 16px" }}>Tell us your<br />growth goal.</h2>
                        <p className="tr" style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.76, color: INK_MID, margin: "0 0 32px" }}>Share where you are and where you want to go. We&apos;ll come back with a channel strategy and a realistic path to your number.</p>
                        <div className="tr" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {["Reply within 1 business day", "Free 30-min strategy session", "No obligation, no retainer pressure"].map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: ACCENT_SOFT, border: `1px solid ${ACCENT_RING}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <svg viewBox="0 0 10 10" width={9} height={9} fill="none"><path d="M2 5l2 2 4-4" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <span style={{ fontSize: 13, color: INK_MID, fontWeight: 500 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="tr" style={{ background: SURFACE, border: `1px solid ${RULE}`, borderTop: `3px solid ${ACCENT}`, borderRadius: 18, padding: isMobile ? "28px 24px" : "44px" }}>
                        {sent ? (
                            <div style={{ textAlign: "center", padding: "28px 0" }}>
                                <div style={{ width: 48, height: 48, borderRadius: "50%", background: ACCENT_SOFT, border: `1.5px solid ${ACCENT_RING}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none"><path d="M5 12l5 5L19 7" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                                <h3 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>We&apos;ve got your message.</h3>
                                <p style={{ fontSize: 13, color: INK_MID, margin: 0, lineHeight: 1.65 }}>Expect a reply within one business day with a tailored strategy outline.</p>
                            </div>
                        ) : (
                            <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
                                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 12 }}>
                                    <MField label="Name" placeholder="Jane Smith" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
                                    <MField label="Email" placeholder="jane@company.com" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
                                </div>
                                <div style={{ marginBottom: 12 }}><MField label="Company" placeholder="Acme Inc." value={form.company} onChange={v => setForm(f => ({ ...f, company: v }))} /></div>
                                <div style={{ marginBottom: 20 }}>
                                    <label style={{ fontSize: 11, fontWeight: 600, color: INK_FAINT, display: "block", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>What&apos;s your growth goal?</label>
                                    <textarea value={form.goals} onChange={e => setForm(f => ({ ...f, goals: e.target.value }))} placeholder="Tell us your current channels, monthly spend, target metrics — and the number you're trying to hit." rows={4} style={{ width: "100%", boxSizing: "border-box", background: "#fff", border: `1.5px solid ${RULE}`, borderRadius: 10, padding: "11px 13px", fontSize: 13, color: INK, fontFamily: FONT, resize: "none", outline: "none", transition: "border-color 0.2s", lineHeight: 1.65 }} onFocus={e => (e.currentTarget.style.borderColor = ACCENT)} onBlur={e => (e.currentTarget.style.borderColor = RULE)} />
                                </div>
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

function MDiv() { return (<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px" }}><div style={{ height: 1, background: RULE }} /></div>); }
function SLabel({ text, className }: { text: string; className?: string }) { return (<div className={className} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: INK_FAINT }}><span style={{ width: 18, height: 1.5, background: "currentColor", display: "block" }} />{text}</div>); }
function MField({ label, placeholder, type = "text", value, onChange }: { label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void }) { return (<div><label style={{ fontSize: 11, fontWeight: 600, color: INK_FAINT, display: "block", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</label><input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", boxSizing: "border-box", background: "#fff", border: `1.5px solid ${RULE}`, borderRadius: 10, padding: "10px 13px", fontSize: 13, color: INK, fontFamily: FONT, outline: "none", transition: "border-color 0.2s" }} onFocus={e => (e.currentTarget.style.borderColor = ACCENT)} onBlur={e => (e.currentTarget.style.borderColor = RULE)} /></div>); }