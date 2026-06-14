import { sendEmail } from "./emailService.js";
import { triggerWebhook } from "./webhookService.js";
import { sendSlackMessage } from "./slackService.js";
import { retry } from "../utils/retry.js";
import { incrementRetryCountDb } from "../repositories/eventRepository.js"
import { executeWithRetry } from "../utils/executeWithRetry.js"

export const processEvent = async (
  event,
  config
) => {

  let eventStatus = "SUCCESS";
  let failureReason = null;

  if (event.type === "force_failure") {
    throw new Error("Simulated Failure");
  }

  // EMAIL
  try {

    if (
      config?.email_enabled &&
      event.email
    ) {

      await sendEmail({
        to: event.email,
        subject: `🚨 ${event.type} detected`,
        text: `Project ${event.project} has a ${event.severity} issue.`,
      });

    }

  } catch (error) {

    eventStatus = "FAILED";
    failureReason = error.message;

    console.error(
      "Email failed",
      error.message
    );
  }

  // WEBHOOK
  try {

    if (config?.webhook_enabled) {
      await triggerWebhook(event);
    }

  } catch (error) {

    eventStatus = "FAILED";
    failureReason = error.message;

    console.error(
      "Webhook failed",
      error.message
    );
  }

  // SLACK
  try {

    if (
      config?.slack_enabled &&
      config?.slack_webhook
    ) {

      const message =
        `🚨 *${event.type}*\nProject: ${event.project}\nSeverity: ${event.severity}`;

      await executeWithRetry(

        event.requestId,

        () =>
          sendSlackMessage(
            config.slack_webhook,
            message
          )

      );
    }

  } catch (error) {

    eventStatus = "FAILED";
    failureReason = error.message;

    console.error(
      "Slack failed",
      error.message
    );
  }

  return {
    eventStatus,
    failureReason
  };
};