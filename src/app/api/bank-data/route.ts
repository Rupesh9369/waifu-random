// src/app/api/bank/random/route.ts
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// Path to your JSON file
const DATA_FILE = path.join(process.cwd(), "src/app/api/bank/bank_data.json");

// Cache data in memory (fast on Vercel)
let bankData: any[] = [];

async function loadBankData() {
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    bankData = JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to load bank_data.json", error);
    bankData = [];
  }
}

// Load on first request
if (bankData.length === 0) {
  await loadBankData();
}

export async function GET() {
  if (bankData.length === 0) {
    return NextResponse.json(
      { error: "Bank data not available" },
      { status: 500 }
    );
  }

  // Return 1 random bank user
  const randomUser = bankData[Math.floor(Math.random() * bankData.length)];

  return NextResponse.json(randomUser);
}

// Optional: Force fresh data every time (good for testing)
export const dynamic = "force-dynamic";
