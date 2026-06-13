import axios from "axios";
import { retry } from "../utils/retry.js";

export const sendSlackMessage = async (webhookUrl, message) => {
  try {
    if (!webhookUrl) {
      console.log("No Slack webhook configured");
      return;
    }

    await retry(() =>
    axios.post(
      webhookUrl,
      {
        text: message
      }
    )
  );

    console.log("Slack message sent");
  } catch (error) {
    console.error("Slack error:", error.message);
    throw error;
  }
};