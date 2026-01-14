import { supabase } from "./supabase";

export interface Applicant {
    id?: string;
    fullName: string;
    email: string;
    website: string;
    revenueRange: string;
    bottleneck: string;
    whatsapp?: string;
    status: "new" | "reviewed" | "approved";
    timestamp?: string; // Supabase handles 'created_at' usually, but we keep this for type compat
}

export async function saveApplicant(applicant: Omit<Applicant, "id" | "timestamp" | "status">) {
    const { data, error } = await supabase
        .from("waitlist")
        .insert([
            {
                fullName: applicant.fullName,
                email: applicant.email,
                website: applicant.website,
                revenue_range: applicant.revenueRange, // Maps to DB column snake_case usually
                bottleneck: applicant.bottleneck,
                whatsapp: applicant.whatsapp,
                status: "new",
            },
        ])
        .select();

    if (error) {
        console.error("Supabase error:", error);
        throw new Error("Failed to save applicant");
    }

    return data;
}

export async function getApplicants(): Promise<Applicant[]> {
    const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase error:", error);
        return [];
    }

    // Map back to camelCase if DB is snake_case (typical Supabase pattern)
    // Assuming DB has: full_name, revenue_range, etc. or just storing mixed.
    // simpler to map:
    return (data || []).map((row: any) => ({
        id: row.id,
        fullName: row.fullName || row.full_name,
        email: row.email,
        website: row.website,
        revenueRange: row.revenue_range || row.revenueRange,
        bottleneck: row.bottleneck,
        whatsapp: row.whatsapp,
        status: row.status,
        timestamp: row.created_at,
    }));
}
