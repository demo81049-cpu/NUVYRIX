import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJsonArray<T>(fileName: string): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(dataDir, fileName);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeJsonArray<T>(fileName: string, rows: T[]) {
  await ensureDataDir();
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(rows, null, 2), "utf8");
}

export type PaymentRecord = {
  id: string;
  createdAt: string;
  orderId: string;
  paymentId: string;
  amountPaise: number;
  amountInr: string;
  currency: string;
  reason: string;
  name: string;
  email: string;
  phone: string;
};

export type ContactRecord = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  type: string;
  message: string;
};

export async function savePayment(record: Omit<PaymentRecord, "id" | "createdAt">) {
  const rows = await readJsonArray<PaymentRecord>("payments.json");
  const entry: PaymentRecord = {
    id: `pay_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...record,
  };
  rows.unshift(entry);
  await writeJsonArray("payments.json", rows);
  return entry;
}

export async function saveContact(record: Omit<ContactRecord, "id" | "createdAt">) {
  const rows = await readJsonArray<ContactRecord>("contacts.json");
  const entry: ContactRecord = {
    id: `contact_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...record,
  };
  rows.unshift(entry);
  await writeJsonArray("contacts.json", rows);
  return entry;
}
