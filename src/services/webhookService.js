import axios from "axios";

export const triggerWebhook = async (payload) => {
  try {
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      console.log("No webhook URL configured");
      return;
    }

    await axios.post(webhookUrl, payload);

    console.log("Webhook triggered successfully");
  } catch (error) {
    console.error("Webhook error:", error.message);
  }
};