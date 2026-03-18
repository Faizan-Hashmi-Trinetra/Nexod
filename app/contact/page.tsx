"use client";
import { useState } from "react";
import Header from "../Header";
import Footer from "../components/Footer";
import { useIsMobile } from "../../hooks/useIsMobile";

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const SERVICES = ["AI Platforms", "Automation Infrastructure", "Growth Systems", "Architecture & Consulting", "Other"];
const BUDGETS = ["$3K – $5K", "$6K – $10K", "> $10K"];
const INFO_ITEMS = [
    { label: "Email", value: "hello@nexod.ai", sub: "We respond within 24 hours", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" /><path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
    { label: "Location", value: "Global & Remote", sub: "Serving clients worldwide", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" /><path d="M12 2C7.03 2 3 6.03 3 11c0 6.25 9 13 9 13s9-6.75 9-13c0-4.97-4.03-9-9-9z" stroke="currentColor" strokeWidth="1.6" /></svg>) },
    { label: "Availability", value: "Mon – Fri, 9am – 6pm", sub: "Multiple time zones", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" });
    const [focused, setFocused] = useState<string | null>(null);
    const [sent, setSent] = useState(false);
    const isMobile = useIsMobile();

    const inputStyle = (name: string): React.CSSProperties => ({
        width: "100%", background: "transparent", border: "none",
        borderBottom: `1.5px solid ${focused === name ? "#0a0a0a" : "rgba(0,0,0,0.15)"}`,
        outline: "none", fontSize: "15px", fontFamily: FONT, color: "#0a0a0a",
        padding: "12px 0", transition: "border-color 0.25s ease", boxSizing: "border-box",
    });

    return (
        <main className="relative bg-white text-black">
            <div style={{ minHeight: "100vh", fontFamily: FONT, padding: isMobile ? "0 20px" : "0px 94px" }}>
                <Header />
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "100px 0 60px" : "160px 48px 80px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: "28px" }}>
                        <span style={{ display: "block", width: "24px", height: "1px", background: "currentColor" }} />
                        Contact Us
                    </div>
                    <h1 style={{ fontSize: isMobile ? "clamp(36px,10vw,56px)" : "clamp(48px,6vw,88px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, color: "#0a0a0a", margin: "0 0 20px", maxWidth: "600px" }}>
                        Let&apos;s Start a<br />
                        <span style={{ color: "rgba(0,0,0,0.18)" }}>Conversation.</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? "15px" : "17px", lineHeight: 1.75, color: "rgba(0,0,0,0.5)", maxWidth: "420px", margin: 0, fontWeight: 400 }}>
                        Tell us about your project and we'll find the best way to help you achieve your goals.
                    </p>
                </div>

                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 0 80px" : "0 48px 160px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr", gap: isMobile ? "40px" : "80px", alignItems: "start" }}>
                    {/* Info */}
                    <div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1px", marginBottom: "32px" }}>
                            {INFO_ITEMS.map((item) => (
                                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#0a0a0a", background: "#fff" }}>{item.icon}</div>
                                    <div>
                                        <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: "3px" }}>{item.label}</div>
                                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0a0a0a", marginBottom: "2px" }}>{item.value}</div>
                                        <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.4)" }}>{item.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: "22px 24px", background: "#0a0a0a", borderRadius: "14px", color: "#fff" }}>
                            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "8px", opacity: 0.5, textTransform: "uppercase" }}>Quick Response</div>
                            <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }}>Our team typically responds within 24 hours. For urgent inquiries, please mention it in your message.</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "20px", padding: isMobile ? "32px 24px" : "56px 52px" }}>
                        {sent ? (
                            <div style={{ textAlign: "center", padding: "32px 0" }}>
                                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                                <h3 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px" }}>Message Sent</h3>
                                <p style={{ fontSize: "14px", color: "rgba(0,0,0,0.5)", lineHeight: 1.6, margin: 0 }}>We'll be in touch within 24 hours.</p>
                            </div>
                        ) : (
                            <>
                                <h2 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", color: "#0a0a0a", margin: "0 0 32px" }}>Send a Message</h2>
                                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
                                    {[["Full Name", "name", "John Doe"], ["Email", "email", "john@company.com"]].map(([label, name, placeholder]) => (
                                        <div key={name}>
                                            <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", display: "block", marginBottom: "8px" }}>{label}</label>
                                            <input placeholder={placeholder} value={(form as Record<string, string>)[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} onFocus={() => setFocused(name)} onBlur={() => setFocused(null)} style={inputStyle(name)} />
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginBottom: "24px" }}>
                                    <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", display: "block", marginBottom: "8px" }}>Company <span style={{ opacity: 0.5, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(Optional)</span></label>
                                    <input placeholder="Your company name" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} style={inputStyle("company")} />
                                </div>
                                <div style={{ marginBottom: "24px" }}>
                                    <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", display: "block", marginBottom: "10px" }}>Service Interest</label>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                        {SERVICES.map(s => (
                                            <button key={s} onClick={() => setForm(f => ({ ...f, service: s }))}
                                                style={{ padding: "7px 14px", borderRadius: "100px", border: `1.5px solid ${form.service === s ? "#0a0a0a" : "rgba(0,0,0,0.12)"}`, background: form.service === s ? "#0a0a0a" : "transparent", color: form.service === s ? "#fff" : "rgba(0,0,0,0.6)", fontSize: "12px", fontWeight: 600, fontFamily: FONT, cursor: "pointer", transition: "all 0.2s ease" }}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ marginBottom: "24px" }}>
                                    <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", display: "block", marginBottom: "10px" }}>Budget in USD</label>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        {BUDGETS.map(b => (
                                            <button key={b} onClick={() => setForm(f => ({ ...f, budget: b }))}
                                                style={{ flex: 1, padding: "9px 0", borderRadius: "10px", border: `1.5px solid ${form.budget === b ? "#0a0a0a" : "rgba(0,0,0,0.12)"}`, background: form.budget === b ? "#0a0a0a" : "transparent", color: form.budget === b ? "#fff" : "rgba(0,0,0,0.6)", fontSize: "12px", fontWeight: 600, fontFamily: FONT, cursor: "pointer", transition: "all 0.2s ease" }}>
                                                {b}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ marginBottom: "32px" }}>
                                    <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", display: "block", marginBottom: "8px" }}>Message</label>
                                    <textarea placeholder="Tell us about your project, goals, and timeline..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} rows={4}
                                        style={{ ...inputStyle("message"), resize: "none", lineHeight: 1.7, borderBottom: "none", border: `1.5px solid ${focused === "message" ? "#0a0a0a" : "rgba(0,0,0,0.12)"}`, borderRadius: "12px", padding: "14px 16px", transition: "border-color 0.25s ease" }} />
                                </div>
                                <button onClick={(e) => { e.preventDefault(); setSent(true); }}
                                    style={{ width: "100%", padding: "16px 32px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: "100px", fontSize: "14px", fontWeight: 700, fontFamily: FONT, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "opacity 0.2s ease" }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                                    Send Message
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </button>
                                <p style={{ textAlign: "center", fontSize: "11px", color: "rgba(0,0,0,0.3)", margin: "16px 0 0" }}>No commitment required · Response within 24 hours</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}