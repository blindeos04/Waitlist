"use client";

import { Navbar } from "@/components/layout/Navbar";
import { EarlyAccessForm } from "@/components/sections/EarlyAccessForm";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function WaitlistPage() {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col justify-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <EarlyAccessForm />
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
