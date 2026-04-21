import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import {SignJWT} from "jose";

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const { email, password, firstName, lastName, phoneNumber, role, category } = body;

        if (!email || !password || !role ) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.$transaction(async (tx : any ) => {
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash: hashedPassword,
                    firstName,
                    lastName,
                    phoneNumber,
                    role,
                    artisanProfile: role === "ARTISAN" ? {
                        create: {
                            category: category || "General",
                        }
                    }: undefined
                },
            })
            return user;
        });
        
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role
        })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);

        const response = NextResponse.json(
            { message: "User created successfully", user: {email: newUser.email, role: newUser.role}, token },
            { status: 201 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return response;
    }catch(error: any){
        console.error("SIGNUP_ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};