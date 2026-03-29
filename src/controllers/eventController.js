import { getTenantConfig } from "../config/tenantConfig.js";
import { notificationQueue } from "../services/queueService.js";

export const handleEvent = async (req, res) => {
  const event = req.body;
  console.log("Received event:", event);

  try {
    const config = getTenantConfig(event.tenantId);

    // AK - 30/Mar/2026: Check if we actually have config for this tenant
    if (!config) {
      return res.status(404).json({
        error: "Tenant not found",
        tenantId: event.tenantId
      });
    }

    // AK - 30/Mar/2026: Queue up notifications instead of doing them synchronously
    const queuedJobs = [];

    // AK - 30/Mar/2026: Queue email if provided
    if (event.email) {
      await notificationQueue.add({
        event,
        config,
        notificationType: 'email'
      });
      queuedJobs.push('email');
    }

    // AK - 30/Mar/2026: Always queue webhook
    await notificationQueue.add({
      event,
      config,
      notificationType: 'webhook'
    });
    queuedJobs.push('webhook');

    // AK - 30/Mar/2026: Queue Slack if configured for this tenant
    if (config?.slackWebhook) {
      await notificationQueue.add({
        event,
        config,
        notificationType: 'slack'
      });
      queuedJobs.push('slack');
    }

    // AK - 30/Mar/2026: Return immediately with queue status
    res.status(202).json({ // AK - 30/Mar/2026: 202 = Accepted for processing
      message: "Event queued for processing",
      event,
      queuedNotifications: queuedJobs,
      queueStatus: notificationQueue.getStatus()
    });

  } catch (error) {
    // AK - 30/Mar/2026: Something really bad happened, return 500
    console.error("Event processing failed:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      event
    });
  }
};