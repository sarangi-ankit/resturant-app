import connectDB from "@/lib/db";
import Menu from "@/models/MenuItem";

export async function POST(req: any) {
    const conn = await connectDB()
    try {
        const body = await req.json()
        const { image, name, description, price, category } = body
        console.log("body", body)
        if (!name || !price || !category) {
            return Response.json({ message: "missing field" },
                { status: 400 }
            )
        }
        const newItems = new Menu({

            name,
            image,
            description,
            price,
            category
        })
        await newItems.save()
        return Response.json({ message: 'Items Added Successfully' },
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

        const menu = await Menu.find();
        // console.log("category", menu)
        return Response.json({ menu }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' }, { status: 500 });
    }
}

export async function PUT(req: any) {
    const conn = await connectDB();

    try {
        const body = await req.json();
        const { id, image, name, description, price, category } = body;


        const updatedMenu = await Menu.findByIdAndUpdate(id, { image, name, description, price, category }, { new: true });
        updatedMenu.save()

        // console.log("Updated menu:", updatedMenu);

        return Response.json({ message: "update successful" }, { status: 200 })
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: any) {
    try {
        const conn = await connectDB();
        const url = new URL(req.url, `http://${req.headers.host}`);
        // console.log("url", url)
        const _id = url.searchParams.get('_id');
        console.log("id", _id)
        await Menu.deleteOne({_id})
        return Response.json({ message: "item deleted successfully" },{status:200})
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' }, { status: 500 });
    }

}



