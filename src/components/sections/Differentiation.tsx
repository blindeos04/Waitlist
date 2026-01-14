"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function Differentiation() {
    const features = [
        { title: "No SDR team", benefit: "Save $80K+/year" },
        { title: "No lead lists", benefit: "Real-time signals" },
        { title: "No CRM chaos", benefit: "Self-organizing" },
        { title: "No missed follow-ups", benefit: "100% execution" },
    ];

    return (
        <section className="py-24 bg-muted/20 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 grid-pattern pointer-events-none" />

            {/* Floating 3D-like element */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-accent/20 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-accent/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center text-2xl font-bold text-accent">B</div>
                </div>
            </div>

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column */}
                    <FadeIn>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
                            One system.
                            <br />
                            <span className="text-muted-foreground">Zero busywork.</span>
                        </h2>
                    </FadeIn>

                    {/* Right Column - Features List */}
                    <div className="space-y-3">
                        {features.map((feature, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all">
                                    <span className="text-muted-foreground">{feature.title}</span>
                                    <span className="text-sm font-medium text-accent">{feature.benefit}</span>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>

                <FadeIn delay={0.4} className="mt-16">
                    <p className="text-xl text-foreground">
                        Blind OS doesn't give you work. <span className="text-accent font-medium">It removes it.</span>
                    </p>
                </FadeIn>
            </Container>
        </section>
    );
}
