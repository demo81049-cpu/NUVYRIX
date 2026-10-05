import { NextResponse } from "next/server";
import {
  adminCookieName,
  adminSessionMaxAge,
  createAdminSessionToken,
  isAdminConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured." },
      { status: 503 },
    );
  }

  let parsedBody: unknown;
  try {
    parsedBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Enter your username and password." },
      { status: 400 },
    );
  }

  if (
    !parsedBody ||
    typeof parsedBody !== "object" ||
    Array.isArray(parsedBody)
  ) {
    return NextResponse.json(
      { error: "Enter your username and password." },
      { status: 400 },
    );
  }

  const body = parsedBody as { username?: unknown; password?: unknown };
  const username =
    typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (
    !username ||
    !password ||
    username.length > 128 ||
    password.length > 1024 ||
    !verifyAdminCredentials(username, password)
  ) {
    return NextResponse.json(
      { error: "Incorrect username or password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(adminCookieName, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: adminSessionMaxAge,
  });

  return response;
}
