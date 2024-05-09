import User from "@/models/User";
import connectDB from "../../../lib/db";
import bcrypt from 'bcryptjs';
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function PUT(req: any) {
    console.log("req",req)
    const conn = await connectDB();

    try {
        const body = await req.json();
        // console.log("data",req.user)
        const { name, email, password } = body;

        const userId=await getDataFromToken(req)
        console.log("id",userId)
       
        // Find the user by ID
        const user = await User.findById({ _id: userId });
        console.log("user",user)
        if (!user) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        // Update user data
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = await bcrypt.hash(password, 12);
        }

        // Save the updated user
        await user.save();

        return Response.json({ message: 'User updated successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' }, { status: 500 });
    }
}
