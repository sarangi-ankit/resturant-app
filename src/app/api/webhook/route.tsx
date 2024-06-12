import Order from "@/models/Order";

const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req:any) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.WEBHOOK_SK;
      event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
      console.log("event",event)
  } catch (e) {
    console.error('stripe error');
    console.log(e);
    return Response.json(e, {status: 400});
  }

  if (event.type === 'checkout.session.completed') {
    console.log(event?.data?.object?.metadata);
      const orderId = event?.data?.object?.metadata?.orderId;
      console.log("orderId",orderId)
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({_id:orderId}, {payment:true});
    }
  }

  return Response.json('ok', {status: 200});
}