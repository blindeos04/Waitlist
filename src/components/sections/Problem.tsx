"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { useInView, motion } from "framer-motion";

function Counter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-center hover:border-primary/50 transition-colors group">
            <div className="text-4xl sm:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {count}{suffix}
            </div>
            <div className="text-xs text-muted-foreground tracking-widest uppercase">{label}</div>
        </div>
    );
}

export function Problem() {
    const stats = [
        { value: 87, suffix: "%", label: "REPLY RATE INCREASE" },
        { value: 320, suffix: "%", label: "MORE MEETINGS BOOKED" }, // 3.2x as percentage
        { value: 0, suffix: "", label: "MANUAL FOLLOW-UPS" },
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Moving Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.03] animate-grid-move"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="absolute inset-0 gradient-radial pointer-events-none" />

            <Container className="relative z-10">
                {/* Stats Row */}
                <FadeIn className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, i) => (
                            <Counter key={i} value={stat.value} label={stat.label} suffix={stat.suffix} />
                        ))}
                    </div>
                </FadeIn>

                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <FadeIn delay={0.1}>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
                            Your sales team is doing <span className="text-primary">$500/hour work</span> at <span className="text-accent">$50/hour tasks.</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Lead research. Cold outreach. Follow-up sequences. Calendar coordination.
                            <br /><br />
                            <span className="text-foreground font-medium">Blind OS handles all of it</span> — so your team only speaks to qualified buyers.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                "Leads go cold within hours",
                                "Follow-ups don't happen consistently",
                                "Sales teams waste time on unqualified calls",
                                "Calendars turn into chaos"
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-accent/50 hover:bg-card/80 transition-all group">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-accent group-hover:animate-pulse" />
                                    <p className="text-sm font-medium text-foreground">{item}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                <FadeIn delay={0.3} className="mt-20 text-center">
                    <p className="text-xl font-medium text-primary">
                        Blind OS replaces this entire chain with one system.
                    </p>
                </FadeIn>
            </Container>
        </section>
    );
}
