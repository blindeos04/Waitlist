"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Target, Headphones, Send, Calendar, CheckCircle } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            icon: Target,
            number: "01",
            title: "Detect",
            description: "AI identifies high-intent prospects matching your ICP",
        },
        {
            icon: Headphones,
            number: "02",
            title: "Qualify",
            description: "Filter out time-wasters automatically",
        },
        {
            icon: Send,
            number: "03",
            title: "Engage",
            description: "Multi-channel dynamic outreach",
        },
        {
            icon: Calendar,
            number: "04",
            title: "Schedule",
            description: "Handle timezone & availability",
        },
        {
            icon: CheckCircle,
            number: "05",
            title: "Booked",
            description: "You get notified. Meeting locked.",
        },
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 gradient-radial pointer-events-none opacity-50" />

            <Container className="relative z-10">
                <div className="mb-16 text-center">
                    <FadeIn>
                        <p className="text-sm text-primary tracking-widest mb-4">HOW IT WORKS</p>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                            Five steps to <span className="text-accent">booked meetings</span>
                        </h2>
                    </FadeIn>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {steps.map((step, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className={`relative p-6 rounded-2xl border transition-all duration-300 group
                ${i === steps.length - 1
                                    ? 'border-accent/50 bg-accent/5 hover:border-accent hover:bg-accent/10'
                                    : 'border-border bg-card/50 hover:border-primary/50 hover:bg-card'
                                }`}>
                                {/* Connector Line */}
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-border group-hover:bg-primary/50 transition-colors" />
                                )}

                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors
                  ${i === steps.length - 1 ? 'bg-accent/20 text-accent' : 'bg-primary/10 text-primary'}`}>
                                    <step.icon className="w-6 h-6" />
                                </div>

                                <p className="text-xs text-muted-foreground mb-1">{step.number}</p>
                                <h3 className={`text-lg font-bold mb-2 ${i === steps.length - 1 ? 'text-accent' : 'text-foreground'}`}>
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.5} className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary">
                        <span className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
                            ))}
                        </span>
                        <span>Fully autonomous — no manual work</span>
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
}
