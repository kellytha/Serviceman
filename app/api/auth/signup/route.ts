import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SignJWT } from "jose";

function validateNigerianPhone(phoneNumber: string): boolean {
  // Remove any spaces, hyphens, or parentheses
  const cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');

  // Check if it starts with 0 or +234 and has exactly 11 digits
  const phoneRegex = /^(0|\+234)[0-9]{10}$/;
  return phoneRegex.test(cleanPhone);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, password, fullName, role, category } = body;

    if (!phoneNumber || !password || !fullName || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!validateNigerianPhone(phoneNumber)) {
      return NextResponse.json({ error: "Invalid Nigerian phone number format" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { phoneNumber } });
    if (existingUser) {
      return NextResponse.json({ error: "Phone number already in use" }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const newUser = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.create({
        data: {
          phoneNumber,
          password: hashedPassword,
          fullName,
          role,
          artisanProfile: role === "ARTISAN" ? {
            create: {
              category: category || "General",
            }
          } : undefined
        },
      });
      return user;
    });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      userId: newUser.id,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    const response = NextResponse.json(
      { message: "User created successfully", user: { phoneNumber: newUser.phoneNumber, role: newUser.role } },
      { status: 201 }
    );

    response.cookies.set("serviceman_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("SIGNUP_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}