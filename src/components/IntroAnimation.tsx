"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface IntroAnimationProps {
    onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Smoother sequence with overlapping fades
        const timers = [
            setTimeout(() => setStage(1), 500),      // BLIND OS fades in
            setTimeout(() => setStage(2), 3500),     // BLIND OS fades out
            setTimeout(() => setStage(3), 4200),     // Tagline fades in
            setTimeout(() => setStage(4), 7000),     // Tagline fades out
            setTimeout(() => setStage(5), 7800),     // Logo fades in
            setTimeout(() => setStage(6), 11000),    // Logo animates out
            setTimeout(() => setStage(7), 12500),    // Complete
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (stage === 7) {
            onComplete();
        }
    }, [stage, onComplete]);

    return (
        <AnimatePresence>
            {stage < 7 && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-[#030305] flex flex-col items-center justify-center overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    {/* Background gradient glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,1,31,0.1)_0%,_transparent_60%)]" />

                    {/* Animated grid */}
                    <div
                        className="absolute inset-0 opacity-[0.03] animate-grid-move-slow"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px'
                        }}
                    />

                    {/* Content Container - Use absolute center to prevent layout jumps */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center">

                        {/* BLIND OS Title */}
                        <AnimatePresence mode="wait">
                            {stage >= 1 && stage <= 2 && (
                                <motion.div
                                    key="title"
                                    className="absolute inset-0 flex items-center justify-center"
                                    initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                                    animate={{ opacity: stage === 1 ? 1 : 0, filter: "blur(0px)", scale: 1 }}
                                    exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
                                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <h1
                                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white"
                                        style={{
                                            textShadow: '0 0 80px rgba(255,255,255,0.3)',
                                            fontFamily: 'var(--font-syne), sans-serif' // Apply Syne font
                                        }}
                                    >
                                        BLIND OS
                                    </h1>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tagline */}
                        <AnimatePresence mode="wait">
                            {stage >= 3 && stage <= 4 && (
                                <motion.div
                                    key="tagline"
                                    className="absolute inset-0 flex items-center justify-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: stage === 3 ? 1 : 0, y: 0 }}
                                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                >
                                    <p
                                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#9e9a8d] max-w-3xl leading-relaxed font-light"
                                        style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                                    >
                                        Handle your agency hassle free<br className="hidden sm:block" /> like a blind's Life
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Logo */}
                        <AnimatePresence mode="wait">
                            {stage >= 5 && stage <= 6 && (
                                <motion.div
                                    key="logo"
                                    className="absolute inset-0 flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: stage === 5 ? 1 : 0,
                                        scale: stage === 5 ? 1 : 4,
                                        y: stage === 5 ? 0 : -50,
                                        filter: stage === 5 ? "blur(0px)" : "blur(10px)"
                                    }}
                                    exit={{ opacity: 0, scale: 4, y: -50 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                >
                                    <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64">
                                        <Image
                                            src="/images/logo-b.png"
                                            alt="Blind OS"
                                            fill
                                            className="object-contain drop-shadow-[0_0_60px_rgba(212,175,55,0.6)]"
                                            priority
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
