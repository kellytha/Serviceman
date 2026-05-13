import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

function validateNIN(nin: string): boolean {
  // NIN should be exactly 11 digits
  const ninRegex = /^[0-9]{11}$/;
  return ninRegex.test(nin);
}

async function getUserFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("serviceman_session")?.value;
    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      include: { artisanProfile: true }
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "ARTISAN") {
      return NextResponse.json({ error: "Only artisans can verify NIN" }, { status: 403 });
    }

    const body = await request.json();
    const { nin } = body;

    if (!nin) {
      return NextResponse.json({ error: "NIN is required" }, { status: 400 });
    }

    if (!validateNIN(nin)) {
      return NextResponse.json({ error: "Invalid NIN format. Must be 11 digits" }, { status: 400 });
    }

    // Check if NIN is already used by another user
    const existingUserWithNIN = await prisma.user.findUnique({ where: { nin } });
    if (existingUserWithNIN && existingUserWithNIN.id !== user.id) {
      return NextResponse.json({ error: "NIN already in use" }, { status: 400 });
    }

    // Update user with NIN and set as verified
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        nin,
        isVerified: true
      }
    });

    return NextResponse.json({
      message: "NIN verified successfully",
      user: {
        id: updatedUser.id,
        phoneNumber: updatedUser.phoneNumber,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
        isVerified: updatedUser.isVerified
      }
    });
  } catch (error: any) {
    console.error("NIN_VERIFICATION_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}