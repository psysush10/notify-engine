import { tenantConfigs, TENANT_FILE } from "../store/tenantStore.js";
import { writeJsonFile } from "../services/storageService.js";
import {
  createTenantDb,getAllTenantsDb, updateTenantPlanDb
} from "../repositories/tenantRepository.js";

import {createApiKeyDb} from "../repositories/apiKeyRepository.js"
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
 apiKeys,
 API_KEY_FILE
}
from "../store/apiKeyStore.js";

export const createTenant =  
  async (req, res) => {

    const tenantName =
      req.body.tenantName;

    if (!tenantName) {
      return res.status(400).json({
        message:
          "tenantName required"
      });
    }

    const tenantId =
      generateTenantId();

    const apiKey =
      generateApiKey();

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
      tenantId
    );

    await createTenantConfigDb(
      tenantId
    );

    res.status(201).json({
      tenantId,
      apiKey
    });
  };

export const getTenants =
 (req,res)=>{

  res.json(
   Object.keys(
     tenantConfigs
   ).map(
     tenantId => ({
       tenantId
     })
   )
  );
};

export const getAllTenantsDbApi =
async (req,res)=>{

 const tenants =
  await getAllTenantsDb();

 res.json(tenants);
};

export const getTenantConfigApi = async (req, res) => {
  const tenantId = req.tenantId;
  const config = await getTenantConfigDb(tenantId);

  if(!config){
    return res.status(404).json({
      message:
      "Config not found"
    });
  }

  res.json(
    config
  );
};

export const updateTenantConfig = async (
  req,
  res
) => {

  const tenantId = req.tenantId;

  console.log(req.body);

  const updatedConfig = await updateTenantConfigDb(
    tenantId,
    req.body
  );

  writeJsonFile(
  TENANT_FILE,
  tenantConfigs
);

  res.json({
    message: "Config updated",
    config: updatedConfig
  });
};

export const updatePlan = async (
  req,
  res
) => {

  const tenantId =
    req.tenantId;

  const {
    plan
  } = req.body;

  const tenant =
    await updateTenantPlanDb(
      tenantId,
      plan
    );

  res.json(
    tenant
  );
};