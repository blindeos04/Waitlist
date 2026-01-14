import { NextResponse } from "next/server";
import { saveApplicant } from "@/lib/storage";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, email, website, revenueRange, bottleneck, whatsapp } = body;

        // Basic server-side validation
        if (!fullName || !email || !website || !revenueRange || !bottleneck) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await saveApplicant({
            fullName,
            email,
            website,
            revenueRange,
            bottleneck,
            whatsapp,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
