import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const fakeToken = "mock_access_token_" + Date.now();
  const role = email === "admin@example.com" ? "ADMIN" : "USER";

  return NextResponse.json({
    access_token: fakeToken,
    role,
  });
}
