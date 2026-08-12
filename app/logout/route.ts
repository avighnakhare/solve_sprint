import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST() {
  await destroySession();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002";
  return NextResponse.redirect(new URL("/", appUrl), { status: 303 });
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Logout must be initiated via HTTP POST." },
    { status: 405 }
  );
}
