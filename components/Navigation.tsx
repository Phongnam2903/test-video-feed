"use client";
import { useState } from "react";
interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}
const navItems: NavItem[] = [
    {
        id: "home",
        label: "Trang chủ",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
        ),
    },
    {
        id: "explore",
        label: "Khám phá",
        icon: (
            <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
    },
    {
        id: "profile",
        label: "Hồ sơ",
        icon: (
            <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
];
export default function Navigation() {
    const [active, setActive] = useState("home");
    return (
        <>
            {/* ── Left Sidebar (PC only, md and above) ── */}
            <nav
                aria-label="Sidebar navigation"
                className="hidden md:flex fixed left-0 top-0 h-full w-20 flex-col items-center justify-center gap-8 z-50
                   bg-black/60 backdrop-blur-md border-r border-white/10"
            >
                {/* Logo mark */}
                <div className="absolute top-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-lg">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    </div>
                </div>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        id={`nav-sidebar-${item.id}`}
                        aria-label={item.label}
                        onClick={() => setActive(item.id)}
                        className={`group flex flex-col items-center gap-1 transition-all duration-200 ${active === item.id ? "text-white scale-110" : "text-white/40 hover:text-white/80 hover:scale-105"
                            }`}
                    >
                        <span
                            className={`flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-200 ${active === item.id
                                    ? "bg-gradient-to-br from-pink-500 to-violet-600 shadow-lg shadow-pink-500/30"
                                    : "group-hover:bg-white/10"
                                }`}
                        >
                            {item.icon}
                        </span>
                        <span className="text-[10px] font-medium leading-none">
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>
            {/* ── Bottom Bar (Mobile only, below md) ── */}
            <nav
                aria-label="Bottom navigation"
                className="md:hidden fixed bottom-0 left-0 right-0 z-50
                   bg-black/80 backdrop-blur-md border-t border-white/10
                   flex items-center justify-around px-4 py-2 safe-bottom"
            >
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        id={`nav-bottom-${item.id}`}
                        aria-label={item.label}
                        onClick={() => setActive(item.id)}
                        className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200 ${active === item.id
                                ? "text-white"
                                : "text-white/40 hover:text-white/70"
                            }`}
                    >
                        <span
                            className={`transition-transform duration-200 ${active === item.id ? "scale-110" : ""
                                }`}
                        >
                            {item.icon}
                        </span>
                        <span
                            className={`text-[10px] font-medium transition-all duration-200 ${active === item.id
                                    ? "text-white"
                                    : "text-white/40"
                                }`}
                        >
                            {item.label}
                        </span>
                        {active === item.id && (
                            <span className="absolute -bottom-0 w-1 h-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-600" />
                        )}
                    </button>
                ))}
            </nav>
        </>
    );
}