import axios from "axios";

export const sendSlackMessage = async (webhookUrl, message) => {
    console.log("ENV SLACK:", process.env.SLACK_WEBHOOK_ORG_1);
  try {
    if (!webhookUrl) {
      console.log("No Slack webhook configured");
      return;
    }

    await axios.post(webhookUrl, {
      text: message,
    });

    console.log("Slack message sent");
  } catch (error) {
    console.error("Slack error:", error.message);
  }
};