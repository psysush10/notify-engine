import { sendEmail } from "../services/emailService.js";
import { triggerWebhook } from "../services/webhookService.js";
import { sendSlackMessage } from "../services/slackService.js";
import { getTenantConfig } from "../config/tenantConfig.js";

export const handleEvent = async (req, res) => {
  const event = req.body;

  console.log("Received event:", event);

 const config = getTenantConfig(event.tenantId);

  // Email
  if (event.email) {
    await sendEmail({
      to: event.email,
      subject: `🚨 ${event.type} detected`,
      text: `Project ${event.project} has a ${event.severity} issue.`,
    });
  }

  // Webhook
  await triggerWebhook(event);

  // Slack
  if (config?.slackWebhook) {
    const message = `🚨 *${event.type}*\nProject: ${event.project}\nSeverity: ${event.severity}`;

    await sendSlackMessage(config.slackWebhook, message);
  }

  res.json({
    message: "Event processed successfully",
    event,
  });
};