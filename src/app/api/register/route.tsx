import User from "@/models/User";
import connectDB from "../../../lib/db"
import bcrypt from 'bcryptjs';

export async function POST(req: any) {
   await connectDB()

    try {
        const body = await req.json();
        // console.log(body)
        const { name,email, password } = body
        if (!name || !email || !password) {
            return Response.json({ error: 'All fields are required' },
                {status:400}
            );
        }

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            return Response.json({ error: 'User already exists' },
                {status:400}
            );
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        user = new User({
            name,
            email,
            password:hashedPassword
        });
        await user.save();

        return Response.json({ message: 'User registered successfully' },
            {status:200}
        );
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' });
    }
}

export async function GET() {
    const conn = await connectDB();

    try {
        // Fetch all users from the database
        const users = await User.find();
        // console.log("users",users)
        // Return the list of users
        return Response.json({ users }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' }, { status: 500 });
    }
}