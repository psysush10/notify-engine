import { sendEmail } from "../services/emailService.js";
import { triggerWebhook } from "../services/webhookService.js";

export const handleEvent = async (req, res) => {
  const event = req.body;

  console.log("Received event:", event);

  //send email
  if (event.email) {
    await sendEmail({
      to: event.email,
      subject: `🚨 ${event.type} detected`,
      text: `Project ${event.project} has a ${event.severity} issue.`,
    });
  }

  // Trigger webhook
  await triggerWebhook(event);

  res.json({
    message: "Event processed successfully",
    event,
  });
};