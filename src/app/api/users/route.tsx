import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
    await connectDB();

    try {
        
        const users = await User.find();
        console.log("users", users)
        return Response.json({ users }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' }, { status: 500 });
    }
}
