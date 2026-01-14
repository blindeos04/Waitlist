"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Differentiation } from "@/components/sections/Differentiation";
import { TargetAudience } from "@/components/sections/TargetAudience";
import { EarlyAccessForm } from "@/components/sections/EarlyAccessForm";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

const IntroAnimation = dynamic(
    () => import("@/components/IntroAnimation").then((mod) => ({ default: mod.IntroAnimation })),
    { ssr: false }
);

export default function HomePage() {
    const [showIntro, setShowIntro] = useState(true);
    const [showContent, setShowContent] = useState(false);

    const handleIntroComplete = () => {
        setShowIntro(false);
        setShowContent(true);
    };

    return (
        <>
            {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

            {showContent && (
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="min-h-screen"
                >
                    <Navbar />
                    <Hero />
                    <Problem />
                    <HowItWorks />
                    <Differentiation />
                    <TargetAudience />
                    <EarlyAccessForm />
                    <Footer />
                </motion.main>
            )}
        </>
    );
}
