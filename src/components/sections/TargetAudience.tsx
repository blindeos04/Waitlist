"use client";

import { Container } from "@/components/ui/Container";
import { Check, X } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export function TargetAudience() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 gradient-top pointer-events-none" />

            <Container className="relative z-10">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Built For */}
                    <FadeIn className="h-full">
                        <div className="h-full p-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm hover:border-primary/50 transition-colors">
                            <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                                    <Check className="h-5 w-5" />
                                </span>
                                Built for
                            </h3>
                            <ul className="space-y-5">
                                {[
                                    "Agencies selling high-ticket services",
                                    "Teams already doing outreach",
                                    "Operators who value leverage"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                        <span className="text-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>

                    {/* Not Built For */}
                    <FadeIn delay={0.2} className="h-full">
                        <div className="h-full p-8 rounded-2xl border border-border bg-card/30 hover:bg-card/50 transition-colors">
                            <h3 className="text-xl font-bold text-muted-foreground mb-8 flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                                    <X className="h-5 w-5" />
                                </span>
                                Not built for
                            </h3>
                            <ul className="space-y-5">
                                {[
                                    "Beginners",
                                    "Course sellers",
                                    "People 'just testing'",
                                    "Anyone uncomfortable letting AI talk to prospects"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <X className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>
                </div>
            </Container>
        </section>
    );
}
