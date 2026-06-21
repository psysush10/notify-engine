import { tenantRepository } from "../factories/respositoryFactory.js";
import { createTenantDb, getAllTenantsDb, updateTenantPlanDb } from "../repositories/tenantRepository.js";
import {createApiKeyDb} from "../repositories/apiKeyRepository.js";

import {
  createTenantConfigDb,
  getTenantConfigDb,
  updateTenantConfigDb
}
from "../repositories/tenantConfigRepository.js";

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



  await createTenantDb(
    tenantId,
    tenantName
  );

  await createApiKeyDb(
    apiKey,
    tenantId,
    expiresAt
  );

  await createTenantConfigDb(
    tenantId
  );


  return {
    tenantId,
    apiKey
  };

};

export const getAllTenantsService = async () => {

  return await getAllTenantsDb();

};

export const getTenantConfigService = async (tenantId) => {

  return await getTenantConfigDb(
    tenantId
  );

};

export const updateTenantConfigService = async (
  tenantId,
  config
) => {

  return await updateTenantConfigDb(
    tenantId,
    config
  );

};

export const updatePlanService = async (
  tenantId,
  plan
) => {

  return await updateTenantPlanDb(
    tenantId,
    plan
  );

};
  