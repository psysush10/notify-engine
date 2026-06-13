import dotenv from "dotenv";

dotenv.config();

export const tenantConfigs = {
  org_1: {
    slackEnabled: true,
    emailEnabled: true,
    webhookEnabled: true,
    slackWebhook: process.env.SLACK_WEBHOOK_ORG_1
  },

  org_2: {
    slackEnabled: true,
    emailEnabled: true,
    webhookEnabled: true
  }
};