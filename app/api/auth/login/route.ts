import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import {SignJWT} from "jose";

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password){
            return NextResponse.json(
                { error: "Email and password are required"},
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email},
            include: {
                artisanProfile: true
            }
        })

        if (!user) {
            return NextResponse.json(
                { error: "Invaild credentails"},
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid){
            return NextResponse.json(
                { error: "Invalid credentials"},
                { status: 401 }
            );
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({
            userId: user.id,
            email: user.email,
            role: user.role
        })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);

        const response = NextResponse.json(
            { message: "Login successful", 
            user: {
                id: user.id,
                email: user.email, 
                role: user.role,
                firstName: user.firstName,
            },
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return response;
    }catch (error: any){
        console.error("LOGIN_ERROR:",error);
        return NextResponse.json(
            {error: "Internal Server Error"},
            { status: 500 }
        );
    }
}