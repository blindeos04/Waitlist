import { Container } from "@/components/ui/Container";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12 text-sm text-muted-foreground">
            <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <p>&copy; {new Date().getFullYear()} Blind OS. Infrastructure for Agencies.</p>
                <div className="flex gap-6">
                    {/* Add links if needed */}
                </div>
            </Container>
        </footer>
    );
}
