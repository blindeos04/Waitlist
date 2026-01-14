import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "applicants.json");

export interface Applicant {
    id: string;
    fullName: string;
    email: string;
    website: string;
    revenueRange: string;
    bottleneck: string;
    whatsapp?: string;
    status: "new" | "reviewed" | "approved";
    timestamp: string;
}

function ensureDataFile() {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]), "utf-8");
    }
}

export function saveApplicant(applicant: Omit<Applicant, "id" | "timestamp" | "status">) {
    ensureDataFile();
    const applicants = getApplicants();

    const newApplicant: Applicant = {
        ...applicant,
        id: crypto.randomUUID(),
        status: "new",
        timestamp: new Date().toISOString(),
    };

    applicants.push(newApplicant);
    fs.writeFileSync(DATA_FILE, JSON.stringify(applicants, null, 2), "utf-8");
    return newApplicant;
}

export function getApplicants(): Applicant[] {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}
