User
import User from "@/models/User";
import connectDB from "../../../lib/db"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    const conn = await connectDB();

    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return Response.json({ error: 'All fields are required' }, { status: 400 });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return Response.json({ error: 'User does not exist' }, { status: 400 });
        }

        console.log("Stored hashed password:", user.password);

        const validPassword = await bcrypt.compare(password, user.password);
        console.log("Input password:", password);
        console.log("Is password valid?", validPassword);

        if (!validPassword) {
            return Response.json({ error: "Invalid password" }, { status: 400 });
        }

        const token = await jwt.sign(
            { id: user._id, email: user.email },
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" }
        );

        const response = NextResponse.json({ message: 'User login successfully' }, { status: 200 });
        response.cookies.set("token", token, { httpOnly: true });

        return response;

    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' });
    }
}
