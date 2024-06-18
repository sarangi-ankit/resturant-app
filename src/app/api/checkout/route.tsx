import { authOptions } from "@/lib/authOption";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req: any) {
    await connectDB();

    try {
        const { cart, address } = await req.json();
        // console.log("cart", cart);
        const session = await getServerSession(authOptions);
        const userId = session?.user?.email;

        // console.log("userEmail", userId);
        const subTotal = cart.reduce((total: any, item: any) => total + (item.price) * (item.quantity), 0)
        const deliveryFee = 5.00
        const totalAmount=subTotal+deliveryFee
        const orderData = await Order.create({
            userId,
            items: cart,
            amount: totalAmount,
            address,
            status: "Food Processing",
            payment: false
        });

        const stripeLineItems = cart.map((cartProduct: any) => ({
            quantity: cartProduct.quantity,
            price_data: {
                currency: 'inr',
                product_data: {
                    name: cartProduct.name,
                },
                unit_amount: cartProduct.price * 100,
            },
        }));

        // console.log("stripe", stripeLineItems);

        const stripeSession = await stripe.checkout.sessions.create({
            line_items: stripeLineItems,
            customer_email: userId,
            success_url: `${process.env.NEXT_PUBLIC_URL}/order?success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart/cancel`,
            metadata: { orderId: orderData._id.toString() },
            mode: 'payment',
            billing_address_collection: 'required',
            shipping_options: [{
                shipping_rate_data: {
                    display_name: "Delivery Fee",
                    type: "fixed_amount",
                    fixed_amount: { amount: 500, currency: "inr" }
                }
            }]
        });

        // console.log("stripe", stripeSession);
        return new Response(JSON.stringify({ url: stripeSession.url }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function GET() {
    await connectDB();

    try {
        const orders=await Order.find()
        return Response.json({ orders }, { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Server Error' }), {status: 500});
    }
}