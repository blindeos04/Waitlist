import { NextResponse } from "next/server";
import { getApplicants } from "@/lib/storage";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get("dev_session");

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applicants = getApplicants();

    const headers = [
        "ID",
        "Status",
        "Full Name",
        "Email",
        "Website",
        "Revenue Range",
        "Bottleneck",
        "WhatsApp",
        "Timestamp",
    ];

    const csvContent = [
        headers.join(","),
        ...applicants.map((app) =>
            [
                app.id,
                app.status,
                `"${app.fullName}"`,
                app.email,
                app.website,
                app.revenueRange,
                `"${app.bottleneck.replace(/"/g, '""')}"`,
                app.whatsapp || "",
                app.timestamp,
            ].join(",")
        ),
    ].join("\n");

    return new NextResponse(csvContent, {
        headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": 'attachment; filename="applicants.csv"',
        },
    });
}
