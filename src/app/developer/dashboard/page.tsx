import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getApplicants } from "@/lib/storage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DeveloperDashboard() {
    const cookieStore = await cookies();
    const session = cookieStore.get("dev_session");

    if (!session) {
        redirect("/developer/login");
    }

    const applicants = getApplicants();

    return (
        <div className="min-h-screen bg-background p-8">
            <Container>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Applicant Dashboard</h1>
                    <Button asChild variant="outline">
                        <a href="/api/export" target="_blank" rel="noopener noreferrer">
                            Export CSV
                        </a>
                    </Button>
                </div>

                <div className="rounded-md border border-border bg-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted text-muted-foreground uppercase">
                                <tr>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Revenue</th>
                                    <th className="px-6 py-3">Website</th>
                                    <th className="px-6 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicants.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">
                                            No applicants yet.
                                        </td>
                                    </tr>
                                ) : (
                                    applicants.map((app) => (
                                        <tr key={app.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-foreground">{app.fullName}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{app.email}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{app.revenueRange}</td>
                                            <td className="px-6 py-4">
                                                <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                    Link
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {new Date(app.timestamp).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </div>
    );
}
