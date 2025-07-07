import { Webhook } from "svix";
import User from '../models/User.js'

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    const { data, type } = req.body;

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address, // fixed typo
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: ''
        };
        await User.create(userData);
        return res.json({});
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url
        };
        await User.findByIdAndUpdate(data.id, userData);
        return res.json({});
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id); // removed extra userData param
        return res.json({});
      }

      default:
        return res.status(400).json({ message: 'Unhandled event type' });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Webhooks Error" });
  }
};
