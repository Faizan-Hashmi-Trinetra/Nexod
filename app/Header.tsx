"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NAV_LINKS: { label: string; href: string }[] = [
    { label: "Services", href: "#services-section" },
    { label: "Why Us", href: "#why-section" },
    // { label: "Clients", href: "#clients-section" },
    { label: "Partners", href: "#partners-section" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handle = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handle);
        return () => window.removeEventListener("scroll", handle);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const handleNav = (href: string) => {
        setMenuOpen(false);
        if (href === "#") return;
        if (window.location.pathname !== "/") {
            router.push("/" + href);
            return;
        }
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
    };

    return (
        <>
            <div className="fixed top-5 w-[85%] z-[99999] flex justify-center">
                <div className={`
                    w-full max-w-7xl rounded-full transition-all duration-500
                    backdrop-blur-2xl border border-black/10
                    ${scrolled ? "bg-white/50 shadow-[0_15px_50px_rgba(0,0,0,0.08)]" : "bg-white/60"}
                `}>
                    <div className="flex items-center justify-between px-6 md:px-10 py-3 md:py-4">

                        {/* Logo */}
                        <div
                            className="flex items-center gap-2.5 md:gap-3 font-semibold text-base md:text-lg tracking-tight cursor-pointer"
                            onClick={() => { setMenuOpen(false); router.push("/"); }}
                        >
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-black flex items-center justify-center text-sm">
                                N
                            </div>
                            Nexod
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
                            {NAV_LINKS.map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    onClick={(e) => { e.preventDefault(); handleNav(href); }}
                                    className="relative group"
                                >
                                    {label}
                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                                </a>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <button
                            onClick={() => router.push("/contact")}
                            className="hidden md:block px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:scale-105 transition-all duration-300"
                        >
                            Contact
                        </button>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <span className={`block h-[1.5px] bg-black transition-all duration-300 origin-center ${menuOpen ? "w-5 rotate-45 translate-y-[5px]" : "w-5"}`} />
                            <span className={`block h-[1.5px] bg-black transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-5"}`} />
                            <span className={`block h-[1.5px] bg-black transition-all duration-300 origin-center ${menuOpen ? "w-5 -rotate-45 -translate-y-[5px]" : "w-5"}`} />
                        </button>

                    </div>
                </div>
            </div>

            {/* Mobile full-screen menu */}
            <div
                className="md:hidden fixed inset-0 z-[99997] bg-white"
                style={{
                    opacity: menuOpen ? 1 : 0,
                    pointerEvents: menuOpen ? "auto" : "none",
                    transition: "opacity 0.4s ease",
                }}
            >
                {/* Subtle grain */}
                <div className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
                />

                <div className="relative z-10 flex flex-col h-full px-8 pt-32 pb-10">

                    {/* Nav links */}
                    <nav className="flex flex-col flex-1">
                        {NAV_LINKS.map(({ label, href }, i) => (
                            <button
                                key={label}
                                onClick={() => handleNav(href)}
                                className="text-left py-5 group"
                                style={{
                                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                                    transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                                    opacity: menuOpen ? 1 : 0,
                                    transition: `transform 0.5s ease ${i * 70}ms, opacity 0.5s ease ${i * 70}ms`,
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <span style={{
                                        fontSize: "clamp(28px, 8vw, 40px)",
                                        fontWeight: 800,
                                        letterSpacing: "-0.035em",
                                        color: "#0a0a0a",
                                        lineHeight: 1,
                                    }}>
                                        {label}
                                    </span>
                                    <svg viewBox="0 0 16 16" width={16} height={16} fill="none"
                                        style={{ opacity: 0.25, flexShrink: 0 }}>
                                        <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </nav>

                    {/* Bottom CTA */}
                    <div
                        style={{
                            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                            opacity: menuOpen ? 1 : 0,
                            transition: `transform 0.5s ease ${NAV_LINKS.length * 70 + 60}ms, opacity 0.5s ease ${NAV_LINKS.length * 70 + 60}ms`,
                        }}
                    >
                        <button
                            onClick={() => { setMenuOpen(false); router.push("/contact"); }}
                            className="w-full py-4 bg-black text-white rounded-full text-sm font-semibold tracking-wide mb-4"
                        >
                            Contact Us
                        </button>
                        <p className="text-center text-xs text-black/30">
                            hello@nexod.ai
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}