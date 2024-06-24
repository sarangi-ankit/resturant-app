import User from "@/models/User";
import connectDB from "../../../lib/db";
import bcrypt from 'bcryptjs';
import { getDataFromToken } from "@/helper/getDataFromToken";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";


export async function GET(req: any) {
    await connectDB();
    const url = new URL(req.url);
    // console.log("url",url)
    const emailParam = url.searchParams.get('email');
   
    
    let filterUser = {};
    if (emailParam) {
        filterUser = { email: emailParam };
    } else {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        // console.log("email1",email)
        if (!email) {
            return new Response(JSON.stringify({}), { status: 400 });
        }
        filterUser = { email };
    }

    const user = await User.findOne(filterUser).lean();
    // console.log("user",user)
    if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
}


export async function PUT(req: any) {
    await connectDB();

    try {
        const body = await req.json();
        const { name, email, password } = body;

        const userId = await getDataFromToken(req)
        const user = await User.findById({ _id: userId });

        if (!user) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = await bcrypt.hash(password, 12);
        }
        await user.save();

        return Response.json({ message: 'User updated successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' }, { status: 500 });
    }
}
