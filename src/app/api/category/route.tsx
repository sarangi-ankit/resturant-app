import Category from "@/models/Category";
import connectDB from "../../../lib/db"



export async function POST(req: any) {

    const conn = await connectDB()

    try {
        const body = await req.json();
        const { name ,image} = body
        if (!name) {
            return Response.json({ message: "category name is required" },
                { status: 400 }
            )
        }
        const newCategory = new Category({ name,image })
        await newCategory.save()
        return Response.json({ message: 'Category Added Successfully' },
            { status: 200 }
        );


    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' });
    }
}
export async function GET() {
    const conn = await connectDB();

    try {
        
        const category = await Category.find();
        // console.log("category", category)
        return Response.json({ category }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: any) {
    try {
        await connectDB();
        const url = new URL(req.url, `http://${req.headers.host}`);
        // console.log("url", url)
        const _id = url.searchParams.get('_id');
        // console.log("id", _id)
        await Category.deleteOne({_id})
        return Response.json({ message: "category deleted successfully" },{status:200})
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' }, { status: 500 });
    }

}