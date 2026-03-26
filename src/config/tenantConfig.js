export const getTenantConfig = (tenantId) => {
  const configs = {
    org_1: {
      slackWebhook: process.env.SLACK_WEBHOOK_ORG_1,
    },
    org_2: {},
  };

  return configs[tenantId];
};