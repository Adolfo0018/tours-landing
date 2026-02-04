import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  const sig = req.headers["stripe-signature"];

  const buf: Buffer = await new Promise((resolve) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
  });


  const event = stripe.webhooks.constructEvent(
    buf,
    sig as string,
    process.env.STRIPE_WEBHOOK_SECRET!
  );


  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    const customerEmail = session.customer_details.email;
    const title = session.metadata.title;
    const total = session.metadata.total;
    const people = session.metadata.people;
    const startDate = session.metadata.startDate;

    // 📧 correo al cliente
    await resend.emails.send({
      from: "Tours <tours@tudominio.com>",
      to: customerEmail,
      subject: "Your reservation is confirmed 🎉",
      html: `
        <h2>Reservation confirmed</h2>
        <p><strong>Tour:</strong> ${title}</p>
        <p><strong>Date:</strong> ${startDate}</p>
        <p><strong>People:</strong> ${people}</p>
        <p><strong>Total paid:</strong> $${total}</p>
      `,
    });

    // 📧 correo a ti
    await resend.emails.send({
      from: "Tours <tours@tudominio.com>",
      to: "tucorreo@tudominio.com",
      subject: "New reservation received",
      html: `
        <h2>New booking</h2>
        <p>${customerEmail} booked ${title}</p>
        <p>Date: ${startDate}</p>
        <p>People: ${people}</p>
        <p>Total: $${total}</p>
      `,
    });
  }

  res.status(200).json({ received: true });
}