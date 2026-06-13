import { sendEmail } from "../services/emailService.js";
import { triggerWebhook } from "../services/webhookService.js";
import { sendSlackMessage } from "../services/slackService.js";
import { tenantConfigs } from "../store/tenantStore.js";
import { notificationHistory } from "../store/notificationStore.js";

export const handleEvent = async (req, res) => {

  const event = req.body;
  const tenantId = req.tenantId;
  const requestId = `req_${Date.now()}`;

  event.tenantId = tenantId;

  try {

    console.log("Received event:", event);

    const config = tenantConfigs[tenantId];
    console.log("CONFIG:", config);

    if (event.type === "force_failure") {
  throw new Error("Simulated Failure");
}

    // Email
    if (config?.emailEnabled && event.email) {
      await sendEmail({
        to: event.email,
        subject: `🚨 ${event.type} detected`,
        text: `Project ${event.project} has a ${event.severity} issue.`,
      });
    }

    // Webhook
    if (config?.webhookEnabled) {
      await triggerWebhook(event);
    }
   

    console.log("CONFIG USED IN EVENT:", config);
    console.log("SLACK ENABLED:", config?.slackEnabled);
    console.log("slackWebhook:", config?.slackWebhook);
    // Slack
    if (config?.slackEnabled && config?.slackWebhook) {
        console.log("ENTERED SLACK BLOCK");
      const message =
        `🚨 *${event.type}*\nProject: ${event.project}\nSeverity: ${event.severity}`;

      await sendSlackMessage(
        config.slackWebhook,
        message
      );
    }

    // SUCCESS HISTORY
    notificationHistory.push({
      requestId,
      tenantId,
      type: event.type,
      project: event.project,
      severity: event.severity,
      status: "SUCCESS",
      timestamp: new Date().toISOString(),
      retryCount: 0
    });

    res.json({
      requestId,
      message: "Event processed successfully",
      event,
    });

  } catch (error) {

    console.error(
      "Event processing failed:",
      error.message
    );

    // FAILURE HISTORY
    notificationHistory.push({
      requestId,
      tenantId,
      type: event.type,
      project: event.project,
      severity: event.severity,
      status: "FAILED",
      error: error.message,
      timestamp: new Date().toISOString(),
      retryCount: "N/A"
    });

    res.status(500).json({
      requestId,
      message: "Event processing failed",
      error: error.message
    });
  }
};