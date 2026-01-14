"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
    const [btnText, setBtnText] = useState("Apply for Early Access");
    const [agencyCount, setAgencyCount] = useState(123);
    const controls = useAnimation();

    // Agency Counter Logic: +1 every 12 hours, reset at 1000
    useEffect(() => {
        const baseCount = 123;
        const maxCount = 1000;
        const msPerIncrement = 12 * 60 * 60 * 1000; // 12 hours
        // Use a fixed start date or epoch to keep it consistent across renders/reloads
        // For simulation, we can use Date.now() but to make it consistent for the user "every 12 hours"
        // we can just base it on total hours since a fixed epoch.
        const epoch = new Date("2024-01-01").getTime();
        const now = Date.now();
        const diff = now - epoch;

        let increments = Math.floor(diff / msPerIncrement);
        let currentCount = baseCount + increments;

        // Reset logic: wrap around 1000 back to 123
        // (currentCount - baseCount) % (maxCount - baseCount) + baseCount
        const range = maxCount - baseCount;
        currentCount = baseCount + (increments % range);

        setAgencyCount(currentCount);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#050508]">
            {/* GRADIENT GLOW BACKGROUNDS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1000px] h-[70vh] max-h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(128,1,31,0.12)_0%,_transparent_60%)] pointer-events-none" />
            <div className="absolute top-0 left-0 w-[40%] h-[40%] max-w-[500px] max-h-[500px] bg-[radial-gradient(ellipse_at_top_left,_rgba(158,154,141,0.06)_0%,_transparent_60%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[40%] h-[40%] max-w-[500px] max-h-[500px] bg-[radial-gradient(ellipse_at_top_right,_rgba(128,1,31,0.05)_0%,_transparent_60%)] pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 lg:h-48 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none z-20" />

            {/* VISIBLE MOVING GRID */}
            <div
                className="absolute inset-0 opacity-[0.15] animate-grid-move pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* GLOWING WHITE CIRCLE (CSS) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[90%] h-[90%] xs:w-[90vw] xs:h-[90vw] sm:w-[500px] sm:h-[500px] rounded-full border border-white/20 shadow-[0_0_100px_rgba(255,255,255,0.1)] opacity-40 pointer-events-none animate-pulse-slow z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[88%] h-[88%] xs:w-[88vw] xs:h-[88vw] sm:w-[490px] sm:h-[490px] rounded-full border border-white/10 opacity-30 pointer-events-none z-0" />

            {/* CENTER Content */}
            <Container className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center gap-4 sm:gap-6 lg:gap-8 py-16 sm:py-20 px-4">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/25 text-[10px] sm:text-sm font-medium text-accent backdrop-blur-sm shadow-[0_0_25px_-5px_rgba(128,1,31,0.4)]">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent shadow-[0_0_10px_3px_rgba(128,1,31,0.6)] animate-pulse" />
                        Early Access — Limited Spots
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="flex flex-col gap-3 sm:gap-4 lg:gap-5 items-center max-w-3xl mt-4 sm:mt-8 lg:mt-12"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                        Stop chasing.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#cc2244] to-accent">Start closing.</span>
                    </h1>
                    <p className="max-w-xl text-sm sm:text-base md:text-lg lg:text-xl text-[#888] leading-relaxed px-2">
                        Autonomous AI that books qualified meetings. You show up. They're ready to buy.
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-primary font-medium tracking-wide">
                        Not a CRM. Not a lead list. Not another outreach tool.
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-2 sm:mt-4"
                >
                    <Link
                        href="#early-access"
                        onMouseEnter={() => setBtnText("LETS GO!!")}
                        onMouseLeave={() => setBtnText("Apply for Early Access")}
                        className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-accent to-[#a01535] text-white font-bold text-sm sm:text-lg transition-all duration-300 shadow-[0_0_50px_-10px_rgba(128,1,31,0.8)] hover:shadow-[0_0_80px_-5px_rgba(128,1,31,1)] hover:scale-105 min-w-[220px]"
                    >
                        <motion.span
                            key={btnText}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {btnText}
                        </motion.span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex -space-x-1.5 sm:-space-x-2">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/20 border-2 border-[#0a0a0a]" />
                            ))}
                        </div>
                        <span className="text-[10px] sm:text-sm text-[#666]">{agencyCount} agencies joined</span>
                    </div>
                </motion.div>

                {/* Process Flow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.6 }}
                    className="mt-2 sm:mt-4"
                >
                    <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-3 lg:gap-4 text-[9px] sm:text-xs lg:text-sm px-3 sm:px-6 py-1.5 sm:py-3 rounded-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
                        {['Leads', 'AI Qualify', 'Outreach'].map((step) => (
                            <span key={step} className="flex items-center gap-1 sm:gap-2 text-[#555]">
                                <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-primary/40" />
                                {step}
                                <span className="text-[#333] ml-0.5">→</span>
                            </span>
                        ))}
                        <span className="flex items-center gap-1 sm:gap-2 text-accent font-semibold">
                            <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(128,1,31,0.5)]" />
                            Booked
                        </span>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 text-[#444]"
                >
                    <span className="text-[8px] sm:text-xs tracking-widest uppercase">Scroll</span>
                    <div className="w-4 h-6 sm:w-6 sm:h-10 rounded-full border border-[#333] flex justify-center pt-1 sm:pt-2">
                        <div className="w-0.5 h-1.5 sm:w-1.5 sm:h-3 rounded-full bg-gradient-to-b from-[#555] to-transparent animate-bounce" />
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
