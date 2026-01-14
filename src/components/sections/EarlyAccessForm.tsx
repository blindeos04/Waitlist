"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

export function EarlyAccessForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            alert("Error submitting form.");
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <section id="early-access" className="py-32 bg-background relative overflow-hidden flex items-center justify-center min-h-[60vh]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,1,31,0.1)_0%,_transparent_60%)] pointer-events-none" />

                <Container className="relative z-10 max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="text-4xl text-accent"
                            >
                                ✓
                            </motion.span>
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
                        >
                            Welcome to the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#cc2244] to-accent">
                                Future of Money Flow
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="text-lg text-muted-foreground mb-6"
                        >
                            Your application has been received. <br />
                            <span className="text-primary font-medium">We will reach out soon if you meet our requirements.</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                        >
                            <Button variant="ghost" onClick={() => setSuccess(false)} className="text-muted-foreground hover:text-white">
                                Return to home
                            </Button>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>
        );
    }

    return (
        <section id="early-access" className="py-24 bg-muted/10 grid-pattern relative">
            {/* Visible Moving Grid Background */}
            <motion.div
                className="absolute inset-0 opacity-[0.05]"
                animate={{ x: [0, 50, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="absolute inset-0 gradient-top pointer-events-none" />

            <Container className="relative z-10 max-w-2xl">
                <div className="mb-12 text-center">
                    <FadeIn>
                        <p className="text-sm text-accent tracking-widest mb-4">EARLY ACCESS</p>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
                            Apply for Early Access
                        </h2>
                        <p className="text-muted-foreground">
                            Join the waitlist. We manually vet every agency to ensure Blind OS is the right fit.
                        </p>
                    </FadeIn>
                </div>

                <FadeIn delay={0.2}>
                    <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors">
                        <CardContent className="pt-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                                            Full Name <span className="text-accent">*</span>
                                        </label>
                                        <Input id="fullName" name="fullName" required placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                                            Email <span className="text-accent">*</span>
                                        </label>
                                        <Input id="email" name="email" type="email" required placeholder="john@gmail.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="website" className="text-sm font-medium text-foreground">
                                        Agency Website / LinkedIn <span className="text-accent">*</span>
                                    </label>
                                    <Input id="website" name="website" required placeholder="https://..." />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="revenueRange" className="text-sm font-medium text-foreground">
                                        Monthly Revenue Range <span className="text-accent">*</span>
                                    </label>
                                    <Select id="revenueRange" name="revenueRange" required defaultValue="">
                                        <option value="" disabled>Select revenue range</option>
                                        <option value="<$10k">Less than $10k</option>
                                        <option value="$10k-$50k">$10k - $50k</option>
                                        <option value="$50k-$100k">$50k - $100k</option>
                                        <option value="$100k+">$100k+</option>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="bottleneck" className="text-sm font-medium text-foreground">
                                        Biggest bottleneck in your lead → meeting process <span className="text-accent">*</span>
                                    </label>
                                    <Textarea id="bottleneck" name="bottleneck" required placeholder="e.g. Leads ghosting after initial reply..." />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
                                        WhatsApp Number <span className="text-accent">*</span>
                                    </label>
                                    <Input id="whatsapp" name="whatsapp" required placeholder="+1..." />
                                </div>

                                <Button type="submit" size="lg" className="w-full text-lg h-14 shadow-[0_0_30px_-10px_rgba(128,1,31,0.5)]" disabled={loading}>
                                    {loading ? "Submitting..." : "Apply for Early Access →"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </FadeIn>
            </Container>
        </section>
    );
}
