import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <Container className="flex h-14 sm:h-16 items-center justify-between px-4">
                <Link href="/" className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                    BLIND OS
                </Link>
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Developer Access Button */}
                    <Button size="sm" variant="ghost" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground" asChild>
                        <Link href="/developer/login">Developer</Link>
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs sm:text-sm" asChild>
                        <Link href="#early-access">Early Access</Link>
                    </Button>
                </div>
            </Container>
        </nav>
    );
}
