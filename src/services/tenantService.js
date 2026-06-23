import { tenantRepository, apiKeyRepository, tenantConfigRepository, tenantUserRepository } from "../factories/respositoryFactory.js";

import {
  generateTenantId,
  generateApiKey
}
from "../utils/idGenerator.js";

import {
  tenantConfigs,
  TENANT_FILE
}
from "../store/tenantStore.js";

import {
  apiKeys,
  API_KEY_FILE
}
from "../store/apiKeyStore.js";

import { hashApiKey } from "../utils/hash.js";

import { writeJsonFile } from "./storageService.js";


export const getTenantById = async (tenantId )=> {
  return await tenantRepository.getById(tenantId);
}

export const createTenantService = async (tenantName) => {

  const tenantId =
    generateTenantId();

  const apiKey =
    generateApiKey();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 90);

  tenantConfigs[tenantId] = {

    tenantName,

    slackEnabled: true,
    emailEnabled: true,
    webhookEnabled: true,

    slackWebhook: "",
    emailFrom: "",
    webhookUrl: ""

  };

  writeJsonFile(
    TENANT_FILE,
    tenantConfigs
  );

  apiKeys[apiKey] =
    tenantId;

  writeJsonFile(
    API_KEY_FILE,
    apiKeys
  );



  await tenantRepository.create(
    tenantId,
    tenantName
  );

  const apiKeyHash = hashApiKey(apiKey);

  await apiKeyRepository.createApiKey(
    apiKeyHash,
    tenantId,
    expiresAt
  );

  await tenantConfigRepository.createConfig(
    tenantId
  );

  await tenantUserRepository.create(
    tenantId,
    `admin@${tenantId}.notify.local`,
    "TENANT_ADMIN"
  );


  return {
    tenantId,
    apiKey
  };

};

export const getAllTenantsService = async () => {

  return await tenantRepository.getAll();

};

export const getTenantConfigService = async (tenantId) => {

  return await tenantConfigRepository.getConfig(
    tenantId
  );

};

export const updateTenantConfigService = async (
  tenantId,
  config
) => {

  return await tenantConfigRepository.updateConfig(
    tenantId,
    config
  );

};

export const updatePlanService = async (
  tenantId,
  plan
) => {

  return await tenantRepository.updatePlan(
    tenantId,
    plan
  );

};
  