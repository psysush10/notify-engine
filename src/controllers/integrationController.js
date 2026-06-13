import {
  tenantConfigs,
  TENANT_FILE
} from "../store/tenantStore.js";

import {
  writeJsonFile
} from "../services/storageService.js";

export const getIntegrations =
(req,res)=>{

 const tenantId =
  req.tenantId;

 const tenant =
  tenantConfigs[tenantId];

 res.json({
  slackEnabled:
   tenant.slackEnabled,

  emailEnabled:
   tenant.emailEnabled,

  webhookEnabled:
   tenant.webhookEnabled,

  slackWebhook:
   tenant.slackWebhook,

  emailFrom:
   tenant.emailFrom,

  webhookUrl:
   tenant.webhookUrl
 });
};

export const updateIntegrations =
(req,res)=>{
console.log(req.body);
 const tenantId =
  req.tenantId;

 tenantConfigs[tenantId] = {

  ...tenantConfigs[tenantId],

  ...req.body
 };

 writeJsonFile(
  TENANT_FILE,
  tenantConfigs
 );

 res.json({
  message:
   "Integrations updated",

  integrations:
   tenantConfigs[tenantId]
 });
};