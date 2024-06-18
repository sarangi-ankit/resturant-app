import User from "@/models/User";
import connectDB from "../../../lib/db";
import bcrypt from 'bcryptjs';
import { getDataFromToken } from "@/helper/getDataFromToken";

// export async function GET() {
//     const conn = await connectDB();

//     try {
        
//         const user = await User.find();
//         // console.log("category", category)
//         return Response.json({ user }, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return Response.json({ message: 'Server Error' }, { status: 500 });
//     }
// }

export async function GET(req:any, { params }:any) {
     await connectDB();
    console.log("clicked")
    try {
        console.log("param",params)
        const email = params.email;
        console.log("email",email)
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Server Error' }), { status: 500 });
    }
}
export async function PUT(req: any) {
    // console.log("req",req)
    const conn = await connectDB();

    try {
        const body = await req.json();
        const { name, email, password } = body;

        const userId=await getDataFromToken(req)
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
